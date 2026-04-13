import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainRoute from "./components/MainRoute/MainRoute";
import "./index.css";
import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/Home/Home";
import OffersPage from "./pages/OffersPage/OffersPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import DisableRightClick from "./components/layout/DisableRightClick";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainRoute,
        children: [
            { index: true, Component: Home },
            { path: "/products", Component: Products },
            { path: "/products/:id", Component: ProductDetail },
            { path: "/offers", Component: OffersPage },
            { path: "/ContactUs", Component: ContactUs },
            { path: "/cart", Component: Cart },
            { path: "/wishlist", Component: Wishlist },
            { path: "/login", Component: Login },
            { path: "/register", Component: Register },
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