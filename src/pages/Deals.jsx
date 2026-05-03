import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import ProductGrid from "../components/ProductGrid";
import DealsCountdown from "../components/DealsCountdown";
import MailchimpSignupForm from "../components/MailchimpSignupForm";
import { filterDeals } from "../constants/catalog";

export default function Deals() {
  const deals = filterDeals();

  return (
    <div className="min-h-screen">
      <SeoHead
        title="Payday Deals & Offers — Deals Under PKR 999 Pakistan"
        description="Salary aayi? Deals bhi aa gayi. Payday savings on tech, fashion & dorm essentials. Extra prepaid perks with PAYDAY code."
        keywords="deals under PKR 999 Pakistan, payday deals Pakistan, online sale Karachi Lahore"
        canonicalPath="/deals"
      />
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-brandOrange font-bold text-sm uppercase">Payday lane</p>
            <h1 className="text-3xl md:text-4xl font-titleFont font-bold mt-2">
              Salary aayi? Deals bhi aa gayi.
            </h1>
            <p className="text-white/75 mt-2 max-w-xl">
              Stack carts with markdown SKUs + spotlight vouchers. Use PAYDAY for an extra 10% off prepaid orders (caps apply).
            </p>
            <Link
              to="/campaigns/found-it-week"
              className="inline-block mt-6 text-brandOrange font-bold underline"
            >
              New here? Grab FOUND200 first →
            </Link>
          </div>
          <DealsCountdown />
        </div>
      </div>
      <div className="max-w-container mx-auto px-4 py-12 space-y-10">
        <ProductGrid products={deals} title="Marked-down picks" />
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-6 md:flex md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-bold text-navy text-lg">Payday email drops</h2>
            <p className="text-gray-600 text-sm mt-1">Automation-ready segment — synced via Mailchimp.</p>
          </div>
          <MailchimpSignupForm tag="payday_deals" audience="payday" buttonLabel="Alert me" className="min-w-[280px]" />
        </div>
      </div>
    </div>
  );
}
