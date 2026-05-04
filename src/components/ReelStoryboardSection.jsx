import React from "react";

/**
 * @param {{ title: string, cards: { step: string, text: string }[], className?: string }} props
 */
export default function ReelStoryboardSection({ title, cards, className = "" }) {
  return (
    <section className={`bg-slate-50 py-14 md:py-16 ${className}`}>
      <div className="mx-auto max-w-container px-4">
        <h2 className="font-titleFont text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
          Short-form story beats you can shoot on a phone — swap in your own products and captions.
        </p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm font-medium leading-snug text-slate-800 md:text-base">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
