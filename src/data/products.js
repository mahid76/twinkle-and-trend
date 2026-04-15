// src/data/products.js

export const products = [
	// catBag Category (8 Products)
	{
		id: 1,
		showStock: false,
		name: "Premium Cat Bag01",
		price: 2999, // ✅ default price (প্রথম variant এর)
		offerPrice: 2499,
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_000710127_g8k9yi.jpg", // ✅ default image (প্রথম variant এর)
		rating: 4.5,
		description: "Premium quality leather bag with multiple compartments.",
		category: "catBag",
		stock: 50,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_000710127_g8k9yi.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000813463_svi4xl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192950/InShot_20260415_000853839_sofpxh.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_001219851_xezxct.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_000710127_g8k9yi.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000813463_svi4xl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192950/InShot_20260415_000853839_sofpxh.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_001219851_xezxct.jpg",
		],
		features: [
			"Genuine leather material",
			"Multiple compartments",
			"Adjustable shoulder strap",
			"Dimensions: 30x20x10 cm",
		],

		// ✅ Color Variants
		// variants: [
		// 	{
		// 		name: "Premium ",
		// 		color: "White",
		// 		colorHex: "#1a1a1a",
		// 		price: 2999,
		// 		offerPrice: 2499,
		// 		images: [whiteCat01, whiteCat02, whiteCat03, whiteCat04], // ✅ 4টা regular image
		// 		hdImages: [doll1, logo, cat1, cat2],
		// 		showStock: true,
		// 		stock: 50,
		// 	},
		// 	{
		// 		color: "black",
		// 		colorHex: "#8B4513",
		// 		price: 3299,
		// 		offerPrice: null,
		// 		images: [blackCat01, blackCat02, blackCat03, blackCat04],
		// 		hdImages: [whiteCat01, whiteCat02, whiteCat03, whiteCat04],
		// 		showStock: false,
		// 		stock: 20,
		// 		features: [
		// 			"Premium brown leather",
		// 			"Gold-plated hardware",
		// 			"Interior zip pocket",
		// 			"Dimensions: 30x20x10 cm",
		// 		],
		// 	},
		// 	{
		// 		color: "Red",
		// 		colorHex: "#dc2626",
		// 		price: 3499,
		// 		offerPrice: 2999,
		// 		images: [cat3, cat2, cat1, cat3],
		// 		hdImages: [doll1, doll1, doll1, doll1],
		// 		showStock: true,
		// 		stock: 5,
		// 		description: "Classic black leather bag. Perfect for formal occasions.",
		// 		features: [
		// 			"Genuine black leather",
		// 			"Multiple compartments",
		// 			"Adjustable shoulder strap",
		// 			"Dimensions: 30x20x10 cm",
		// 		],
		// 	},
		// ],
	},
	{
		id: 2,
		showStock: false,
		name: "Premium Cat Bag02",
		price: 3499,
		// offerPrice: 2999, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000743589_hmyq8a.jpg",
		rating: 4.6,
		description:
			"Elegant designer handbag for women. Perfect for office and casual wear.",
		category: "catBag", // ✅ lowercase
		stock: 2,
		isBestSeller: false,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000743589_hmyq8a.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192953/InShot_20260408_001343058_x9pa3r.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192949/InShot_20260415_000832490_yymve8.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000743589_hmyq8a.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192953/InShot_20260408_001343058_x9pa3r.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192949/InShot_20260415_000832490_yymve8.jpg",
		],

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
		name: "Cat bag Double",
		price: 1299,
		offerPrice: 999, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
		rating: 4.3,
		description:
			"Genuine leather wallet with multiple card slots and cash compartment.",
		category: "catBag", // ✅ lowercase
		stock: 60,
		isBestSeller: false,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_001308100_bamyfd.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192949/InShot_20260415_000832490_yymve8.jpg",
		],

		features: [
			"Genuine leather",
			"Multiple card slots",
			"Compact design",
			"RFID protection",
		],
	},
	// bags Category (1 Products)

	{
		id: 4,
		showStock: false,
		name: "Sunglasses",
		price: 899,
		offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_003023912_li0qz2.jpg",
		rating: 4.4,
		description: "Stylish sunglasses with UV protection for men and women.",
		category: "bags", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_003023912_li0qz2.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002939781_cy6jlp.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002920040_pmzy1z.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_003023912_li0qz2.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002939781_cy6jlp.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002920040_pmzy1z.jpg",
		],
		features: [
			"UV400 protection",
			"Lightweight frame",
			"Scratch-resistant lenses",
			"Includes case",
		],
	},
	// toys Category (1 Products)

	{
		id: 5,
		showStock: false,
		name: "Sunglasses",
		price: 899,
		offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
		rating: 4.4,
		description: "Stylish sunglasses with UV protection for men and women.",
		category: "toys", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192911/InShot_20260415_003437939_qw4ilc.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192911/InShot_20260415_003437939_qw4ilc.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		features: [
			"UV400 protection",
			"Lightweight frame",
			"Scratch-resistant lenses",
			"Includes case",
		],
	},
	// drinkWare Category (1 Products)

	{
		id: 6,
		showStock: false,
		name: "Sunglasses",
		price: 899,
		offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
		rating: 4.4,
		description: "Stylish sunglasses with UV protection for men and women.",
		category: "drinkWare", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192911/InShot_20260415_003437939_qw4ilc.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192911/InShot_20260415_003437939_qw4ilc.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		features: [
			"UV400 protection",
			"Lightweight frame",
			"Scratch-resistant lenses",
			"Includes case",
		],
	},
	// digitalPrayerTasbih Category (1 Products)

	{
		id: 7,
		showStock: false,
		name: "Sunglasses",
		price: 899,
		offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
		rating: 4.4,
		description: "Stylish sunglasses with UV protection for men and women.",
		category: "digitalPrayerTasbih", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192911/InShot_20260415_003437939_qw4ilc.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192911/InShot_20260415_003437939_qw4ilc.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		features: [
			"UV400 protection",
			"Lightweight frame",
			"Scratch-resistant lenses",
			"Includes case",
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
