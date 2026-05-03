/** @param {number} amount */
export function formatPkr(amount) {
  if (amount == null || Number.isNaN(amount)) return "PKR 0";
  return `PKR ${Math.round(amount).toLocaleString("en-PK")}`;
}
