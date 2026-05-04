import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const KEY = "amacific_challenge_peek_dismissed";

export default function ChallengePeekPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      trackEvent("challenge_peek_popup_shown", {});
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
    trackEvent("challenge_peek_popup_dismiss", {});
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          className="fixed right-4 top-24 z-[97] max-w-[280px] rounded-2xl border border-violet-200 bg-white p-4 shadow-xl sm:top-28"
          role="dialog"
          aria-label="Cart challenge"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-2 top-2 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
            aria-label="Dismiss"
          >
            <FaTimes className="text-sm" />
          </button>
          <p className="pr-8 text-xs font-bold uppercase tracking-wide text-violet-700">UGC challenge</p>
          <p className="mt-1 font-titleFont text-sm font-bold text-slate-900">Smartest cart under PKR 3,000?</p>
          <p className="mt-1 text-xs text-slate-600">Post your cart · tag us · #SmartestCartPakistan</p>
          <Link
            to="/campaigns/smartest-cart-challenge"
            onClick={() => {
              trackEvent("smartest_cart_cta_click", { source: "challenge_peek_popup" });
              dismiss();
            }}
            className="mt-3 block rounded-full bg-orange-500 py-2 text-center text-xs font-bold text-white hover:bg-orange-400"
          >
            Join the challenge
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
