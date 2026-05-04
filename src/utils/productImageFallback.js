/** Placeholder when remote product images fail (CDN, hotlink, or network). */
export const PRODUCT_IMAGE_FALLBACK =
  "https://via.placeholder.com/300x300?text=Product";

export function handleProductImageError(e) {
  const el = e.currentTarget;
  if (el.src === PRODUCT_IMAGE_FALLBACK) return;
  el.src = PRODUCT_IMAGE_FALLBACK;
}
