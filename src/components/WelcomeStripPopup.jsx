import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const KEY = "amacific_welcome_strip_dismissed";

export default function WelcomeStripPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      trackEvent("welcome_strip_popup_shown", {});
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
    trackEvent("welcome_strip_popup_dismiss", {});
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="fixed bottom-0 left-0 right-0 z-[88] border-t border-slate-200 bg-white p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:bottom-6 md:left-auto md:right-6 md:max-w-md md:rounded-2xl md:border md:px-5 md:py-4"
          role="dialog"
          aria-label="Welcome offer"
        >
          <div className="mx-auto flex max-w-container items-start gap-3 md:mx-0">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-orange-600">First order on Amacific</p>
              <p className="mt-1 font-titleFont text-base font-bold text-slate-900">PKR 200 off with ONECART200</p>
              <p className="mt-1 text-xs text-slate-600">Fashion, tech, beauty &amp; more — one checkout.</p>
              <Link
                to="/shop"
                onClick={() => {
                  trackEvent("welcome_strip_shop_click", {});
                  dismiss();
                }}
                className="mt-3 inline-flex rounded-full bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-deep"
              >
                Start shopping
              </Link>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Dismiss"
            >
              <FaTimes />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
