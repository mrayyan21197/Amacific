import React from "react";

export default function CategorySeo({ title, children }) {
  return (
    <section className="max-w-container mx-auto px-4 py-12 border-t border-gray-100 bg-gray-50/80">
      <h2 className="text-xl font-titleFont font-bold text-navy mb-4">{title}</h2>
      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}
