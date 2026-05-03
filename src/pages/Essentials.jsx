import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

export default function Essentials() {
  const products = filterCategory("essentials");
  return (
    <CategoryPage
      title="Everyday Essentials Pakistan — Bottles & Carry Goods"
      description="Hydration, commute basics & lifestyle essentials with verified sellers."
      keywords="everyday essentials Pakistan, insulated bottle Pakistan, lifestyle ecommerce"
      canonicalPath="/essentials"
      products={products}
      seoTitle="Essentials — Daily carry"
    >
      <p>
        Everyday essentials in Pakistan range from insulated bottles that survive Punjab summers to commuter pouches for Karachi’s coastal breeze.
        Amacific bundles those hero SKUs beside tech accessories so freelancers building creator kits can checkout once.
        Deals under PKR 999 shine here — ideal for topping up carts before influencer-led payday Lives or gifting siblings during semester breaks.
      </p>
    </CategoryPage>
  );
}
