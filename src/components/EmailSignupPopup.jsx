import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import MailchimpSignupForm from "./MailchimpSignupForm";

const STORAGE_KEY = "amacific_email_popup_dismissed";

export default function EmailSignupPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 4500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-navy-deep/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-email-title"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100"
          >
            <div className="bg-navy px-6 py-5 text-white relative">
              <button
                type="button"
                onClick={dismiss}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <p className="text-brandOrange font-bold text-sm uppercase tracking-wider mb-1">
                Launch offer
              </p>
              <h2 id="popup-email-title" className="text-2xl font-titleFont font-bold">
                Get PKR 200 Off Your First Amacific Order
              </h2>
              <p className="text-white/80 text-sm mt-2">
                Join Amacific and discover Pakistan’s newest one-stop shopping platform.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                <p className="text-sm text-gray-600">Use code at checkout</p>
                <p className="text-2xl font-bold text-navy tracking-widest mt-1">FOUND200</p>
              </div>
              <MailchimpSignupForm
                tag="welcome_discount"
                audience="FOUND200"
                compact
                buttonLabel="Claim My Discount"
              />
              <button
                type="button"
                onClick={dismiss}
                className="w-full text-sm text-gray-500 hover:text-gray-800"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
