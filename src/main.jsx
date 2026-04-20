import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainRoute from "./components/MainRoute/MainRoute";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import DisableRightClick from "./components/layout/DisableRightClick";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// ✅ PERFORMANCE FIX #1: Home is EAGERLY imported (not lazy).
// Home contains the LCP image (Premium Cat Bag product card).
// Lazy loading adds an extra waterfall step that delays LCP by ~1-2s.
import Home from "./pages/Home/Home";

// All other routes remain lazy — they don't affect homepage LCP
const Products      = lazy(() => import("./pages/Products/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail"));
const OffersPage    = lazy(() => import("./pages/OffersPage/OffersPage"));
const ContactUs     = lazy(() => import("./pages/ContactUs/ContactUs"));
const Cart          = lazy(() => import("./pages/Cart/Cart"));
const Wishlist      = lazy(() => import("./pages/Wishlist/Wishlist"));
const Login         = lazy(() => import("./pages/Auth/Login"));
const Register      = lazy(() => import("./pages/Auth/Register"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="লোড হচ্ছে">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E771A3]" />
  </div>
);

const routes = [
  {
    path: "/",
    Component: MainRoute,
    children: [
      {
        index: true,
        // ✅ No Suspense wrapper for Home — it's eagerly loaded, no chunk to wait for
        element: <ErrorBoundary><Home /></ErrorBoundary>,
      },
      {
        path: "/products",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Products /></Suspense></ErrorBoundary>,
      },
      {
        path: "/products/:id",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ProductDetail /></Suspense></ErrorBoundary>,
      },
      {
        path: "/offers",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><OffersPage /></Suspense></ErrorBoundary>,
      },
      {
        path: "/ContactUs",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><ContactUs /></Suspense></ErrorBoundary>,
      },
      {
        path: "/cart",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Cart /></Suspense></ErrorBoundary>,
      },
      {
        path: "/wishlist",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Wishlist /></Suspense></ErrorBoundary>,
      },
      {
        path: "/login",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Login /></Suspense></ErrorBoundary>,
      },
      {
        path: "/register",
        element: <ErrorBoundary><Suspense fallback={<PageLoader />}><Register /></Suspense></ErrorBoundary>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <DisableRightClick />
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
