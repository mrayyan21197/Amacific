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
      className="fixed bottom-20 right-4 z-[90] md:bottom-8 md:right-8 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      aria-label="WhatsApp support"
      onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
