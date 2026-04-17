// src/components/OfferHome/OfferHome.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useCart } from "../../context/CartContext";

// ✅ Cloudinary WebP
const cldWebp = (url, width) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace(/\/upload\/[^/]*\//, `/upload/f_webp,q_auto,w_${width}/`);
};

const OfferHome = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedMap, setAddedMap] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const offers = products.filter((p) => p.offerPrice && p.offerPrice < p.price);
    setFilteredProducts(offers);
    setLoading(false);
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, product.variants?.[0] ?? null, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 2000);
  };

  return (
    <Container>
      <section className="py-6 sm:py-8" aria-labelledby="special-offers-heading">
        <div className="text-center mb-6 sm:mb-10">
          <h2 id="special-offers-heading" className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">
            Special Offers
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
            Get amazing deals on selected products
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E771A3]" role="status" aria-label="লোড হচ্ছে" />
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="px-2 sm:px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={12}
              loop={filteredProducts.length > 3}
              autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, el: ".offers-pagination" }}
              a11y={{ enabled: true }}
              breakpoints={{
                0:   { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {filteredProducts.map((product, idx) => {
                const discount = getDiscountPercentage(product.price, product.offerPrice);
                const isAdded = addedMap[product.id];

                return (
                  <SwiperSlide key={product.id}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
                      <div className="relative overflow-hidden rounded-t-xl aspect-square sm:aspect-[4/5]">
                        <Link to={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
                          <img
                            src={cldWebp(product.image, 500)}
                            srcSet={`
                              ${cldWebp(product.image, 300)} 300w,
                              ${cldWebp(product.image, 500)} 500w,
                              ${cldWebp(product.image, 800)} 800w
                            `}
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                            alt={product.name}
                            loading={idx < 2 ? "eager" : "lazy"}
                            decoding="async"
                            width="500"
                            height="500"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </Link>
                        <div
                          className="absolute top-2 right-2 bg-[#E771A3] text-white px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-bold"
                          aria-label={`${discount}% ছাড়`}
                        >
                          {discount}% OFF
                        </div>
                      </div>

                      <div className="p-2 sm:p-4">
                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-xs sm:text-lg font-semibold text-gray-800 hover:text-[#E771A3] truncate">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-base sm:text-xl font-bold text-[#E771A3]">৳{product.offerPrice}</span>
                          <span className="text-gray-400 line-through text-[11px] sm:text-sm">৳{product.price}</span>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={product.stock === 0}
                          aria-label={isAdded ? "Cart এ যোগ হয়েছে" : `${product.name} cart এ যোগ করুন`}
                          className={`mt-2 w-full py-1.5 rounded-lg font-semibold text-[11px] sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
                            isAdded ? "bg-green-500 text-white" : "bg-[#E771A3] text-white hover:bg-[#d15f93]"
                          }`}
                        >
                          {isAdded ? (
                            <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>Added!</>
                          ) : (
                            <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="offers-pagination flex justify-center gap-2 mt-6" role="tablist" aria-label="Slide navigation" />
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No offers available at the moment</p>
          </div>
        )}
      </section>

      <style>{`
        .offers-pagination .swiper-pagination-bullet { width:8px; height:8px; background:#F6D6DF; opacity:1; transition:all .3s ease; }
        .offers-pagination .swiper-pagination-bullet-active { background:#E771A3; width:24px; border-radius:5px; }
      `}</style>
    </Container>
  );
};

export default OfferHome;
