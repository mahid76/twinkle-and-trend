// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";

const Logo = ({ onClick }) => {
	return (
		<Link to="/" onClick={onClick}>
			<div className="flex items-center gap-3">
				<img
					src="https://res.cloudinary.com/dltlnoi9z/image/upload/w_200,q_auto,f_auto/v1776204520/logo_bs89oj.png"
					alt="Logo"
					width="80"
					height="80"
					className="h-10 w-auto"
					onContextMenu={(e) => e.preventDefault()}
					onDragStart={(e) => e.preventDefault()}
				/>
				<span className="md:text-2xl text-lg  font-primary font-bold">
					Twinkle and Trend
				</span>
			</div>
		</Link>
	);
};

export default Logo;
