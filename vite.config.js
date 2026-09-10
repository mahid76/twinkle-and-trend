import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],

	build: {
		target: "es2020",
		chunkSizeWarningLimit: 600,

		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("swiper")) return "swiper";
					if (id.includes("framer-motion")) return "framer-motion";
					if (id.includes("react-dom")) return "react-dom";
					if (id.includes("react-router")) return "react-router";
					if (id.includes("react-icons")) return "icons";
				},
			},
		},
	},
	// ✅ optimizeDeps.exclude সরানো হয়েছে — এটাই localhost blank page এর কারণ ছিল
});
