import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import ProductGrid from "../components/ProductGrid";
import ProductRowCarousel from "../components/ProductRowCarousel";
import PromoBannerCarousel from "../components/PromoBannerCarousel";
import DealsCountdown from "../components/DealsCountdown";
import MailchimpSignupForm from "../components/MailchimpSignupForm";
import { filterDeals, filterUnder999, CATALOG } from "../constants/catalog";
import { trackEvent } from "../utils/analytics";

const DEALS_PROMO_SLIDES = [
  {
    id: "markdown",
    title: "Marked-down SKUs",
    subtitle: "Compare-at prices dropped — same COD & wallets at checkout.",
    cta: "Scroll to deals",
    to: "#deals-grid",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    event: { name: "product_under_999_click", params: { source: "deals_promo_carousel" } },
  },
  {
    id: "onecart",
    title: "Stack with ONECART200",
    subtitle: "First order PKR 200 off when your cart qualifies — build one haul.",
    cta: "Campaign details",
    to: "/campaigns/one-cart-full-life",
    event: { name: "hero_one_cart_cta_click", params: { cta: "deals_promo", source: "deals_page" } },
  },
  {
    id: "challenge",
    title: "Film your cart challenge",
    subtitle: "Under PKR 3,000 builds — tag Amacific · #SmartestCartPakistan.",
    cta: "Challenge hub",
    to: "/campaigns/smartest-cart-challenge",
    event: { name: "smartest_cart_cta_click", params: { source: "deals_promo_carousel" } },
  },
];

export default function Deals() {
  const deals = filterDeals();
  const under999 = filterUnder999();
  const dealCarouselProducts = [...CATALOG].filter((p) => p.compareAt && p.compareAt > p.price).slice(0, 8);

  return (
    <div className="min-h-screen">
      <SeoHead
        title="Deals Under PKR 999 | Amacific Pakistan"
        description="Marked-down fashion, tech, beauty, and essentials — add them to one Amacific cart with COD and wallets."
        keywords="deals under PKR 999 Pakistan, online sale Karachi Lahore, Amacific deals"
        canonicalPath="/deals"
      />
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-orange-300 font-bold text-sm uppercase">One Cart, Full Life</p>
            <h1 className="text-3xl md:text-4xl font-titleFont font-bold mt-2">Deals under PKR 999</h1>
            <p className="text-white/80 mt-2 max-w-xl">
              Stack markdown SKUs with the rest of your cart — same checkout for fashion, tech, beauty, and dorm essentials.
            </p>
            <Link
              to="/campaigns/one-cart-full-life"
              onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "campaign_from_deals", source: "deals_hero" })}
              className="inline-block mt-6 rounded-full bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-400"
            >
              Learn One Cart, Full Life →
            </Link>
          </div>
          <DealsCountdown label="This week's spotlight ends in" />
        </div>
      </div>
      <PromoBannerCarousel slides={DEALS_PROMO_SLIDES} className="bg-white" />
      <ProductRowCarousel
        products={dealCarouselProducts.length ? dealCarouselProducts : under999.slice(0, 8)}
        title="Deal carousel"
        subtitle="Swipe marked-down picks — tap a card to view the product."
        analyticsList="product_under_999_click"
      />
      <div id="deals-grid" className="max-w-container mx-auto px-4 py-12 space-y-12">
        <ProductGrid products={deals} title="Marked-down picks" />
        <div>
          <h2 className="text-xl font-bold text-navy font-titleFont mb-6 text-center">Under PKR 999 right now</h2>
          <ProductGrid products={under999} title="" analyticsList="product_under_999_click" />
        </div>
        <div className="rounded-2xl border border-orange-100 bg-orange-50/80 p-6 md:flex md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-bold text-navy text-lg">Get deal drops in your inbox</h2>
            <p className="text-gray-600 text-sm mt-1">We&apos;ll only email useful picks — unsubscribe anytime.</p>
          </div>
          <MailchimpSignupForm tag="deals_alerts" audience="deals" buttonLabel="Alert me" className="min-w-[280px]" />
        </div>
      </div>
    </div>
  );
}
