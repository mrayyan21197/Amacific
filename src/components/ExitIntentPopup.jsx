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
      trackEvent("exit_intent_popup", {});
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
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              onClick={close}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <p className="text-brandOrange font-bold text-xs uppercase">Wait — student fave</p>
            <h3 className="text-xl font-titleFont font-bold text-navy mt-2">
              Flat PKR 100 off your cart
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Use code <strong>CART100</strong> before you go. Semester starting? We got you.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/cart"
                onClick={() => {
                  trackEvent("referral_link_click", { target: "/cart", source: "exit_intent" });
                  close();
                }}
                className="block text-center py-3 rounded-xl bg-navy text-white font-bold hover:bg-navy-deep"
              >
                Complete My Order
              </Link>
              <button
                type="button"
                onClick={close}
                className="text-sm text-gray-500"
              >
                Continue browsing
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
