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
