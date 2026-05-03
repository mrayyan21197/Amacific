import React from "react";
import ProductGrid from "../components/ProductGrid";
import CategorySeo from "../components/CategorySeo";
import SeoHead from "../components/SeoHead";

export default function CategoryPage({
  title,
  description,
  keywords,
  canonicalPath,
  products,
  seoTitle,
  children,
}) {
  return (
    <div className="max-w-container mx-auto px-4 min-h-screen">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalPath={canonicalPath}
      />
      <ProductGrid products={products} title={seoTitle || title} />
      <CategorySeo title={`Why shop ${title.toLowerCase()} on Amacific in Pakistan?`}>
        {children}
      </CategorySeo>
    </div>
  );
}
