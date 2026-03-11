import { useEffect, useState } from "react";

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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative w-full overflow-hidden h-[40vh] md:h-[60vh] lg:h-[80vh]">
			{slides.map((slide, index) => (
				<div
					key={slide.id}
					className={`absolute w-full h-full transition-opacity duration-700 ${
						index === current ? "opacity-100" : "opacity-0"
					}`}
				>
					<img
						draggable="false"
						onContextMenu={(e) => e.preventDefault()}
						onDragStart={(e) => e.preventDefault()}
						src={slide.image}
						alt=""
						className="w-full h-full object-cover"
					/>
				</div>
			))}
		</section>
	);
};

export default BannerSlider;
