import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetCart, clearCoupon, setCoupon } from "../redux/amacificSlice";
import { formatPkr } from "../utils/format";
import { computeCouponDiscount } from "../utils/coupons";
import PaymentMethodIcons from "../components/PaymentMethodIcons";
import SeoHead from "../components/SeoHead";
import { trackEvent } from "../utils/analytics";

const CITIES = ["Karachi", "Lahore", "Islamabad / Rawalpindi", "Faisalabad", "Multan", "Hyderabad", "Other"];

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((s) => s.amacificReducer.products);
  const appliedCoupon = useSelector((s) => s.amacificReducer.appliedCoupon);

  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Karachi",
    address: "",
  });
  const [payment, setPayment] = useState("COD");
  const [referral, setReferral] = useState("");
  const [couponInput, setCouponInput] = useState("");

  const subtotal = useMemo(
    () => products.reduce((acc, p) => acc + p.price * p.quantity, 0),
    [products]
  );

  const shipping = subtotal <= 2000 ? 199 : subtotal <= 5000 ? 149 : 99;
  const activeCode = (appliedCoupon || couponInput || "").trim().toUpperCase();

  const discount = useMemo(() => {
    const r = computeCouponDiscount(activeCode, subtotal);
    return r.discount;
  }, [activeCode, subtotal]);

  const total = Math.max(0, subtotal - discount + shipping);

  const beganCheckout = useRef(false);
  React.useEffect(() => {
    if (!products.length || beganCheckout.current) return;
    beganCheckout.current = true;
    const cartTotal = products.reduce(
      (acc, p) => acc + (typeof p.price === "number" ? p.price : Number(p.price) || 0) * p.quantity,
      0
    );
    trackEvent("begin_checkout", { value: cartTotal, currency: "PKR" });
  }, [products]);

  const applyCoupon = () => {
    const raw = couponInput.trim().toUpperCase();
    const test = computeCouponDiscount(raw, subtotal);
    if (test.matched && test.discount > 0) {
      dispatch(setCoupon(raw));
      trackEvent("coupon_used", { code: raw, discount: test.discount });
    }
  };

  const placeOrder = () => {
    trackEvent("purchase", {
      value: total,
      currency: "PKR",
      items: products.map((p) => ({
        item_id: p._id,
        item_name: p.name,
        quantity: p.quantity,
        price: p.price,
      })),
      payment_method: payment,
    });
    dispatch(resetCart());
    dispatch(clearCoupon());
    navigate("/", { state: { orderThanks: true } });
  };

  if (!products.length) {
    return (
      <div className="max-w-container mx-auto px-4 py-20 text-center">
        <SeoHead title="Checkout" />
        <h1 className="text-2xl font-bold text-navy">Your cart is empty</h1>
        <Link to="/shop" className="inline-block mt-6 text-brandOrange font-bold">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <SeoHead title="Checkout — Secure delivery & payments" description="3-step Amacific checkout with COD & wallets." />

      <div className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-container mx-auto">
          <h1 className="text-2xl font-titleFont font-bold text-navy">Checkout</h1>
          <div className="flex gap-2 mt-4 text-sm font-semibold">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`px-3 py-1 rounded-full ${step === n ? "bg-brandOrange text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {n === 1 ? "Delivery" : n === 2 ? "Payment" : "Confirm"}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <h2 className="font-bold text-lg text-navy">Delivery details</h2>
              <input
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brandOrange"
                placeholder="Full name"
                value={delivery.fullName}
                onChange={(e) => setDelivery({ ...delivery, fullName: e.target.value })}
              />
              <input
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brandOrange"
                placeholder="Mobile (03XX)"
                value={delivery.phone}
                onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
              />
              <input
                type="email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brandOrange"
                placeholder="Email — for receipts & Mailchimp journeys"
                value={delivery.email}
                onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
              />
              <select
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brandOrange bg-white"
                value={delivery.city}
                onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <textarea
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brandOrange min-h-[100px]"
                placeholder="Full address + landmark"
                value={delivery.address}
                onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
              />
              <input
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brandOrange"
                placeholder="Referral code (optional)"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
              <button
                type="button"
                disabled={!delivery.fullName || !delivery.phone || !delivery.address}
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-navy text-white font-bold disabled:opacity-40"
              >
                Continue to payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <h2 className="font-bold text-lg text-navy">Payment method</h2>
              {["COD", "JazzCash", "Easypaisa", "Raast", "Debit / Credit Card"].map((m) => (
                <label key={m} className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer hover:border-brandOrange">
                  <input
                    type="radio"
                    name="pay"
                    checked={payment === m}
                    onChange={() => setPayment(m)}
                  />
                  <span className="font-medium">{m}</span>
                </label>
              ))}
              <PaymentMethodIcons className="mt-2" />
              <div className="flex gap-2 mt-4">
                <input
                  className="flex-1 border rounded-xl px-4 py-3"
                  placeholder="Voucher code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="button" onClick={applyCoupon} className="px-4 rounded-xl bg-gray-900 text-white font-bold">
                  Apply
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Try <strong className="text-navy">ONECART200</strong> on your first order (PKR 200 off cart, capped at subtotal). Other codes may apply at checkout when valid.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border font-bold">
                  Back
                </button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl bg-navy text-white font-bold">
                  Review order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <h2 className="font-bold text-lg text-navy">Order confirmation</h2>
              <p className="text-gray-600 text-sm">
                <strong>{delivery.fullName}</strong> · {delivery.phone}
                <br />
                {delivery.city} — {delivery.address}
              </p>
              <p className="text-gray-600 text-sm">
                Paying via <strong>{payment}</strong>
              </p>
              <p className="text-sm text-navy font-semibold bg-gray-50 rounded-xl p-4 border border-gray-100">
                Your order is protected with verified sellers, secure checkout, and customer support.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border font-bold">
                  Back
                </button>
                <button type="button" onClick={placeOrder} className="flex-1 py-3 rounded-xl bg-brandOrange text-white font-bold">
                  Place order
                </button>
              </div>
              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input type="checkbox" defaultChecked readOnly className="mt-1" />
                Email me order updates & Amacific offers (manage preferences anytime).
              </label>
            </div>
          )}
        </div>

        <aside className="bg-white rounded-2xl border border-gray-100 p-6 h-fit shadow-sm lg:sticky lg:top-28">
          <h3 className="font-bold text-navy mb-4">Summary</h3>
          <ul className="text-sm text-gray-600 space-y-2 max-h-56 overflow-y-auto">
            {products.map((p) => (
              <li key={p._id} className="flex justify-between gap-2">
                <span>{p.name} ×{p.quantity}</span>
                <span>{formatPkr(p.price * p.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPkr(subtotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>Discounts</span>
              <span>- {formatPkr(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatPkr(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-navy pt-2">
              <span>Total</span>
              <span>{formatPkr(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
