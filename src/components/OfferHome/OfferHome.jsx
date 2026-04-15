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
import { clImg, clSrcSet } from "../../utils/cloudinaryImage";

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
    const defaultVariant = product.variants?.[0] ?? null;
    addToCart(product, defaultVariant, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(
      () => setAddedMap((prev) => ({ ...prev, [product.id]: false })),
      2000
    );
  };

  return (
    <Container>
      <div className="py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Special Offers
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
            Get amazing deals on selected products
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E771A3]" />
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="px-2 sm:px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={12}
              loop={filteredProducts.length > 3}
              autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, el: ".offers-pagination" }}
              breakpoints={{
                0:    { slidesPerView: 1 },
                480:  { slidesPerView: 1 },
                640:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {filteredProducts.map((product) => {
                const discount = getDiscountPercentage(product.price, product.offerPrice);
                const isAdded = addedMap[product.id];

                return (
                  <SwiperSlide key={product.id}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
                      <div className="relative overflow-hidden rounded-t-xl aspect-[4/4] sm:aspect-[4/5]">
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={clImg(product.image, 500)}
                            srcSet={clSrcSet(product.image, [500, 800])}
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                            width="500"
                            height="500"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </Link>
                        <div className="absolute top-2 right-2 bg-[#E771A3] text-white px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-bold">
                          {discount}% OFF
                        </div>
                      </div>

                      <div className="p-2 sm:p-4">
                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-xs sm:text-lg font-semibold text-gray-800 hover:text-[#E771A3] truncate">
                            {product.name}
                          </h3>
                        </Link>
                        {/* <p className="text-gray-500 text-[11px] sm:text-sm mt-1 line-clamp-2 h-7">
                          {product.description}
                        </p> */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-base sm:text-xl font-bold text-[#E771A3]">
                            ৳{product.offerPrice}
                          </span>
                          <span className="text-gray-400 line-through text-[11px] sm:text-sm">
                            ৳{product.price}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={product.stock === 0}
                          className={`mt-2 w-full py-1.5 rounded-lg font-semibold text-[11px] sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
                            isAdded
                              ? "bg-green-500 text-white"
                              : "bg-[#E771A3] text-white hover:bg-[#d15f93]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Added!
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="offers-pagination flex justify-center gap-2 mt-6" />
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No offers available at the moment</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .offers-pagination .swiper-pagination-bullet { width:8px; height:8px; background:#F6D6DF; opacity:1; transition:all .3s ease; }
        .offers-pagination .swiper-pagination-bullet-active { background:#E771A3; width:24px; border-radius:5px; }
      ` }} />
    </Container>
  );
};

export default OfferHome;
