import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import ProductGrid from "../../components/ProductGrid";
import PaymentMethodIcons from "../../components/PaymentMethodIcons";
import ReelStoryboardSection from "../../components/ReelStoryboardSection";
import MailchimpSignupForm from "../../components/MailchimpSignupForm";
import ReviewCarousel from "../../components/ReviewCarousel";
import { CATALOG } from "../../constants/catalog";
import { FaCheckCircle } from "react-icons/fa";
import { trackEvent } from "../../utils/analytics";

const lifestyleCarts = [
  "Semester Survival Cart",
  "Office Upgrade Cart",
  "Creator Setup Cart",
  "Last-Minute Gift Cart",
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

  const featured = CATALOG.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="One Cart, Full Life | Amacific Pakistan"
        description="Stop switching between apps. Build one Amacific cart for fashion, tech, beauty, stationery, and daily essentials."
        keywords="Amacific Pakistan, one cart shopping, online marketplace Pakistan"
        canonicalPath="/campaigns/one-cart-full-life"
      />

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-container px-4 py-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">One Cart, Full Life</p>
          <h1 className="mt-4 max-w-3xl font-titleFont text-3xl font-extrabold leading-tight md:text-5xl">
            Stop switching between apps. Shop fashion, tech, beauty, stationery, and daily essentials from one trusted
            marketplace.
          </h1>
          <Link
            to="/shop"
            onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "build_first_cart", source: "one_cart_landing" })}
            className="mt-10 inline-flex rounded-full bg-orange-500 px-10 py-4 font-bold text-white shadow-lg hover:bg-orange-400"
          >
            Build Your First Cart
          </Link>
          <p className="mt-6 text-sm text-slate-300">
            First order: <span className="font-bold tracking-widest text-orange-200">ONECART200</span> · PKR 200 off
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-16 md:grid md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-titleFont text-2xl font-bold text-navy">The problem</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Pakistani shoppers often use multiple apps and sellers for different needs — fashion in one place, tech in
            another, and stationery somewhere else. That means split deliveries, mixed trust, and wasted time.
          </p>
        </div>
        <div>
          <h2 className="font-titleFont text-2xl font-bold text-navy">The solution</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Amacific brings everything into one simple cart with verified sellers, COD, and digital wallets built for how
            young Pakistan actually shops.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-container px-4">
          <h2 className="text-center font-titleFont text-2xl font-bold text-navy md:text-3xl">Lifestyle carts</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Inspiration for your first Amacific haul — mix categories in a single checkout.
          </p>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {lifestyleCarts.map((t) => (
              <li
                key={t}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow-sm"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-container px-4 py-14">
        <ProductGrid products={featured} title="Featured picks" />
      </div>

      <section className="bg-navy py-14 text-white">
        <div className="mx-auto max-w-container px-4 text-center">
          <h2 className="font-titleFont text-2xl font-bold">First-order voucher</h2>
          <p className="mt-3 text-white/80">Use at checkout on your first Amacific order.</p>
          <p className="mt-6 inline-block rounded-2xl border border-white/20 bg-black/20 px-8 py-4 font-mono text-2xl font-bold tracking-[0.2em] text-orange-200">
            ONECART200
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "build_cart_from_voucher", source: "one_cart_landing" })}
              className="inline-flex rounded-full bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-400"
            >
              Build your cart
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-14">
        <h2 className="text-center font-titleFont text-2xl font-bold text-navy">Shop smart. Shop verified.</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-700">
          {["Verified sellers", "Easy returns", "COD available", "Secure checkout"].map((t) => (
            <span key={t} className="flex items-center gap-2 font-medium">
              <FaCheckCircle className="text-emerald-500" /> {t}
            </span>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <PaymentMethodIcons />
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">JazzCash · Easypaisa · Raast · Cards</p>
      </section>

      <ReviewCarousel />

      <section className="border-t border-slate-100 bg-white py-14">
        <div className="mx-auto max-w-container px-4">
          <h2 className="font-titleFont text-xl font-bold text-navy">FAQ</h2>
          <dl className="mt-8 space-y-6 text-slate-700">
            <div>
              <dt className="font-bold text-navy">How do I use ONECART200?</dt>
              <dd className="mt-1 text-sm">Add items to cart → Checkout → enter ONECART200 in the voucher box.</dd>
            </div>
            <div>
              <dt className="font-bold text-navy">What can I buy in one cart?</dt>
              <dd className="mt-1 text-sm">Fashion, tech accessories, beauty, stationery, home, and everyday essentials.</dd>
            </div>
            <div>
              <dt className="font-bold text-navy">Do you deliver across Pakistan?</dt>
              <dd className="mt-1 text-sm">Yes — timelines vary by city; see estimates at checkout.</dd>
            </div>
          </dl>
        </div>
      </section>

      <ReelStoryboardSection
        title="Reel idea: Why am I using 5 apps?"
        cards={reelCards}
      />

      <section className="border-t border-slate-100 py-14">
        <div className="mx-auto max-w-container px-4 text-center">
          <h2 className="font-titleFont text-xl font-bold text-navy">Stay on the list</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">Launch updates and one-cart tips — no spam.</p>
          <div className="mx-auto mt-6 max-w-md">
            <MailchimpSignupForm tag="one_cart_full_life" audience="onecart" buttonLabel="Subscribe" />
          </div>
        </div>
      </section>
    </div>
  );
}
