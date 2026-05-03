import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaShoppingCart, FaTimes } from "react-icons/fa";
import { addToCart } from "../redux/amacificSlice";
import { filterStudentEssentials, getStudentEssentialsPoolIds } from "../constants/catalog";
import { formatPkr } from "../utils/format";
import { trackEvent } from "../utils/analytics";

const BUDGET = 3000;

export default function StudentBundleBuilder() {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.amacificReducer.products);
  const poolIds = useMemo(() => new Set(getStudentEssentialsPoolIds()), []);

  const essentials = useMemo(() => {
    const list = filterStudentEssentials();
    return [...list].sort((a, b) => a.price - b.price);
  }, []);

  const [budgetModal, setBudgetModal] = useState({ open: false, message: "" });

  /** Challenge subtotal = only cart lines for products in this student pool */
  const challengeSubtotal = useMemo(() => {
    return cart.reduce((acc, line) => {
      if (!poolIds.has(line._id)) return acc;
      const unit = typeof line.price === "number" ? line.price : Number(line.price) || 0;
      return acc + unit * line.quantity;
    }, 0);
  }, [cart, poolIds]);

  const pct = Math.min(100, Math.round((challengeSubtotal / BUDGET) * 100));

  const qtyInCart = (productId) => {
    const line = cart.find((c) => c._id === productId);
    return line ? line.quantity : 0;
  };

  const tryAdd = (p) => {
    const unit = p.price;
    const next = challengeSubtotal + unit;
    if (next > BUDGET) {
      setBudgetModal({
        open: true,
        message: `Adding ${p.productName} would put your Campus Cart Challenge haul over PKR ${BUDGET.toLocaleString("en-PK")}. Remove something from your cart or pick a smaller item.`,
      });
      trackEvent("student_challenge_budget_block", { sku: p._id, challengeSubtotal, unit });
      return;
    }
    dispatch(
      addToCart({
        _id: p._id,
        name: p.productName,
        quantity: 1,
        image: p.img,
        badge: p.badge,
        price: unit,
        colors: p.color,
      })
    );
    trackEvent("add_to_cart", { source: "student_challenge_builder", item_id: p._id });
  };

  const closeModal = () => setBudgetModal({ open: false, message: "" });

  return (
    <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative">
        <h3 className="text-xl font-titleFont font-bold text-navy mb-2">Campus Cart Challenge — fill your cart</h3>
        <p className="text-gray-600 text-sm mb-4">
          Tap <strong>Add</strong> to drop essentials straight into your cart. Stay under PKR {BUDGET.toLocaleString("en-PK")}{" "}
          for the challenge — we only count these picks toward your campus budget meter.
        </p>

        <div className="rounded-xl border border-violet-200 bg-violet-50/80 px-4 py-3 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-sm font-bold text-violet-950">Challenge cart subtotal</span>
            <span className={`text-sm font-black ${challengeSubtotal > BUDGET ? "text-red-600" : "text-violet-800"}`}>
              {formatPkr(challengeSubtotal)} / {formatPkr(BUDGET)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white border border-violet-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${challengeSubtotal > BUDGET ? "bg-red-500" : "bg-violet-600"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-violet-900/70 mt-2">
            Other items you added elsewhere don’t affect this meter — only the products listed below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {essentials.map((p) => {
            const q = qtyInCart(p._id);
            return (
              <div
                key={p._id}
                className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3 hover:border-violet-200 transition-colors"
              >
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100">
                  <img src={p.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <p className="font-bold text-primeColor text-sm leading-snug line-clamp-2">{p.productName}</p>
                  <p className="text-violet-800 font-bold text-sm mt-1">{formatPkr(p.price)}</p>
                  {q > 0 && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      In cart: <strong>{q}</strong>
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => tryAdd(p)}
                    className="mt-auto pt-2 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors"
                  >
                    <FaPlus className="text-[10px]" /> Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-800 hover:text-violet-600"
          >
            <FaShoppingCart /> View full cart
          </Link>
          <Link
            to="/campaigns/campus-cart-challenge"
            className="text-sm font-semibold text-gray-600 hover:text-violet-700 underline underline-offset-2"
          >
            How the challenge works →
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {budgetModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="budget-modal-title"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-violet-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-violet-700 to-violet-900 text-white px-5 py-4 flex justify-between items-start gap-3">
                <div>
                  <p id="budget-modal-title" className="font-titleFont font-bold text-lg">
                    Over the PKR 3,000 challenge line
                  </p>
                  <p className="text-white/85 text-sm mt-1">Campus Cart Challenge budget</p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-white/15 shrink-0"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="px-5 py-5 space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">{budgetModal.message}</p>
                <div className="rounded-xl bg-violet-50 border border-violet-100 px-3 py-2 text-xs text-violet-900">
                  Current challenge items in cart: <strong>{formatPkr(challengeSubtotal)}</strong>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/cart"
                    onClick={closeModal}
                    className="flex-1 text-center py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700"
                  >
                    Adjust cart
                  </Link>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-800 hover:bg-gray-50"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
