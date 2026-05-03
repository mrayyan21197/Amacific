import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/amacificSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { formatPkr } from "../utils/format";
import { trackEvent } from "../utils/analytics";

const ProductCard = ({ product }) => {
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

  return (
    <div className="w-full relative group">
      <Link to={`/product/${product._id}`} state={{ item: product }}>
        <div className="max-w-80 max-h-80 relative overflow-hidden rounded-xl shadow-md border border-gray-100 bg-white mx-auto">
          <div className="min-h-[250px] flex items-center justify-center bg-gray-50 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover object-center"
              src={product.img}
              alt={product.productName}
            />
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <span className="bg-brandOrange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Hot
              </span>
            )}
            {sale && (
              <span className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Sale
              </span>
            )}
            {product.verifiedSeller && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wide">
                Verified
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWish}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-navy hover:bg-brandOrange hover:text-white transition-colors duration-300"
              aria-label="Wishlist"
            >
              {loved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-navy hover:bg-navy hover:text-white transition-colors duration-300"
              title="Add to Cart"
            >
              <FaShoppingCart />
            </motion.button>
          </div>
        </div>
      </Link>

      <div className="max-w-80 py-4 flex flex-col gap-1 px-2 mx-auto">
        <div className="flex items-center justify-between font-titleFont gap-2">
          <h2 className="text-lg text-primeColor font-bold truncate group-hover:text-navy duration-300">
            {product.productName}
          </h2>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <p className="text-[#767676] text-sm">{product.color}</p>
          <div className="text-right">
            {sale && (
              <p className="text-xs text-gray-400 line-through">
                {formatPkr(product.compareAt)}
              </p>
            )}
            <p className="text-navy text-lg font-bold">
              {formatPkr(typeof product.price === "number" ? product.price : Number(product.price))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
