import React from "react";

export default function PaymentMethodIcons({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-700 border border-gray-200">
        COD
      </span>
      <span className="px-2 py-1 rounded-md bg-emerald-50 text-xs font-bold text-emerald-800 border border-emerald-200">
        JazzCash
      </span>
      <span className="px-2 py-1 rounded-md bg-orange-50 text-xs font-bold text-orange-800 border border-orange-200">
        Easypaisa
      </span>
      <span className="px-2 py-1 rounded-md bg-sky-50 text-xs font-bold text-sky-900 border border-sky-200">
        Raast
      </span>
      <span className="px-2 py-1 rounded-md bg-indigo-50 text-xs font-bold text-indigo-900 border border-indigo-200">
        Visa / Mastercard
      </span>
    </div>
  );
}
