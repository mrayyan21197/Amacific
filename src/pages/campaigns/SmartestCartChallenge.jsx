import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import SeoHead from "../../components/SeoHead";
import ProductGrid from "../../components/ProductGrid";
import StudentBundleBuilder from "../../components/StudentBundleBuilder";
import ReelStoryboardSection from "../../components/ReelStoryboardSection";
import { filterUnder3000, filterUnder999 } from "../../constants/catalog";
import { trackEvent } from "../../utils/analytics";

const shareText = encodeURIComponent(
  "I'm building Pakistan's Smartest Cart on Amacific — under PKR 3,000! #SmartestCartPakistan @amacific.pk"
);

const reelBeat = [
  { text: "Student says: “I have PKR 3,000.”" },
  { text: "Opens Amacific on their phone." },
  { text: "Adds notebook, earbuds, bottle, desk lamp, phone stand — all from one marketplace." },
  { text: "Cart total shows PKR 2,950 (example)." },
  { text: "Student says: “Can you beat my cart?”" },
  { text: "Final text: “Post your cart. Tag Amacific.”" },
];

export default function SmartestCartChallenge() {
  useEffect(() => {
    trackEvent("campaign_page_visit", { campaign: "smartest_cart_challenge" });
  }, []);

  const under999 = filterUnder999();
  const under3k = filterUnder3000();

  const wa = `https://wa.me/?text=${shareText}`;
  const ig = "https://www.instagram.com/amacific.pk";
  const tt = "https://www.tiktok.com/@amacific.pk";

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={"Pakistan's Smartest Cart Challenge | Amacific"}
        description="Build your Amacific cart under PKR 3,000, post it on TikTok or Instagram, and join #SmartestCartPakistan."
        keywords="smart cart Pakistan, student shopping challenge, Amacific TikTok"
        canonicalPath="/campaigns/smartest-cart-challenge"
      />

      <section className="border-b border-violet-100 bg-gradient-to-br from-navy via-navy-deep to-slate-900 py-16 text-white md:py-20">
        <div className="mx-auto max-w-container px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-300">#SmartestCartPakistan</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-titleFont text-3xl font-extrabold leading-tight md:text-5xl">
            Can You Build the Smartest Cart Under PKR 3,000?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Show Pakistan how smart you shop. Build your Amacific cart, post it on TikTok or Instagram, tag Amacific, and
            use #SmartestCartPakistan.
          </p>
          <Link
            to="/student-essentials"
            onClick={() => trackEvent("smartest_cart_cta_click", { cta: "start_building", source: "challenge_hero" })}
            className="mt-10 inline-flex rounded-full bg-orange-500 px-10 py-4 font-bold text-white shadow-lg hover:bg-orange-400"
          >
            Start Building My Cart
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-14">
        <h2 className="text-center font-titleFont text-2xl font-bold text-navy">How it works</h2>
        <ol className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {[
            "Build an Amacific cart under PKR 3,000 (before shipping).",
            "Screenshot or record your cart.",
            "Post it on TikTok or Instagram.",
            "Tag Amacific and use #SmartestCartPakistan.",
            "Weekly winners receive Amacific shopping vouchers.",
          ].map((body, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm font-medium text-slate-800 md:text-base">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-100 bg-white py-14">
        <div className="mx-auto max-w-container px-4">
          <h2 className="font-titleFont text-2xl font-bold text-navy">Challenge rules</h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
            <li>Cart total must be under PKR 3,000 (before shipping).</li>
            <li>Products must be from Amacific.</li>
            <li>Post must tag @amacific.pk.</li>
            <li>Hashtag #SmartestCartPakistan must be used.</li>
            <li>Account must be public during the campaign period.</li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-container px-4">
          <h2 className="font-titleFont text-2xl font-bold text-navy">Prize structure</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Weekly winner", "PKR 2,000 Amacific voucher"],
              ["Best student cart", "PKR 1,500 voucher"],
              ["Best creator cart", "PKR 1,500 voucher"],
              ["Most shared cart", "PKR 1,000 voucher"],
              ["Random participant", "PKR 500 voucher"],
            ].map(([t, v]) => (
              <li key={t} className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="font-bold text-navy">{t}</p>
                <p className="text-sm text-slate-600">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-14">
        <h2 className="font-titleFont text-2xl font-bold text-navy">Smart cart ideas</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Student cart", "Hostel cart", "Creator cart", "Office cart", "Gift cart"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-900"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-container px-4 py-8">
        <ProductGrid products={under999} title="Products under PKR 999" analyticsList="product_under_999_click" />
      </div>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-container px-4">
          <StudentBundleBuilder />
        </div>
      </section>

      <div className="mx-auto max-w-container px-4 py-12">
        <ProductGrid products={under3k} title="Ideas under PKR 3,000" />
      </div>

      <section className="border-t border-slate-100 py-14">
        <div className="mx-auto max-w-container px-4 text-center">
          <h2 className="font-titleFont text-xl font-bold text-navy">Share the challenge</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("challenge_share_whatsapp", { campaign: "smartest_cart" })}
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white"
            >
              <FaWhatsapp className="text-xl" /> Share on WhatsApp
            </a>
            <a
              href={tt}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("challenge_share_tiktok", { campaign: "smartest_cart" })}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-bold text-white"
            >
              <SiTiktok className="text-xl" /> TikTok
            </a>
            <a
              href={ig}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("challenge_share_instagram", { campaign: "smartest_cart" })}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-orange-400 px-6 py-3 font-bold text-white"
            >
              <FaInstagram className="text-xl" /> Instagram
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-container px-4">
          <h2 className="font-titleFont text-2xl font-bold">UGC gallery</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Participant carts and reels will appear here as the challenge grows — tag #SmartestCartPakistan to be featured.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-medium text-slate-400"
              >
                Coming soon
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReelStoryboardSection title="Reel idea: Can you beat my cart?" cards={reelBeat} className="border-t border-slate-100" />

      <section className="mx-auto max-w-container px-4 py-14">
        <h2 className="font-titleFont text-xl font-bold text-navy">FAQ</h2>
        <dl className="mt-8 space-y-6 text-slate-700">
          <div>
            <dt className="font-bold text-navy">How do I join the challenge?</dt>
            <dd className="mt-1 text-sm">Build a cart under PKR 3,000 on Amacific, post publicly, tag us, and use the hashtag.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy">Can I participate more than once?</dt>
            <dd className="mt-1 text-sm">Yes — each qualifying post can count; check official rules on @amacific.pk for limits.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy">How are winners selected?</dt>
            <dd className="mt-1 text-sm">Our team reviews creativity, value, and adherence to rules; some prizes are random draws.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy">When will winners be announced?</dt>
            <dd className="mt-1 text-sm">Weekly highlights on Instagram Stories — DM winners for voucher codes.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy">Can I use discount codes in my cart?</dt>
            <dd className="mt-1 text-sm">Yes, unless a specific challenge week says otherwise — cart total must stay under PKR 3,000 after codes.</dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-slate-100 py-10 text-center text-sm text-slate-500">
        <p>Official rules and timelines are communicated via @amacific.pk. UGC is subject to platform community guidelines.</p>
      </section>
    </div>
  );
}
