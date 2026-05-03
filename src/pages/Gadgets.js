import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

const Gadgets = () => {
  const products = filterCategory("tech");

  return (
    <CategoryPage
      title="Mobile Accessories & Tech Pakistan"
      description="Shop mobile accessories, earbuds, chargers & gadgets online — Karachi, Lahore, Islamabad delivery."
      keywords="mobile accessories Pakistan, tech gadgets online Pakistan, wireless earbuds Pakistan"
      canonicalPath="/gadgets"
      products={products}
      seoTitle="Tech & gadgets"
    >
      <p>
        Mobile accessories in Pakistan power everyday creators, gig workers, and lecture halls from NUST to IBA.
        Amacific lists verified tech partners so shoppers comparing wireless earbuds, USB-C cables, and Bluetooth speakers see seller ratings beside COD and JazzCash rails.
        Bookmark this category during payday waves or when Google Ads audiences hunt “best online store Pakistan” deals — pair carts with bundles under PKR 999 for stocking stuffers.
      </p>
    </CategoryPage>
  );
};

export default Gadgets;
