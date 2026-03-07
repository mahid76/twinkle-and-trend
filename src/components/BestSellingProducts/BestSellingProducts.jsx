// src/components/BestSellingProducts/BestSellingProducts.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
import tr1 from '../../assets/t&tr1.JPEG'
import tr2 from "../../assets/t&tr2.jpg";
import tr3 from "../../assets/t&tr3.jpg";
import tr4 from "../../assets/t&tr4.jpg";
import tr5 from "../../assets/t&tr5.jpg";


const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: "Bag",
        price: 2999,
        image: tr1 ,
        rating: 4.5,
      },
      {
        id: 2,
        name: "Cat Doll",
        price: 599,
        image: tr2,
        rating: 4.2,
      },
      {
        id: 3,
        name: "Stanley",
        price: 399,
        image: tr3,
        rating: 4.8,
      },
      {
        id: 4,
        name: "Two doll",
        price: 1999,
        image: tr4,
        rating: 4.6,
      },
      {
        id: 5,
        name: "Tashbih",
        price: 4999,
        image: tr5,
        rating: 4.7,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-primary font-bold text-center mb-8">
        Best Selling Products
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              </Link>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-teal-500 font-bold mb-2">৳{product.price}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-600 text-sm ml-1">
                  {product.rating}
                </span>
              </div>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 w-full">
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellingProducts;