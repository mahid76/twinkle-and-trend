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

// ✅ Lazy load pages
const Home          = lazy(() => import("./pages/Home/Home"));
const Products      = lazy(() => import("./pages/Products/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail"));
const OffersPage    = lazy(() => import("./pages/OffersPage/OffersPage"));
const ContactUs     = lazy(() => import("./pages/ContactUs/ContactUs"));
const Cart          = lazy(() => import("./pages/Cart/Cart"));
const Wishlist      = lazy(() => import("./pages/Wishlist/Wishlist"));
const Login         = lazy(() => import("./pages/Auth/Login"));
const Register      = lazy(() => import("./pages/Auth/Register"));

// ✅ Loading fallback
const PageLoader = () => (
  <div
    className="flex items-center justify-center min-h-[60vh]"
    role="status"
    aria-label="পেজ লোড হচ্ছে"
  >
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E771A3]" />
  </div>
);

// ✅ Wrap with ErrorBoundary + Suspense
const withFallback = (Component) => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoute,
    children: [
      { index: true,           element: withFallback(Home) },
      { path: "/products",     element: withFallback(Products) },
      { path: "/products/:id", element: withFallback(ProductDetail) },
      { path: "/offers",       element: withFallback(OffersPage) },
      { path: "/ContactUs",    element: withFallback(ContactUs) },
      { path: "/cart",         element: withFallback(Cart) },
      { path: "/wishlist",     element: withFallback(Wishlist) },
      { path: "/login",        element: withFallback(Login) },
      { path: "/register",     element: withFallback(Register) },
    ],
  },
]);

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
