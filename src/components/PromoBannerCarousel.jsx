import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { createSlickDotSettings } from "../utils/slickDots";
import { trackEvent } from "../utils/analytics";

const dotSettings = createSlickDotSettings();

/**
 * @param {{ slides: { id: string, title: string, subtitle: string, cta: string, to: string, img: string, event?: { name: string, params?: object } }[], className?: string }} props
 */
export default function PromoBannerCarousel({ slides, className = "" }) {
  const settings = {
    ...dotSettings,
    dots: true,
    infinite: true,
    speed: 550,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    arrows: false,
    pauseOnHover: true,
  };

  if (!slides?.length) return null;

  return (
    <section className={`py-12 ${className}`} aria-label="Featured stories">
      <div className="amacific-slider mx-auto max-w-container px-4">
        <Slider {...settings}>
          {slides.map((s) => (
            <div key={s.id} className="px-1">
              <div className="promo-banner-slide-inner relative h-[220px] overflow-hidden rounded-2xl border border-slate-200 shadow-md md:h-[260px]">
                <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-transparent" />
                <div className="relative z-10 flex h-full max-w-lg flex-col justify-center px-6 py-6 md:px-10">
                  <h3 className="font-titleFont text-xl font-bold text-white md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/85 md:text-base">{s.subtitle}</p>
                  {s.to.startsWith("#") ? (
                    <a
                      href={s.to}
                      onClick={() => s.event && trackEvent(s.event.name, s.event.params || {})}
                      className="mt-4 inline-flex w-fit rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-orange-400"
                    >
                      {s.cta}
                    </a>
                  ) : (
                    <Link
                      to={s.to}
                      onClick={() => s.event && trackEvent(s.event.name, s.event.params || {})}
                      className="mt-4 inline-flex w-fit rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-orange-400"
                    >
                      {s.cta}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
