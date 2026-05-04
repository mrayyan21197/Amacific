import React from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

const HERO_IMG =
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop";

export default function OneCartHero() {
  const copyCode = () => {
    navigator.clipboard?.writeText("ONECART200").catch(() => {});
    trackEvent("onecart_promo_code_copy", { code: "ONECART200" });
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-40" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-container flex-col gap-10 px-4 py-14 md:flex-row md:items-center md:py-20 lg:py-24">
        <div className="max-w-xl md:max-w-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
            One cart. Every need. You want it, we have it.
          </p>
          <h1 className="mt-4 font-titleFont text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Everything You Need in One Cart
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
            Shop fashion, tech, beauty, stationery, and daily essentials from Pakistan&apos;s new one-stop marketplace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/shop"
              data-analytics="hero_one_cart_cta"
              onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "build_first_cart" })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-orange-500 px-8 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-400"
            >
              Build Your First Cart
            </Link>
            <Link
              to="/deals"
              onClick={() => trackEvent("product_under_999_click", { source: "hero_secondary" })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-8 py-3.5 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore Deals Under PKR 999
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              Use code <span className="tracking-widest text-orange-200">ONECART200</span> for PKR 200 off your first order.
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="rounded-full border border-orange-400/80 bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-100 hover:bg-orange-500/30"
            >
              Copy code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
