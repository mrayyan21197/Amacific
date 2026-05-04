import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const DEFAULT_WA = "923001234567"; // placeholder per brand kit — replace in production

export default function WhatsAppFloat({ number = DEFAULT_WA, message = "Hi Amacific — I need help with my order." }) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-24 md:bottom-10 md:right-8"
      aria-label="WhatsApp support"
      onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
