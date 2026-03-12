import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const OfferHome = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const offers = products.filter(
      (p) => p.offerPrice && p.offerPrice < p.price
    );
    setFilteredProducts(offers);
    setLoading(false);
  }, []);

  return (
    <Container>
      <div className="py-6 sm:py-8">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            🎉 Special Offers
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
            Get amazing deals on selected products
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E771A3]" />
          </div>
        )}

        {/* Slider */}
        {!loading && filteredProducts.length > 0 && (
          <div className="px-2 sm:px-4">

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              loop={filteredProducts.length > 3}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: ".offers-pagination",
              }}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {filteredProducts.map((product) => {
                const discount = getDiscountPercentage(
                  product.price,
                  product.offerPrice
                );

                return (
                  <SwiperSlide key={product.id}>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">

                      {/* Image */}
                      <div className="relative overflow-hidden rounded-t-xl aspect-[4/5]">
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </Link>

                        {/* Discount */}
                        <div className="absolute top-2 right-2 bg-[#E771A3] text-white px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-bold">
                          {discount}% OFF
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4">

                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 hover:text-[#E771A3] truncate">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 h-8">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg sm:text-xl font-bold text-[#E771A3]">
                            ৳{product.offerPrice}
                          </span>

                          <span className="text-gray-400 line-through text-xs sm:text-sm">
                            ৳{product.price}
                          </span>
                        </div>

                        {/* Button */}
                        <Link
                          to={`/products/${product.id}`}
                          className="block mt-3 text-center bg-[#E771A3] text-white py-2 rounded-lg hover:bg-[#d15f93] transition font-semibold text-xs sm:text-sm"
                        >
                          Grab Offer
                        </Link>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Pagination */}
            <div className="offers-pagination flex justify-center gap-2 mt-6"></div>

          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No offers available at the moment
            </p>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .offers-pagination .swiper-pagination-bullet{
              width:8px;
              height:8px;
              background:#F6D6DF;
              opacity:1;
              transition:all .3s ease;
            }

            .offers-pagination .swiper-pagination-bullet-active{
              background:#E771A3;
              width:24px;
              border-radius:5px;
            }
          `,
        }}
      />
    </Container>
  );
};

export default OfferHome;