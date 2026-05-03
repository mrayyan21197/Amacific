import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

export default function Beauty() {
  const products = filterCategory("beauty");
  return (
    <CategoryPage
      title="Beauty Products Pakistan — Skincare & Cosmetics"
      description="Shop authentic beauty products online in Pakistan with verified sellers, COD & prepaid wallets."
      keywords="beauty products Pakistan, skincare online Pakistan, authentic cosmetics Karachi Lahore"
      canonicalPath="/beauty"
      products={products}
      seoTitle="Beauty — Glow essentials"
    >
      <p>
        Buying beauty products online in Pakistan is easiest when listings highlight verified sellers, sealed inventory, and COD-friendly checkout.
        Amacific focuses on Gen-Z routines across Karachi humidity, Lahore weddings, and Islamabad dry winters — meaning SPF moisturizers, brightening serums, and dorm-sized bundles ship with realistic timelines.
        Use filters for deals under PKR 999 when you want lipstick upgrades between classes, or stack payday markdowns when salons spike bookings before Eid.
        Every PDP spells out JazzCash, Easypaisa, Raast, and card rails so prepaid shoppers unlock faster confirmations while COD fans keep flexibility.
      </p>
    </CategoryPage>
  );
}
