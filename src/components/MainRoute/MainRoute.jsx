import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const MainRoute = () => {
	return (
		<>
		<ScrollToTop />
			<Navbar />
			<main id="main-content">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainRoute;
