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
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
