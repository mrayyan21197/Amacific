import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem, drecreaseQuantity, increaseQuantity } from "../redux/amacificSlice";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatPkr } from "../utils/format";
import { handleProductImageError } from "../utils/productImageFallback";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const unit = typeof item.price === "number" ? item.price : Number(item.price) || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 mb-4"
    >
      <div className="flex items-center gap-4 w-full md:w-2/5">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-200">
          <img
            className="w-full h-full object-contain"
            src={item.image}
            alt={item.name}
            onError={handleProductImageError}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-primeColor font-titleFont">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.colors && `Color: ${item.colors}`}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-3/5 gap-4">
        <div className="text-lg font-bold text-navy">{formatPkr(unit)}</div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
          <button
            type="button"
            onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 text-gray-600 duration-300 active:scale-90"
          >
            <FaMinus size={10} />
          </button>
          <span className="font-semibold text-primeColor w-4 text-center">{item.quantity}</span>
          <button
            type="button"
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-navy text-white shadow-sm hover:bg-navy-deep duration-300 active:scale-90"
          >
            <FaPlus size={10} />
          </button>
        </div>

        <div className="text-lg font-bold text-primeColor hidden sm:block">{formatPkr(unit * item.quantity)}</div>

        <button
          type="button"
          onClick={() => dispatch(deleteItem(item._id))}
          className="text-gray-400 hover:text-red-500 duration-300 p-2 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Remove item"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
