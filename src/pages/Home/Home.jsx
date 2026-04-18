import { lazy, Suspense } from "react";
import Banner from "../../components/Banner/Banner";

// ✅ Below-fold components lazy load করা হচ্ছে
// Banner সবসময় eager — এটাই LCP element
// বাকিগুলো viewport-এ আসলে load হবে → initial JS parse কম → LCP দ্রুত
const OfferHome          = lazy(() => import("../../components/OfferHome/OfferHome"));
const ProductsHome       = lazy(() => import("../../components/ProductsHome/ProductsHome"));
const BestSellingProducts = lazy(() => import("../../components/BestSellingProducts/BestSellingProducts"));

const SectionLoader = () => (
  <div className="flex justify-center py-10" aria-hidden="true">
    <div className="animate-pulse h-48 bg-gray-100 rounded-lg w-full max-w-7xl mx-4" />
  </div>
);

const Home = () => {
  return (
    <>
      <Banner />
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
  );
};

export default Home;
