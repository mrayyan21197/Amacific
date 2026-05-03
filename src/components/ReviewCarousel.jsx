import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Ayesha — Karachi",
    text: "COD was smooth and the earbuds arrived in 3 days. Pakaging looked legit.",
    rating: 5,
  },
  {
    name: "Hassan — Lahore",
    text: "Finally one cart instead of five apps. Payday deals actually hit different.",
    rating: 5,
  },
  {
    name: "Zainab — Islamabad",
    text: "Verified seller badge helped me trust skincare. Will order again.",
    rating: 5,
  },
  {
    name: "Omar — Multan",
    text: "Student essentials section saved my semester prep. Fast WhatsApp reply too.",
    rating: 4,
  },
];

export default function ReviewCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5200,
    arrows: false,
  };

  return (
    <div className="max-w-container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-titleFont text-navy">
          Real orders. Real reviews.
        </h2>
        <p className="text-gray-600 mt-2">Young shoppers across Pakistan are checking out with Amacific.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <Slider {...settings}>
          {reviews.map((r, i) => (
            <div key={i} className="px-2 pb-8">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="flex justify-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className={j < r.rating ? "" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-6 font-bold text-navy">{r.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
