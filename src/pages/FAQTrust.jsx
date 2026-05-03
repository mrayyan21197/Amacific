import React from "react";
import SeoHead from "../components/SeoHead";
import PaymentMethodIcons from "../components/PaymentMethodIcons";
import { FaShieldAlt, FaUndo, FaTruck, FaStar } from "react-icons/fa";

export default function FAQTrust() {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="FAQ & Trust — Verified Sellers, Returns & COD"
        description="Learn how Amacific verifies sellers, handles 7-day returns, COD, JazzCash, Easypaisa, Raast & secure checkout in Pakistan."
        keywords="trusted online shopping Pakistan, COD ecommerce Pakistan, easy returns Pakistan"
        canonicalPath="/faq"
      />

      <div className="bg-navy text-white py-12 px-4">
        <div className="max-w-container mx-auto">
          <h1 className="text-3xl md:text-4xl font-titleFont font-bold">Trust & FAQs</h1>
          <p className="mt-3 text-white/75 max-w-2xl">
            Transparency beats hype — here’s how we protect carts for Gen-Z shoppers across Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FaShieldAlt className="text-brandOrange" /> Seller verification
          </h2>
          <p className="text-gray-600">
            Marketplace partners complete KYC-style onboarding, catalog audits, and policy training before displaying the verified badge.
            Electronics & beauty hero SKUs include an “original product guarantee” tag when sourced via authorised distributors.
          </p>

          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FaUndo className="text-brandOrange" /> Returns
          </h2>
          <p className="text-gray-600">
            Change your mind? Initiate a return within <strong>7 days</strong> on eligible categories (unopened beauty & sealed electronics follow compliance rules printed on the PDP).
          </p>

          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FaTruck className="text-brandOrange" /> Delivery
          </h2>
          <p className="text-gray-600">
            Cities like Karachi, Lahore, Islamabad/Rawalpindi, Faisalabad, Multan & Hyderabad see faster hand-offs; secondary cities add a day or two.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FaStar className="text-brandOrange" /> Reviews & photos
          </h2>
          <p className="text-gray-600">
            Purchasers can upload photo reviews — fraud signals trigger manual moderation.
          </p>

          <h2 className="text-xl font-bold text-navy">Payments</h2>
          <PaymentMethodIcons />
          <p className="text-gray-600 text-sm">
            JazzCash, Easypaisa & Raast logos remind shoppers that prepaid checkout unlocks instant confirmations — ideal before payday shipping surges.
          </p>

          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 space-y-4">
            <h3 className="font-bold text-navy">Quick answers</h3>
            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800">Is COD available?</summary>
              <p className="text-gray-600 text-sm mt-2">Yes — pay at your doorstep in supported PIN codes.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800">How do vouchers stack?</summary>
              <p className="text-gray-600 text-sm mt-2">One promo per cart unless noted — FOUND200 targets first orders only.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800">How do I avoid fakes?</summary>
              <p className="text-gray-600 text-sm mt-2">Shop verified sellers, read photo reviews, and prefer sealed SKUs with guarantee badges.</p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
