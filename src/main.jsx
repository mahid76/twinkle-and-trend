import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainRoute from "./components/MainRoute/MainRoute";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import DisableRightClick from "./components/layout/DisableRightClick";

// ✅ Lazy load — প্রতিটা page আলাদা JS chunk হবে
// Initial load অনেক দ্রুত হবে (Performance ↑)
const Home        = lazy(() => import("./pages/Home/Home"));
const Products    = lazy(() => import("./pages/Products/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail"));
const OffersPage  = lazy(() => import("./pages/OffersPage/OffersPage"));
const ContactUs   = lazy(() => import("./pages/ContactUs/ContactUs"));
const Cart        = lazy(() => import("./pages/Cart/Cart"));
const Wishlist    = lazy(() => import("./pages/Wishlist/Wishlist"));
const Login       = lazy(() => import("./pages/Auth/Login"));
const Register    = lazy(() => import("./pages/Auth/Register"));

// ✅ Loading fallback — পেজ লোডের সময় দেখাবে
const PageLoader = () => (
  <div
    className="flex items-center justify-center min-h-[60vh]"
    role="status"
    aria-label="Loading page"
  >
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E771A3]" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoute,
    children: [
      { index: true,           element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: "/products",     element: <Suspense fallback={<PageLoader />}><Products /></Suspense> },
      { path: "/products/:id", element: <Suspense fallback={<PageLoader />}><ProductDetail /></Suspense> },
      { path: "/offers",       element: <Suspense fallback={<PageLoader />}><OffersPage /></Suspense> },
      { path: "/ContactUs",    element: <Suspense fallback={<PageLoader />}><ContactUs /></Suspense> },
      { path: "/cart",         element: <Suspense fallback={<PageLoader />}><Cart /></Suspense> },
      { path: "/wishlist",     element: <Suspense fallback={<PageLoader />}><Wishlist /></Suspense> },
      { path: "/login",        element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
      { path: "/register",     element: <Suspense fallback={<PageLoader />}><Register /></Suspense> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <DisableRightClick />
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
