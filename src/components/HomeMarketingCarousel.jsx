import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { trackEvent } from "../utils/analytics";

const slides = [
  {
    id: "campus-cart",
    eyebrow: "Campus Cart Challenge",
    title: "Build the smartest student cart under PKR 3,000",
    subtitle: "Post on TikTok or Instagram · Tag @amacific.pk · #CampusCartChallenge · Win vouchers",
    code: null,
    cta: "Join the Challenge",
    to: "/campaigns/campus-cart-challenge",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    theme: "purple",
  },
  {
    id: "found-it-week",
    eyebrow: "Amacific Found It Week",
    title: "Stop searching everywhere. Everything is on Amacific.",
    subtitle: "PKR 200 OFF on your first order — verified sellers, COD & secure checkout.",
    code: "FOUND200",
    cta: "Shop Found It Week",
    to: "/campaigns/found-it-week",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
    theme: "light",
  },
  {
    id: "payday",
    eyebrow: "Payday deals are live",
    title: "Big deals. Bigger cart.",
    subtitle: "Salary aayi? Deals bhi aa gayi. Up to 60% off favourites · Extra 10% off prepaid with PAYDAY",
    code: "PAYDAY",
    cta: "Shop Payday Deals",
    to: "/deals",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop",
    theme: "dark",
  },
  {
    id: "under-999",
    eyebrow: "Things you'll love",
    title: "UNDER PKR 999",
    subtitle: "Smart finds. Small prices. Big happiness.",
    code: null,
    cta: "Shop Under 999",
    to: "/deals",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop",
    theme: "violet",
  },
  {
    id: "back-campus",
    eyebrow: "Back to campus",
    title: "We got you.",
    subtitle: "Everything you need for a smarter semester — essentials under PKR 3,000.",
    code: null,
    cta: "Shop Student Essentials",
    to: "/student-essentials",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    theme: "mist",
  },
];

function Arrow({ className, style, onClick, dir }) {
  if (className?.includes("slick-disabled")) return null;
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg border border-violet-100 hover:bg-violet-50 ${dir === "prev" ? "left-4" : "right-4"} ${className || ""}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {dir === "prev" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
}

function PrevArrow(props) {
  return <Arrow {...props} dir="prev" />;
}
function NextArrow(props) {
  return <Arrow {...props} dir="next" />;
}

export default function HomeMarketingCarousel() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    /** Keep advancing — navbar promos live on the homepage carousel only */
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="bg-violet-50/90 border-t border-violet-100 py-4">
        <ul className="flex justify-center gap-1">{dots}</ul>
      </div>
    ),
    customPaging: () => <button type="button" className="carousel-dot" aria-label="Slide" />,
  };

  const overlayForTheme = (theme) => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-r from-[#1e1b4b]/95 via-[#4c1d95]/85 to-transparent";
      case "light":
        return "bg-gradient-to-r from-white/95 via-white/88 to-white/20";
      case "violet":
        return "bg-gradient-to-r from-violet-700/92 via-purple-600/75 to-transparent";
      case "mist":
        return "bg-gradient-to-r from-slate-50/95 via-violet-50/90 to-transparent";
      default:
        return "bg-gradient-to-r from-[#4c1d95]/93 via-violet-700/80 to-transparent";
    }
  };

  const textTone = (theme) => {
    if (theme === "light" || theme === "mist") return "text-navy";
    return "text-white";
  };

  const mutedTone = (theme) => {
    if (theme === "light") return "text-gray-600";
    if (theme === "mist") return "text-violet-950/80";
    return "text-white/85";
  };

  return (
    <section className="relative home-campaign-carousel bg-white" aria-label="Featured campaigns">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((s) => (
          <div key={s.id}>
            <div className="relative min-h-[420px] md:min-h-[480px] lg:min-h-[520px] overflow-hidden">
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className={`absolute inset-0 ${overlayForTheme(s.theme)}`} />
              <div className="relative z-10 max-w-container mx-auto px-4 md:px-8 h-full min-h-[420px] md:min-h-[480px] lg:min-h-[520px] flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="max-w-xl md:max-w-2xl py-12"
                >
                  <p
                    className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 ${mutedTone(s.theme)}`}
                  >
                    {s.eyebrow}
                  </p>
                  <h2 className={`text-3xl md:text-5xl font-titleFont font-extrabold leading-tight mb-4 ${textTone(s.theme)}`}>
                    {s.title}
                  </h2>
                  <p className={`text-base md:text-lg mb-6 leading-relaxed ${mutedTone(s.theme)}`}>{s.subtitle}</p>
                  {s.code && (
                    <div
                      className={`inline-block rounded-xl px-4 py-2 mb-6 text-sm font-bold ${
                        s.theme === "light" || s.theme === "mist"
                          ? "bg-violet-100 text-violet-900 border border-violet-200"
                          : "bg-white/15 text-white border border-white/25 backdrop-blur-sm"
                      }`}
                    >
                      Use code <span className="tracking-widest">{s.code}</span>
                    </div>
                  )}
                  <div>
                    <Link
                      to={s.to}
                      onClick={() =>
                        trackEvent("campaign_page_visit", {
                          source: "home_carousel",
                          campaign: s.id,
                        })
                      }
                      className="inline-flex justify-center px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-base md:text-lg font-bold font-titleFont shadow-lg shadow-violet-900/20 transition-colors"
                    >
                      {s.cta}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
