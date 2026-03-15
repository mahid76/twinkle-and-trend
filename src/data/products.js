// src/data/products.js
import blackCat01 from "../assets/black-cat01.png";
import blackCat02 from "../assets/black-cat02.png";
import blackCat03 from "../assets/black-cat03.png";
import blackCat04 from "../assets/black-cat04.png";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.jpeg";
import doll1 from "../assets/doll1.png";
import doll1low from "../assets/doll1low.png";
import logo from "../assets/logo.png";
import tr1 from "../assets/t&tr1.JPEG";
import tr2 from "../assets/t&tr2.jpg";
import tr3 from "../assets/t&tr3.jpg";
import tr4 from "../assets/t&tr4.jpg";
import tr5 from "../assets/t&tr5.jpg";
import whiteCat01 from "../assets/white-cat01.png";
import whiteCat02 from "../assets/white-cat02.png";
import whiteCat03 from "../assets/white-cat03.png";
import whiteCat04 from "../assets/white-cat04.png";

export const products = [
	// Fashion Category (8 Products)
	{
		id: 1,
		showStock: true,
		name: "Premium Leather Bag",
		price: 2999, // ✅ default price (প্রথম variant এর)
		offerPrice: 2499,
		image: whiteCat01, // ✅ default image (প্রথম variant এর)
		rating: 4.5,
		description: "Premium quality leather bag with multiple compartments.",
		category: "fashion",
		stock: 50,
		isBestSeller: true,
		images: [cat1, cat2, cat1, cat3],
		hdImages: [doll1, doll1, doll1, doll1],
		features: [
			"Genuine leather material",
			"Multiple compartments",
			"Adjustable shoulder strap",
			"Dimensions: 30x20x10 cm",
		],

		// ✅ Color Variants
		variants: [
			{
				color: "White",
				colorHex: "#1a1a1a",
				price: 2999,
				offerPrice: 2499,
				images: [whiteCat01, whiteCat02, whiteCat03, whiteCat04], // ✅ 4টা regular image
				hdImages: [doll1, logo, cat1, cat2],
				showStock: true,
				stock: 50,
			},
			{
				color: "black",
				colorHex: "#8B4513",
				price: 3299,
				offerPrice: null,
				images: [blackCat01, blackCat02, blackCat03, blackCat04],
				hdImages: [whiteCat01, whiteCat02, whiteCat03, whiteCat04],
				showStock: false,
				stock: 20,
				features: [
					"Premium brown leather",
					"Gold-plated hardware",
					"Interior zip pocket",
					"Dimensions: 30x20x10 cm",
				],
			},
			{
				color: "Red",
				colorHex: "#dc2626",
				price: 3499,
				offerPrice: 2999,
				images: [cat3, cat2, cat1, cat3],
				hdImages: [doll1, doll1, doll1, doll1],
				showStock: true,
				stock: 5,
				description: "Classic black leather bag. Perfect for formal occasions.",
				features: [
					"Genuine black leather",
					"Multiple compartments",
					"Adjustable shoulder strap",
					"Dimensions: 30x20x10 cm",
				],
			},
		],
	},
	{
		id: 2,
		showStock: true,
		name: "Designer Handbag",
		price: 3499,
		// offerPrice: 2999, // ✅ Offer Price
		image: doll1low,
		rating: 4.6,
		description:
			"Elegant designer handbag for women. Perfect for office and casual wear.",
		category: "fashion", // ✅ lowercase
		stock: 2,
		isBestSeller: false,
		images: [doll1low, cat1, cat2, cat3],
		hdImages: [doll1, doll1, doll1, doll1],

		features: [
			"Premium synthetic leather",
			"Gold-plated hardware",
			"Interior zip pocket",
			"Dimensions: 28x18x12 cm",
		],
	},
	{
		id: 3,
		showStock: true,
		name: "Leather Wallet",
		price: 1299,
		offerPrice: 999, // ✅ Offer Price
		image: tr1,
		rating: 4.3,
		description:
			"Genuine leather wallet with multiple card slots and cash compartment.",
		category: "fashion", // ✅ lowercase
		stock: 60,
		isBestSeller: false,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"Genuine leather",
			"Multiple card slots",
			"Compact design",
			"RFID protection",
		],
	},
	{
		id: 4,
		showStock: true,
		name: "Sunglasses",
		price: 899,
		offerPrice: 699, // ✅ Offer Price
		image: tr2,
		rating: 4.4,
		description: "Stylish sunglasses with UV protection for men and women.",
		category: "fashion", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [tr2, tr2, tr2, tr2],
		features: [
			"UV400 protection",
			"Lightweight frame",
			"Scratch-resistant lenses",
			"Includes case",
		],
	},
	{
		id: 5,
		showStock: true,
		name: "Wrist Watch",
		price: 4999,
		// offerPrice: 4499, // ✅ Offer Price
		image: tr1,
		rating: 4.7,
		description:
			"Classic analog wristwatch with leather strap. Perfect for formal occasions.",
		category: "fashion", // ✅ lowercase
		stock: 25,
		isBestSeller: false,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"Quartz movement",
			"Water resistant",
			"Genuine leather strap",
			"30m water resistance",
		],
	},
	{
		id: 6,
		showStock: true,
		name: "Fashion Belt",
		price: 799,
		offerPrice: 599, // ✅ Offer Price
		image: tr1,
		rating: 4.2,
		description:
			"Stylish leather belt with metal buckle. Available in multiple colors.",
		category: "fashion", // ✅ lowercase
		stock: 80,
		isBestSeller: false,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"Genuine leather",
			"Metal buckle",
			"Adjustable size",
			"Multiple colors",
		],
	},
	{
		id: 7,
		showStock: true,
		name: "Scarf",
		price: 599,
		offerPrice: 449, // ✅ Offer Price
		image: tr2,
		rating: 4.1,
		description: "Soft and warm scarf for winter season. Perfect gift item.",
		category: "fashion", // ✅ lowercase
		stock: 100,
		isBestSeller: false,
		images: [tr2, tr2, tr2, tr2],
		features: [
			"Soft fabric",
			"Lightweight",
			"Multiple patterns",
			"Machine washable",
		],
	},
	{
		id: 8,
		showStock: true,
		name: "Gloves",
		price: 499,
		// offerPrice: 349, // ✅ Offer Price
		image: tr2,
		rating: 4.0,
		description: "Warm winter gloves with touchscreen compatible fingertips.",
		category: "fashion", // ✅ lowercase
		stock: 0,
		isBestSeller: false,
		images: [tr2, tr2, tr2, tr2],
		features: [
			"Touchscreen compatible",
			"Warm fleece lining",
			"Elastic wrist",
			"One size fits all",
		],
	},

	// Toys Category (6 Products)
	{
		id: 9,
		showStock: true,
		name: "Cat Doll",
		price: 599,
		// offerPrice: 449, // ✅ Offer Price
		image: tr2,
		rating: 4.2,
		description:
			"Soft and cuddly cat doll. Great gift for kids and cat lovers.",
		category: "toys", // ✅ lowercase
		stock: 100,
		isBestSeller: false,
		images: [tr2, tr2, tr2, tr2],
		features: [
			"Soft plush material",
			"Machine washable",
			"Dimensions: 25x15x15 cm",
			"Suitable for ages 3+",
		],
	},
	{
		id: 10,
		showStock: true,
		name: "Two Doll Set",
		price: 1999,
		// offerPrice: 1699, // ✅ Offer Price
		image: tr4,
		rating: 4.6,
		description: "Beautiful two doll set. Perfect for collection and gifting.",
		category: "toys", // ✅ lowercase
		stock: 30,
		isBestSeller: false,
		images: [tr4, tr4, tr4, tr4],
		features: [
			"Set of 2 dolls",
			"High-quality fabric",
			"Hand-wash recommended",
			"Dimensions: 30x20x10 cm each",
		],
	},
	{
		id: 11,
		showStock: true,
		name: "Teddy Bear",
		price: 899,
		// offerPrice: 699, // ✅ Offer Price
		image: tr2,
		rating: 4.8,
		description: "Cute teddy bear for kids. Perfect birthday gift.",
		category: "toys", // ✅ lowercase
		stock: 55,
		isBestSeller: true,
		images: [tr2, tr2, tr2, tr2],
		features: [
			"Soft plush material",
			"Hypoallergenic",
			"Machine washable",
			"Dimensions: 40x30x20 cm",
		],
	},
	{
		id: 12,
		showStock: true,
		name: "Puzzle Game",
		price: 499,
		// offerPrice: 399, // ✅ Offer Price
		image: tr3,
		rating: 4.5,
		description: "Educational puzzle game for kids. Improves cognitive skills.",
		category: "toys", // ✅ lowercase
		stock: 40,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"500 pieces",
			"Educational",
			"High-quality cardboard",
			"Age: 8+",
		],
	},
	{
		id: 13,
		showStock: true,
		name: "Building Blocks",
		price: 1299,
		// offerPrice: 1099, // ✅ Offer Price
		image: tr4,
		rating: 4.7,
		description: "Creative building blocks set. 200+ pieces for endless fun.",
		category: "toys", // ✅ lowercase
		stock: 35,
		isBestSeller: false,
		images: [tr4, tr4, tr4, tr4],
		features: [
			"200+ pieces",
			"Non-toxic material",
			"Compatible with major brands",
			"Age: 5+",
		],
	},
	{
		id: 14,
		showStock: true,
		name: "Remote Control Car",
		price: 2499,
		// offerPrice: 2199, // ✅ Offer Price
		image: tr3,
		rating: 4.6,
		description: "Fast remote control car with rechargeable battery.",
		category: "toys", // ✅ lowercase
		stock: 20,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"Rechargeable battery",
			"Speed: 20 km/h",
			"Range: 50 meters",
			"Age: 6+",
		],
	},

	// Home & Kitchen Category (6 Products)
	{
		id: 15,
		showStock: true,
		name: "Stanley Cup",
		price: 399,
		// offerPrice: 299, // ✅ Offer Price
		image: tr3,
		rating: 4.8,
		description: "Classic Stanley cup. Keeps drinks cold for 24 hours.",
		category: "home-kitchen", // ✅ lowercase
		stock: 75,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"Double-wall insulation",
			"Leak-proof lid",
			"Capacity: 500ml",
			"BPA-free material",
		],
	},
	{
		id: 16,
		showStock: true,
		name: "Kitchen Knife Set",
		price: 2499,
		// offerPrice: 2199, // ✅ Offer Price
		image: tr3,
		rating: 4.9,
		description: "Professional kitchen knife set for all cooking needs.",
		category: "home-kitchen", // ✅ lowercase
		stock: 20,
		isBestSeller: true,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"Stainless steel blades",
			"Ergonomic handles",
			"5-piece set",
			"Dishwasher safe",
		],
	},
	{
		id: 17,
		showStock: true,
		name: "Coffee Maker",
		price: 3999,
		// offerPrice: 3499, // ✅ Offer Price
		image: tr3,
		rating: 4.5,
		description: "Automatic coffee maker with programmable timer.",
		category: "home-kitchen", // ✅ lowercase
		stock: 15,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"12-cup capacity",
			"Programmable timer",
			"Auto shut-off",
			"Keep warm function",
		],
	},
	{
		id: 18,
		showStock: true,
		name: "Blender",
		price: 2999,
		// offerPrice: 2699, // ✅ Offer Price
		image: tr3,
		rating: 4.4,
		description: "Powerful blender for smoothies, shakes, and more.",
		category: "home-kitchen", // ✅ lowercase
		stock: 25,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"1000W motor",
			"6-speed settings",
			"Stainless steel blades",
			"1.5L capacity",
		],
	},
	{
		id: 19,
		showStock: true,
		name: "Air Fryer",
		price: 5999,
		// offerPrice: 5499, // ✅ Offer Price
		image: tr3,
		rating: 4.7,
		description: "Healthy air fryer with digital controls and preset programs.",
		category: "home-kitchen", // ✅ lowercase
		stock: 18,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"4L capacity",
			"Digital touchscreen",
			"8 preset programs",
			"Non-stick basket",
		],
	},
	{
		id: 20,
		showStock: true,
		name: "Storage Containers",
		price: 999,
		// offerPrice: 799, // ✅ Offer Price
		image: tr3,
		rating: 4.3,
		description:
			"Set of 10 airtight storage containers for kitchen organization.",
		category: "home-kitchen", // ✅ lowercase
		stock: 45,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"BPA-free plastic",
			"Airtight lids",
			"Microwave safe",
			"Stackable design",
		],
	},

	// Religious Category (4 Products)
	{
		id: 21,
		showStock: true,
		name: "Tashbih",
		price: 4999,
		// offerPrice: 4499, // ✅ Offer Price
		image: tr5,
		rating: 4.7,
		description: "Premium quality tashbih. Made with natural materials.",
		category: "religious", // ✅ lowercase
		stock: 25,
		isBestSeller: false,
		images: [tr5, tr5, tr5, tr5],
		features: [
			"Natural wood beads",
			"Elegant design",
			"Includes carrying pouch",
			"100 beads",
		],
	},
	{
		id: 22,
		showStock: true,
		name: "Prayer Mat",
		price: 1299,
		// offerPrice: 999,
		image: tr5,
		rating: 4.6,
		description:
			"Comfortable prayer mat with carrying bag. Portable and lightweight.",
		category: "religious",
		stock: 60,
		isBestSeller: false,
		images: [tr5, tr5, tr5, tr5],
		features: [
			"Soft fabric",
			"Non-slip bottom",
			"Carrying bag included",
			"Dimensions: 180x60 cm",
		],
	},
	{
		id: 23,
		showStock: true,
		name: "Quran Stand",
		price: 1999,
		// offerPrice: 1799,
		image: tr5,
		rating: 4.5,
		description: "Wooden Quran stand with adjustable height. Elegant design.",
		category: "religious",
		stock: 30,
		isBestSeller: false,
		images: [tr5, tr5, tr5, tr5],
		features: [
			"Solid wood",
			"Adjustable height",
			"Portable design",
			"Carrying handle",
		],
	},
	{
		id: 24,
		showStock: true,
		name: "Islamic Wall Art",
		price: 899,
		// offerPrice: 699,
		image: tr5,
		rating: 4.4,
		description:
			"Beautiful Islamic calligraphy wall art. Perfect for home decoration.",
		category: "religious",
		stock: 40,
		isBestSeller: false,
		images: [tr5, tr5, tr5, tr5],
		features: [
			"High-quality print",
			"Frame included",
			"Easy to hang",
			"Dimensions: 40x60 cm",
		],
	},

	// Electronics Category (4 Products)
	{
		id: 25,
		showStock: true,
		name: "Wireless Earbuds",
		price: 2999,
		// offerPrice: 2499,
		image: tr1,
		rating: 4.6,
		description:
			"Premium wireless earbuds with noise cancellation and long battery life.",
		category: "electronics",
		stock: 50,
		isBestSeller: true,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"Active noise cancellation",
			"30-hour battery life",
			"Water resistant IPX5",
			"Touch controls",
		],
	},
	{
		id: 26,
		showStock: true,
		name: "Power Bank",
		price: 1499,
		// offerPrice: 1199,
		image: tr1,
		rating: 4.5,
		description: "High-capacity power bank with fast charging support.",
		category: "electronics",
		stock: 80,
		isBestSeller: false,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"20000mAh capacity",
			"Fast charging support",
			"Dual USB ports",
			"LED indicator",
		],
	},
	{
		id: 27,
		showStock: true,
		name: "Smart Watch",
		price: 4999,
		// offerPrice: 4499,
		image: tr1,
		rating: 4.7,
		description:
			"Feature-rich smartwatch with health monitoring and notifications.",
		category: "electronics",
		stock: 35,
		isBestSeller: false,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"Heart rate monitor",
			"Sleep tracking",
			"Water resistant",
			"7-day battery life",
		],
	},
	{
		id: 28,
		showStock: true,
		name: "Bluetooth Speaker",
		price: 1999,
		// offerPrice: 1699,
		image: tr1,
		rating: 4.4,
		description: "Portable Bluetooth speaker with 360-degree sound.",
		category: "electronics",
		stock: 45,
		isBestSeller: false,
		images: [tr1, tr1, tr1, tr1],
		features: [
			"360-degree sound",
			"10-hour battery",
			"Water resistant",
			"Built-in microphone",
		],
	},

	// Sports Category (2 Products)
	{
		id: 29,
		showStock: true,
		name: "Yoga Mat",
		price: 1299,
		// offerPrice: 999,
		image: tr2,
		rating: 4.6,
		description: "Premium non-slip yoga mat for all types of exercises.",
		category: "sports",
		stock: 55,
		isBestSeller: false,
		images: [tr2, tr2, tr2, tr2],
		features: [
			"Non-slip surface",
			"Extra thick padding",
			"Carrying strap included",
			"Dimensions: 180x60x0.6 cm",
		],
	},
	{
		id: 30,
		showStock: true,
		name: "Dumbbell Set",
		price: 3499,
		offerPrice: 2999,
		image: tr3,
		rating: 4.8,
		description:
			"Adjustable dumbbell set for home workouts. 5-25kg per dumbbell.",
		category: "sports",
		stock: 25,
		isBestSeller: false,
		images: [tr3, tr3, tr3, tr3],
		features: [
			"Adjustable weight",
			"Ergonomic grip",
			"Durable construction",
			"Storage tray included",
		],
	},
];

// Helper Functions
export const getProductById = (id) => {
	return products.find((product) => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
	return products.filter((product) => product.category === category);
};

export const getProductsByPriceRange = (min, max) => {
	return products.filter(
		(product) => product.price >= min && product.price <= max,
	);
};

export const searchProducts = (query) => {
	const lowerQuery = query.toLowerCase();
	return products.filter(
		(product) =>
			product.name.toLowerCase().includes(lowerQuery) ||
			product.description.toLowerCase().includes(lowerQuery) ||
			product.category.toLowerCase().includes(lowerQuery),
	);
};

export const getCategories = () => {
	return [...new Set(products.map((p) => p.category))];
};

export const getProductsByRating = (minRating) => {
	return products.filter((product) => product.rating >= minRating);
};

export const getLowStockProducts = (threshold = 10) => {
	return products.filter(
		(product) => product.stock <= threshold && product.stock > 0,
	);
};

export const getOutOfStockProducts = () => {
	return products.filter((product) => product.stock === 0);
};

// ✅ UPDATED: Best Sellers based on isBestSeller flag
export const getBestSellers = () => {
	return products
		.filter((product) => product.isBestSeller === true && product.stock > 0)
		.slice(0, 5);
};

export const getNewArrivals = () => {
	return products.sort((a, b) => b.id - a.id).slice(0, 6);
};

export const getFeaturedProducts = () => {
	return products
		.filter((product) => product.rating >= 4.5 && product.stock > 0)
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 8);
};

// ✅ NEW: Get Products with Offers
export const getProductsWithOffers = () => {
	return products.filter(
		(product) => product.offerPrice && product.offerPrice < product.price,
	);
};

// ✅ NEW: Calculate Discount Percentage
export const getDiscountPercentage = (originalPrice, offerPrice) => {
	if (!offerPrice || offerPrice >= originalPrice) return 0;
	return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
};
