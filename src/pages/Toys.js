import React from "react";
import CategoryPage from "./CategoryPage";
import { filterCategory } from "../constants/catalog";

const Toys = () => {
  const products = filterCategory("toys");

  return (
    <CategoryPage
      title="Toys & Learning Kits Pakistan"
      description="STEM toys & gifts with trusted sellers — COD available."
      keywords="toys online Pakistan, STEM kits Pakistan, gifts under 5000 PKR"
      canonicalPath="/toys"
      products={products}
      seoTitle="Toys & gifts"
    >
      <p>
        Parents and siblings hunt toys online in Pakistan before birthdays and Eid gatherings — educational STEM picks keep nieces busy while cousins unwrap rechargeable RC cars.
        Amacific mirrors that seasonal spike with verified sellers and secure checkout so prepaid JazzCash gifts ship ahead of dholki weekends.
      </p>
    </CategoryPage>
  );
};

export default Toys;
