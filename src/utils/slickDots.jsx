import React from "react";

/** Dots styling relies on parent wrapper with class `amacific-slider` — see `index.css`. */
export function createSlickDotSettings(dotClass = "amacific-dot") {
  return {
    appendDots: (dots) => (
      <div className="amacific-slider-dots mt-4 flex justify-center">
        <ul className="m-0 flex list-none flex-row flex-wrap items-center justify-center gap-2 p-0">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button type="button" className={dotClass} aria-label={`Go to slide ${i + 1}`} />
    ),
  };
}
