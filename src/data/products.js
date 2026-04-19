// src/data/products.js

export const products = [
	// catBag Category (8 Products)
	{
		id: 1,
		name: "Premium Cat Bag", // ← fallback name
		description:
			"আপনার স্টাইলকে দিন একদম ইউনিক টাচ এই সুপার কিউট Realistic Cat Bag দিয়ে!",
		price: 6249,
		offerPrice: 2499,
		category: "catBag",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag01_a4j8q4.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag01_a4j8q4.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag02_g8p7ae.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag03_k41etr.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag04_rdchah.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag01_a4j8q4.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag02_g8p7ae.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag03_k41etr.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776520252/premium-cat-bag04_rdchah.jpg",
		],
		rating: 4.6,
		stock: 20,
		showStock: true,
		isBestSeller: true,

		// variants: [
		// 	{
		// 		name: "Premium Cat Bag02 — Pink Edition", // ← এই name দেখাবে
		// 		color: "Pink",
		// 		colorHex: "#FFB6C1",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 15,
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		name: "Premium Cat Bag02 — Classic White", // ← এই name দেখাবে
		// 		color: "White",
		// 		colorHex: "#FFFFFF",
		// 		price: 5200,
		// 		offerPrice: 3699,
		// 		stock: 8,
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		// name না দিলে product.name দেখাবে
		// 		color: "Brown",
		// 		colorHex: "#8B4513",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		// name না দিলে product.name দেখাবে
		// 		color: "Grey",
		// 		colorHex: "#808080",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// ],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"🐾 Ultra-Realistic Design – একদম লাইফ-লাইক ক্যাট লুক",
			"🎀 Premium Soft Fur – সুপার নরম ও আরামদায়ক ফিনিশ",
			"💼 Multi-purpose Use – পার্টি, আউটিং বা গিফট হিসেবে পারফেক্ট",
			"🎁 Perfect Gift Item – ক্যাট লাভারদের জন্য দারুণ চয়েস",
			"👜 Lightweight & Comfortable – সহজে বহনযোগ্য",
			"Size:- Big Size (XXL) With Gift Box 🎁",
		],
	},
	{
		id: 2,
		name: "Premium Cat Bag 02", // ← fallback name
		description:
			"Elegant designer handbag for women. Perfect for office and casual wear.",
		price: 4999,
		offerPrice: 3499,
		category: "catBag",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag06_ojfp3t.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag06_ojfp3t.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag07_m3sgsv.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag06_ojfp3t.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag07_m3sgsv.jpg",
		],
		rating: 4.6,
		stock: 20,
		isBestSeller: false,

		// variants: [
		// 	{
		// 		name: "Premium Cat Bag02 — Pink Edition", // ← এই name দেখাবে
		// 		color: "Pink",
		// 		colorHex: "#FFB6C1",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 15,
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		name: "Premium Cat Bag02 — Classic White", // ← এই name দেখাবে
		// 		color: "White",
		// 		colorHex: "#FFFFFF",
		// 		price: 5200,
		// 		offerPrice: 3699,
		// 		stock: 8,
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		// name না দিলে product.name দেখাবে
		// 		color: "Brown",
		// 		colorHex: "#8B4513",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		// name না দিলে product.name দেখাবে
		// 		color: "Grey",
		// 		colorHex: "#808080",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// ],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"Premium synthetic leather",
			"Gold-plated hardware",
			"Interior zip pocket",
			"Dimensions: 28x18x12 cm",
		],
	},
	{
		id: 3,
		name: "Premium Cat Bag 03", // ← fallback name
		description:
			"Elegant designer handbag for women. Perfect for office and casual wear.",
		price: 4999,
		offerPrice: 3499,
		category: "catBag",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag07_m3sgsv.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523210/premium-cat-bag05_ifiqak.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776523211/premium-cat-bag07_m3sgsv.jpg",
		],
		rating: 4.6,
		stock: 20,
		isBestSeller: false,

		// variants: [
		// 	{
		// 		name: "Premium Cat Bag02 — Pink Edition", // ← এই name দেখাবে
		// 		color: "Pink",
		// 		colorHex: "#FFB6C1",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 15,
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		name: "Premium Cat Bag02 — Classic White", // ← এই name দেখাবে
		// 		color: "White",
		// 		colorHex: "#FFFFFF",
		// 		price: 5200,
		// 		offerPrice: 3699,
		// 		stock: 8,
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		// name না দিলে product.name দেখাবে
		// 		color: "Brown",
		// 		colorHex: "#8B4513",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// 	{
		// 		// name না দিলে product.name দেখাবে
		// 		color: "Grey",
		// 		colorHex: "#808080",
		// 		price: 4999,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["", ""],
		// 		hdImages: ["", ""],
		// 	},
		// ],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"Premium synthetic leather",
			"Gold-plated hardware",
			"Interior zip pocket",
			"Dimensions: 28x18x12 cm",
		],
	},
	// bags Category (1 Products)

	{
		id: 4,
		name: "Labubu Doll Backpack", // ← fallback name
		description:
			"আপনার দৈনন্দিন স্টাইলকে আরও আকর্ষণীয় ও ইউনিক করে তুলতে নিয়ে আসুন এই Adorable Labubu Doll Backpack..",
		price: 1250,
		// offerPrice: 3499,
		category: "bags",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624401/labubu-bag01_txmfyi.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624401/labubu-bag01_txmfyi.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624401/labubu-bag01_txmfyi.jpg",
		],
		rating: 4.0,
		stock: 20,
		isBestSeller: true,

		variants: [
			{
				name: "Labubu Doll Backpack Pink", // ← এই name দেখাবে
				color: "Pink",
				colorHex: "#FFB6C1",
				price: 1250,
				// offerPrice: 3499,
				stock: 15,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624401/labubu-bag01_txmfyi.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776624401/labubu-bag01_txmfyi.jpg",
				],
			},
			{
				name: "Labubu Doll Backpack Grey", // ← এই name দেখাবে
				color: "Grey",
				colorHex: "#808080",
				price: 1250,
				// offerPrice: 3699,
				stock: 8,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag02_y2qrlv.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag02_y2qrlv.jpg",
				],
			},
			{
				name: "Labubu Doll Backpack Green ",
				color: "Green",
				colorHex: "#008000",
				price: 1250,
				// offerPrice: 3499,
				stock: 0, // ← 0 হলে swatch এ cross দেখাবে
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag03_a5pyxm.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag03_a5pyxm.jpg",
				],
			},
			{
				name: "Labubu Doll Backpack Light Blue ",
				color: "Light Blue",
				colorHex: "#ADD8E6",
				price: 1250,
				// offerPrice: 3499,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag04_lafzfj.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag04_lafzfj.jpg",
				],
			},
			{
				name: "Labubu Doll Backpack Coffee ",
				color: "Coffee",
				colorHex: "#6F4E37",
				price: 1250,
				// offerPrice: 3499,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag05_x3iqta.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag05_x3iqta.jpg",
				],
			},
		],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"সাইজ: মিডিয়াম (হালকা ও সহজে বহনযোগ্য)",
			"🎨 কালার: গোলাপি, সবুজ,  আকাশি, কফি, গ্রে । ",
		],
	},
	{
		id: 5,
		name: "Cat Hand Bag", // ← fallback name
		description:
			"আপনার দৈনন্দিন স্টাইলকে আরও আকর্ষণীয় করতে নিয়ে আসুন, নরম ফ্লাফি ডিজাইন, সুন্দর ক্যাট ফেস এবং ট্রেন্ডি লুক- Cat Hand Bag",
		price: 1250,
		// offerPrice: 3499,
		category: "bags",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag_i1jm9r.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag01_yki5vl.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag01_yki5vl.jpg",
		],
		rating: 4.0,
		stock: 20,
		isBestSeller: false,

		variants: [
			{
				name: "Cat Hand Bag White", // ← এই name দেখাবে
				color: "White",
				colorHex: "#FFFFFF",
				price: 1250,
				// offerPrice: 3499,
				stock: 15,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag02_vkcibx.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag03_ndwe9z.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag02_vkcibx.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag03_ndwe9z.jpg",
				],
			},
			{
				name: "Cat Hand Bag Grey", // ← এই name দেখাবে
				color: "Grey",
				colorHex: "#808080",
				price: 1250,
				// offerPrice: 3699,
				stock: 8,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag01_yki5vl.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag01_yki5vl.jpg",
				],
			},

			{
				name: "Cat Hand Bag Yellow ",
				color: "Yellow",
				colorHex: "#FFFF00",
				price: 1250,
				// offerPrice: 3499,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525712/cat-handbag04_mob3di.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525710/cat-handbag05_utmlnb.jpg",
				],
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525712/cat-handbag04_mob3di.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525710/cat-handbag05_utmlnb.jpg",
				],
			},
		],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"প্রিমিয়াম সফট ফার ম্যাটেরিয়াল – হাতে নিলেই ভালো লাগবে",
			"কিউট ক্যাট ডিজাইন – সবার নজর কাড়বে সহজেই",
			"হালকা ওজন – সারাদিন বহন করতে আরামদায়ক",
			"স্ট্রং জিপার ও স্ট্র্যাপ – টেকসই ও নিরাপদ",
			"ছোট প্রয়োজনীয় জিনিস রাখার জন্য পারফেক্ট",
			"🎨 কালার:🟡 ইয়েলো | ⚪ হোয়াইট | ⚫ গ্রে",
		],
	},
	// toys Category (1 Products)

	{
		id: 6,
		name: "Premium Cat Plush Toy", // ← fallback name
		description: "🧸 সুপার সফট ও হাই কোয়ালিটি প্লাশ ম্যাটেরিয়াল",
		price: 450,
		offerPrice: 3499,
		category: "toys",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527482/Premium-Cat-Plush-Toy_m57aub.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527478/Premium-Cat-Plush-Toy01_pq0dcj.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527478/Premium-Cat-Plush-Toy02_v5hjr8.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527478/Premium-Cat-Plush-Toy03_qtj1zd.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527478/Premium-Cat-Plush-Toy01_pq0dcj.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527478/Premium-Cat-Plush-Toy02_v5hjr8.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776527478/Premium-Cat-Plush-Toy03_qtj1zd.jpg",
		],
		rating: 4.0,
		stock: 20,
		isBestSeller: false,

		// variants: [
		// 	{
		// 		name: "Cat Hand Bag White", // ← এই name দেখাবে
		// 		color: "White",
		// 		colorHex: "#FFFFFF",
		// 		price: 1250,
		// 		offerPrice: 3499,
		// 		stock: 15,
		// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag02_vkcibx.jpg", "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag03_ndwe9z.jpg"],
		// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag02_vkcibx.jpg", "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag03_ndwe9z.jpg"],
		// 	},
		// 	{
		// 		name: "Cat Hand Bag Grey", // ← এই name দেখাবে
		// 		color: "Grey",
		// 		colorHex: "#808080",
		// 		price: 1250,
		// 		offerPrice: 3699,
		// 		stock: 8,
		// 		images: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag01_yki5vl.jpg"],
		// 		hdImages: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525708/cat-handbag01_yki5vl.jpg"],
		// 	},
		// 	{
		// 		name: "Labubu Doll Backpack Green ",
		// 		color: "Green",
		// 		colorHex: "#008000",
		// 		price: 1250,
		// 		offerPrice: 3499,
		// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag03_a5pyxm.jpg"],
		// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag03_a5pyxm.jpg"],
		// 	},
		// 	{
		// 		name: "Cat Hand Bag Yellow ",
		// 		color: "Yellow",
		// 		colorHex: "#FFFF00",
		// 		price: 1250,
		// 		offerPrice: 3499,
		// 		stock: 20, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525712/cat-handbag04_mob3di.jpg" , "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525710/cat-handbag05_utmlnb.jpg"],
		// 		hdImages: [https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525712/cat-handbag04_mob3di.jpg" , "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776525710/cat-handbag05_utmlnb.jpg"],
		// 	},
		// 	{
		// 		name: "Labubu Doll Backpack Coffee ",
		// 		color: "Coffee",
		// 		colorHex: "#6F4E37",
		// 		price: 1250,
		// 		offerPrice: 3499,
		// 		stock: 20, // ← 0 হলে swatch এ cross দেখাবে
		// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag05_x3iqta.jpg"],
		// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776524055/labubu-bag05_x3iqta.jpg"],
		// 	},
		// ],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"🧸 সুপার সফট ও হাই কোয়ালিটি প্লাশ ম্যাটেরিয়াল",
			"😻 কিউট ও রিয়ালিস্টিক ডিজাইন",
			"🎁 গিফট দেওয়ার জন্য পারফেক্ট (বয়ফ্রেন্ড/গার্লফ্রেন্ড/বন্ধুদের জন্য)",
			"🛋️ হোম ডেকর বা বেড ডেকোরেশন হিসেবে ব্যবহারযোগ্য",
			"👶 শিশু থেকে বড় সবাই ব্যবহার করতে পারবে",
			"উচ্চতা ও দৈর্ঘ্য – মাঝারি",
		],
	},
	// drinkWare Category (1 Products)

		{
		id: 7,
		name: "Bunny Bottle Bag", // ← fallback name
		description:
				`🐰✨ কিউট Bunny Bottle Bag – স্টাইল আর ইউটিলিটির পারফেক্ট কম্বো! 
		✨🐻এটা শুধু একটি পানির বোতল নয়, বরং একটি ফ্যাশন স্টেটমেন্ট!`,
		price: 1250,
		// offerPrice: 1250,
		category: "drinkWare",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529991/BunnyBottle_gido9t.jpg", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529990/BunnyBottle01_pd9bar.jpg", 
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529990/BunnyBottle01_pd9bar.jpg",
		],
		rating: 4.0,
		stock: 20,
		isBestSeller: false,

		variants: [
			{
				name: "Bunny Bottle Bag Pink", // ← এই name দেখাবে
				color: "Pink",
				colorHex: "#FFC0CB",
				price: 1250,
				// offerPrice: 3499,
				stock: 15,
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529990/BunnyBottle01_pd9bar.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529990/BunnyBottle01_pd9bar.jpg"],
			},
			{
				name: "Bunny Bottle Bag White", // ← এই name দেখাবে
				color: "White",
				colorHex: "#FFFFFF",
				price: 1250,
				// offerPrice: 3699,
				stock: 8,
				images: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529991/BunnyBottle02_wd9whp.jpg"],
				hdImages: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529991/BunnyBottle02_wd9whp.jpg"],
			},
			{
				name: "Bunny Bottle Bag Green ",
				color: "Green",
				colorHex: "#008000",
				price: 1250,
				// offerPrice: 3499,
				stock: 0, // ← 0 হলে swatch এ cross দেখাবে
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529992/BunnyBottle04_jjedpz.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529992/BunnyBottle04_jjedpz.jpg"],
			},
			{
				name: "Cat Hand Bag Black ",
				color: "Black",
				colorHex: "#000000",
				price: 1250,
				// offerPrice: 3499,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529991/BunnyBottle03_kl1msd.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776529991/BunnyBottle03_kl1msd.jpg"],
			},
		
		],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"	✔️ প্রিমিয়াম কোয়ালিটি ট্রান্সপারেন্ট বোতল",
			"✔️ কিউট Bunny & Bear ডেকোরেশন 🐰🐻",
			"✔️ স্টাইলিশ পার্ল ও চেইন স্ট্র্যাপ – ক্যারি করা সহজ",
			"✔️ লিক-প্রুফ ডিজাইন 💧",
			"✔️ লাইটওয়েট ও ডিউরেবল",
			"🎨 কালার :- গোলাপি, সাদা, সবুজ, কালো",
		],
	},
	// digitalPrayerTasbih Category (1 Products)

	{
		id: 8,
		name: "Tashbih", // ← fallback name
		description:
				 `🐰✨ কিউট Tashbih `,
		price: 1999,
		offerPrice: 1500,
		category: "digitalPrayerTasbih",
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776625126/Tashbih_ywsppi.webp", // ← main thumbnail
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg", 
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg",
		],
		rating: 4.0,
		stock: 20,
		isBestSeller: false,

		variants: [
			{
				name: "Tashbih Pink & Purple", // ← এই name দেখাবে
				color: "Pink & Purple",
				colorHex: "#FFC0CB",
				price: 1999,
				offerPrice: 1500,
				stock: 15,
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg"],
			},
			{
				name: "Tashbih Black & White", // ← এই name দেখাবে
				color: "Black & White",
				colorHex: "#FFFFFF",
				price: 1999,
				offerPrice: 1500,
				stock: 8,
				images: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_4_dxuxxm.jpg"],
				hdImages: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_4_dxuxxm.jpg"],
			},
			{
				name: "Tashbih Red & Grey",
				color: "Red & Grey",
				colorHex: "#FF0000",
				price: 1999,
				offerPrice: 1500,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_5_oivhi8.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_5_oivhi8.jpg"],
			},
			{
				name: "Tashbih Yellow & Orange",
				color: "Yellow & Orange",
				colorHex: "#FFFF00",
				price: 1999,
				offerPrice: 1500,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534317/Tashbih_3_lqves0.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534317/Tashbih_3_lqves0.jpg"],
			},
			{
				name: "Tashbih Blue ",
				color: "Blue",
				colorHex: "#4169E1",
				price: 1999,
				offerPrice: 1500,
				stock: 20, // ← 0 হলে swatch এ cross দেখাবে
				images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_1_xk5xu9.jpg"],
				hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_1_xk5xu9.jpg"],
			},
		],

		// ✅ SIZES যোগ করার উদাহরণ:
		// extraPrice = 0 হলে base price ই থাকবে
		// extraPrice > 0 হলে সেটা যোগ হবে
		// sizes: [
		// 	{ label: "S", stock: 10, extraPrice: 0 },
		// 	{ label: "M", stock: 15, extraPrice: 0 },
		// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
		// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
		// ],

		features: [
			"	✔️ প্রিমিয়াম কোয়ালিটি ট্রান্সপারেন্ট বোতল",
			"✔️ কিউট Bunny & Bear ডেকোরেশন 🐰🐻",
			"✔️ স্টাইলিশ পার্ল ও চেইন স্ট্র্যাপ – ক্যারি করা সহজ",
			"✔️ লিক-প্রুফ ডিজাইন 💧",
			"✔️ লাইটওয়েট ও ডিউরেবল",
			"🎨 কালার :- গোলাপি, সাদা, সবুজ, কালো",
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


	// {
	// 	id: 8,
	// 	name: "Tashbih", // ← fallback name
	// 	description:
	// 			 `🐰✨ কিউট Tashbih `,
	// 	price: 1999,
	// 	offerPrice: 1500,
	// 	category: "digitalPrayerTasbih",
	// 	image:
	// 		"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_xqluhy.jpg", // ← main thumbnail
	// 	images: [
	// 		"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg", 
	// 	],
	// 	hdImages: [
	// 		"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg",
	// 	],
	// 	rating: 4.0,
	// 	stock: 20,
	// 	isBestSeller: false,

	// 	// variants: [
	// 	// 	{
	// 	// 		name: "Tashbih Pink & Purple", // ← এই name দেখাবে
	// 	// 		color: "Pink",
	// 	// 		colorHex: "#FFC0CB",
	// 	// 		price: 1999,
	// 	// 		offerPrice: 1500,
	// 	// 		stock: 15,
	// 	// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg"],
	// 	// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_2_vhsrlt.jpg"],
	// 	// 	},
	// 	// 	{
	// 	// 		name: "Tashbih Black & White", // ← এই name দেখাবে
	// 	// 		color: "White",
	// 	// 		colorHex: "#FFFFFF",
	// 	// 		price: 1999,
	// 	// 		offerPrice: 1500,
	// 	// 		stock: 8,
	// 	// 		images: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_4_dxuxxm.jpg"],
	// 	// 		hdImages: [ "https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_4_dxuxxm.jpg"],
	// 	// 	},
	// 	// 	{
	// 	// 		name: "Tashbih Red & Grey",
	// 	// 		color: "Red & Grey",
	// 	// 		colorHex: "#FF0000",
	// 	// 		price: 1999,
	// 	// 		offerPrice: 1500,
	// 	// 		stock: 0, // ← 0 হলে swatch এ cross দেখাবে
	// 	// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_5_oivhi8.jpg"],
	// 	// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534315/Tashbih_5_oivhi8.jpg"],
	// 	// 	},
	// 	// 	{
	// 	// 		name: "Tashbih Yellow & Orange",
	// 	// 		color: "Yellow & Orange",
	// 	// 		colorHex: "#FFFF00",
	// 	// 		price: 1999,
	// 	// 		offerPrice: 1500,
	// 	// 		stock: 20, // ← 0 হলে swatch এ cross দেখাবে
	// 	// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534317/Tashbih_3_lqves0.jpg"],
	// 	// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534317/Tashbih_3_lqves0.jpg"],
	// 	// 	},
	// 	// 	{
	// 	// 		name: "Tashbih Blue ",
	// 	// 		color: "Blue",
	// 	// 		colorHex: "#4169E1",
	// 	// 		price: 1999,
	// 	// 		offerPrice: 1500,
	// 	// 		stock: 20, // ← 0 হলে swatch এ cross দেখাবে
	// 	// 		images: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_1_xk5xu9.jpg"],
	// 	// 		hdImages: ["https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776534316/Tashbih_1_xk5xu9.jpg"],
	// 	// 	},
	// 	// ],

	// 	// ✅ SIZES যোগ করার উদাহরণ:
	// 	// extraPrice = 0 হলে base price ই থাকবে
	// 	// extraPrice > 0 হলে সেটা যোগ হবে
	// 	// sizes: [
	// 	// 	{ label: "S", stock: 10, extraPrice: 0 },
	// 	// 	{ label: "M", stock: 15, extraPrice: 0 },
	// 	// 	{ label: "L", stock: 8, extraPrice: 200 }, // L size এ +200 টাকা
	// 	// 	{ label: "XL", stock: 0, extraPrice: 300 }, // stock:0 হলে disabled
	// 	// ],

	// 	features: [
	// 		"	✔️ প্রিমিয়াম কোয়ালিটি ট্রান্সপারেন্ট বোতল",
	// 		"✔️ কিউট Bunny & Bear ডেকোরেশন 🐰🐻",
	// 		"✔️ স্টাইলিশ পার্ল ও চেইন স্ট্র্যাপ – ক্যারি করা সহজ",
	// 		"✔️ লিক-প্রুফ ডিজাইন 💧",
	// 		"✔️ লাইটওয়েট ও ডিউরেবল",
	// 		"🎨 কালার :- গোলাপি, সাদা, সবুজ, কালো",
	// 	],
	// },