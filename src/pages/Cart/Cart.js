import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { resetCart } from "../../redux/amacificSlice";
import { emptyCart } from "../../assets/images/index";
import CartItem from "../../components/CartItem";
import OrderSummary from "../../components/OrderSummary";
import ShareCartWhatsApp from "../../components/ShareCartWhatsApp";
import MailchimpSignupForm from "../../components/MailchimpSignupForm";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amacificReducer.products);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    const sum = products.reduce((acc, item) => {
      const unit = typeof item.price === "number" ? item.price : Number(item.price) || 0;
      return acc + unit * item.quantity;
    }, 0);
    setTotalAmt(sum);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 0) setShippingCharge(0);
    else if (totalAmt <= 2000) setShippingCharge(199);
    else if (totalAmt <= 5000) setShippingCharge(149);
    else setShippingCharge(99);
  }, [totalAmt]);

  return (
    <div className="max-w-container mx-auto px-4 py-10 min-h-[600px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side: Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold font-titleFont text-primeColor">Shopping Cart</h2>
                  <button
                    type="button"
                    onClick={() => dispatch(resetCart())}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm uppercase transition-colors duration-300 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
                  >
                    Clear Cart
                  </button>
                </div>
                <ShareCartWhatsApp />
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4 mb-6">
                <p className="text-sm font-bold text-navy mb-2">Complete checkout faster — PKR 100 off</p>
                <p className="text-xs text-gray-600 mb-3">Use code CART100 (Mailchimp mirrors this in abandoned cart emails).</p>
                <MailchimpSignupForm tag="abandoned_cart_capture" audience="cart_recovery" compact buttonLabel="Email my cart" />
              </div>

              <AnimatePresence>
                <div className="flex flex-col gap-4">
                  {products.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </AnimatePresence>
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-1/3">
              <OrderSummary totalAmt={totalAmt} shippingCharge={shippingCharge} />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center gap-6 py-20 text-center"
          >
            <div className="w-64 h-64 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <img
                className="w-40 opacity-50"
                src={emptyCart}
                alt="emptyCart"
              />
            </div>
            <h1 className="font-titleFont text-3xl font-bold text-primeColor">
              Your Cart is Empty
            </h1>
            <p className="text-gray-500 max-w-md">
              Looks like you haven't added anything to your cart yet. Explore our products and find something you love.
            </p>
            <Link to="/shop">
              <button className="bg-indigo text-white rounded-full px-10 py-3 font-titleFont font-bold text-lg hover:bg-softBlue hover:shadow-lg transition-all duration-300 mt-4">
                Start Shopping
              </button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;