// // src/components/BestSellingProducts/BestSellingProducts.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import tr1 from "../../assets/t&tr1.JPEG";
// import tr2 from "../../assets/t&tr2.jpg";
// import tr3 from "../../assets/t&tr3.jpg";
// import tr4 from "../../assets/t&tr4.jpg";
// import tr5 from "../../assets/t&tr5.jpg";

// // ✅ Move settings outside component to avoid re-creation
// const settings = {
// 	customPaging: () => (
// 		<div className="w-3 h-3 rounded-full bg-[#7D8184]"></div>
// 	),
// 	dots: true,
// 	dotsClass: "custom_slider",
// 	infinite: true,
// 	speed: 500,
// 	slidesToShow: 4,
// 	slidesToScroll: 1,
// 	arrows: false,
// 	autoplay: true,
// 	autoplaySpeed: 2000,
// 	pauseOnHover: true,
// 	responsive: [
// 		{
// 			breakpoint: 1280,
// 			settings: {
// 				slidesToShow: 4,
// 				slidesToScroll: 1,
// 			},
// 		},
// 		{
// 			breakpoint: 1024,
// 			settings: {
// 				slidesToShow: 3,
// 				slidesToScroll: 1,
// 			},
// 		},
// 		{
// 			breakpoint: 768,
// 			settings: {
// 				slidesToShow: 2,
// 				slidesToScroll: 1,
// 			},
// 		},
// 		{
// 			breakpoint: 640,
// 			settings: {
// 				slidesToShow: 1,
// 				slidesToScroll: 1,
// 			},
// 		},
// 	],
// };

// const BestSellingProducts = () => {
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const mockProducts = [
// 			{
// 				id: 1,
// 				name: "Bag",
// 				price: 2999,
// 				image: tr1,
// 				rating: 4.5,
// 			},
// 			{
// 				id: 2,
// 				name: "Cat Doll",
// 				price: 599,
// 				image: tr2,
// 				rating: 4.2,
// 			},
// 			{
// 				id: 3,
// 				name: "Stanley",
// 				price: 399,
// 				image: tr3,
// 				rating: 4.8,
// 			},
// 			{
// 				id: 4,
// 				name: "Two Doll",
// 				price: 1999,
// 				image: tr4,
// 				rating: 4.6,
// 			},
// 			{
// 				id: 5,
// 				name: "Tashbih",
// 				price: 4999,
// 				image: tr5,
// 				rating: 4.7,
// 			},
// 		];

// 		setTimeout(() => {
// 			setProducts(mockProducts);
// 			setLoading(false);
// 		}, 1000);
// 	}, []);

// 	if (loading) {
// 		return (
// 			<div className="flex justify-center items-center py-12">
// 				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="container mx-auto px-4 py-12">
// 			<h2 className="text-3xl font-bold text-center mb-8">
// 				Best Selling Products
// 			</h2>

// 			<Slider {...settings}>
// 				{products.map((product) => (
// 					<div key={product.id} className="px-3">
// 						<div className="bg-white rounded-lg shadow-sm p-4">
// 							<Link to={`/products/${product.id}`}>
// 								<div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
// 									<img
// 										src={product.image}
// 										alt={product.name}
// 										className="max-h-full max-w-full object-contain"
// 									/>
// 								</div>
// 							</Link>

// 							<h3 className="text-lg font-bold text-gray-800 mb-2">
// 								{product.name}
// 							</h3>

// 							<p className="text-teal-500 font-bold mb-2">৳{product.price}</p>

// 							<div className="flex items-center mb-2">
// 								<span className="text-yellow-500">★</span>
// 								<span className="text-gray-600 text-sm ml-1">
// 									{product.rating}
// 								</span>
// 							</div>

// 							<button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 cursor-pointer w-full">
// 								Buy Now
// 							</button>
// 						</div>
// 					</div>
// 				))}
// 			</Slider>
// 		</div>
// 	);
// };

// export default BestSellingProducts;

// src/components/BestSellingProducts/BestSellingProducts.jsx


// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import tr1 from "../../assets/t&tr1.JPEG";
// import tr2 from "../../assets/t&tr2.jpg";
// import tr3 from "../../assets/t&tr3.jpg";
// import tr4 from "../../assets/t&tr4.jpg";
// import tr5 from "../../assets/t&tr5.jpg";

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 2500,
//   pauseOnHover: true,

//   slidesToShow: 4,
//   slidesToScroll: 1,

//   responsive: [
//     {
//       breakpoint: 1280,
//       settings: { slidesToShow: 4 },
//     },
//     {
//       breakpoint: 1024,
//       settings: { slidesToShow: 3 },
//     },
//     {
//       breakpoint: 768,
//       settings: { slidesToShow: 2 },
//     },
//     {
//       breakpoint: 480,
//       settings: { slidesToShow: 1 },
//     },
//   ],
// };


// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   pauseOnHover: true,

//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//     {
//       breakpoint: 640, // phone
//       settings: {
//         slidesToShow: 1,
//       },
//     },
//   ],
// };

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 2500,
//   pauseOnHover: true,

//   slidesToShow: 4,
//   slidesToScroll: 1,

//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//     {
//       breakpoint: 640,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         centerMode: false,
//         variableWidth: false
//       },
//     },
//   ],
// };

// const BestSellingProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const mockProducts = [
//       { id: 1, name: "Bag", price: 2999, image: tr1, rating: 4.5 },
//       { id: 2, name: "Cat Doll", price: 599, image: tr2, rating: 4.2 },
//       { id: 3, name: "Stanley", price: 399, image: tr3, rating: 4.8 },
//       { id: 4, name: "Two Doll", price: 1999, image: tr4, rating: 4.6 },
//       { id: 5, name: "Tashbih", price: 4999, image: tr5, rating: 4.7 },
//     ];

//     setTimeout(() => {
//       setProducts(mockProducts);
//       setLoading(false);
//     }, 800);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-16">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full max-w-7xl mx-auto px-4 py-12">

//       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10">
//         Best Selling Products
//       </h2>

//       <Slider {...settings}>
//         {products.map((product) => (
//           <div key={product.id} className="px-3 w-full">
//             <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">

//               <Link to={`/products/${product.id}`}>
//                 <div className="w-full h-52 sm:h-44 md:h-48 lg:h-52 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="max-h-full max-w-full object-contain"
//                   />
//                 </div>
//               </Link>

//               <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
//                 {product.name}
//               </h3>

//               <p className="text-teal-500 font-bold text-sm sm:text-base mb-1">
//                 ৳{product.price}
//               </p>

//               <div className="flex items-center mb-3">
//                 <span className="text-yellow-500">★</span>
//                 <span className="text-gray-600 text-xs sm:text-sm ml-1">
//                   {product.rating}
//                 </span>
//               </div>

//               <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition text-sm sm:text-base">
//                 Buy Now
//               </button>

//             </div>
//           </div>
//         ))}
//       </Slider>
//     </section>
//   );
// };

// export default BestSellingProducts;

import React from "react";
import Slider from "react-slick";

// Standard Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Component
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all text-black"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all text-black"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const BestSellerSlick = () => {
  const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 2, // Shows two items on desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1280, // Large screens
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 1024, // Tablets/Small Laptops
      settings: {
        slidesToShow: 1, // Drops to one for better readability
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }
  ]
};

  const products = [
    {
      id: 1,
      name: "Limited Edition Collector Car",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=1000",
      tag: "Trending"
    },
    {
      id: 2,
      name: "Holographic Rare Display Box",
      price: "$149.00",
      image: "img",
      tag: "Best Seller"
    },
	 {
      id: 3,
      name: "Holographic Rare D	isplay Box",
      price: "$1429.00",
      image: "img",
      tag: "Best Seller"
    }
  ];

  return (
    <div className="w-full bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Slider {...settings} className="product-slick-slider">
          {products.map((product) => (
            <div key={product.id} className="outline-none px-2">
              <div className=" flex flex-col md:flex-row items-center bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-80 md:h-[500px]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
				

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    {product.tag}
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 mt-4 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg">
                    Premium quality build with attention to every detail. Perfect for your growing showcase.
                  </p>
                  <div className="mt-8 flex items-center gap-6">
                    <span className="text-3xl font-bold text-slate-900">{product.price}</span>
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95">
                      Buy Now
                    </button>
                  </div>
                </div>

              </div>
			  
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSellerSlick;