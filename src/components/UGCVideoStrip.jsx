import React from "react";
import { FaInstagram, FaPlay } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const clips = [
  {
    title: "Unboxing Amacific",
    thumb: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    platform: "tiktok",
  },
  {
    title: "Campus haul under 3k",
    thumb: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop",
    platform: "instagram",
  },
  {
    title: "Tech accessories IG reel",
    thumb: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop",
    platform: "instagram",
  },
];

export default function UGCVideoStrip() {
  return (
    <section className="bg-gray-50 py-16 border-y border-gray-100">
      <div className="max-w-container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold font-titleFont text-navy">Campus unboxing moment</h2>
            <p className="text-gray-600 mt-2">
              Post your cart and tag <strong>@amacific.pk</strong> — we feature real shoppers here.
            </p>
          </div>
          <div className="flex gap-4 text-navy">
            <a href="https://www.tiktok.com/@amacific.pk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold hover:text-brandOrange">
              <SiTiktok /> TikTok
            </a>
            <a href="https://www.instagram.com/amacific.pk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold hover:text-brandOrange">
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {clips.map((c, i) => (
            <a
              key={i}
              href={c.platform === "tiktok" ? "https://www.tiktok.com/@amacific.pk" : "https://www.instagram.com/amacific.pk"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-[9/14] bg-gray-200 shadow-md"
            >
              <img src={c.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-navy shadow-lg">
                  <FaPlay className="ml-1" />
                </span>
              </div>
              <p className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm">{c.title}</p>
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-8">
          Replace these with embedded TikTok/Instagram players via embed URLs when your handles go live.
        </p>
      </div>
    </section>
  );
}
