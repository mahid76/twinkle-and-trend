import Banner from "../../components/Banner/Banner";
import BestSellingProducts from "../../components/BestSellingProducts/BestSellingProducts";
import OfferHome from "../../components/OfferHome/OfferHome";
import ProductsHome from "../../components/ProductsHome/ProductsHome";

const Home = () => {
	return (
		<>
			<Banner />
			<OfferHome />
			<ProductsHome />
			<BestSellingProducts />
		</>
	);
};

export default Home;
