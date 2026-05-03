# Website Workflow and Codebase Documentation

## 1. Project Overview
This project is an E-commerce web application built with **React**. It uses **Redux Toolkit** for state management (specifically for the shopping cart) and **React Router** for navigation. The styling is handled by **Tailwind CSS**.

### Tech Stack
-   **Framework**: React 18
-   **Routing**: React Router DOM v6
-   **State Management**: Redux Toolkit & React Redux
-   **Persistence**: Redux Persist (saves cart state to local storage)
-   **Styling**: Tailwind CSS
-   **UI Libraries**: React Slick (Carousel), Framer Motion (Animations), React Icons

---

## 2. Directory Structure (`src/`)

-   **`assets/`**: Contains static images and resources used across the site.
-   **`components/`**: Reusable UI components.
    -   `home/`: Components specific to the homepage (Banner, NewArrivals, BestSellers, etc.).
    -   `pageProps/`: Components used across multiple pages (Breadcrumbs, ProductDetails, etc.).
    -   `designLayouts/`: Layout wrappers (marketing structure, etc.).
-   **`constants/`**: Configuration files and static data.
-   **`pages/`**: Main page components corresponding to routes.
    -   `Home`, `Shop`, `Cart`, `SignIn`, `SignUp`, `ProductDetails`, etc.
-   **`redux/`**: Redux state management configuration.
    -   `store.js`: Global store setup.
    -   `amacificSlice.js`: Slice for cart management actions.
-   **`App.js`**: Main application component containing routing logic.
-   **`index.js`**: Entry point where the React app is mounted and providers (Redux, Router) are wrapped.

---

## 3. Key Components & Workflow

### A. Routing (`App.js`)
The application usage `createBrowserRouter` to define routes.
-   **Layout**: A wrapper component that includes `Header`, `Footer`, and `Outlet` (where page content renders).
-   **Main Routes**:
    -   `/`: Home Page
    -   `/shop`: Shop Page
    -   `/product/:_id`: Product Details Page (Dynamic route using product ID)
    -   `/cart`: Shopping Cart
-   **Auth Routes**: `/signin`, `/signup` (These seem to be outside the main layout in some configurations, or part of it).

### B. State Management (Redux)
The global state is managed mostly for the **Shopping Cart**.
-   **File**: `src/redux/amacificSlice.js`
-   **Slice Name**: `amacific`
-   **State Structure**:
    ```javascript
    {
      userInfo: [], // Placeholder for user data
      products: [], // Array of cart items
    }
    ```
-   **Key Actions**:
    -   `addToCart`: Adds a product to the `products` array. If it exists, increments quantity.
    -   `increaseQuantity` / `drecreaseQuantity`: Modifies item count in the cart.
    -   `deleteItem`: Removes an item from the cart.
    -   `resetCart`: Clears the cart.
-   **Persistence**: `redux-persist` ensures that the cart data remains even after refreshing the page (saved in LocalStorage).

### C. Product Data Flow
1.  **Source**: Product data appears to be primarily static, imported from `assets` or `constants` and passed down to components.
2.  **Display**:
    -   **Home Page**: Components like `NewArrivals` or `BestSellers` map over static lists of products.
    -   **Product Component**: `src/components/home/Products/Product.js` receives product details via props (`img`, `productName`, `price`, `color`, etc.).
3.  **Interaction**:
    -   When a user clicks **"Add to Cart"** on a `Product` component:
        1.  `dispatch(addToCart({...}))` is called with product details.
        2.  The Redux store updates the `products` array.
        3.  The `Header` (specifically the cart icon section) subscribes to the store and updates the cart count/preview automatically.
    -   When a user clicks **"View Details"**:
        1.  `useNavigate` redirects to `/product/${rootId}`.
        2.  The product object is passed via `state` in the navigation to be displayed on the `ProductDetails` page.

---

## 4. detailed Workflow Example: Adding an Item

1.  **User lands on Home**: `App.js` renders `<Layout>` -> `<Home>`.
2.  **Viewing Products**: `<Home>` renders `<NewArrivals>`, which contains a slider of `<Product>` components.
3.  **User Action**: User hovers over a product and clicks "Add to Cart".
4.  **Component Logic (`Product.js`)**:
    -   The `onClick` handler triggers.
    -   `dispatch(addToCart(productInfo))` sends an action to Redux.
5.  **Redux Update (`amacificSlice.js`)**:
    -   The reducer checks if the item is already in the cart.
    -   New item is pushed or quantity is incremented.
6.  **UI Update**:
    -   `Header` component (subscribed to `state.amacificReducer.products`) re-renders to show the updated cart count.
    -   Redux Persist saves the new state to LocalStorage.

## 5. Critical Code Locations

-   **Routing**: `src/App.js` (Line 39: `router` configuration)
-   **Cart Logic**: `src/redux/amacificSlice.js` (Line 12: `addToCart` reducer)
-   **Product UI**: `src/components/home/Products/Product.js` (Line 48: Dispatch logic)
-   **Store Setup**: `src/redux/store.js`
