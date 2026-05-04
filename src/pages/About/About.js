import React from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import PaymentMethodIcons from "../../components/PaymentMethodIcons";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="About Amacific — Youth Marketplace Pakistan"
        description="Amacific is Pakistan’s Gen-Z marketplace for one-cart shopping with verified sellers and nationwide COD."
        canonicalPath="/about"
      />

      <div className="bg-navy text-white py-14 px-4">
        <div className="max-w-container mx-auto">
          <p className="text-brandOrange font-bold text-sm uppercase tracking-widest">Our story</p>
          <h1 className="text-3xl md:text-5xl font-titleFont font-bold mt-3 max-w-3xl">
            Pakistan’s youth-first one-stop online marketplace
          </h1>
          <p className="mt-6 text-white/80 max-w-2xl text-lg">
            One cart. Every need. We blend Daraz-level assortment thinking with brand storytelling built for TikTok, Instagram,
            and WhatsApp-native shoppers in Karachi, Lahore, Islamabad / Rawalpindi, Faisalabad, Multan & Hyderabad.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-14 grid md:grid-cols-2 gap-12">
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-navy font-titleFont">Why we exist</h2>
          <p>
            Urban youth shouldn’t juggle five apps for earbuds, eyeliner, and exam-season stationery. Amacific centralises curated marketplace sellers behind one trustworthy checkout with COD, JazzCash, Easypaisa, Raast, and cards.
          </p>
          <p>
            Campaigns like <strong>One Cart, Full Life</strong> and <strong>Pakistan&apos;s Smartest Cart Challenge</strong> mirror how students and young pros already discover brands on short-form video — real carts, real savings.
          </p>
        </section>
        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8 space-y-4">
          <h2 className="text-xl font-bold text-navy font-titleFont">Operational promises</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Verified seller badges & photo reviews</li>
            <li>City-aware delivery messaging</li>
            <li>7-day returns playbook on eligible SKUs</li>
            <li>Mailchimp-powered lifecycle email + WhatsApp CS</li>
          </ul>
          <PaymentMethodIcons />
        </section>
      </div>

      <div className="bg-brandOrange/10 border-y border-orange-100 py-10 px-4 text-center">
        <Link to="/campaigns/one-cart-full-life" className="inline-flex px-8 py-3 rounded-full bg-navy text-white font-bold hover:bg-navy-deep">
          Explore One Cart, Full Life
        </Link>
      </div>
    </div>
  );
};

export default About;
