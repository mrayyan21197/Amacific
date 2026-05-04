/** @param {number} subtotal */
export function computeCouponDiscount(code, subtotal) {
  const c = String(code || "").trim().toUpperCase();
  if (!c || subtotal <= 0) return { discount: 0, matched: false };

  switch (c) {
    case "ONECART200":
      return { discount: Math.min(200, subtotal), matched: true };
    case "CART100":
      return { discount: Math.min(100, subtotal), matched: true };
    case "MISSYOU15":
      return { discount: Math.round(subtotal * 0.15), matched: true };
    default:
      return { discount: 0, matched: false };
  }
}
