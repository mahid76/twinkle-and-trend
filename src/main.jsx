import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainRoute from "./components/MainRoute/MainRoute";
import "./index.css";
import Home from "./pages/Home";
import Products from "./pages/Products";

const router = createBrowserRouter([
	{
		path: "/",
		Component: MainRoute,
		children: [
			{ index: true, Component: Home },
			{ path: "/products", Component: Products },
			// { path: "/products/:id", Component: ProductDetails },
			// { path: "/cart", Component: Cart },
			// { path: "/about", Component: About },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);


