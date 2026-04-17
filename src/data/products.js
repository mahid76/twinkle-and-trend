// src/data/products.js

export const products = [
	// catBag Category (8 Products)
	{
		id: 1,
		showStock: false,
		name: "Premium Cat Bag",
		price: 6249, // ✅ default price (প্রথম variant এর)
		// offerPrice: 2499,
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192948/InShot_20260415_000912018_oc8j2d.jpg", // ✅ default image (প্রথম variant এর)
		rating: 4.5,
		description:
			"আপনার স্টাইলকে দিন একদম ইউনিক টাচ এই সুপার কিউট Realistic Cat Bag দিয়ে!",
		category: "catBag",
		stock: 50,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192948/InShot_20260415_000912018_oc8j2d.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_000710127_g8k9yi.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000743589_hmyq8a.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192948/InShot_20260415_000912018_oc8j2d.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_001018145_qwvlpk.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192952/InShot_20260415_000710127_g8k9yi.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192951/InShot_20260415_000743589_hmyq8a.jpg",
		],
		features: [
			"🐾 Ultra-Realistic Design – একদম লাইফ-লাইক ক্যাট লুক",
			"🎀 Premium Soft Fur – সুপার নরম ও আরামদায়ক ফিনিশ",
			"💼 Multi-purpose Use – পার্টি, আউটিং বা গিফট হিসেবে পারফেক্ট",
			"🎁 Perfect Gift Item – ক্যাট লাভারদের জন্য দারুণ চয়েস",
			"👜 Lightweight & Comfortable – সহজে বহনযোগ্য",
			"Size:- Big Size (XXL) With Gift Box 🎁",
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
		price: 4999,
		offerPrice: 3499, // ✅ Offer Price
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
		name: "Labubu Doll Backpack",
		price: 1250,
		// offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_002301278_crehjw.jpg",
		rating: 4.4,
		description:
			"আপনার দৈনন্দিন স্টাইলকে আরও আকর্ষণীয় ও ইউনিক করে তুলতে নিয়ে আসুন এই Adorable Labubu Doll Backpack..",
		category: "bags", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_003006590_wre7h0.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002939781_cy6jlp.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002920040_pmzy1z.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_003023912_li0qz2.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002939781_cy6jlp.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002920040_pmzy1z.jpg",
		],
		features: [
			"সাইজ: মিডিয়াম (হালকা ও সহজে বহনযোগ্য)",
			"🎨 কালার: গোলাপি, সবুজ,  আকাশি, কফি, গ্রে । ",
		],
		//color
		variants: [
			{
				name: "Labubu Doll Backpack Pink ",
				color: "Pink",
				colorHex: "#FFC0CB",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_002301278_crehjw.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_002301278_crehjw.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Labubu Doll Backpack Grey ",
				color: "Grey",
				colorHex: "#808080",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002203559_joq9nv.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002203559_joq9nv.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Labubu Doll Backpack Green ",
				color: "Green",
				colorHex: "#008000",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192930/InShot_20260415_002218822_gzp9av.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192930/InShot_20260415_002218822_gzp9av.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Labubu Doll Backpack Light Blue ",
				color: "Light Blue",
				colorHex: "#ADD8E6",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192930/InShot_20260415_002233962_tl6rrj.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192930/InShot_20260415_002233962_tl6rrj.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Labubu Doll Backpack Coffee ",
				color: "Coffee",
				colorHex: "#6F4E37",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192929/InShot_20260415_002247300_hh0rjh.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192929/InShot_20260415_002247300_hh0rjh.jpg",
				],
				showStock: false,
				stock: 50,
			},
		],
	},
	{
		id: 5,
		showStock: false,
		name: "Cat Hand Bag",
		price: 1250,
		// offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_003006590_wre7h0.jpg",
		rating: 4.4,
		description:
			"আপনার দৈনন্দিন স্টাইলকে আরও আকর্ষণীয় করতে নিয়ে আসুন, নরম ফ্লাফি ডিজাইন, সুন্দর ক্যাট ফেস এবং ট্রেন্ডি লুক- Cat Hand Bag",
		category: "bags", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_003006590_wre7h0.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002939781_cy6jlp.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002920040_pmzy1z.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_003006590_wre7h0.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002939781_cy6jlp.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192931/InShot_20260415_002920040_pmzy1z.jpg",
		],
		features: [
			"প্রিমিয়াম সফট ফার ম্যাটেরিয়াল – হাতে নিলেই ভালো লাগবে",
			"কিউট ক্যাট ডিজাইন – সবার নজর কাড়বে সহজেই",
			"হালকা ওজন – সারাদিন বহন করতে আরামদায়ক",
			"স্ট্রং জিপার ও স্ট্র্যাপ – টেকসই ও নিরাপদ",
			"ছোট প্রয়োজনীয় জিনিস রাখার জন্য পারফেক্ট",
			"🎨 কালার:🟡 ইয়েলো | ⚪ হোয়াইট | ⚫ গ্রে",
		],

		//color
		variants: [
			{
				name: "Cat Hand Bag",
				color: "Grey",
				colorHex: "#808080",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_003023912_li0qz2.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_003023912_li0qz2.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Cat Hand Bag",
				color: "White",
				colorHex: "#FFFFFF",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192916/InShot_20260415_003041420_vjnwgu.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192917/InShot_20260415_003102182_rs5t2u.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192916/InShot_20260415_003041420_vjnwgu.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192917/InShot_20260415_003102182_rs5t2u.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Cat Hand Bag",
				color: "Yellow",
				colorHex: "#FFFF00 ",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192916/InShot_20260415_003207005_hdxulu.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192919/InShot_20260415_003120384_kbsz6n.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192916/InShot_20260415_003207005_hdxulu.jpg",
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192919/InShot_20260415_003120384_kbsz6n.jpg",
				],
				showStock: false,
				stock: 50,
			},
		],
	},
	// toys Category (1 Products)

	{
		id: 6,
		showStock: false,
		name: "Premium Cat Plush Toy",
		price: "450-850",
		// offerPrice: 699, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192899/InShot_20260415_003638749_u3cigs.jpg",
		rating: 4.4,
		description: "🧸 সুপার সফট ও হাই কোয়ালিটি প্লাশ ম্যাটেরিয়াল",
		category: "toys", // ✅ lowercase
		stock: 45,
		isBestSeller: true,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192900/InShot_20260415_003535767_rytp9n.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192902/InShot_20260415_003458835_og7sfl.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192900/InShot_20260415_003535767_rytp9n.jpg",
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192901/InShot_20260415_003515162_mz7a3j.jpg",
		],
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
		showStock: false,
		name: "Bunny Bottle Bag",
		price: 2050,
		offerPrice: 1250, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192923/InShot_20260415_002516977_hjp7cm.jpg",
		rating: 4.4,
		description: `🐰✨ কিউট Bunny Bottle Bag – স্টাইল আর ইউটিলিটির পারফেক্ট কম্বো! 
		✨🐻এটা শুধু একটি পানির বোতল নয়, বরং একটি ফ্যাশন স্টেটমেন্ট!`,
		category: "drinkWare", // ✅ lowercase
		stock: 45,
		isBestSeller: false,
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
			"	✔️ প্রিমিয়াম কোয়ালিটি ট্রান্সপারেন্ট বোতল",
			"✔️ কিউট Bunny & Bear ডেকোরেশন 🐰🐻",
			"✔️ স্টাইলিশ পার্ল ও চেইন স্ট্র্যাপ – ক্যারি করা সহজ",
			"✔️ লিক-প্রুফ ডিজাইন 💧",
			"✔️ লাইটওয়েট ও ডিউরেবল",
			"🎨 কালার :- গোলাপি, সাদা, সবুজ, কালো",
		],
		//color
		variants: [
			{
				name: "Bunny Bottle Bag",
				color: "Pink",
				colorHex: "#FFC0CB",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192927/InShot_20260415_002338470_dyt9c0.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192927/InShot_20260415_002338470_dyt9c0.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Bunny Bottle Bag",
				color: "Green",
				colorHex: "#008000",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192924/InShot_20260415_002404592_khwsgi.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192924/InShot_20260415_002404592_khwsgi.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Bunny Bottle Bag",
				color: "White",
				colorHex: "#FFFFFF",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_002325627_zy0vsc.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192928/InShot_20260415_002325627_zy0vsc.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Bunny Bottle Bag",
				color: "Black",
				colorHex: "#000000",
				price: 1250,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_002352377_nzbnu9.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192925/InShot_20260415_002352377_nzbnu9.jpg",
				],
				showStock: false,
				stock: 50,
			},
		],
	},
	// digitalPrayerTasbih Category (1 Products)

	{
		id: 8,
		showStock: false,
		name: "Tashbih",
		price: 1999,
		offerPrice: 1500, // ✅ Offer Price
		image:
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192861/InShot_20260415_004509659_erqczs.jpg",
		rating: 4.4,
		description: `🐰✨ কিউট Bunny Bottle Bag – স্টাইল আর ইউটিলিটির পারফেক্ট কম্বো! 
		✨🐻এটা শুধু একটি পানির বোতল নয়, বরং একটি ফ্যাশন স্টেটমেন্ট!`,
		category: "digitalPrayerTasbih", // ✅ lowercase
		stock: 45,
		isBestSeller: false,
		images: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192861/InShot_20260415_004509659_erqczs.jpg",
		],
		hdImages: [
			"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192861/InShot_20260415_004509659_erqczs.jpg",
		],
		features: [
			"	✔️ প্রিমিয়াম কোয়ালিটি ট্রান্সপারেন্ট বোতল",
			"✔️ কিউট Bunny & Bear ডেকোরেশন 🐰🐻",
			"✔️ স্টাইলিশ পার্ল ও চেইন স্ট্র্যাপ – ক্যারি করা সহজ",
			"✔️ লিক-প্রুফ ডিজাইন 💧",
			"✔️ লাইটওয়েট ও ডিউরেবল",
			"🎨 কালার :- গোলাপি, সাদা, সবুজ, কালো",
		],
		//color
		variants: [
			{
				name: "Tashbih",
				color: "Pink",
				colorHex: "#FFC0CB",
				price: 1500,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192880/InShot_20260415_004230590_snhqjy.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192880/InShot_20260415_004230590_snhqjy.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Tashbih",
				color: "Blue",
				colorHex: "#0000FF",
				price: 1500,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192884/InShot_20260415_004201496_knnksv.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192884/InShot_20260415_004201496_knnksv.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Tashbih",
				color: "Yellow",
				colorHex: "#FFFF00",
				price: 1500,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192875/InShot_20260415_004257037_ssdpkx.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192875/InShot_20260415_004257037_ssdpkx.jpg",
				],
				showStock: false,
				stock: 50,
			},
			{
				name: "Tashbih",
				color: "Black",
				colorHex: "#000000",
				price: 1500,
				// offerPrice: 2499,
				images: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192873/InShot_20260415_004317208_mimjur.jpg",
				], // ✅ 4টা regular image
				hdImages: [
					"https://res.cloudinary.com/dltlnoi9z/image/upload/q_auto/f_auto/v1776192873/InShot_20260415_004317208_mimjur.jpg",
				],
				showStock: false,
				stock: 50,
			},
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
//   id: 2,
//   name: "Premium Cat Bag",         // ← fallback name
//   price: 4999,
//   offerPrice: 3499,
//   category: "catBag",
//   image: "",            // ← main thumbnail
//   images: ["", ""],
//   hdImages: [	"", "",	"",],
//   rating: 4.6,
//   stock: 20,

//   variants: [
//     {
//       name: "Premium Cat Bag02 — Pink Edition",   // ← এই name দেখাবে
//       color: "Pink",
//       colorHex: "#FFB6C1",
//       price: 4999,
//       offerPrice: 3499,
//       stock: 15,
//       images: ["", ""],
//       hdImages: [	"", "",	],

//     },
//     {
//       name: "Premium Cat Bag02 — Classic White",  // ← এই name দেখাবে
//       color: "White",
//       colorHex: "#FFFFFF",
//       price: 5200,
//       offerPrice: 3699,
//       stock: 8,
//       images: ["", ""],
// 			hdImages: [	"", "",	],

//     },
//     {
//       // name না দিলে product.name দেখাবে
//       color: "Brown",
//       colorHex: "#8B4513",
//       price: 4999,
//       offerPrice: 3499,
//       stock: 0,   // ← 0 হলে swatch এ cross দেখাবে
//       images:["", ""],
// 			hdImages: [	"", "",],

//     },
//     {
//       // name না দিলে product.name দেখাবে
//       color: "Grey",
//       colorHex: "#808080",
//       price: 4999,
//       offerPrice: 3499,
//       stock: 0,   // ← 0 হলে swatch এ cross দেখাবে
//       images:["", ""],
// 			hdImages: [	"", "",],

//     },
//   ],

//   // ✅ SIZES যোগ করার উদাহরণ:
//   // extraPrice = 0 হলে base price ই থাকবে
//   // extraPrice > 0 হলে সেটা যোগ হবে
//   sizes: [
//     { label: "S",  stock: 10, extraPrice: 0    },
//     { label: "M",  stock: 15, extraPrice: 0    },
//     { label: "L",  stock: 8,  extraPrice: 200  },   // L size এ +200 টাকা
//     { label: "XL", stock: 0,  extraPrice: 300  },   // stock:0 হলে disabled
//   ],

//   features: [
//     "Premium synthetic leather",
//     "Adjustable strap",
//     "Multiple compartments",
//   ],
// };