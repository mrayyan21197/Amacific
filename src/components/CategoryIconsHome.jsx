import React from "react";
import { Link } from "react-router-dom";
import {
  FaTshirt,
  FaMobileAlt,
  FaSprayCan,
  FaPen,
  FaHome,
  FaShoppingBasket,
} from "react-icons/fa";

const cats = [
  { label: "Fashion", to: "/clothing", Icon: FaTshirt },
  { label: "Tech", to: "/gadgets", Icon: FaMobileAlt },
  { label: "Beauty", to: "/beauty", Icon: FaSprayCan },
  { label: "Stationery", to: "/stationery", Icon: FaPen },
  { label: "Home", to: "/home-living", Icon: FaHome },
  { label: "Essentials", to: "/essentials", Icon: FaShoppingBasket },
];

export default function CategoryIconsHome() {
  return (
    <div className="max-w-container mx-auto px-4 py-12">
      <h2 className="text-center text-2xl md:text-3xl font-bold font-titleFont text-navy mb-8">
        Shop by category
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 justify-start md:justify-center scrollbar-thin">
        {cats.map(({ label, to, Icon }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-3 min-w-[100px] snap-start group"
          >
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-violet-100 flex items-center justify-center text-violet-900 text-2xl shadow-sm group-hover:border-violet-500 group-hover:text-violet-600 transition-colors">
              <Icon />
            </span>
            <span className="text-xs md:text-sm font-bold text-gray-700 text-center">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
