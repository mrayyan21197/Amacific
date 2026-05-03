import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUndo,
  FaMoneyBillWave,
  FaCreditCard,
  FaStar,
  FaLock,
  FaStore,
} from "react-icons/fa";

const points = [
  { icon: FaStore, title: "Verified sellers", desc: "Onboarded partners with badge-backed listings." },
  { icon: FaUndo, title: "Easy returns", desc: "7-day policy on eligible categories." },
  { icon: FaMoneyBillWave, title: "COD available", desc: "Pay when your rider arrives." },
  {
    icon: FaCreditCard,
    title: "JazzCash · Easypaisa · Raast · Cards",
    desc: "Prepaid perks during payday waves.",
  },
  { icon: FaStar, title: "Real customer reviews", desc: "Photo reviews after verified buys." },
  { icon: FaLock, title: "Secure checkout", desc: "Encrypted flows & fraud monitoring." },
];

export default function WhyShopAmacific() {
  return (
    <div className="w-full py-20 bg-white border-y border-gray-100">
      <div className="max-w-container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-titleFont text-navy mb-3">Why shop with Amacific?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built for Karachi nights, Lahore weddings, and Islamabad campus sprints — trust signals you can actually see.
          </p>
          <div className="w-20 h-1 bg-brandOrange rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-6 hover:border-brandOrange/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                <p.icon className="text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-navy font-titleFont flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500 text-sm hidden sm:inline" />
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
