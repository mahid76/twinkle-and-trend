
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import tr1 from "../../assets/t&tr1.JPEG";
import tr2 from "../../assets/t&tr2.jpg";
import tr3 from "../../assets/t&tr3.jpg";
import tr4 from "../../assets/t&tr4.jpg";
import tr5 from "../../assets/t&tr5.jpg";

const BestSellingProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const settings = {
		customPaging: () => (
			<div className="w-3 h-3 rounded-full bg-[#7D8184]"></div>
		),
		dots: true,
		dotsClass: "custom_slider",
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	useEffect(() => {
		const mockProducts = [
			{
				id: 1,
				name: "Bag",
				price: 2999,
				image: tr1,
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
				name: "Two Doll",
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
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				Best Selling Products
			</h2>

			<Slider {...settings}>
				{products.map((product) => (
					<div key={product.id} className="px-3">
						<div className="bg-white rounded-lg shadow-sm p-4">
							<Link to={`/products/${product.id}`}>
								<div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
									<img
										src={product.image}
										alt={product.name}
										className="max-h-full max-w-full object-contain"
									/>
								</div>
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

							<button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 cursor-pointer w-full">
								Buy Now
							</button>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default BestSellingProducts;
