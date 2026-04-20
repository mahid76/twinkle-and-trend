import { lazy, Suspense } from "react";
import Banner from "../../components/Banner/Banner";
// ✅ EAGER imports — both are above the fold on mobile
// OfferHome:    LCP image lives here (first offer product card)
// ProductsHome: second visible section, also has above-fold images
// Lazy-loading either would hide the LCP image behind an extra chunk download.
import OfferHome    from "../../components/OfferHome/OfferHome";
import ProductsHome from "../../components/ProductsHome/ProductsHome";

// BestSellingProducts is well below the fold — safe to lazy-load
const BestSellingProducts = lazy(
	() => import("../../components/BestSellingProducts/BestSellingProducts"),
);

// ✅ CLS FIX: Skeleton height approximates real content height.
// Old SectionLoader used h-48 (192px). BestSellingProducts is ~460px tall.
// The gap caused the footer to shift ~270px when it loaded → high CLS.
const BestSellingLoader = () => (
	<div
		className="max-w-7xl mx-auto py-8 px-4"
		aria-hidden="true"
		aria-label="লোড হচ্ছে"
	>
		<div className="h-8 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-8" />
		<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{[0, 1, 2, 3].map((i) => (
				<div key={i} className="bg-gray-100 animate-pulse rounded-xl aspect-[4/5]" />
			))}
		</div>
	</div>
);

const Home = () => (
	<>
		<Banner />
		<OfferHome />
		<ProductsHome />
		<Suspense fallback={<BestSellingLoader />}>
			<BestSellingProducts />
		</Suspense>
	</>
);

export default Home;
