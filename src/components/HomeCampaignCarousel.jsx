import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

const AUTOPLAY_MS = 6000;

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
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=85&w=2400&auto=format&fit=crop",
    glowFrom: "from-violet-600/90",
    glowVia: "via-fuchsia-500/40",
    glowTo: "to-orange-500/30",
    orbA: "bg-violet-500/50",
    orbB: "bg-orange-400/35",
    micro: "hashtags",
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
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=85&w=2400&auto=format&fit=crop",
    glowFrom: "from-teal-950/88",
    glowVia: "via-indigo-950/58",
    glowTo: "to-violet-800/48",
    orbA: "bg-emerald-400/38",
    orbB: "bg-violet-500/36",
    micro: "grid",
    /** Frosted card like other slides, plus collage strip + emerald story accents */
    panelVariant: "student",
    thumbStrip: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540959733332-eab4deab21af?q=80&w=400&auto=format&fit=crop",
    ],
    /** Slightly tame full-bleed photo so dark glass card stays readable */
    mediaClass: "brightness-[0.82] contrast-[1.06]",
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
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=85&w=2400&auto=format&fit=crop",
    glowFrom: "from-slate-900/90",
    glowVia: "via-violet-600/45",
    glowTo: "to-orange-500/35",
    orbA: "bg-sky-400/30",
    orbB: "bg-violet-500/40",
    micro: "scan",
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
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=85&w=2400&auto=format&fit=crop",
    glowFrom: "from-fuchsia-700/80",
    glowVia: "via-orange-400/30",
    glowTo: "to-violet-900/40",
    orbA: "bg-pink-400/35",
    orbB: "bg-orange-300/25",
    micro: "shimmer",
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
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=85&w=2400&auto=format&fit=crop",
    glowFrom: "from-violet-800/88",
    glowVia: "via-amber-500/35",
    glowTo: "to-orange-600/38",
    orbA: "bg-amber-400/40",
    orbB: "bg-violet-500/45",
    micro: "pulse",
  },
];

function wrapIndex(i, len) {
  return ((i % len) + len) % len;
}

const FloatingParticles = memo(function FloatingParticles({ micro, reduced }) {
  const nodes = useMemo(() => {
    const count = reduced ? 4 : 14;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.sin(i * 2.1) * 0.5 + 0.5) * 100,
      y: (Math.cos(i * 1.7) * 0.5 + 0.5) * 100,
      s: 3 + (i % 5),
      d: 12 + (i % 8) * 3,
    }));
  }, [reduced]);

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {nodes.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/15"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {nodes.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/25 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
          }}
          animate={{
            y: [0, micro === "hashtags" ? -18 : -12, 0],
            x: micro === "hashtags" ? [0, 6, 0] : [0, -4, 0],
            opacity: [0.25, 0.55, 0.25],
            scale: [1, micro === "pulse" ? 1.4 : 1.15, 1],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.id * 0.35,
          }}
        />
      ))}
    </div>
  );
});

const MicroLayer = memo(function MicroLayer({ micro, darkGrid }) {
  if (micro === "grid") {
    const line = darkGrid ? "rgba(15,23,42,0.45)" : "rgba(255,255,255,0.45)";
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
    );
  }
  if (micro === "scan") {
    return (
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent"
        animate={{ top: ["-20%", "120%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
    );
  }
  return null;
});

const HeroEmblaSlide = memo(
  function HeroEmblaSlide({ slide, index, isActive, reduceMotion, onFirstMediaLoad }) {
    const studentHero = slide.panelVariant === "student";
    return (
      <div
        className="relative min-h-[min(92vh,640px)] min-w-0 flex-[0_0_100%] select-none"
        data-slide-id={slide.id}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: isActive ? (reduceMotion ? 1.04 : 1.09) : 1,
          }}
          transition={{
            duration: reduceMotion ? 0.2 : 1.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover ${slide.mediaClass || ""}`}
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={index === 0 && onFirstMediaLoad ? onFirstMediaLoad : undefined}
          />
        </motion.div>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.glowFrom} ${slide.glowVia} ${slide.glowTo}`}
          aria-hidden
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            studentHero
              ? "from-slate-950 via-slate-950/72 to-slate-950/35"
              : "from-slate-950 via-slate-950/55 to-slate-950/20"
          }`}
          aria-hidden
        />
        <MicroLayer micro={slide.micro} darkGrid={false} />
        <motion.div
          className={`pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl ${slide.orbA}`}
          animate={reduceMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.div
          className={`pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full blur-3xl ${slide.orbB}`}
          animate={reduceMotion ? {} : { scale: [1.08, 1, 1.08], opacity: [0.3, 0.48, 0.3] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <FloatingParticles micro={slide.micro} reduced={!!reduceMotion} />
      </div>
    );
  },
  (prev, next) =>
    prev.slide.id === next.slide.id &&
    prev.index === next.index &&
    prev.isActive === next.isActive &&
    prev.reduceMotion === next.reduceMotion &&
    prev.onFirstMediaLoad === next.onFirstMediaLoad
);

const HeroCarouselDots = memo(function HeroCarouselDots({ slides, selectedIndex, onPick }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {slides.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onPick(i)}
          className={`group flex max-w-[140px] flex-1 items-center gap-2 rounded-full border px-3 py-2 text-left transition md:max-w-none md:flex-none md:px-4 ${
            i === selectedIndex
              ? "border-orange-400/60 bg-white/10 text-white shadow-[0_0_24px_-4px_rgba(249,115,22,0.45)]"
              : "border-transparent bg-white/5 text-slate-400 hover:border-white/15 hover:bg-white/10 hover:text-slate-100"
          }`}
          aria-label={`Go to slide ${i + 1}: ${s.title}`}
          aria-current={i === selectedIndex ? "true" : undefined}
        >
          <span
            className={`flex h-2 w-2 shrink-0 rounded-full transition ${
              i === selectedIndex ? "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)]" : "bg-slate-500 group-hover:bg-slate-300"
            }`}
          />
          <span className="hidden truncate text-xs font-semibold tracking-wide md:inline">{s.title.split(" ")[0]}</span>
        </button>
      ))}
    </div>
  );
});

export default function HomeCampaignCarousel() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const pointerRaf = useRef(0);
  const pointerPending = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);
  const [heroReady, setHeroReady] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow2X = useTransform(glowX, (x) => 100 - x * 0.6);
  const glow2Y = useTransform(glowY, (y) => 100 - y * 0.5);
  const glowMix = useSpring(0.42, { stiffness: 220, damping: 32 });
  const glowBackground = useMotionTemplate`radial-gradient(55% 45% at ${glowX}% ${glowY}%, rgba(249,115,22,0.24), transparent 62%), radial-gradient(42% 50% at ${glow2X}% ${glow2Y}%, rgba(139,92,246,0.2), transparent 55%)`;
  const sprX = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.4 });
  const sprY = useSpring(my, { stiffness: 120, damping: 22, mass: 0.4 });
  const rotX = useTransform(sprY, [0, 1], reduceMotion ? [0, 0] : [5.5, -5.5]);
  const rotY = useTransform(sprX, [0, 1], reduceMotion ? [0, 0] : [-6, 6]);
  const tiltStyle = useMotionTemplate`perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

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
      align: "center",
      duration: reduceMotion ? 0 : 28,
      skipSnaps: false,
    },
    [autoplayPlugin]
  );

  const slideCount = HERO_SLIDES.length;
  const active = HERO_SLIDES[selectedIndex];
  const prevPreview = HERO_SLIDES[wrapIndex(selectedIndex - 1, slideCount)];
  const nextPreview = HERO_SLIDES[wrapIndex(selectedIndex + 1, slideCount)];

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
    const t = setTimeout(() => setHeroReady(true), 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    HERO_SLIDES.forEach((s, i) => {
      if (i === 0) return;
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  useEffect(
    () => () => {
      if (pointerRaf.current) cancelAnimationFrame(pointerRaf.current);
    },
    []
  );

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

  const handlePointerMove = useCallback(
    (e) => {
      if (!sectionRef.current || reduceMotion) return;
      pointerPending.current = e;
      if (pointerRaf.current) return;
      pointerRaf.current = requestAnimationFrame(() => {
        pointerRaf.current = 0;
        const ev = pointerPending.current;
        if (!ev || !sectionRef.current) return;
        const r = sectionRef.current.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height));
        mx.set(px);
        my.set(py);
        glowX.set(px * 100);
        glowY.set(py * 100);
        glowMix.set(1);
      });
    },
    [glowMix, glowX, glowY, mx, my, reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
    glowX.set(50);
    glowY.set(50);
    glowMix.set(0.42);
  }, [glowMix, glowX, glowY, mx, my]);

  const contentVariants = useMemo(
    () => ({
      enter: (dir) => ({
        opacity: 0,
        y: reduceMotion ? 0 : dir >= 0 ? 28 : -28,
      }),
      center: { opacity: 1, y: 0 },
      exit: (dir) => ({
        opacity: 0,
        y: reduceMotion ? 0 : dir >= 0 ? -22 : 22,
      }),
    }),
    [reduceMotion]
  );

  const isStudentPanel = active.panelVariant === "student";

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-slate-950 text-white"
      aria-label="Featured campaigns"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.055] mix-blend-overlay amapacific-hero-grain"
        aria-hidden
      />
      <motion.div
        className="relative z-[1] will-change-transform"
        style={{ transform: tiltStyle }}
      >
        {/* Cursor glow: motion values only — avoids React re-render on every mousemove */}
        {reduceMotion ? (
          <div
            className="pointer-events-none absolute inset-0 z-[5] opacity-[0.3]"
            style={{
              background:
                "radial-gradient(55% 45% at 50% 42%, rgba(249,115,22,0.2), transparent 62%), radial-gradient(42% 50% at 62% 58%, rgba(139,92,246,0.16), transparent 55%)",
            }}
            aria-hidden
          />
        ) : (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{ background: glowBackground, opacity: glowMix }}
            aria-hidden
          />
        )}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {HERO_SLIDES.map((slide, index) => (
              <HeroEmblaSlide
                key={slide.id}
                slide={slide}
                index={index}
                isActive={index === selectedIndex}
                reduceMotion={!!reduceMotion}
                onFirstMediaLoad={onFirstMediaLoad}
              />
            ))}
          </div>
        </div>

        {/* Loading veil */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[15] bg-slate-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: heroReady ? 0 : 0.85 }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: "none" }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-3 sm:px-5 md:px-8">
          <div className="pointer-events-auto relative mx-auto flex w-full max-w-container items-stretch justify-center gap-2 md:gap-5 lg:gap-8">
            {/* Side preview — desktop */}
            <button
              type="button"
              onClick={() => scrollPrev()}
              className="group relative mt-10 hidden h-[min(46vh,304px)] min-h-[248px] w-[72px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 backdrop-blur-md transition hover:border-white/25 hover:bg-slate-800 lgl:block"
              aria-label={`Previous: ${prevPreview.title}`}
            >
              <img
                src={prevPreview.image}
                alt=""
                className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 transition duration-300 group-hover:opacity-[0.88] group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/25" />
              <span className="pointer-events-none absolute bottom-3 left-1/2 z-[2] w-[90%] -translate-x-1/2 text-center text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-md">
                Prev
              </span>
            </button>

            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative overflow-hidden rounded-3xl p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-8 md:p-10 md:rounded-[2rem] ${
                    isStudentPanel
                      ? "border border-emerald-500/35 bg-gradient-to-br from-slate-950/[0.94] via-slate-900/[0.92] to-indigo-950/88 ring-2 ring-white/10 shadow-[0_32px_100px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.09)]"
                      : "border border-white/15 bg-white/[0.08] ring-1 ring-white/10"
                  }`}
                >
                  {isStudentPanel && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[4px] bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(52,211,153,0.14),transparent_52%)]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute -right-14 top-1/4 z-0 h-44 w-44 rounded-full bg-emerald-500/25 blur-3xl"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute -bottom-16 -left-12 z-0 h-48 w-48 rounded-full bg-violet-600/30 blur-3xl"
                        aria-hidden
                      />
                    </>
                  )}
                  {active.micro === "shimmer" && !reduceMotion && (
                    <motion.div
                      className="pointer-events-none absolute -inset-full z-0 rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
                      animate={{ x: ["-40%", "140%"] }}
                      transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2 }}
                      aria-hidden
                    />
                  )}
                  {active.micro === "pulse" && (
                    <motion.div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-400/30 blur-2xl"
                      animate={reduceMotion ? {} : { scale: [1, 1.35, 1], opacity: [0.35, 0.65, 0.35] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      aria-hidden
                    />
                  )}
                  {isStudentPanel && (
                    <motion.div
                      className="pointer-events-none absolute -right-6 top-16 z-0 h-28 w-28 rounded-full bg-teal-400/25 blur-2xl md:h-36 md:w-36"
                      animate={reduceMotion ? {} : { opacity: [0.3, 0.5, 0.3], scale: [1, 1.12, 1] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    />
                  )}

                  <div className="relative z-[1]">
                    {isStudentPanel && Array.isArray(active.thumbStrip) && active.thumbStrip.length > 0 && (
                      <div className="mb-6 rounded-2xl border border-white/12 bg-black/35 p-3 shadow-inner shadow-black/40 backdrop-blur-md sm:p-4">
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          <div className="flex -space-x-2 sm:-space-x-3">
                            {active.thumbStrip.map((src, i) => (
                              <div
                                key={`${src}-${i}`}
                                className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-xl border-2 border-emerald-400/50 bg-slate-950 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.85)] ring-2 ring-black/40 sm:h-[58px] sm:w-[58px]"
                                style={{ zIndex: active.thumbStrip.length - i }}
                              >
                                <img
                                  src={src}
                                  alt=""
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="min-w-0 flex-1 border-l border-emerald-500/35 pl-3 sm:pl-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                              Campus cart edits
                            </p>
                            <p className="mt-1 text-xs leading-snug text-slate-100">
                              Desk · tech · bags — stack under-budget picks in one cart.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <p
                      className={`mb-3 text-[11px] font-bold uppercase tracking-[0.28em] sm:text-xs ${
                        isStudentPanel ? "text-teal-300" : "text-orange-300/95"
                      }`}
                    >
                      {active.eyebrow}
                    </p>
                    <h2 className="font-titleFont text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
                      <span className={isStudentPanel ? "[text-shadow:0_2px_24px_rgba(0,0,0,0.55)]" : ""}>
                        {active.title}
                      </span>
                      <span
                        className={
                          isStudentPanel
                            ? "mt-1 block bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-400 bg-clip-text font-extrabold text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]"
                            : "mt-1 block bg-gradient-to-r from-orange-300 via-amber-200 to-violet-200 bg-clip-text text-transparent"
                        }
                      >
                        {active.titleAccent}
                      </span>
                    </h2>
                    <p
                      className={`mt-4 max-w-prose text-sm leading-relaxed sm:text-base ${
                        isStudentPanel ? "text-slate-200/98 [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]" : "text-slate-200/90"
                      }`}
                    >
                      {active.subtitle}
                    </p>

                    {active.code && (
                      <div className="mt-5 rounded-2xl border border-violet-300/25 bg-violet-950/40 px-4 py-3 text-sm font-semibold text-violet-100 backdrop-blur-sm">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(active.code).catch(() => {});
                            trackEvent("onecart_promo_code_copy", { code: active.code, source: "home_hero" });
                          }}
                          className="w-full text-left"
                        >
                          {active.codeHint}
                          <span className="mt-1 block font-mono text-lg tracking-[0.2em] text-orange-200">
                            {active.code}
                          </span>
                          <span className="text-xs font-medium text-violet-300/90">Tap to copy</span>
                        </button>
                      </div>
                    )}

                    <motion.div
                      className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: {
                          transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: reduceMotion ? 0 : 0.12 },
                        },
                      }}
                    >
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 14 },
                          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 22 } },
                        }}
                      >
                        <Link
                          to={active.primaryTo}
                          onClick={() => trackEvent(active.primaryEvent.name, active.primaryEvent.params)}
                          className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-full px-8 py-3.5 text-center text-sm font-bold text-white shadow-[0_12px_40px_-8px_rgba(234,88,12,0.52)] ring-2 transition hover:brightness-110 sm:w-auto ${
                            isStudentPanel
                              ? "bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 ring-orange-300/45"
                              : "bg-gradient-to-r from-orange-500 to-orange-400 ring-white/20"
                          }`}
                        >
                          {active.primaryCta}
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 14 },
                          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 24 } },
                        }}
                      >
                        <Link
                          to={active.secondaryTo}
                          onClick={() => trackEvent(active.secondaryEvent.name, active.secondaryEvent.params)}
                          className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 px-8 py-3.5 text-center text-sm font-bold backdrop-blur-sm transition sm:w-auto ${
                            isStudentPanel
                              ? "border-teal-400/90 bg-slate-950/55 text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] hover:border-amber-300/95 hover:bg-slate-900/75 hover:text-amber-50"
                              : "border-white/25 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {active.secondaryCta}
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => scrollNext()}
              className="group relative mt-10 hidden h-[min(46vh,304px)] min-h-[248px] w-[72px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 backdrop-blur-md transition hover:border-white/25 hover:bg-slate-800 lgl:block"
              aria-label={`Next: ${nextPreview.title}`}
            >
              <img
                src={nextPreview.image}
                alt=""
                className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 transition duration-300 group-hover:opacity-[0.88] group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/25" />
              <span className="pointer-events-none absolute bottom-3 left-1/2 z-[2] w-[90%] -translate-x-1/2 text-center text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-md">
                Next
              </span>
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-xl backdrop-blur-md transition hover:border-orange-400/50 hover:bg-slate-900/90 md:left-4 md:h-12 md:w-12 lgl:left-6"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-xl backdrop-blur-md transition hover:border-orange-400/50 hover:bg-slate-900/90 md:right-4 md:h-12 md:w-12 lgl:right-6"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </motion.div>

      {/* Progress + pagination */}
      <div className="relative z-30 border-t border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-container">
          <div
            className="mb-4 h-[3px] w-full overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(((selectedIndex + 1) / slideCount) * 100)}
            aria-label="Carousel autoplay progress"
          >
            <div
              key={`${selectedIndex}-${AUTOPLAY_MS}`}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 amapacific-hero-progress"
              style={reduceMotion ? { width: "100%" } : undefined}
            />
          </div>
          <HeroCarouselDots slides={HERO_SLIDES} selectedIndex={selectedIndex} onPick={scrollTo} />
        </div>
      </div>
    </section>
  );
}
