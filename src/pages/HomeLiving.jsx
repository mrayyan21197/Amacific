import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

export default function HomeLiving() {
  const products = filterCategory("home");
  return (
    <CategoryPage
      title="Home & Lifestyle Pakistan — Online Shopping"
      description="Mugs, clocks & cozy dorm upgrades with COD & secure checkout."
      keywords="home decor online Pakistan, lifestyle products Pakistan, dorm essentials"
      canonicalPath="/home-living"
      products={products}
      seoTitle="Home — Cozy upgrades"
    >
      <p>
        Home shopping online across Pakistan should match how renters actually live — compact ceramics for Hyderabad flats, bedside clocks for Lahore studio apartments, and giftable bundles for cousins visiting from Multan.
        Amacific surfaces marketplace sellers who ship cushioned parcels so mugs survive courier hops between Saddar hubs and Bahria porches.
        Layer payday deals when furnishing a fresh internship apartment or use prepaid wallets for instant confirmations ahead of weekend guests.
      </p>
    </CategoryPage>
  );
}
