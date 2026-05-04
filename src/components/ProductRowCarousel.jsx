import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { createSlickDotSettings } from "../utils/slickDots";

const dotSettings = createSlickDotSettings();

/**
 * @param {{ products: object[], title: string, subtitle?: string, analyticsList?: string }} props
 */
export default function ProductRowCarousel({ products, title, subtitle, analyticsList }) {
  const canLoop = products.length > 3;
  const settings = {
    ...dotSettings,
    dots: products.length > 1,
    infinite: canLoop,
    speed: 400,
    slidesToShow: Math.min(3, products.length),
    slidesToScroll: 1,
    autoplay: products.length > 1,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, products.length), slidesToScroll: 1, infinite: canLoop } },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: products.length > 1,
          infinite: canLoop,
          centerMode: true,
          centerPadding: "14px",
        },
      },
    ],
  };

  if (!products?.length) return null;

  return (
    <section className="py-10 sm:py-12" aria-label={title}>
      <div className="amacific-slider mx-auto max-w-container px-4">
        <div className="mb-6 text-center md:mb-8 md:text-left">
          <h2 className="font-titleFont text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-slate-600 sm:text-base">{subtitle}</p>}
        </div>
        <Slider {...settings}>
          {products.map((p) => (
            <div key={p._id} className="px-1.5 pb-2 sm:px-2">
              <div className="product-row-slide-inner h-full">
                <ProductCard product={p} analyticsList={analyticsList} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
