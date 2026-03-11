// src/components/Banner/BannerSlider.jsx
import { useEffect, useState } from "react";
import banner02 from '../../assets/banner02.png'
import banner03 from '../../assets/banner03.png'
import banner04 from '../../assets/banner04.png'

const slides = [
	{
		id: 1,
		image: banner02,
		title: "Build Modern Websites",
		desc: "Create fast and responsive websites with modern technologies.",
	},
	{
		id: 2,
		image: banner03,
		title: "Professional Web Development",
		desc: "We design and develop high-quality websites for your business.",
	},
	{
		id: 3,
		image: banner04,
		title: "Grow Your Business Online",
		desc: "Reach more customers with powerful digital experiences.",
	},
];

const BannerSlider = () => {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative w-full overflow-hidden">
			{/* Responsive Height */}
			<div className="relative w-full h-[20vh] md:h-[60vh] lg:h-[80vh]">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute w-full h-full transition-opacity duration-700 ${
							index === current ? "opacity-100" : "opacity-0"
						}`}
					>
						{/* Image with Protection */}
						<img
							draggable="false"
							onContextMenu={(e) => e.preventDefault()}
							onDragStart={(e) => e.preventDefault()}
							src={slide.image}
							alt={slide.title}
							className="w-full h-full object-cover"
						/>
						
						{/* Watermark Overlay */}
						<div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded">
							© Twinkle and Trend
						</div>
					</div>
				))}
			</div>

			{/* Navigation Dots */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === current ? "bg-white w-8" : "bg-white/50"
						}`}
					/>
				))}
			</div>

			{/* Navigation Arrows */}
			{/* <button
				onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-all"
			>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button
				onClick={() => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-all"
			>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
				</svg>
			</button> */}
		</section>
	);
};

export default BannerSlider;