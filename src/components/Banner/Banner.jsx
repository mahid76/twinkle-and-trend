// src/components/Banner/Banner.jsx
import { useEffect, useState } from "react";

// ✅ FIX: f_webp explicit — f_auto কে বিশ্বাস করা যায় না
// f_webp সরাসরি WebP deliver করে, browser header এর উপর depend করে না
const cld = (publicPath, width) =>
  `https://res.cloudinary.com/dltlnoi9z/image/upload/f_webp,q_auto,w_${width}/${publicPath}`;

// Banner image public paths (version + filename)
const SLIDES = [
  {
    id: 1,
    path: "v1776519117/banner01_ij04eq.jpg",
    title: "Twinkle and Trend — ট্রেন্ডি ফ্যাশন ও খেলনার অনলাইন শপ",
  },
  {
    id: 2,
    path: "v1776519117/banner02_ppnje0.jpg",
    title: "Twinkle and Trend — বিশেষ অফার ও নতুন কালেকশন",
  },
  {
    id: 3,
    path: "v1776519117/banner03_obrerl.jpg",
    title: "Twinkle and Trend — সেরা দামে কিনুন",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="প্রচারমূলক ব্যানার"
    >
      {/* ✅ CLS Fix: aspect-ratio দিয়ে space reserve — layout shift হবে না */}
      <div className="relative w-full aspect-[16/9] md:aspect-[16/5]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== current}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              // ✅ f_webp explicitly — Cloudinary কে force করা হচ্ছে WebP দিতে
              src={cld(slide.path, 1920)}
              srcSet={`
                ${cld(slide.path, 768)} 768w,
                ${cld(slide.path, 1200)} 1200w,
                ${cld(slide.path, 1920)} 1920w
              `}
              sizes="100vw"
              alt={slide.title}
              // ✅ LCP Fix: প্রথম image → eager + high priority + sync decode
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover"
              width="1920"
              height="600"
            />
            <div
              className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black/70 text-white text-[8px] md:text-xs px-2 md:px-3 md:py-2 py-1 rounded select-none pointer-events-none"
              aria-hidden="true"
            >
              © Twinkle and Trend
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
        role="tablist"
        aria-label="ব্যানার নেভিগেশন"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === current}
            aria-label={`স্লাইড ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
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
