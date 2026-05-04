import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/amacificSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { formatPkr } from "../utils/format";
import { trackEvent } from "../utils/analytics";
import { handleProductImageError } from "../utils/productImageFallback";

const ProductCard = ({ product, analyticsList }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.amacificReducer.wishlist);
  const loved = wishlist.some((w) => w._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        _id: product._id,
        name: product.productName,
        quantity: 1,
        image: product.img,
        badge: product.badge,
        price: typeof product.price === "number" ? product.price : Number(product.price),
        colors: product.color,
      })
    );
    trackEvent("add_to_cart", {
      currency: "PKR",
      value:
        (typeof product.price === "number" ? product.price : Number(product.price)) || 0,
      items: [{ item_id: product._id, item_name: product.productName, quantity: 1 }],
    });
  };

  const onWish = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const sale =
    product.compareAt &&
    typeof product.price === "number" &&
    product.compareAt > product.price;

  const productPath = `/product/${product._id}`;
  const productState = { item: product };

  const trackListClick = () => {
    if (analyticsList) {
      trackEvent(analyticsList, {
        item_id: product._id,
        item_name: product.productName,
      });
    }
  };

  return (
    <article className="group relative flex h-full w-full flex-col">
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50 shadow-sm ring-1 ring-slate-900/5">
        <Link
          to={productPath}
          state={productState}
          aria-label={`View ${product.productName}`}
          onClick={trackListClick}
          className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[4/5] w-full bg-slate-100">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={product.img}
              alt=""
              loading="lazy"
              onError={handleProductImageError}
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute left-2.5 top-2.5 z-20 flex max-w-[60%] flex-col gap-1.5 sm:left-3 sm:top-3 sm:max-w-[55%]">
            {product.badge && (
              <span className="rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                Hot
              </span>
            )}
            {sale && (
              <span className="rounded-full bg-violet-800 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                Sale
              </span>
            )}
            {product.verifiedSeller && (
              <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                Verified
              </span>
            )}
          </div>

          <div className="pointer-events-auto absolute right-2.5 top-2.5 z-20 flex flex-col gap-2 sm:right-3 sm:top-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWish}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-violet-800 shadow-md ring-1 ring-slate-200/80 transition-colors hover:bg-violet-600 hover:text-white sm:h-10 sm:w-10"
              aria-label={`Save ${product.productName} to wishlist`}
            >
              {loved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-violet-800 shadow-md ring-1 ring-slate-200/80 transition-colors hover:bg-violet-700 hover:text-white sm:h-10 sm:w-10"
              aria-label={`Add ${product.productName} to cart`}
            >
              <FaShoppingCart />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex min-h-[6rem] flex-1 flex-col px-0.5 sm:mt-4 sm:min-h-[6.25rem]">
        <Link
          to={productPath}
          state={productState}
          onClick={trackListClick}
          className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-md"
        >
          <h2 className="line-clamp-2 min-h-[2.8rem] font-titleFont text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-800 sm:min-h-[3rem] sm:text-base md:text-lg md:leading-snug">
            {product.productName}
          </h2>
          <div className="mt-auto flex items-end justify-between gap-2.5 pt-2.5 sm:gap-3 sm:pt-3">
            <p className="min-w-0 flex-1 text-xs font-medium leading-snug text-slate-600 sm:text-sm">{product.color}</p>
            <div className="shrink-0 text-right tabular-nums">
              {sale && (
                <p className="text-sm font-semibold text-slate-500 line-through decoration-slate-400">
                  {formatPkr(product.compareAt)}
                </p>
              )}
              <p className="text-base font-bold text-violet-700 sm:text-lg md:text-xl">
                {formatPkr(typeof product.price === "number" ? product.price : Number(product.price))}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
