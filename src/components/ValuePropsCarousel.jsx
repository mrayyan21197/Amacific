import React from "react";
import Slider from "react-slick";
import { FaTruck, FaUndo, FaShieldAlt, FaWallet } from "react-icons/fa";
import { createSlickDotSettings } from "../utils/slickDots";

const slides = [
  {
    icon: FaTruck,
    title: "COD nationwide",
    text: "Pay when your rider arrives — built for how Pakistan shops.",
  },
  {
    icon: FaUndo,
    title: "Easy returns",
    text: "7-day returns on eligible categories so you can shop with confidence.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified sellers",
    text: "Badge-backed listings and real reviews from young shoppers.",
  },
  {
    icon: FaWallet,
    title: "JazzCash · Easypaisa · Raast · Cards",
    text: "Prepaid checkout when you want to skip cash on delivery.",
  },
];

const dotSettings = createSlickDotSettings();

export default function ValuePropsCarousel() {
  const settings = {
    ...dotSettings,
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-10" aria-label="Why shoppers choose Amacific">
      <div className="amacific-slider mx-auto max-w-container px-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-orange-600">Why Amacific</p>
        <h2 className="mt-1 text-center font-titleFont text-xl font-bold text-slate-900 md:text-2xl">Trust in every cart</h2>
        <div className="mx-auto mt-6 max-w-lg">
          <Slider {...settings}>
            {slides.map((s) => (
              <div key={s.title} className="px-2">
                <div className="slide-inner-value flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <s.icon className="text-2xl" />
                  </span>
                  <h3 className="mt-4 font-titleFont text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
