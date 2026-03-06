import { Outlet } from "react-router";
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer";
const MainRoute = () => {
	return (
		<div>
			
			<Outlet />
			<Footer />
		</div>
	);
};

export default MainRoute;
