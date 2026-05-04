import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import ProductGrid from "../../components/ProductGrid";
import PaymentMethodIcons from "../../components/PaymentMethodIcons";
import ReelStoryboardSection from "../../components/ReelStoryboardSection";
import MailchimpSignupForm from "../../components/MailchimpSignupForm";
import ReviewCarousel from "../../components/ReviewCarousel";
import { CATALOG, getProductById } from "../../constants/catalog";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCopy,
  FaGamepad,
  FaHeadphones,
  FaHome,
  FaPenFancy,
  FaShieldAlt,
  FaShoppingBag,
  FaSpa,
  FaTshirt,
} from "react-icons/fa";
import { trackEvent } from "../../utils/analytics";

const HERO_BG =
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2400&auto=format&fit=crop";

const ONE_CART_SHOWCASE_IDS = [
  "ap-104",
  "ap-101",
  "ap-105",
  "ap-107",
  "ap-109",
  "ap-108",
  "ap-110",
  "ap-118",
];

const lifestylePlans = [
  {
    title: "Semester survival",
    body: "Notebook, bottle, lamp, and cables — build a study haul in one checkout.",
    to: "/student-essentials",
    cta: "Student hub",
  },
  {
    title: "Office upgrade",
    body: "Desk gear, mug, organizer, and mouse without juggling three sellers.",
    to: "/stationery",
    cta: "Stationery & desk",
  },
  {
    title: "Creator setup",
    body: "Audio, lighting accessories, and wardrobe basics for content days.",
    to: "/gadgets",
    cta: "Tech picks",
  },
  {
    title: "Last-minute gifts",
    body: "Beauty, toys, and home pieces you can wrap the same week.",
    to: "/deals",
    cta: "Deals under 999",
  },
];

const categories = [
  { label: "Fashion", to: "/clothing", hint: "Tees, bags, sneakers", Icon: FaTshirt },
  { label: "Tech & gadgets", to: "/gadgets", hint: "Audio, cables, accessories", Icon: FaHeadphones },
  { label: "Beauty", to: "/beauty", hint: "Skincare & daily care", Icon: FaSpa },
  { label: "Stationery", to: "/stationery", hint: "Desks, pens, organizers", Icon: FaPenFancy },
  { label: "Home", to: "/home-living", hint: "Mugs, clocks, decor", Icon: FaHome },
  { label: "Toys & gifts", to: "/toys", hint: "STEM kits & RC fun", Icon: FaGamepad },
];

const howSteps = [
  {
    title: "Browse every aisle",
    body: "Fashion, tech, beauty, stationery, home, essentials, and toys — all in one catalogue.",
  },
  {
    title: "Fill one cart",
    body: "Verified sellers, clear ratings, and PKR pricing so you know what you are paying before checkout.",
  },
  {
    title: "Pay your way",
    body: "COD nationwide plus JazzCash, Easypaisa, Raast, and cards when you prefer digital checkout.",
  },
  {
    title: "Track once",
    body: "One order timeline instead of chasing five different couriers from five different apps.",
  },
];

const reelCards = [
  { text: "User opens multiple shopping apps on their phone." },
  { text: "User looks frustrated juggling carts and delivery dates." },
  { text: "Friend says: “Use Amacific — one cart for everything.”" },
  { text: "User adds beauty, tech, stationery, fashion, and essentials to one Amacific cart." },
  { text: "Checkout screen: COD / wallets / secure total." },
  { text: "Final on-screen text: “One cart. Every need.”" },
];

export default function OneCartFullLife() {
  useEffect(() => {
    trackEvent("campaign_page_visit", { campaign: "one_cart_full_life" });
  }, []);

  const copyCode = useCallback(() => {
    navigator.clipboard?.writeText("ONECART200").catch(() => {});
    trackEvent("onecart_promo_code_copy", { code: "ONECART200", source: "one_cart_landing" });
  }, []);

  const showcaseProducts = ONE_CART_SHOWCASE_IDS.map((id) => getProductById(id)).filter(Boolean);
  const fallbackFeatured = CATALOG.slice(0, 8);
  const gridProducts = showcaseProducts.length >= 6 ? showcaseProducts : fallbackFeatured;

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      <SeoHead
        title="One Cart, Full Life | Amacific Pakistan"
        description="One checkout for fashion, tech, beauty, stationery, home, toys, and essentials. PKR 200 off first order with ONECART200. COD & wallets nationwide."
        keywords="Amacific Pakistan, one cart shopping, online marketplace Pakistan, ONECART200, COD shopping Pakistan"
        canonicalPath="/campaigns/one-cart-full-life"
      />

      <section className="relative isolate min-h-[min(92vh,720px)] overflow-hidden bg-[#111827] text-white">
        <img
          src={HERO_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[min(92vh,720px)] max-w-container flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:pb-20 md:pt-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">Campaign · One Cart, Full Life</p>
          <h1 className="mt-4 max-w-3xl font-titleFont text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Everything you need,
            <span className="mt-2 block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              one cart, one checkout
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Stop switching between apps for fashion, tech, beauty, and daily essentials. Amacific is built for how young
            Pakistan actually shops — verified sellers, clear totals, and delivery you can track in one place.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/shop"
              onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "build_first_cart", source: "one_cart_landing" })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
            >
              Start shopping <FaArrowRight className="text-xs opacity-90" />
            </Link>
            <Link
              to="/deals"
              onClick={() => trackEvent("product_under_999_click", { source: "one_cart_landing_hero" })}
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse deals under PKR 999
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/75">
            First order: use{" "}
            <button
              type="button"
              onClick={copyCode}
              className="font-mono font-bold tracking-widest text-yellow-300 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-200"
            >
              ONECART200
            </button>{" "}
            at checkout for PKR 200 off eligible carts.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">The old way is exhausting</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Splitting fashion, tech, beauty, and stationery across different apps means different delivery windows,
                different return policies, and different trust signals. You lose time comparing shipping and wondering
                which seller is real.
              </p>
            </div>
            <div>
              <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">One Amacific cart fixes that</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Build a single cart that mirrors your real life — campus fits, desk upgrades, skincare restocks, and
                gifts for cousins — then check out once with COD or digital wallets. Same marketplace. Same support
                mindset.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">How one cart works</h2>
            <p className="mt-3 text-slate-600">
              Four simple beats — from browse to doorstep — without app-hopping.
            </p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-titleFont text-lg font-bold text-[#111827]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">Shop by category</h2>
              <p className="mt-2 max-w-xl text-slate-600">Jump straight in — everything below merges into the same cart at checkout.</p>
            </div>
            <Link
              to="/shop"
              onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "shop_all_categories", source: "one_cart_landing" })}
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-orange-600 hover:text-orange-500 md:self-auto"
            >
              View full catalogue <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ label, to, hint, Icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={() => trackEvent("hero_one_cart_cta_click", { cta: `category_${label}`, source: "one_cart_landing" })}
                  className="group flex h-full gap-4 rounded-2xl border border-slate-200 bg-[#f9fafb] p-5 transition hover:border-orange-300 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm ring-1 ring-slate-200/80 transition group-hover:scale-105">
                    <Icon className="text-lg" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-titleFont font-bold text-[#111827]">{label}</span>
                    <span className="mt-1 block text-sm text-slate-600">{hint}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">Lifestyle carts you can copy</h2>
            <p className="mt-3 text-slate-600">Starter ideas for your first serious Amacific haul — mix categories freely.</p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {lifestylePlans.map((plan) => (
              <li
                key={plan.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8"
              >
                <div className="flex items-start gap-3">
                  <FaShoppingBag className="mt-0.5 shrink-0 text-orange-500" />
                  <div>
                    <h3 className="font-titleFont text-lg font-bold text-[#111827]">{plan.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{plan.body}</p>
                  </div>
                </div>
                <Link
                  to={plan.to}
                  onClick={() => trackEvent("hero_one_cart_cta_click", { cta: plan.cta, source: "one_cart_lifestyle" })}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-500"
                >
                  {plan.cta} <FaArrowRight className="text-xs" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="border-t border-slate-200/80 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">One-cart showcase</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Fashion, audio, beauty, stationery, home, essentials, and toys — exactly the kind of mix a single Amacific
              order can carry.
            </p>
          </div>
          <ProductGrid products={gridProducts} title="" analyticsList="view_item_list" />
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#111827] py-16 text-white md:py-20">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-orange-500/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-yellow-400/15"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-container px-4 text-center lg:px-8">
          <FaShieldAlt className="mx-auto text-2xl text-yellow-300/90" />
          <h2 className="mt-4 font-titleFont text-2xl font-bold md:text-3xl">First order: PKR 200 off</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/75 md:text-base">
            Add what you love, head to checkout, and paste your code in the voucher field. One promo per eligible first
            order unless stated otherwise on the offer.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <div className="rounded-xl border border-white/30 bg-black/30 px-6 py-4 font-mono text-xl font-bold tracking-[0.22em] text-yellow-300 sm:text-2xl">
              ONECART200
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FaCopy /> Copy code
            </button>
          </div>
          <Link
            to="/shop"
            onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "build_cart_from_voucher", source: "one_cart_landing" })}
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
          >
            Build your cart now
          </Link>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-[#f9fafb] py-16 md:py-20">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">Also on Amacific</h2>
            <p className="mt-3 text-slate-600">
              Pair One Cart, Full Life with challenges and hubs built for the same checkout.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              to="/campaigns/smartest-cart-challenge"
              onClick={() => trackEvent("smartest_cart_cta_click", { source: "one_cart_landing_cross" })}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:border-orange-200 hover:shadow-md md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600">Challenge</p>
              <h3 className="mt-2 font-titleFont text-xl font-bold text-[#111827]">Pakistan&apos;s Smartest Cart</h3>
              <p className="mt-2 text-sm text-slate-600">
                Build under PKR 3,000, post your haul, tag @amacific.pk — show how sharp you shop.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 group-hover:gap-3">
                Join the challenge <FaArrowRight className="text-xs" />
              </span>
            </Link>
            <Link
              to="/student-essentials"
              onClick={() => trackEvent("student_essentials_click", { source: "one_cart_landing_cross" })}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:border-orange-200 hover:shadow-md md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600">Hub</p>
              <h3 className="mt-2 font-titleFont text-xl font-bold text-[#111827]">Student essentials</h3>
              <p className="mt-2 text-sm text-slate-600">
                Curated picks for semester mode — stack with deals and your ONECART200 welcome discount.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 group-hover:gap-3">
                Explore the hub <FaArrowRight className="text-xs" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <h2 className="text-center font-titleFont text-2xl font-bold text-[#111827] md:text-3xl">Shop smart. Shop verified.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-700">
            {["Verified sellers", "Clear return guidance", "COD nationwide", "Secure checkout"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-sm font-medium md:text-base">
                <FaCheckCircle className="text-emerald-500" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <PaymentMethodIcons />
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">JazzCash · Easypaisa · Raast · Cards</p>
        </div>
      </section>

      <ReviewCarousel />

      <section className="border-t border-slate-200/80 bg-[#f9fafb] py-14 md:py-16">
        <div className="mx-auto max-w-container px-4 lg:px-8">
          <h2 className="font-titleFont text-2xl font-bold text-[#111827]">Questions, answered</h2>
          <dl className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <dt className="font-titleFont font-bold text-[#111827]">How do I use ONECART200?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                Add items to your cart, continue to checkout, and enter ONECART200 in the voucher or promo field before
                you pay. Discount applies to eligible first orders as shown in your order summary.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <dt className="font-titleFont font-bold text-[#111827]">What can I buy in one cart?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                Fashion, tech accessories, beauty, stationery, home, toys, and everyday essentials — if it is listed on
                Amacific, it belongs in the same checkout with everything else.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <dt className="font-titleFont font-bold text-[#111827]">Do you deliver across Pakistan?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                Yes. Major cities usually see the fastest routes; secondary cities may need an extra day or two. You will
                see delivery guidance before you confirm payment.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <dt className="font-titleFont font-bold text-[#111827]">Can I combine deals with ONECART200?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                Cart rules depend on the specific promotion. Your checkout screen is the source of truth — if a stack is
                allowed, you will see both discounts reflected before you pay.
              </dd>
            </div>
          </dl>
          <p className="mt-10 text-center text-sm text-slate-600">
            More trust &amp; policy detail on our{" "}
            <Link to="/faq" className="font-semibold text-orange-600 hover:text-orange-500">
              FAQ
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <ReelStoryboardSection title="Reel idea: Why am I using 5 apps?" cards={reelCards} />

      <section className="border-t border-slate-200/80 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-container px-4 text-center lg:px-8">
          <h2 className="font-titleFont text-2xl font-bold text-[#111827]">Stay on the list</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
            Launch drops, voucher reminders, and one-cart tips — no spam, unsubscribe anytime.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <MailchimpSignupForm tag="one_cart_full_life" audience="onecart" buttonLabel="Subscribe" />
          </div>
        </div>
      </section>
    </div>
  );
}
