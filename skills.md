# Amacific frontend — Claude skill sheet

Use this when editing the **Amacific** React app (`amacificshop`). Prefer matching existing patterns over introducing new stacks.

---

## Stack

| Layer | Choice |
|--------|--------|
| Runtime | **React 18** (`react`, `react-dom`) |
| Bootstrap | **Create React App** (`react-scripts` 5) — **no Vite**, no Next.js |
| Routing | **React Router v6** — `createBrowserRouter`, `RouterProvider`, nested `<Route>`, `<Outlet />`, `<ScrollRestoration />` |
| State | **Redux Toolkit** (`@reduxjs/toolkit`) + **react-redux**; cart/wishlist persisted via **redux-persist** (`PersistGate` in `src/index.js`) |
| Styling | **Tailwind CSS 3** + global **`src/index.css`** (custom classes, keyframes, slick overrides) |
| Motion | **Framer Motion** (`framer-motion`) — used in cards, popups, hero |
| Carousels | **Embla** (`embla-carousel-react`, `embla-carousel-autoplay`) for home hero; **react-slick** + **slick-carousel** CSS for product rows / marketing strips |
| Icons | **react-icons** (usually `react-icons/fa`) |
| Tests | **Testing Library** (Jest via CRA) — rarely extended in day-to-day |

**Not in repo:** TypeScript, React Query, Zustand, styled-components, CSS modules as primary pattern.

---

## Project layout (high signal)

```
src/
  App.js                 # Router tree + Layout shell
  index.js               # Redux Provider, PersistGate, slick CSS import
  index.css              # Tailwind directives + global + third-party overrides
  components/            # Shared UI (Navbar, Footer, ProductCard, carousels, popups, SeoHead, …)
  pages/                 # Route-level views (often one folder per area, e.g. Home/Home.js)
  pages/campaigns/       # Campaign landings (OneCartFullLife, SmartestCartChallenge)
  pages/ProductDetails/  # PDP
  pages/Cart/, Shop/, …
  constants/
    catalog.js           # Single source of truth: `CATALOG`, helpers (`getProductById`, `filterCategory`, …)
    data.js              # Blog / static marketing copy (not product SKUs)
  redux/
    store.js             # `configureStore`, persistor whitelist
    amacificSlice.js     # Cart line shape, wishlist, coupon, recently viewed
  utils/
    analytics.js         # `trackEvent(name, params)` → dataLayer, gtag, fbq, ttq
    format.js            # PKR formatting helpers
    productImageFallback.js  # `handleProductImageError`, placeholder URL for broken images
  assets/                # Images, fonts referenced from components
```

---

## Routing conventions

- **Layout route** (`path="/"` with `element={<Layout />}`): wraps **Navbar**, **`<main><Outlet /></main>`**, **Footer**, plus global popups (welcome strip, exit intent, email signup, challenge peek, WhatsApp float) and **RouteAnalytics**.
- **Auth routes** live **outside** Layout: `/signin`, `/signup` (no shared chrome unless duplicated there).
- **Product URL:** `/product/:_id` where `_id` matches **`CATALOG` `_id`** (e.g. `ap-101`).
- **Legacy redirects:** e.g. `/campaigns/found-it-week` → `/campaigns/one-cart-full-life`.

When adding a page: register in **`App.js`**, use **`SeoHead`** on the page, and **`Link` / `navigate`** from `react-router-dom`.

---

## Data & product model

Products live in **`src/constants/catalog.js`** as **`CATALOG`** array items:

- **`_id`**, **`productName`**, **`img`** (full HTTPS URL — prefer Unsplash with `?q=80&w=…&auto=format&fit=crop`; verify URLs still return **200**),
- **`price`** (number, PKR), optional **`compareAt`**, **`color`**, **`category`**, **`des`**, **`badge`**, **`verifiedSeller`**, **`reviews`**, etc.

Use **`getProductById`**, **`filterCategory`**, **`filterUnder999`**, **`filterDeals`**, etc. — do not duplicate catalog arrays in pages unless there is already a precedent for that page.

**Cart line payload** (from `addToCart`): `_id`, `name`, `quantity`, `image`, `badge`, `price`, `colors` — keep field names aligned with **`amacificSlice`** and **`ProductCard`**.

---

## Redux usage

- **Selector:** `useSelector((s) => s.amacificReducer.products)` — slice is mounted as **`amacificReducer`** (see `store.js`).
- **Dispatch:** `useDispatch()` + actions exported from **`amacificSlice`** (`addToCart`, `toggleWishlist`, …).
- **Typo preserved:** reducer action is **`drecreaseQuantity`** (not `decreaseQuantity`) — match existing name if touching cart quantity.

---

## Styling & design tokens

- **Tailwind** scans **`./src/**/*.{js,jsx,ts,tsx}`** (`tailwind.config.js`).
- **Layout width:** `max-w-container mx-auto px-4` (container **1440px** max).
- **Fonts:** `font-bodyFont`, **`font-titleFont`** (both Poppins in config).
- **Tailwind theme colors** include **`navy`**, **`brandOrange`**, **`primeColor`**, **`indigo`**, **`softBlue`** — note: **`brandOrange` in `tailwind.config.js` maps to violet**, while marketing/campaign UIs often use **literal Tailwind oranges** (`orange-500`, `from-orange-500 to-yellow-400`). When editing campaign or hero UI, follow **the page’s own palette** (many use `#f97316` / `#facc15` / `#111827` / `#f9fafb` explicitly).
- **Breakpoints:** custom **`mdl`**, **`lgl`** exist alongside standard `sm`/`md`/`lg`/`xl`.

Prefer **utility classes**; global one-offs go in **`index.css`** with clear names (e.g. `.amapacific-hero-progress`).

---

## Components to reuse

| Need | Use |
|------|-----|
| Product tile in grids/carousels | **`ProductCard`** (`components/ProductCard.js`) — supports `analyticsList` for `trackEvent` on navigate |
| Product grid section | **`ProductGrid`** |
| Horizontal product slider | **`ProductRowCarousel`** (react-slick) |
| Page meta title/description | **`SeoHead`** (`components/SeoHead.jsx`) — client-side `document.title` + meta |
| PKR display | **`formatPkr`** from **`utils/format.js`** |
| GA4 / ads / TikTok events | **`trackEvent('event_name', { … })`** from **`utils/analytics.js`** |
| Broken product images | **`handleProductImageError`** from **`utils/productImageFallback.js`** on `<img>` / `motion.img` |

---

## Conventions & gotchas

1. **File extensions:** mix of **`.js`** and **`.jsx`** — follow the folder you are in.
2. **Imports:** relative paths from `src` (no `@/` alias in default CRA setup).
3. **Images:** remote Unsplash URLs can **404** if the asset is removed; HEAD-check or swap to a known-good URL; keep **`onError`** fallback on product imagery.
4. **PDP navigation:** `Link` to **`/product/${product._id}`** with **`state={{ item: product }}`** where the app already does so — `ProductDetails` merges route param with **`location.state`**.
5. **Do not rename** `drecreaseQuantity` without a repo-wide refactor.
6. **Build:** `npm run build` must pass before merging; CRA ESLint extends **`react-app`**.

---

## Commands

```bash
npm start    # dev server
npm run build
npm test
```

---

## What to avoid unless explicitly requested

- Ejecting CRA, migrating to Vite/Next without a dedicated task.
- New global state libraries.
- Heavy glassmorphism / blur stacks on hero (recent direction: **clean overlay**, **`bg-black/50`**, readable type).
- Duplicating **`CATALOG`** entries outside **`catalog.js`**.

---

## Quick checklist for new UI work

- [ ] Wrapped in **`max-w-container`** where appropriate; mobile padding **`px-4`**.
- [ ] **`SeoHead`** on new routes.
- [ ] Meaningful **`trackEvent`** on primary CTAs (match existing event names where possible).
- [ ] Product images: valid URL + **`onError`** fallback.
- [ ] Accessible labels on icon-only buttons (`aria-label`).

---

*Repo: Amacific e-commerce frontend (Pakistan marketplace). Update this file if the stack or folder conventions change.*
