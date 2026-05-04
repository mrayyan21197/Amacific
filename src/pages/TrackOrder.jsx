import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";

export default function TrackOrder() {
  return (
    <div className="mx-auto max-w-container px-4 py-16">
      <SeoHead title="Track Order | Amacific" description="Track your Amacific order or contact support." canonicalPath="/track-order" />
      <h1 className="font-titleFont text-3xl font-bold text-navy">Track your order</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Order tracking links are sent by SMS and email when your package ships. If you need help, reach out with your order ID.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/contact"
          className="inline-flex justify-center rounded-full bg-navy px-8 py-3 font-bold text-white hover:bg-navy-deep"
        >
          Contact support
        </Link>
        <a
          href="https://wa.me/923001234567?text=Hi%20Amacific%20%E2%80%94%20I%20need%20help%20tracking%20my%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center rounded-full border-2 border-navy px-8 py-3 font-bold text-navy hover:bg-violet-50"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
