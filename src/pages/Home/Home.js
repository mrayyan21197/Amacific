import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeMarketingCarousel from "../../components/HomeMarketingCarousel";
import CategoryIconsHome from "../../components/CategoryIconsHome";
import WhyShopAmacific from "../../components/WhyShopAmacific";
import ReviewCarousel from "../../components/ReviewCarousel";
import ProductGrid from "../../components/ProductGrid";
import UGCVideoStrip from "../../components/UGCVideoStrip";
import FeatureSection from "../../components/FeatureSection";
import SeoHead from "../../components/SeoHead";
import {
  filterUnder999,
  CATALOG,
} from "../../constants/catalog";
import { FaShieldAlt } from "react-icons/fa";

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
  const trending = [...CATALOG].sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <div className="w-full mx-auto bg-white">
      <SeoHead
        title="Online Shopping Pakistan — One Cart, Every Need"
        description="Best online store Pakistan for Gen-Z: fashion, tech, beauty, stationery & student essentials. Karachi · Lahore · Islamabad · COD & wallets."
        keywords="online shopping Pakistan, best online store Pakistan, online shopping Karachi, online shopping Lahore, online shopping Islamabad, deals under PKR 999 Pakistan"
        canonicalPath="/"
      />

      <HomeMarketingCarousel />

      <section className="border-b border-violet-100 bg-white">
        <div className="max-w-container mx-auto px-4 py-8 md:py-10 text-center">
          <div className="inline-flex items-center gap-2 text-violet-700 font-bold text-sm uppercase tracking-wider mb-2">
            <FaShieldAlt className="text-violet-600" /> Shop Smart. Shop Verified.
          </div>
          <h2 className="text-2xl md:text-3xl font-titleFont font-bold text-navy">
            Pakistan’s New One-Stop Online Store
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            Fashion, tech, beauty, stationery & essentials — one youth-first cart with COD, JazzCash, Easypaisa & Raast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              to="/shop"
              className="inline-flex justify-center px-8 py-3 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 shadow-md shadow-violet-900/10"
            >
              Start Shopping
            </Link>
            <Link
              to="/deals"
              className="inline-flex justify-center px-8 py-3 rounded-full border-2 border-violet-600 text-violet-800 font-bold hover:bg-violet-50"
            >
              Explore Deals Under PKR 999
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold text-violet-900 bg-violet-50 inline-block px-4 py-2 rounded-full border border-violet-100">
            Launch offer · PKR 200 off first order · Code{" "}
            <span className="tracking-widest text-violet-700">FOUND200</span>
          </p>
        </div>
      </section>

      {showThanks && (
        <div className="bg-emerald-600 text-white text-center py-3 px-4 text-sm font-semibold">
          Order placed — thank you! Watch your inbox for Mailchimp review & re-engagement flows.
        </div>
      )}

      <div className="bg-gradient-to-r from-violet-50 to-white border-y border-violet-100">
        <div className="max-w-container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-bold text-navy">
            Payday lane:{" "}
            <span className="italic text-violet-700">Salary aayi? Deals bhi aa gayi.</span>
          </p>
          <Link
            to="/deals"
            className="inline-flex justify-center px-6 py-2 rounded-full bg-violet-700 text-white text-sm font-bold hover:bg-violet-800"
          >
            Explore Deals
          </Link>
        </div>
      </div>

      <CategoryIconsHome />

      <div className="max-w-container mx-auto px-4 py-10 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold font-titleFont text-navy">Things You’ll Love Under PKR 999</h2>
            <p className="text-gray-600 mt-2">Budget finds that still slap on the ’Gram.</p>
          </div>
          <Link to="/deals" className="text-violet-700 font-bold hover:underline">
            Deals hub →
          </Link>
        </div>
        <ProductGrid products={under999} title="" />
      </div>

      <div className="bg-violet-50/70 py-14 border-y border-violet-100">
        <div className="max-w-container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold font-titleFont text-navy">Student Essentials</h2>
              <p className="text-gray-600 mt-2">Semester starting? We got you.</p>
            </div>
            <Link
              to="/student-essentials"
              className="inline-flex px-6 py-3 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 shadow-md"
            >
              Shop Student Essentials
            </Link>
          </div>
          <ProductGrid products={studentPicks} title="" />
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold font-titleFont text-navy">Trending in Pakistan</h2>
            <p className="text-gray-600 mt-2">What urban youth are adding tonight.</p>
          </div>
          <Link to="/campaigns/campus-cart-challenge" className="font-bold text-violet-800 hover:text-violet-600">
            Join Campus Cart Challenge →
          </Link>
        </div>
        <ProductGrid products={trending} title="" />
      </div>

      <WhyShopAmacific />

      <ReviewCarousel />

      <UGCVideoStrip />

      <div className="max-w-container mx-auto px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-violet-800 to-violet-950 text-white p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-center justify-between border border-violet-700">
          <div>
            <h3 className="text-2xl font-titleFont font-bold">Amacific Found It Week</h3>
            <p className="text-white/80 mt-2 max-w-xl">
              Stop juggling apps — launch vouchers, trust badges, and checkout tuned for Gen-Z carts.
            </p>
          </div>
          <Link
            to="/campaigns/found-it-week"
            className="px-8 py-4 rounded-full bg-white text-violet-900 font-bold hover:bg-violet-50 whitespace-nowrap shadow-lg"
          >
            Shop launch hub
          </Link>
        </div>
      </div>

      <FeatureSection />
    </div>
  );
};

export default Home;
