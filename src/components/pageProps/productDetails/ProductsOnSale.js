import React from "react";
import { Link } from "react-router-dom";
import { filterDeals } from "../../../constants/catalog";
import { formatPkr } from "../../../utils/format";

const ProductsOnSale = () => {
  const deals = filterDeals().slice(0, 5);

  return (
    <div className="hidden xl:block">
      <h3 className="font-titleFont text-xl font-semibold mb-6 text-navy border-b border-gray-200 pb-2">
        Flash deals
      </h3>
      <div className="flex flex-col gap-3">
        {deals.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            state={{ item }}
            className="flex items-center gap-3 border border-gray-100 rounded-xl p-2 hover:border-brandOrange bg-white"
          >
            <img className="w-16 h-16 object-cover rounded-lg" src={item.img} alt="" />
            <div className="font-titleFont min-w-0">
              <p className="text-sm font-semibold text-primeColor truncate">{item.productName}</p>
              <p className="text-xs font-bold text-navy">{formatPkr(item.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
