import { lazy, Suspense, useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";

const OfferHome = lazy(() => import("../../components/OfferHome/OfferHome"));
const ProductsHome = lazy(() => import("../../components/ProductsHome/ProductsHome"));
const BestSellingProducts = lazy(() => import("../../components/BestSellingProducts/BestSellingProducts"));

const SectionLoader = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="animate-pulse h-48 bg-gray-100 rounded-lg w-full max-w-7xl mx-4" />
  </div>
);

const Home = () => {
  const [showSections, setShowSections] = useState(false);

  // ⛳️ load below-fold ONLY after page is idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true);
    }, 1500); // ⬅️ delay to protect LCP

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ✅ LCP element */}
      <Banner />

      {/* ✅ Delay loading → LCP faster */}
      {showSections && (
        <>
          <Suspense fallback={<SectionLoader />}>
            <OfferHome />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ProductsHome />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <BestSellingProducts />
          </Suspense>
        </>
      )}
    </>
  );
};

export default Home;