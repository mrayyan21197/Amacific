import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import SeoHead from "../../components/SeoHead";
import ProductGrid from "../../components/ProductGrid";
import StudentBundleBuilder from "../../components/StudentBundleBuilder";
import { filterUnder3000 } from "../../constants/catalog";
import { trackEvent } from "../../utils/analytics";

export default function CampusCartChallenge() {
  React.useEffect(() => {
    trackEvent("campaign_page_visit", { campaign: "campus_cart_challenge" });
  }, []);

  const products = filterUnder3000();

  const shareLinks = {
    tiktok: "https://www.tiktok.com/@amacific.pk",
    instagram: "https://www.instagram.com/amacific.pk",
    whatsapp: "https://wa.me/?text=" + encodeURIComponent("I'm building my Campus Cart Challenge on Amacific — one cart under PKR 3,000! #CampusCartChallenge @amacific.pk"),
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Campus Cart Challenge — Student Deals Pakistan"
        description="Build a smart student cart under PKR 3,000. Post on TikTok or Instagram, tag @amacific.pk, use #CampusCartChallenge."
        keywords="student essentials Pakistan, campus deals PKR 3000, Amacific challenge"
        canonicalPath="/campaigns/campus-cart-challenge"
      />

      <section className="bg-orange-50 border-b border-orange-100 py-16 px-4">
        <div className="max-w-container mx-auto text-center">
          <p className="text-brandOrange-dark font-bold uppercase text-xs tracking-widest mb-2">Student tribe</p>
          <h1 className="text-3xl md:text-5xl font-titleFont font-bold text-navy max-w-3xl mx-auto">
            Build the Smartest Student Cart Under PKR 3,000
          </h1>
          <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
            Semester starting? We got you. Stack stationery, bottles, tech basics & backpacks — then flex your haul for the community.
          </p>
          <Link
            to="/student-essentials"
            className="mt-8 inline-flex px-10 py-4 rounded-full bg-navy text-white font-bold hover:bg-navy-deep"
          >
            Join the Challenge
          </Link>
        </div>
      </section>

      <section className="max-w-container mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-navy font-titleFont text-center mb-10">How it works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Build your cart", body: "Keep checkout total ≤ PKR 3,000 (before shipping)." },
            { step: "2", title: "Post", body: "Share your cart screenshot or mini haul on TikTok or Instagram Reels." },
            { step: "3", title: "Tag Amacific", body: "Mention @amacific.pk so we can find your entry." },
            { step: "4", title: "#CampusCartChallenge", body: "Weekly voucher winners announced on Stories." },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
              <span className="text-brandOrange font-black text-3xl">{s.step}</span>
              <h3 className="font-bold text-navy mt-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href={shareLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-bold">
            <SiTiktok /> TikTok
          </a>
          <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-orange-400 text-white font-bold">
            <FaInstagram /> Instagram
          </a>
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold">
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-container mx-auto">
          <StudentBundleBuilder />
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 py-12">
        <ProductGrid products={products} title="Ideas under PKR 3,000" />
      </div>

      <section className="border-t border-gray-100 py-10 px-4 text-center text-sm text-gray-600">
        <p>
          Weekly winner receives Amacific shopping vouchers. Official rules & timelines communicated via @amacific.pk — UGC subject to community guidelines.
        </p>
      </section>
    </div>
  );
}
