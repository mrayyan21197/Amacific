import React from "react";
import SeoHead from "../components/SeoHead";
import ProductGrid from "../components/ProductGrid";
import StudentBundleBuilder from "../components/StudentBundleBuilder";
import MailchimpSignupForm from "../components/MailchimpSignupForm";
import CategorySeo from "../components/CategorySeo";
import { filterStudentEssentials } from "../constants/catalog";

export default function StudentEssentials() {
  const items = filterStudentEssentials();

  return (
    <div className="min-h-screen">
      <SeoHead
        title="Student Essentials Pakistan — Dorm & Campus Supplies"
        description="Best student essentials under PKR 3,000 in Pakistan: bottles, backpacks, stationery & lamps with COD."
        keywords="student essentials Pakistan, university supplies Pakistan, backpack PKR 3000"
        canonicalPath="/student-essentials"
      />

      <div className="bg-gradient-to-r from-navy to-indigo text-white py-12 px-4">
        <div className="max-w-container mx-auto">
          <h1 className="text-3xl md:text-4xl font-titleFont font-bold">Shop Student Essentials</h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Built for hostels in Karachi, FAST & NUST crowds in Islamabad, and Lahore commutes — verified sellers & fast Metro-city drops.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-12 space-y-12">
        <StudentBundleBuilder />
        <ProductGrid products={items} title="Semester-ready picks" />
        <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-bold text-navy">Student deals mailing list</h2>
            <p className="text-sm text-gray-600">Mailchimp automation: student segment + back-to-campus pushes.</p>
          </div>
          <MailchimpSignupForm tag="student_deals" audience="students" buttonLabel="Send deals" />
        </div>
      </div>

      <CategorySeo title="Student essentials online in Pakistan">
        <p>
          Shopping student essentials online in Pakistan should feel as easy as ordering food after midnight — Amacific bundles hostel staples,
          mobile accessories, and stationery so young shoppers in Karachi, Lahore, Islamabad, Faisalabad, Multan, and Hyderabad can rebuild a semester cart without hopping between five apps.
          Whether you need insulated bottles for humid afternoons or desk lamps for finals week crunch, filter budgets under PKR 3,000 and pair them with nationwide COD, JazzCash, Easypaisa, Raast, and secure cards.
          Bookmark this hub during payday waves for markdown bundles that mirror what performs on TikTok hauls and Instagram Stories.
        </p>
      </CategorySeo>
    </div>
  );
}
