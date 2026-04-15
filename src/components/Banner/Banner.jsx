// src/components/Banner/Banner.jsx
import { useEffect, useState } from "react";

const slides = [
  { id: 1, image: "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776204517/banner02_wo7t1v.png", title: "Twinkle and Trend — ট্রেন্ডি ফ্যাশন ও খেলনার অনলাইন শপ" },
  { id: 2, image: "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776204518/banner03_iq555e.png", title: "Twinkle and Trend — Professional Web Development" },
  { id: 3, image: "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776204519/banner04_lfljho.png", title: "Twinkle and Trend — Grow Your Business Online" },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Promotional banner slideshow"
    >
      <div className="relative w-full h-[20vh] md:h-[60vh] lg:h-[80vh]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            role="img"
            aria-label={slide.title}
            aria-hidden={index !== current}
            className={`absolute w-full h-full transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              // ✅ First image eager (LCP), rest lazy
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "low"}
              decoding={index === 0 ? "sync" : "async"}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover"
              width="1920"
              height="800"
            />
            {/* Watermark */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black/70 text-white text-[8px] md:text-xs px-2 md:px-3 md:py-2 py-1 rounded select-none pointer-events-none">
              © Twinkle and Trend
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Dot navigation — accessible */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
        role="tablist"
        aria-label="Banner navigation"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === current}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white ${
              index === current
                ? "bg-white w-6 h-2"
                : "bg-white/50 w-2 h-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
