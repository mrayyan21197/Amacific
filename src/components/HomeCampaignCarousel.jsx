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
    codeHint: "First order discount",
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

// Slide background with Ken Burns scale effect on active
const HeroSlideBackground = memo(
  function HeroSlideBackground({ slide, index, isActive, onFirstMediaLoad }) {
    return (
      <div
        className="relative flex-[0_0_100%] min-w-0 select-none min-h-[min(90vh,760px)]"
        data-slide-id={slide.id}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={index === 0 && onFirstMediaLoad ? onFirstMediaLoad : undefined}
            onError={handleHeroImageError}
            animate={{ scale: isActive ? 1.0 : 1.07 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {/* Directional gradient — heavy on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.08) 100%)",
          }}
          aria-hidden
        />
        {/* Bottom fade for control bar */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,17,23,0.75) 0%, transparent 40%)",
          }}
          aria-hidden
        />
      </div>
    );
  },
  (prev, next) =>
    prev.slide.id === next.slide.id &&
    prev.index === next.index &&
    prev.isActive === next.isActive &&
    prev.onFirstMediaLoad === next.onFirstMediaLoad
);

// Animated progress bar segments — one per slide
const HeroProgressBars = memo(function HeroProgressBars({ slides, selectedIndex, onPick }) {
  return (
    <div className="flex flex-1 gap-1.5 items-center" role="tablist" aria-label="Slide navigation">
      {slides.map((s, i) => (
        <button
          key={s.id}
          type="button"
          role="tab"
          onClick={() => onPick(i)}
          className="relative flex-1 h-[3px] rounded-full overflow-hidden bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent cursor-pointer"
          aria-label={`Slide ${i + 1}: ${s.title}`}
          aria-selected={i === selectedIndex}
        >
          {i === selectedIndex ? (
            <motion.div
              key={`${s.id}-${selectedIndex}`}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left center" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          ) : (
            <div className="absolute inset-0 rounded-full bg-white/0" />
          )}
        </button>
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
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

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
      duration: reduceMotion ? 0 : 32,
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

  // Preload all slide images after first paint
  useEffect(() => {
    HERO_SLIDES.forEach((s, i) => {
      if (i === 0) return;
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Cleanup copy timer on unmount
  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const onFirstMediaLoad = useCallback(() => setHeroReady(true), []);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  const handleCopyCode = useCallback((code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    trackEvent("onecart_promo_code_copy", { code, source: "home_hero" });
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2200);
  }, []);

  // Stagger container: direction-aware slide-in, children stagger on enter
  const wrapVariants = useMemo(
    () => ({
      hidden: (dir) => ({
        opacity: 0,
        x: reduceMotion ? 0 : dir > 0 ? 52 : -52,
      }),
      show: {
        opacity: 1,
        x: 0,
        transition: {
          duration: reduceMotion ? 0.1 : 0.55,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: reduceMotion ? 0 : 0.075,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
      exit: (dir) => ({
        opacity: 0,
        x: reduceMotion ? 0 : dir > 0 ? -36 : 36,
        transition: { duration: reduceMotion ? 0.1 : 0.28, ease: [0.55, 0, 1, 0.45] },
      }),
    }),
    [reduceMotion]
  );

  // Each child item rises in from below
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.1 : 0.5, ease: [0.22, 1, 0.36, 1] },
      },
      exit: { opacity: 0, y: reduceMotion ? 0 : -10 },
    }),
    [reduceMotion]
  );

  const slideLabel = useMemo(
    () =>
      `${String(selectedIndex + 1).padStart(2, "0")} / ${String(slideCount).padStart(2, "0")}`,
    [selectedIndex, slideCount]
  );

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#0d1117] text-white"
      aria-label="Featured campaigns"
    >
      {/* Embla viewport — images */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {HERO_SLIDES.map((slide, index) => (
            <HeroSlideBackground
              key={slide.id}
              slide={slide}
              index={index}
              isActive={index === selectedIndex}
              onFirstMediaLoad={onFirstMediaLoad}
            />
          ))}
        </div>
      </div>

      {/* Initial load mask */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15] bg-[#0d1117]"
        initial={false}
        animate={{ opacity: heroReady ? 0 : 0.55 }}
        transition={{ duration: 0.55 }}
        aria-hidden
      />

      {/* Slide counter — top right */}
      <div
        className="pointer-events-none absolute top-5 right-5 z-30 hidden sm:flex items-center gap-1.5 select-none"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={selectedIndex}
            className="text-white font-mono font-bold text-sm tabular-nums"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            {String(selectedIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className="text-white/40 font-mono text-xs">/</span>
        <span className="text-white/40 font-mono text-xs tabular-nums">
          {String(slideCount).padStart(2, "0")}
        </span>
      </div>

      {/* Content overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div className="pointer-events-auto mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={wrapVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-2xl"
            >
              {/* Eyebrow with decorative accent */}
              <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 flex-shrink-0 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">
                  {active.eyebrow}
                </p>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="font-titleFont text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white"
              >
                <span className="block">{active.title}</span>
                <span className="mt-1 block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {active.titleAccent}
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-white/72"
              >
                {active.subtitle}
              </motion.p>

              {/* Thumb strip */}
              {Array.isArray(active.thumbStrip) && active.thumbStrip.length > 0 && (
                <motion.div variants={itemVariants} className="mt-5 flex gap-2.5">
                  {active.thumbStrip.map((src, i) => (
                    <motion.img
                      key={`${src}-${i}`}
                      src={src}
                      alt=""
                      className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl border-2 border-white/25 object-cover shadow-xl"
                      loading="lazy"
                      decoding="async"
                      onError={handleHeroImageError}
                      whileHover={{ scale: 1.12, borderColor: "rgba(251,146,60,0.7)" }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Promo code */}
              {active.code && (
                <motion.div variants={itemVariants} className="mt-5">
                  <button
                    type="button"
                    onClick={() => handleCopyCode(active.code)}
                    className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.06] px-5 py-3.5 text-left backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/30 transition-all w-full max-w-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-white/50 mb-0.5">
                        {active.codeHint}
                      </p>
                      <p className="font-mono text-xl font-bold tracking-[0.22em] text-yellow-300 truncate">
                        {active.code}
                      </p>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={copied ? "copied" : "copy"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className={`text-[10px] font-bold uppercase tracking-widest flex-shrink-0 ${
                          copied ? "text-green-400" : "text-white/40 group-hover:text-white/70"
                        } transition-colors`}
                      >
                        {copied ? "Copied!" : "Tap to copy"}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </motion.div>
              )}

              {/* CTA buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to={active.primaryTo}
                  onClick={() => trackEvent(active.primaryEvent.name, active.primaryEvent.params)}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 px-7 py-3 text-sm font-bold text-white shadow-xl transition-all hover:scale-105 hover:-translate-y-0.5 hover:shadow-orange-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                >
                  {active.primaryCta}
                </Link>
                <Link
                  to={active.secondaryTo}
                  onClick={() => trackEvent(active.secondaryEvent.name, active.secondaryEvent.params)}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-white/30 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/[0.1] hover:border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {active.secondaryCta}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev arrow */}
      <motion.button
        type="button"
        onClick={scrollPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-3 md:left-5 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/15 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-sm" />
      </motion.button>

      {/* Next arrow */}
      <motion.button
        type="button"
        onClick={scrollNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-3 md:right-5 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/15 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-sm" />
      </motion.button>

      {/* Bottom control bar: slide label + progress bars */}
      <div className="relative z-30 border-t border-white/10 bg-[#0d1117]/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto max-w-container flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={selectedIndex}
              className="hidden sm:block text-xs font-mono tabular-nums text-white/35 shrink-0 w-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden
            >
              {slideLabel}
            </motion.span>
          </AnimatePresence>
          <HeroProgressBars
            slides={HERO_SLIDES}
            selectedIndex={selectedIndex}
            onPick={scrollTo}
          />
        </div>
      </div>
    </section>
  );
}
