import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

const Clothing = () => {
  const products = filterCategory("fashion");

  return (
    <CategoryPage
      title="Fashion Online Pakistan — Street & Campus Wear"
      description="Trend-led fashion online with nationwide COD, prepaid wallets & verified sellers."
      keywords="fashion online Pakistan, clothing ecommerce Karachi Lahore, sneakers Pakistan"
      canonicalPath="/clothing"
      products={products}
      seoTitle="Fashion"
    >
      <p>
        Fashion online across Pakistan blends campus streetwear with internship-ready basics — think breathable tees, backpacks, and sneakers that pop on TikTok hauls.
        Amacific keeps youthful sizing notes transparent and surfaces verified sellers so Karachi humidity picks don’t melt before beach weekends.
        Use ONECART200 on your first Amacific order during One Cart, Full Life — then stack category deals under PKR 999 in the same checkout.
      </p>
    </CategoryPage>
  );
};

export default Clothing;
