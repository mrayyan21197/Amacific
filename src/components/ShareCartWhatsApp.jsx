import React from "react";
import { useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa";
import { formatPkr } from "../utils/format";
import { trackEvent } from "../utils/analytics";

export default function ShareCartWhatsApp() {
  const products = useSelector((s) => s.amacificReducer.products);

  if (!products.length) return null;

  const lines = products.map(
    (p) => `• ${p.name} x${p.quantity} — ${formatPkr(p.price * p.quantity)}`
  );
  const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const text = `My Amacific cart 🛒\n${lines.join("\n")}\nTotal: ${formatPkr(total)}\nShop: ${window.location.origin}/cart`;

  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("share_cart_whatsapp", { items: products.length })}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-bold hover:opacity-95"
    >
      <FaWhatsapp className="text-lg" />
      Share your cart on WhatsApp
    </a>
  );
}
