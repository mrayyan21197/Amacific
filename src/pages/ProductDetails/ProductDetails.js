import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import ProductCard from "../../components/ProductCard";
import PaymentMethodIcons from "../../components/PaymentMethodIcons";
import MailchimpSignupForm from "../../components/MailchimpSignupForm";
import SeoHead from "../../components/SeoHead";
import {
  getProductById,
  getRelated,
  getFrequentlyBoughtTogether,
  DELIVERY_BY_CITY,
} from "../../constants/catalog";
import { addToCart, toggleWishlist, addRecentlyViewed } from "../../redux/amacificSlice";
import { formatPkr } from "../../utils/format";
import { trackEvent } from "../../utils/analytics";
import { FaHeart, FaRegHeart, FaStar, FaShieldAlt, FaUndo } from "react-icons/fa";

function normalizeProduct(raw) {
  if (!raw) return null;
  const price =
    typeof raw.price === "number" ? raw.price : parseFloat(String(raw.price).replace(/[^\d.]/g, "")) || 0;
  return {
    ...raw,
    price,
    compareAt: raw.compareAt,
    verifiedSeller: raw.verifiedSeller ?? true,
    sellerRating: raw.sellerRating ?? 4.5,
    sellerName: raw.sellerName ?? "Amacific Seller",
    originalGuarantee: raw.originalGuarantee ?? false,
    reviews: raw.reviews ?? [],
    category: raw.category ?? "essentials",
    productName: raw.productName ?? raw.name ?? "Product",
    img: raw.img ?? raw.image,
    _id: raw._id ?? raw.id,
    color: raw.color ?? "",
    badge: raw.badge ?? false,
    des: raw.des ?? "",
  };
}

const ProductDetails = () => {
  const { _id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.amacificReducer.wishlist);
  const recentlyViewed = useSelector((s) => s.amacificReducer.recentlyViewed);

  const [city, setCity] = useState("Karachi");

  const product = useMemo(() => {
    const fromRoute = getProductById(_id);
    const fromState = normalizeProduct(location.state?.item);
    const merged = normalizeProduct(fromRoute) || fromState;
    return merged && merged.img ? merged : null;
  }, [_id, location.state]);

  useEffect(() => {
    if (!product) return;
    dispatch(addRecentlyViewed(product));
    trackEvent("view_item", {
      currency: "PKR",
      value: product.price,
      items: [{ item_id: product._id, item_name: product.productName, price: product.price }],
    });
  }, [product, dispatch]);

  if (!product) {
    return (
      <div className="max-w-container mx-auto px-4 py-20 text-center">
        <SeoHead title="Product not found" />
        <p className="text-gray-600">We couldn’t load this product.</p>
        <button
          type="button"
          className="mt-6 px-6 py-3 bg-brandOrange text-white rounded-xl font-bold"
          onClick={() => navigate("/shop")}
        >
          Browse catalogue
        </button>
      </div>
    );
  }

  const related = getRelated(product);
  const bundle = getFrequentlyBoughtTogether(product);
  const loved = wishlist.some((w) => w._id === product._id);
  const deliveryEta = DELIVERY_BY_CITY[city] || DELIVERY_BY_CITY.Other;
  const sale = product.compareAt && product.compareAt > product.price;

  const addCart = (qty = 1) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.productName,
        quantity: qty,
        image: product.img,
        badge: product.badge,
        price: product.price,
        colors: product.color,
      })
    );
    trackEvent("add_to_cart", {
      currency: "PKR",
      value: product.price * qty,
      items: [{ item_id: product._id, item_name: product.productName, quantity: qty }],
    });
  };

  const buyNow = () => {
    addCart(1);
    navigate("/checkout");
  };

  return (
    <div className="w-full mx-auto border-b border-gray-200 bg-gray-50">
      <SeoHead
        title={`${product.productName} — Buy Online Pakistan`}
        description={`${(product.des || "").slice(0, 140)}… COD & wallets. ${formatPkr(product.price)}`}
        keywords={`${product.productName}, online shopping Pakistan, ${product.category}`}
        canonicalPath={`/product/${product._id}`}
      />

      <div className="max-w-container mx-auto px-4 pb-28 md:pb-10">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title={product.productName} prevLocation={location.pathname} />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 xl:-mt-8 pt-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="h-full hidden xl:block xl:col-span-1">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full rounded-xl object-cover aspect-square bg-gray-100"
              src={product.img}
              alt={product.productName}
            />
            {product.originalGuarantee && (
              <p className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 inline-block">
                Original product guarantee — sealed sourcing for beauty & electronics categories.
              </p>
            )}
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.verifiedSeller && (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full flex items-center gap-1">
                  <FaShieldAlt /> Verified seller
                </span>
              )}
              {sale && (
                <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Limited deal
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-titleFont text-navy">{product.productName}</h1>

            <div className="flex flex-wrap items-end gap-3">
              <span className="text-3xl font-bold text-brandOrange">{formatPkr(product.price)}</span>
              {sale && (
                <span className="text-lg text-gray-400 line-through">{formatPkr(product.compareAt)}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaStar className="text-amber-400" />
              <strong>{product.sellerRating}</strong>
              <span className="text-gray-400">·</span>
              <span>{product.sellerName}</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.des}</p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                <p className="font-bold text-navy mb-2">Delivery estimate</p>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-white mb-2"
                >
                  {Object.keys(DELIVERY_BY_CITY).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-gray-600">{deliveryEta}</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                <p className="font-bold text-navy mb-2 flex items-center gap-2">
                  <FaUndo className="text-brandOrange" /> Returns
                </p>
                <p className="text-gray-600">7-day easy returns on eligible items — policy printed at checkout.</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-navy mb-2">Payment options</p>
              <PaymentMethodIcons />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => addCart(1)}
                className="flex-1 py-4 rounded-xl bg-brandOrange hover:bg-brandOrange-dark text-white font-bold font-titleFont shadow-md"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={buyNow}
                className="flex-1 py-4 rounded-xl bg-navy hover:bg-navy-deep text-white font-bold font-titleFont"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={() => dispatch(toggleWishlist(product))}
                className="sm:w-14 h-14 rounded-xl border-2 border-gray-200 flex items-center justify-center text-xl hover:border-brandOrange"
                aria-label="Wishlist"
              >
                {loved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>

            <div className="rounded-xl border border-dashed border-brandOrange/40 bg-orange-50/50 p-4">
              <p className="font-bold text-navy text-sm">Price drop alert</p>
              <p className="text-xs text-gray-600 mb-3">Drop your email — Mailchimp automation tags PKR alerts.</p>
              <MailchimpSignupForm tag="price_drop" audience={`sku_${product._id}`} compact buttonLabel="Alert me" />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy font-titleFont mb-6">Customer reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(product.reviews || []).map((r) => (
              <article key={r.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < r.rating ? "" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-gray-700">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm font-semibold text-navy mt-3">{r.author}</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </article>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6">
            Photo reviews unlock after verified purchase — Mailchimp review-request journey fires post-delivery.
          </p>
        </section>

        {/* Frequently bought together */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy font-titleFont mb-6">Frequently bought together</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {bundle.map((p) => (
              <div key={p._id} className="min-w-[220px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              bundle.forEach((p) =>
                dispatch(
                  addToCart({
                    _id: p._id,
                    name: p.productName,
                    quantity: 1,
                    image: p.img,
                    badge: p.badge,
                    price: p.price,
                    colors: p.color,
                  })
                )
              );
              trackEvent("add_to_cart", { source: "frequently_bought_together", items: bundle.length });
            }}
            className="mt-4 px-6 py-3 rounded-xl bg-gray-900 text-white font-bold"
          >
            Add bundle to cart
          </button>
        </section>

        {/* Related */}
        <section className="mt-12 mb-8">
          <h2 className="text-xl font-bold text-navy font-titleFont mb-6">Related products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>

        {/* Recently viewed */}
        {recentlyViewed.filter((p) => p._id !== product._id).length > 0 && (
          <section className="mt-4 mb-16">
            <h2 className="text-xl font-bold text-navy font-titleFont mb-6">Recently viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewed
                .filter((p) => p._id !== product._id)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p._id} product={normalizeProduct(p)} />
                ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile ATC */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 flex gap-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 truncate">{product.productName}</p>
          <p className="font-bold text-navy">{formatPkr(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => addCart(1)}
          className="px-5 rounded-xl bg-brandOrange text-white font-bold text-sm"
        >
          Add
        </button>
        <button
          type="button"
          onClick={buyNow}
          className="px-5 rounded-xl bg-navy text-white font-bold text-sm"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
