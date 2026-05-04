import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[600px]">
        <div className="flex flex-col justify-center px-6 md:pl-10 lg:pl-16 z-20 order-2 md:order-1 py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-brandOrange font-bold text-sm uppercase tracking-[0.2em] mb-3">
              You want it, we have it
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy font-titleFont leading-tight mb-4">
              Pakistan’s New One-Stop Online Store
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-bodyFont mb-8 leading-relaxed max-w-lg">
              Shop fashion, tech accessories, beauty, stationery, lifestyle products, and everyday essentials — all in one cart.
            </p>

            <div className="flex flex-col xs:flex-row gap-4 mb-8">
              <Link to="/shop">
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <span className="inline-flex justify-center px-8 py-4 rounded-full bg-brandOrange text-white text-lg font-bold font-titleFont shadow-lg hover:bg-brandOrange-dark cursor-pointer">
                    Start Shopping
                  </span>
                </motion.span>
              </Link>
              <Link to="/deals">
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <span className="inline-flex justify-center px-8 py-4 rounded-full border-2 border-navy text-navy text-lg font-bold font-titleFont hover:bg-navy hover:text-white cursor-pointer transition-colors">
                    Explore Deals Under PKR 999
                  </span>
                </motion.span>
              </Link>
            </div>

            <div className="rounded-2xl bg-navy text-white px-5 py-4 inline-block shadow-lg border border-white/10">
              <p className="text-sm text-white/80">Launch banner</p>
              <p className="font-bold text-lg mt-1">
                Get <span className="text-brandOrange">PKR 200</span> off your first order — code{" "}
                <span className="tracking-widest text-brandOrange">ONECART200</span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[380px] md:h-full w-full order-1 md:order-2">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white md:from-transparent md:to-white/90 z-10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop"
              alt="Young shopper with mobile — Amacific marketplace Pakistan"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-brandOrange/10 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default Hero;
