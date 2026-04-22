
import { useEffect, useState, useCallback } from "react";
import OptimizedImage, { WIDTHS, SIZES } from "../ui/OptimizedImage";

// ⚠️  If you change SLIDES[0].src you MUST also update the
//     <link rel="preload"> href + imagesrcset in index.html
//     so the browser reuses the prefetched response.
const SLIDES = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776882223/banner01_jxboem.jpg",
    alt: "Twinkle and Trend — ট্রেন্ডি ফ্যাশন ও খেলনার অনলাইন শপ",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624339/banner02_dwqbyt.jpg",
    alt: "Twinkle and Trend — বিশেষ অফার ও নতুন কালেকশন",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624340/banner03_fro9sz.jpg",
    alt: "Twinkle and Trend — সেরা দামে কিনুন",
  },
];

const AUTOPLAY_DELAY = 3500;

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1)),
    []
  );

  useEffect(() => {
    const interval = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="প্রচারমূলক ব্যানার"
      aria-roledescription="carousel"
    >
      {/*
        ✅ CLS fix: aspect-ratio classes reserve the exact space
        before any image loads — no layout shift as slides appear.
        mobile → 16/9 (taller), desktop → 16/5 (shorter cinematic)
      */}
      <div className="relative w-full aspect-[16/9] md:aspect-[16/5]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
            aria-hidden={index !== current}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
       
            <OptimizedImage
              src={slide.src}
              alt={slide.alt}
              priority={index === 0}
              aspectRatio="16/9"
              widths={WIDTHS.banner}
              sizes={SIZES.banner}
              wrapClass="w-full h-full"
              className="object-cover select-none"
            />

            <div
              className="absolute bottom-2 right-2 md:bottom-4 md:right-4
                bg-black/70 text-white text-[8px] md:text-xs
                px-2 md:px-3 py-0.5 md:py-1.5 rounded
                select-none pointer-events-none"
              aria-hidden="true"
            >
              © Twinkle and Trend
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      {/* <div
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
      </div> */}
    </section>
  );
};

export default BannerSlider;
