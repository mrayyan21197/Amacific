import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeCampaignCarousel from "../../components/HomeCampaignCarousel";
import ValuePropsCarousel from "../../components/ValuePropsCarousel";
import ProductRowCarousel from "../../components/ProductRowCarousel";
import PromoBannerCarousel from "../../components/PromoBannerCarousel";
import CategoryIconsHome from "../../components/CategoryIconsHome";
import WhyShopAmacific from "../../components/WhyShopAmacific";
import ReviewCarousel from "../../components/ReviewCarousel";
import ProductGrid from "../../components/ProductGrid";
import FeatureSection from "../../components/FeatureSection";
import SeoHead from "../../components/SeoHead";
import {
  filterUnder999,
  CATALOG,
  filterCategory,
} from "../../constants/catalog";
import { FaShieldAlt } from "react-icons/fa";
import { trackEvent } from "../../utils/analytics";

const OFFICE_PICK_IDS = ["ap-106", "ap-102", "ap-111", "ap-114"];

const HOME_PROMO_SLIDES = [
  {
    id: "deals-999",
    title: "Deals under PKR 999",
    subtitle: "Budget picks you can add to the same cart as fashion and tech.",
    cta: "Shop deals",
    to: "/deals",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200&auto=format&fit=crop",
    event: { name: "product_under_999_click", params: { source: "home_promo_carousel" } },
  },
  {
    id: "one-cart",
    title: "One Cart, Full Life",
    subtitle: "Stop switching apps — fashion, beauty, stationery & essentials in one checkout.",
    cta: "Learn more",
    to: "/campaigns/one-cart-full-life",
    event: { name: "hero_one_cart_cta_click", params: { cta: "promo_carousel", source: "home_promo" } },
  },
  {
    id: "challenge",
    title: "Pakistan\u2019s Smartest Cart Challenge",
    subtitle: "Build under PKR 3,000, post on Reels or TikTok, tag Amacific.",
    cta: "Join challenge",
    to: "/campaigns/smartest-cart-challenge",
    event: { name: "smartest_cart_cta_click", params: { source: "home_promo_carousel" } },
  },
];

const Home = () => {
  const location = useLocation();
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if (location.state?.orderThanks) {
      setShowThanks(true);
      const t = setTimeout(() => setShowThanks(false), 6000);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  const under999 = filterUnder999();
  const studentPickIds = ["ap-103", "ap-108", "ap-107", "ap-106"];
  const studentPicks = studentPickIds
    .map((id) => CATALOG.find((p) => p._id === id))
    .filter(Boolean);
  const officePicks = OFFICE_PICK_IDS.map((id) => CATALOG.find((p) => p._id === id)).filter(Boolean);
  const trending = [...CATALOG].sort(() => 0.5 - Math.random()).slice(0, 8);
  const beautyPicks = filterCategory("beauty").slice(0, 4);
  const techPicks = filterCategory("tech").slice(0, 4);
  const spotlightProducts = CATALOG.slice(0, 8);

  return (
    <div className="w-full mx-auto bg-white">
      <SeoHead
        title={"Amacific | Pakistan's One-Stop Online Store"}
        description={"Shop fashion, tech, beauty, stationery, home items, and daily essentials in one cart. Amacific is Pakistan's youth-first online marketplace."}
        keywords="online shopping Pakistan, one cart marketplace, student essentials Pakistan, deals under PKR 999"
        canonicalPath="/"
      />

      <HomeCampaignCarousel />

      <ValuePropsCarousel />

      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-container mx-auto px-4 py-8 md:py-10 text-center">
          <div className="inline-flex items-center gap-2 text-navy font-bold text-sm uppercase tracking-wider mb-2">
            <FaShieldAlt className="text-orange-500" /> Shop Smart. Shop Verified.
          </div>
          <h2 className="text-2xl md:text-3xl font-titleFont font-bold text-slate-900">
            One Cart for Every Need
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            Whether you are preparing for university, upgrading your routine, buying gifts, or shopping for everyday
            essentials, Amacific helps you complete everything in one cart.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-800">
            Use code <span className="tracking-widest text-navy">ONECART200</span> for PKR 200 off your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              to="/campaigns/one-cart-full-life"
              onClick={() => trackEvent("hero_one_cart_cta_click", { cta: "learn_campaign", source: "trust_strip" })}
              className="inline-flex justify-center px-8 py-3 rounded-full bg-navy text-white font-bold hover:bg-navy-deep shadow-md"
            >
              One Cart, Full Life
            </Link>
            <Link
              to="/deals"
              onClick={() => trackEvent("product_under_999_click", { source: "trust_strip_deals" })}
              className="inline-flex justify-center px-8 py-3 rounded-full border-2 border-navy text-navy font-bold hover:bg-slate-50"
            >
              Explore Deals Under PKR 999
            </Link>
          </div>
        </div>
      </section>

      {showThanks && (
        <div className="bg-emerald-600 text-white text-center py-3 px-4 text-sm font-semibold">
          Order placed — thank you! We&apos;ll email you updates when your parcel ships.
        </div>
      )}

      <section className="max-w-container mx-auto px-4 pt-12 pb-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold font-titleFont text-slate-900 mb-2">Shop by category</h2>
        <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto mb-8">
          Build one cart across every aisle — fashion, tech, beauty, stationery, home, and essentials.
        </p>
        <CategoryIconsHome hideHeading />
      </section>

      <ProductRowCarousel
        products={spotlightProducts}
        title="Spotlight picks"
        subtitle="Swipe through bestsellers — add anything to your cart in one go."
        analyticsList="product_click"
      />

      <div className="max-w-container mx-auto px-4 py-10 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-titleFont text-navy">Student Essentials</h2>
            <p className="text-gray-600 mt-2">Semester-ready picks for your smartest cart.</p>
          </div>
          <Link
            to="/student-essentials"
            onClick={() => trackEvent("student_essentials_click", { source: "home_block_header" })}
            className="inline-flex px-6 py-3 rounded-full bg-navy text-white font-bold hover:bg-navy-deep shadow-md"
          >
            Shop Student Essentials
          </Link>
        </div>
        <ProductGrid products={studentPicks} title="" analyticsList="student_essentials_click" />
      </div>

      <div className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-titleFont text-navy">Office Routine</h2>
              <p className="text-gray-600 mt-2">Desk, cables, and gear for work-from-dorm days.</p>
            </div>
            <Link to="/stationery" className="text-navy font-bold hover:underline">
              Stationery hub →
            </Link>
          </div>
          <ProductGrid products={officePicks} title="" />
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-titleFont text-navy">Trending Under PKR 999</h2>
            <p className="text-gray-600 mt-2">Budget wins that still feel premium.</p>
          </div>
          <Link
            to="/deals"
            onClick={() => trackEvent("product_under_999_click", { source: "home_section_link" })}
            className="text-navy font-bold hover:underline"
          >
            All deals →
          </Link>
        </div>
        <ProductGrid products={under999} title="" analyticsList="product_under_999_click" />
      </div>

      <div className="bg-violet-50/50 py-12 border-y border-violet-100">
        <div className="max-w-container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-titleFont text-navy">Beauty &amp; Self-Care</h2>
              <p className="text-gray-600 mt-2">Glow-up essentials in the same cart as your tech.</p>
            </div>
            <Link to="/beauty" className="text-navy font-bold hover:underline">
              Shop beauty →
            </Link>
          </div>
          <ProductGrid products={beautyPicks} title="" />
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-titleFont text-navy">Tech Accessories</h2>
            <p className="text-gray-600 mt-2">Cables, audio, and desk tech — one checkout.</p>
          </div>
          <Link to="/gadgets" className="text-navy font-bold hover:underline">
            Shop tech →
          </Link>
        </div>
        <ProductGrid products={techPicks} title="" />
      </div>

      <div className="max-w-container mx-auto px-4 py-14 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-titleFont text-navy">Trending in Pakistan</h2>
            <p className="text-gray-600 mt-2">What shoppers are adding to one cart tonight.</p>
          </div>
          <Link
            to="/campaigns/smartest-cart-challenge"
            onClick={() => trackEvent("smartest_cart_cta_click", { source: "home_trending" })}
            className="font-bold text-navy hover:text-orange-600"
          >
            Join Smartest Cart Challenge →
          </Link>
        </div>
        <ProductGrid products={trending} title="" />
      </div>

      <WhyShopAmacific />

      <PromoBannerCarousel slides={HOME_PROMO_SLIDES} className="bg-slate-50 border-y border-slate-100" />

      <ReviewCarousel />

      <div className="max-w-container mx-auto px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between shadow-sm">
          <div>
            <h3 className="text-2xl font-titleFont font-bold text-slate-900">Pakistan&apos;s Smartest Cart Challenge</h3>
            <p className="text-slate-600 mt-2 max-w-xl">
              Build under PKR 3,000, post on TikTok or Instagram, tag @amacific.pk, use #SmartestCartPakistan.
            </p>
          </div>
          <Link
            to="/campaigns/smartest-cart-challenge"
            onClick={() => trackEvent("smartest_cart_cta_click", { source: "home_footer_cta" })}
            className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-400 whitespace-nowrap shadow-md"
          >
            Join the Challenge
          </Link>
        </div>
      </div>

      <FeatureSection />
    </div>
  );
};

export default Home;
