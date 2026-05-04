import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/amacificSlice";
import { handleProductImageError } from "../../utils/productImageFallback";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // Add safety check for item prop
  if (!item) {
    return null;
  }

  const handleQuantityDecrease = () => {
    if (item._id) {
      dispatch(drecreaseQuantity({ _id: item._id }));
    }
  };

  const handleQuantityIncrease = () => {
    if (item._id) {
      dispatch(increaseQuantity({ _id: item._id }));
    }
  };

  const handleDelete = () => {
    if (item._id) {
      dispatch(deleteItem(item._id));
    }
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleDelete}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img
          className="w-32 h-32"
          src={item.image}
          alt={item.name || "Product"}
          onError={handleProductImageError}
        />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price || 0}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={handleQuantityDecrease}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity || 0}</p>
          <span
            onClick={handleQuantityIncrease}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${(item.quantity || 0) * (item.price || 0)}</p>
        </div>
      </div>
    </div>
  );
};

// Add prop validation
ItemCard.defaultProps = {
  item: {
    _id: '',
    name: '',
    image: '',
    price: 0,
    quantity: 0
  }
};

export default ItemCard;