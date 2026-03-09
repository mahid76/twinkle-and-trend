import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Build Modern Websites",
    desc: "Create fast and responsive websites with modern technologies.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    title: "Professional Web Development",
    desc: "We design and develop high-quality websites for your business.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "Grow Your Business Online",
    desc: "Reach more customers with powerful digital experiences.",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/50 text-center flex items-center">
            <div className="max-w-6xl mx-auto px-8  text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>

              <p className="text-gray-200 mb-6 max-w-lg">
                {slide.desc}
              </p>

              <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl">
                Buy now
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BannerSlider;