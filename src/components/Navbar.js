import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../utils/analytics";

const Navbar = () => {
  const [navBar, setNavBar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const products = useSelector((state) => state.amacificReducer.products);
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setNavBar(isVisible);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Deals", link: "/deals" },
    { title: "Student", link: "/student-essentials" },
    { title: "Shop", link: "/shop" },
    { title: "Fashion", link: "/clothing" },
    { title: "Tech", link: "/gadgets" },
    { title: "Beauty", link: "/beauty" },
    { title: "Blog", link: "/blogs" },
  ];

  return (
    <div
      className={`w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100 transition-transform duration-300 ${
        navBar ? "translate-y-0" : "-translate-y-full"
      } shadow-sm`}
    >
      <div className="hidden md:block bg-gradient-to-r from-violet-800 to-violet-950 text-white text-center text-xs py-2 px-4">
        <span className="text-white font-bold tracking-wide">FOUND200</span> · PKR 200 off first order · COD nationwide ·{" "}
        <Link to="/faq" className="underline hover:text-violet-200">
          Trust FAQs
        </Link>
      </div>

      <nav className="h-full px-4 md:px-6 max-w-container mx-auto relative flex items-center justify-between gap-4 py-3 md:py-0 md:h-[72px]">
        <Link to="/" className="flex-shrink-0" title="Amacific — Home">
          <div className="flex flex-col leading-none">
            <span className="text-2xl md:text-3xl font-bold text-navy font-titleFont tracking-tight">
              Amacific
            </span>
            <span className="text-[10px] md:text-xs text-gray-500 font-medium hidden sm:block">
              You want it, we have it
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="search"
            placeholder="Search fashion, tech, beauty..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-violet-50 border border-transparent focus:border-violet-400 outline-none text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                trackEvent("search_submitted", { query: e.target.value });
                window.location.href = "/shop";
              }
            }}
          />
        </div>

        <ul className="hidden xl:flex items-center gap-6 font-titleFont text-sm font-bold">
          {navLinks.map(({ title, link }) => (
            <li key={title}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-colors ${isActive ? "text-violet-700 border-violet-600" : "text-gray-600 border-transparent hover:text-navy"}`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          <Link to="/cart" className="relative group">
            <div className="p-2 rounded-full hover:bg-violet-50 duration-300">
              <FaShoppingCart className="text-xl text-gray-700 group-hover:text-violet-700 duration-300" />
            </div>
            <AnimatePresence>
              {products.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs font-bold w-5 h-5 flex justify-center items-center rounded-full shadow-md"
                >
                  {products.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link to="/signin" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-navy font-bold font-titleFont text-sm px-3 py-2 rounded-full hover:bg-violet-50">
            <FaUser className="text-lg" />
            <span>Sign In</span>
          </Link>

          <button type="button" className="xl:hidden p-2 rounded-full hover:bg-violet-50" aria-label="Open menu">
            <FaBars onClick={() => setShowMenu(true)} className="text-2xl text-gray-700" />
          </button>
        </div>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[60] bg-black/50 xl:hidden"
              onClick={() => setShowMenu(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute top-0 right-0 w-[88%] max-w-sm h-full bg-white flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-5 border-b border-violet-100">
                  <span className="font-titleFont font-bold text-navy text-xl">Menu</span>
                  <button type="button" onClick={() => setShowMenu(false)} className="p-2 rounded-full hover:bg-violet-50">
                    <FaTimes className="text-xl text-gray-500" />
                  </button>
                </div>
                <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Shop</p>
                    <ul className="flex flex-col gap-3 font-titleFont font-bold">
                      {navLinks.map(({ title, link }) => (
                        <li key={title}>
                          <NavLink
                            to={link}
                            onClick={() => setShowMenu(false)}
                            className={({ isActive }) =>
                              `block py-1 ${isActive ? "text-violet-700" : "text-gray-700"}`
                            }
                          >
                            {title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-violet-100">
                    Campaigns and launch offers are on the homepage carousel. Follow us in the footer.
                  </p>
                  <Link
                    to="/signin"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center justify-center gap-2 bg-violet-700 text-white py-3 rounded-xl font-bold"
                  >
                    <FaUser /> Sign In
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
