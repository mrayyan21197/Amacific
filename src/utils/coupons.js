/** @param {number} subtotal */
export function computeCouponDiscount(code, subtotal, options = {}) {
  const c = String(code || "").trim().toUpperCase();
  if (!c || subtotal <= 0) return { discount: 0, matched: false };

  if (c === "PAYDAY") {
    if (options.prepaidOnly) {
      return { discount: Math.min(Math.round(subtotal * 0.1), 500), matched: true };
    }
    return { discount: 0, matched: false };
  }

  switch (c) {
    case "FOUND200":
      return { discount: Math.min(200, subtotal), matched: true };
    case "CART100":
      return { discount: Math.min(100, subtotal), matched: true };
    case "MISSYOU15":
      return { discount: Math.round(subtotal * 0.15), matched: true };
    default:
      return { discount: 0, matched: false };
  }
}
