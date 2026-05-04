import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const AUTOPLAY_MS = 6000;

const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400&auto=format&fit=crop";

const HERO_SLIDES = [
  {
    id: "smartest-cart",
    eyebrow: "#SmartestCartPakistan",
    title: "The Smartest Cart Challenge",
    titleAccent: "Under PKR 3,000",
    subtitle:
      "Curate a legendary haul, post on Reels or TikTok, tag @amacific.pk — vouchers for the boldest carts.",
    primaryCta: "Join the challenge",
    primaryTo: "/campaigns/smartest-cart-challenge",
    primaryEvent: { name: "smartest_cart_cta_click", params: { source: "home_hero" } },
    secondaryCta: "Student picks",
    secondaryTo: "/student-essentials",
    secondaryEvent: { name: "student_essentials_click", params: { source: "home_hero" } },
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "student-essentials",
    eyebrow: "Semester mode",
    title: "Student Essentials",
    titleAccent: "Under Budget",
    subtitle:
      "Desk, cables, bags, and study wins — stack deals in one cart without blowing your allowance.",
    primaryCta: "Shop student hub",
    primaryTo: "/student-essentials",
    primaryEvent: { name: "student_essentials_click", params: { source: "home_hero" } },
    secondaryCta: "Deals under 999",
    secondaryTo: "/deals",
    secondaryEvent: { name: "product_under_999_click", params: { source: "home_hero" } },
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2400&auto=format&fit=crop",
    thumbStrip: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540959733332-eab4deab21af?q=80&w=400&auto=format&fit=crop",
    ],
  },
  {
    id: "tech-deals",
    eyebrow: "Signal boosted",
    title: "Trending Tech Deals",
    titleAccent: "One checkout",
    subtitle:
      "Audio, power, desk upgrades — the gadgets Pakistan students are adding to cart tonight.",
    primaryCta: "Explore tech",
    primaryTo: "/gadgets",
    primaryEvent: { name: "hero_tech_deals_click", params: { source: "home_hero" } },
    secondaryCta: "Spotlight deals",
    secondaryTo: "/deals",
    secondaryEvent: { name: "product_under_999_click", params: { source: "home_hero" } },
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "campus-fashion",
    eyebrow: "Campus runway",
    title: "Campus Fashion Picks",
    titleAccent: "Fresh drops",
    subtitle:
      "Layer fits for class, hangouts, and city nights — fashion that moves with your semester.",
    primaryCta: "Shop clothing",
    primaryTo: "/clothing",
    primaryEvent: { name: "hero_fashion_click", params: { source: "home_hero" } },
    secondaryCta: "Full catalog",
    secondaryTo: "/shop",
    secondaryEvent: { name: "hero_one_cart_cta_click", params: { cta: "shop_all", source: "home_hero" } },
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: "member-perks",
    eyebrow: "Insider access",
    title: "Exclusive Member Perks",
    titleAccent: "PKR 200 welcome",
    subtitle:
      "Create your Amacific account and unlock launch codes, drops, and challenge boosts before the crowd.",
    code: "ONECART200",
    codeHint: "Tap to copy — first order",
    primaryCta: "Claim my perks",
    primaryTo: "/signup",
    primaryEvent: { name: "hero_member_signup_click", params: { source: "home_hero" } },
    secondaryCta: "Browse deals",
    secondaryTo: "/deals",
    secondaryEvent: { name: "product_under_999_click", params: { source: "home_hero" } },
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2400&auto=format&fit=crop",
  },
];

function handleHeroImageError(e) {
  const el = e.currentTarget;
  if (el.src === HERO_IMAGE_FALLBACK) return;
  el.src = HERO_IMAGE_FALLBACK;
}

const HeroEmblaSlide = memo(
  function HeroEmblaSlide({ slide, index, isActive, onFirstMediaLoad }) {
    return (
      <div
        className={`relative min-h-[min(88vh,720px)] min-w-0 flex-[0_0_100%] select-none transition-[transform,opacity] duration-500 ease-out ${
          isActive ? "scale-100 opacity-100" : "scale-95 opacity-70"
        }`}
        data-slide-id={slide.id}
      >
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={index === 0 && onFirstMediaLoad ? onFirstMediaLoad : undefined}
            onError={handleHeroImageError}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>
    );
  },
  (prev, next) =>
    prev.slide.id === next.slide.id &&
    prev.index === next.index &&
    prev.isActive === next.isActive &&
    prev.onFirstMediaLoad === next.onFirstMediaLoad
);

const HeroCarouselDots = memo(function HeroCarouselDots({ slides, selectedIndex, onPick }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {slides.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onPick(i)}
          className={`rounded-full transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] ${
            i === selectedIndex
              ? "h-2.5 w-8 scale-100 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-100"
              : "h-2.5 w-2.5 scale-95 bg-white/50 opacity-70 hover:bg-white/70"
          }`}
          aria-label={`Go to slide ${i + 1}: ${s.title}`}
          aria-current={i === selectedIndex ? "true" : undefined}
        />
      ))}
    </div>
  );
});

export default function HomeCampaignCarousel() {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);
  const [heroReady, setHeroReady] = useState(false);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_MS,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: reduceMotion ? 0 : 28,
      skipSnaps: false,
    },
    [autoplayPlugin]
  );

  const slideCount = HERO_SLIDES.length;
  const active = HERO_SLIDES[selectedIndex];

  const updateDirection = useCallback(
    (from, to) => {
      if (to === from) return;
      if (from === slideCount - 1 && to === 0) setDirection(1);
      else if (from === 0 && to === slideCount - 1) setDirection(-1);
      else setDirection(to > from ? 1 : -1);
    },
    [slideCount]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const next = emblaApi.selectedScrollSnap();
      updateDirection(prevIndexRef.current, next);
      prevIndexRef.current = next;
      setSelectedIndex(next);
      emblaApi.plugins()?.autoplay?.reset();
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, updateDirection]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins()?.autoplay?.play();
  }, [emblaApi]);

  useEffect(() => {
    HERO_SLIDES.forEach((s, i) => {
      if (i === 0) return;
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const onFirstMediaLoad = useCallback(() => {
    setHeroReady(true);
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i) => {
      emblaApi?.scrollTo(i);
    },
    [emblaApi]
  );

  const contentVariants = useMemo(
    () => ({
      enter: (dir) => ({
        opacity: 0,
        y: reduceMotion ? 0 : dir >= 0 ? 20 : -20,
      }),
      center: { opacity: 1, y: 0 },
      exit: (dir) => ({
        opacity: 0,
        y: reduceMotion ? 0 : dir >= 0 ? -16 : 16,
      }),
    }),
    [reduceMotion]
  );

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#111827] text-white"
      aria-label="Featured campaigns"
    >
      <div className="relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {HERO_SLIDES.map((slide, index) => (
              <HeroEmblaSlide
                key={slide.id}
                slide={slide}
                index={index}
                isActive={index === selectedIndex}
                onFirstMediaLoad={onFirstMediaLoad}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[15] bg-[#111827]"
          initial={false}
          animate={{ opacity: heroReady ? 0 : 0.35 }}
          transition={{ duration: 0.45 }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
          <div className="pointer-events-auto mx-auto w-full max-w-container px-4 py-16 text-left sm:px-6 md:py-20 lg:px-8 lg:py-24">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0.12 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-2xl"
              >
                {Array.isArray(active.thumbStrip) && active.thumbStrip.length > 0 && (
                  <div className="mb-6 flex gap-2">
                    {active.thumbStrip.map((src, i) => (
                      <img
                        key={`${src}-${i}`}
                        src={src}
                        alt=""
                        className="h-14 w-14 rounded-lg border border-white/40 object-cover sm:h-16 sm:w-16"
                        loading="lazy"
                        decoding="async"
                        onError={handleHeroImageError}
                      />
                    ))}
                  </div>
                )}
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
                  {active.eyebrow}
                </p>
                <h2 className="font-titleFont text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                  <span className="block">{active.title}</span>
                  <span className="mt-2 block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent sm:mt-1">
                    {active.titleAccent}
                  </span>
                </h2>
                <p className="mt-4 max-w-prose text-lg leading-relaxed text-white/80">{active.subtitle}</p>

                {active.code && (
                  <div className="mt-6 rounded-xl border border-white/40 bg-black/50 px-4 py-3 text-sm font-semibold text-white">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(active.code).catch(() => {});
                        trackEvent("onecart_promo_code_copy", { code: active.code, source: "home_hero" });
                      }}
                      className="w-full text-left"
                    >
                      {active.codeHint}
                      <span className="mt-1 block font-mono text-lg tracking-[0.18em] text-yellow-300">
                        {active.code}
                      </span>
                      <span className="text-xs font-medium text-white/70">Tap to copy</span>
                    </button>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to={active.primaryTo}
                    onClick={() => trackEvent(active.primaryEvent.name, active.primaryEvent.params)}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl sm:min-h-[52px]"
                  >
                    {active.primaryCta}
                  </Link>
                  <Link
                    to={active.secondaryTo}
                    onClick={() => trackEvent(active.secondaryEvent.name, active.secondaryEvent.params)}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:min-h-[52px]"
                  >
                    {active.secondaryCta}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition hover:bg-white/10 md:left-5 md:h-12 md:w-12"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition hover:bg-white/10 md:right-5 md:h-12 md:w-12"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>

      <div className="relative z-30 border-t border-white/10 bg-[#111827] px-4 py-4">
        <div className="mx-auto max-w-container space-y-4">
          <div
            className="h-[3px] w-full overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(((selectedIndex + 1) / slideCount) * 100)}
            aria-label="Carousel autoplay progress"
          >
            <div
              key={`${selectedIndex}-${AUTOPLAY_MS}`}
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 amapacific-hero-progress"
              style={reduceMotion ? { width: "100%" } : undefined}
            />
          </div>
          <HeroCarouselDots slides={HERO_SLIDES} selectedIndex={selectedIndex} onPick={scrollTo} />
        </div>
      </div>
    </section>
  );
}
