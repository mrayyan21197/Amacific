import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import ProductGrid from "../../components/ProductGrid";
import PaymentMethodIcons from "../../components/PaymentMethodIcons";
import { CATALOG } from "../../constants/catalog";
import { FaCheckCircle } from "react-icons/fa";
import MailchimpSignupForm from "../../components/MailchimpSignupForm";
import { trackEvent } from "../../utils/analytics";

export default function FoundItWeek() {
  React.useEffect(() => {
    trackEvent("campaign_page_visit", { campaign: "found_it_week" });
  }, []);

  const featured = CATALOG.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Amacific Found It Week — Launch Deals Pakistan"
        description="PKR 200 off first order with FOUND200. Pakistan's youth-first marketplace — fashion, tech, beauty & essentials in one cart."
        keywords="online shopping Pakistan, Amacific launch, first order discount Pakistan"
        canonicalPath="/campaigns/found-it-week"
      />

      <section className="bg-gradient-to-br from-navy via-navy-deep to-gray-900 text-white py-16 md:py-24 px-4">
        <div className="max-w-container mx-auto text-center">
          <p className="text-brandOrange font-bold uppercase tracking-widest text-sm mb-4">Launch campaign</p>
          <h1 className="text-3xl md:text-5xl font-titleFont font-bold leading-tight max-w-4xl mx-auto">
            Stop Searching Everywhere. Amacific Has It in One Cart.
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            You want it, we have it — fashion, tech accessories, beauty, stationery & everyday essentials with verified sellers and COD across Karachi, Lahore, Islamabad & nationwide.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              onClick={() => trackEvent("referral_link_click", { campaign: "found_it_week", target: "/shop" })}
              className="inline-flex justify-center px-10 py-4 rounded-full bg-brandOrange hover:bg-brandOrange-dark font-bold font-titleFont"
            >
              Shop Your First Cart
            </Link>
            <Link
              to="/deals"
              className="inline-flex justify-center px-10 py-4 rounded-full border-2 border-white/40 hover:bg-white/10 font-bold"
            >
              Explore Deals
            </Link>
          </div>
          <div className="mt-10 inline-block bg-black/30 rounded-xl px-6 py-4 border border-white/10">
            <p className="text-sm text-white/70">First order voucher</p>
            <p className="text-2xl font-bold tracking-[0.2em] text-brandOrange">FOUND200</p>
            <p className="text-sm mt-1">PKR 200 off — apply at checkout</p>
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold font-titleFont text-navy mb-4">The problem</h2>
          <p className="text-gray-600 leading-relaxed">
            Pakistani shoppers bounce between multiple apps for gadgets, clothes, beauty, and stationery — different carts, different delivery timelines, and mixed trust signals.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-titleFont text-navy mb-4">The solution</h2>
          <p className="text-gray-600 leading-relaxed">
            Amacific brings curated marketplace sellers into <strong>one youth-first checkout</strong> with COD, JazzCash, Easypaisa, Raast & cards — built for students & young pros who live on Instagram & TikTok.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-container mx-auto">
          <h2 className="text-center text-2xl font-bold text-navy font-titleFont mb-10">Featured categories</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Fashion", "Tech", "Beauty", "Stationery", "Home", "Essentials"].map((c) => (
              <Link
                key={c}
                to={
                  c === "Fashion"
                    ? "/clothing"
                    : c === "Tech"
                      ? "/gadgets"
                      : c === "Home"
                        ? "/home-living"
                        : `/${c.toLowerCase()}`
                }
                className="px-5 py-2 rounded-full bg-white border border-gray-200 font-semibold text-navy hover:border-brandOrange"
              >
                {c}
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              "Verified sellers",
              "Easy 7-day returns",
              "COD doorstep",
              "Secure checkout",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2 text-gray-700 font-medium">
                <FaCheckCircle className="text-emerald-500" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <PaymentMethodIcons />
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 py-12">
        <ProductGrid products={featured} title="Grab before Found It Week ends" />
      </div>

      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-container mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold font-titleFont mb-4">Stay on the list</h2>
            <p className="text-white/75">
              Welcome flows + payday blast — synced with Mailchimp automation (welcome, abandoned cart, payday, reviews).
            </p>
          </div>
          <MailchimpSignupForm tag="found_it_week" audience="launch" buttonLabel="Remind me" />
        </div>
      </section>

      <section className="max-w-container mx-auto px-4 py-14">
        <h2 className="text-xl font-bold text-navy mb-6">FAQ</h2>
        <dl className="space-y-4 text-gray-700">
          <div>
            <dt className="font-bold">How do I use FOUND200?</dt>
            <dd>Add items to cart → Checkout → enter FOUND200 in the voucher box.</dd>
          </div>
          <div>
            <dt className="font-bold">Do you deliver outside major cities?</dt>
            <dd>Yes — timelines extend slightly; see estimates at checkout by city.</dd>
          </div>
          <div>
            <dt className="font-bold">Are sellers verified?</dt>
            <dd>Marketplace sellers pass onboarding checks; look for the verified badge on listings.</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
