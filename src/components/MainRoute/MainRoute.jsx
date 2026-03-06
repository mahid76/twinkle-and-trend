import { Outlet } from "react-router";
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer";

const MainRoute = () => {
	return (
		<div>
			<Navbar />
      <Outlet />
			<Footer />
		</div>
	);
};

export default MainRoute;
