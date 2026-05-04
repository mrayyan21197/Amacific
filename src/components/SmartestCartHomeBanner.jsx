import React from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

export default function SmartestCartHomeBanner() {
  return (
    <section className="border-y border-violet-200 bg-gradient-to-r from-violet-50 to-orange-50/60">
      <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-800">Pakistan&apos;s Smartest Cart Challenge</p>
          <h2 className="mt-2 font-titleFont text-2xl font-bold text-slate-900 md:text-3xl">
            Build the Smartest Cart Under PKR 3,000
          </h2>
          <p className="mt-2 text-slate-600 md:text-lg">
            Create your Amacific cart, post it on TikTok or Instagram, tag us, and win shopping vouchers.{" "}
            <span className="font-semibold text-violet-800">#SmartestCartPakistan</span>
          </p>
        </div>
        <Link
          to="/campaigns/smartest-cart-challenge"
          data-analytics="smartest_cart_banner_cta"
          onClick={() => trackEvent("smartest_cart_cta_click", { source: "home_banner" })}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-navy-deep"
        >
          Join the Challenge
        </Link>
      </div>
    </section>
  );
}
