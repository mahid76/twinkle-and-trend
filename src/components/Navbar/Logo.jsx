// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Logo = ({ onClick }) => {
	return (
		<Link to="/" onClick={onClick}>
			<div className="flex items-center">
				<img
					draggable="false"
					onContextMenu={(e) => e.preventDefault()}
					onDragStart={(e) => e.preventDefault()}
					src={logo}
					alt="Logo"
					className="h-10 mr-4"
				/>
				<span className="md:text-2xl text-lg  font-primary font-bold">
					Twinkle and Trend
				</span>
			</div>
		</Link>
	);
};

export default Logo;
