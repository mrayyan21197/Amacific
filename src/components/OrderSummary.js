import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPkr } from "../utils/format";

const OrderSummary = ({ totalAmt, shippingCharge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-28"
    >
      <h2 className="text-2xl font-bold font-titleFont text-navy mb-6">Order Summary</h2>

      <div className="flex flex-col gap-4 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-primeColor">{formatPkr(totalAmt)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Shipping</span>
          <span className="font-bold text-primeColor">{formatPkr(shippingCharge)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center py-6 text-xl font-bold text-primeColor">
        <span>Total</span>
        <span className="text-brandOrange">{formatPkr(totalAmt + shippingCharge)}</span>
      </div>

      <p className="text-xs text-gray-500 mb-4 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
        Got distracted? We’ll email your cart if you drop your email at checkout — Mailchimp abandoned cart automation.
      </p>

      <div className="flex flex-col gap-3">
        <Link to="/checkout">
          <button
            type="button"
            className="w-full h-12 bg-brandOrange text-white rounded-lg font-bold text-lg hover:bg-brandOrange-dark hover:shadow-lg transition-all duration-300"
          >
            Proceed to Checkout
          </button>
        </Link>
        <Link to="/shop">
          <button
            type="button"
            className="w-full h-12 bg-white text-gray-600 border border-gray-200 rounded-lg font-bold text-lg hover:bg-gray-50 hover:text-navy transition-all duration-300"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
