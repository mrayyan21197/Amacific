import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

export default function Stationery() {
  const products = filterCategory("stationery");
  return (
    <CategoryPage
      title="Stationery Online Pakistan — Study & Desk Essentials"
      description="Notebooks, lamps & organizers for students & freelancers — nationwide delivery."
      keywords="stationery Pakistan, study desk accessories online, notebooks Lahore Karachi"
      canonicalPath="/stationery"
      products={products}
      seoTitle="Stationery — Desk mode"
    >
      <p>
        Stationery online in Pakistan fuels everything from CA finals in Karachi to design critiques in Lahore art schools.
        Amacific rounds up LED desk lamps, dotted journals, and bamboo organizers so young pros can clone TikTok desk setups without importing obscure SKUs.
        Pair carts with student vouchers during Campus Cart Challenge pushes or filter PKR 999 finds when you only need a lamp swap mid-semester.
        Metro warehouses prioritise Islamabad & Rawalpindi university belts alongside Faisalabad textile institutes — wherever PDF assignments pile up, predictable dispatch beats panic buys on mall weekends.
      </p>
    </CategoryPage>
  );
}
