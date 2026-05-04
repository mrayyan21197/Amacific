import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const KEY = "amacific_exit_intent_shown";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;

    const onLeave = (e) => {
      if (e.clientY > 0) return;
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
      setShow(true);
      trackEvent("exit_intent_popup", { variant: "onecart" });
    };

    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => document.documentElement.removeEventListener("mouseleave", onLeave);
  }, []);

  const close = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-800"
              onClick={close}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600">Before you go</p>
            <h3 className="mt-2 font-titleFont text-xl font-bold text-slate-900">Take PKR 200 off your first order</h3>
            <p className="mt-2 text-sm text-slate-600">
              Use code <strong className="tracking-widest text-navy">ONECART200</strong> at checkout — one cart for fashion, tech, beauty &amp; more.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/shop"
                onClick={() => {
                  trackEvent("exit_intent_shop_click", {});
                  close();
                }}
                className="block rounded-xl bg-navy py-3 text-center text-sm font-bold text-white hover:bg-navy-deep"
              >
                Continue to shop
              </Link>
              <Link
                to="/campaigns/one-cart-full-life"
                onClick={() => {
                  trackEvent("hero_one_cart_cta_click", { cta: "exit_intent_campaign", source: "exit_intent" });
                  close();
                }}
                className="block rounded-xl border-2 border-slate-200 py-3 text-center text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Read One Cart, Full Life
              </Link>
              <button type="button" onClick={close} className="text-sm text-slate-500 hover:text-slate-800">
                Continue browsing
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
