import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Ayesha — Karachi",
    text: "COD was smooth and the earbuds arrived in 3 days. Packaging looked legit.",
    rating: 5,
  },
  {
    name: "Hassan — Lahore",
    text: "Finally one cart instead of five apps. Deals under 999 actually hit different.",
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
    appendDots: (dots) => (
      <div className="review-carousel-dots mt-6 flex justify-center">
        <ul className="m-0 flex list-none flex-row flex-wrap items-center justify-center gap-2 p-0">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        type="button"
        className="review-carousel-dot"
        aria-label={`Go to review ${i + 1}`}
      />
    ),
  };

  return (
    <div className="max-w-container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-titleFont text-slate-900">
          Real orders.{" "}
          <span className="text-orange-600">Real reviews.</span>
        </h2>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto">
          Young shoppers across Pakistan are checking out with Amacific.
        </p>
      </div>
      <div className="review-carousel max-w-2xl mx-auto">
        <Slider {...settings}>
          {reviews.map((r, i) => (
            <div key={i} className="px-2">
              <div className="review-slide-inner bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                <div className="flex justify-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className={j < r.rating ? "" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-6 font-bold text-slate-900">{r.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
