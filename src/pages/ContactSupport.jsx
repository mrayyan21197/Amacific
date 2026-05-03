import React from "react";
import SeoHead from "../components/SeoHead";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const WA = "923001234567";

export default function ContactSupport() {
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent("Hi Amacific support — I need help.")}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead
        title="Contact & WhatsApp Support — Amacific"
        description="Reach Amacific via WhatsApp +92 300 1234567 or email support@amacific.pk — Karachi hours with nationwide coverage."
        keywords="Amacific customer care Pakistan, ecommerce WhatsApp support"
        canonicalPath="/contact"
      />

      <div className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-container mx-auto">
          <h1 className="text-3xl font-titleFont font-bold text-navy">Contact / WhatsApp Support</h1>
          <p className="text-gray-600 mt-3 max-w-2xl">
            Hit us on WhatsApp for order edits, delivery ETAs, or seller questions — we reply fastest during peak evenings when students scroll hauls.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { placement: "contact_page" })}
          className="rounded-2xl bg-[#25D366] text-white p-8 shadow-lg hover:opacity-95 transition-opacity"
        >
          <FaWhatsapp className="text-4xl mb-4" />
          <h2 className="text-2xl font-bold font-titleFont">WhatsApp</h2>
          <p className="mt-2 text-white/90">+92 300 1234567</p>
          <p className="mt-6 text-sm font-semibold underline">Open chat</p>
        </a>

        <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
          <FaEnvelope className="text-3xl text-navy mb-4" />
          <h2 className="text-2xl font-bold font-titleFont text-navy">Email</h2>
          <a href="mailto:support@amacific.pk" className="text-brandOrange font-semibold mt-2 inline-block">
            support@amacific.pk
          </a>
          <p className="text-gray-600 text-sm mt-4">
            For escalations attach order ID + CNIC last four digits as listed on checkout (PII-safe workflow).
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-navy text-white p-8">
          <h3 className="font-bold text-lg">Mailchimp journeys</h3>
          <p className="text-white/75 text-sm mt-2">
            Abandoned cart, payday promos, post-purchase reviews — capture consent at checkout email field & footer newsletter for compliant automation.
          </p>
        </div>
      </div>
    </div>
  );
}
