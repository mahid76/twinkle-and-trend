// src/data/products.js
import tr1 from "../assets/t&tr1.JPEG";
import tr2 from "../assets/t&tr2.jpg";
import tr3 from "../assets/t&tr3.jpg";
import tr4 from "../assets/t&tr4.jpg";
import tr5 from "../assets/t&tr5.jpg";

// Image Array for variety
const images = [tr1, tr2, tr3, tr4, tr5];

export const products = [
  // Fashion Category (8 Products)
  {
    id: 1,
    name: "Premium Leather Bag",
    price: 2999,
    image: tr1,
    rating: 4.5,
    description: "Premium quality leather bag with multiple compartments. Perfect for daily use.",
    category: "Fashion",
    stock: 50,
    images: [tr1, tr1, tr1, tr1],
    features: [
      "Genuine leather material",
      "Multiple compartments",
      "Adjustable shoulder strap",
      "Dimensions: 30x20x10 cm",
    ],
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: 3499,
    image: tr1,
    rating: 4.6,
    description: "Elegant designer handbag for women. Perfect for office and casual wear.",
    category: "Fashion",
    stock: 35,
    images: [tr1, tr1, tr1, tr1],
    features: [
      "Premium synthetic leather",
      "Gold-plated hardware",
      "Interior zip pocket",
      "Dimensions: 28x18x12 cm",
    ],
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 1299,
    image: tr1,
    rating: 4.3,
    description: "Genuine leather wallet with multiple card slots and cash compartment.",
    category: "Fashion",
    stock: 60,
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
    name: "Sunglasses",
    price: 899,
    image: tr2,
    rating: 4.4,
    description: "Stylish sunglasses with UV protection for men and women.",
    category: "Fashion",
    stock: 45,
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
    name: "Wrist Watch",
    price: 4999,
    image: tr1,
    rating: 4.7,
    description: "Classic analog wristwatch with leather strap. Perfect for formal occasions.",
    category: "Fashion",
    stock: 25,
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
    name: "Fashion Belt",
    price: 799,
    image: tr1,
    rating: 4.2,
    description: "Stylish leather belt with metal buckle. Available in multiple colors.",
    category: "Fashion",
    stock: 80,
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
    name: "Scarf",
    price: 599,
    image: tr2,
    rating: 4.1,
    description: "Soft and warm scarf for winter season. Perfect gift item.",
    category: "Fashion",
    stock: 100,
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
    name: "Gloves",
    price: 499,
    image: tr2,
    rating: 4.0,
    description: "Warm winter gloves with touchscreen compatible fingertips.",
    category: "Fashion",
    stock: 70,
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
    name: "Cat Doll",
    price: 599,
    image: tr2,
    rating: 4.2,
    description: "Soft and cuddly cat doll. Great gift for kids and cat lovers.",
    category: "Toys",
    stock: 100,
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
    name: "Two Doll Set",
    price: 1999,
    image: tr4,
    rating: 4.6,
    description: "Beautiful two doll set. Perfect for collection and gifting.",
    category: "Toys",
    stock: 30,
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
    name: "Teddy Bear",
    price: 899,
    image: tr2,
    rating: 4.8,
    description: "Cute teddy bear for kids. Perfect birthday gift.",
    category: "Toys",
    stock: 55,
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
    name: "Puzzle Game",
    price: 499,
    image: tr3,
    rating: 4.5,
    description: "Educational puzzle game for kids. Improves cognitive skills.",
    category: "Toys",
    stock: 40,
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
    name: "Building Blocks",
    price: 1299,
    image: tr4,
    rating: 4.7,
    description: "Creative building blocks set. 200+ pieces for endless fun.",
    category: "Toys",
    stock: 35,
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
    name: "Remote Control Car",
    price: 2499,
    image: tr3,
    rating: 4.6,
    description: "Fast remote control car with rechargeable battery.",
    category: "Toys",
    stock: 20,
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
    name: "Stanley Cup",
    price: 399,
    image: tr3,
    rating: 4.8,
    description: "Classic Stanley cup. Keeps drinks cold for 24 hours.",
    category: "Home & Kitchen",
    stock: 75,
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
    name: "Kitchen Knife Set",
    price: 2499,
    image: tr3,
    rating: 4.9,
    description: "Professional kitchen knife set for all cooking needs.",
    category: "Home & Kitchen",
    stock: 20,
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
    name: "Coffee Maker",
    price: 3999,
    image: tr3,
    rating: 4.5,
    description: "Automatic coffee maker with programmable timer.",
    category: "Home & Kitchen",
    stock: 15,
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
    name: "Blender",
    price: 2999,
    image: tr3,
    rating: 4.4,
    description: "Powerful blender for smoothies, shakes, and more.",
    category: "Home & Kitchen",
    stock: 25,
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
    name: "Air Fryer",
    price: 5999,
    image: tr3,
    rating: 4.7,
    description: "Healthy air fryer with digital controls and preset programs.",
    category: "Home & Kitchen",
    stock: 18,
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
    name: "Storage Containers",
    price: 999,
    image: tr3,
    rating: 4.3,
    description: "Set of 10 airtight storage containers for kitchen organization.",
    category: "Home & Kitchen",
    stock: 45,
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
    name: "Tashbih",
    price: 4999,
    image: tr5,
    rating: 4.7,
    description: "Premium quality tashbih. Made with natural materials.",
    category: "Religious",
    stock: 25,
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
    name: "Prayer Mat",
    price: 1299,
    image: tr5,
    rating: 4.6,
    description: "Comfortable prayer mat with carrying bag. Portable and lightweight.",
    category: "Religious",
    stock: 60,
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
    name: "Quran Stand",
    price: 1999,
    image: tr5,
    rating: 4.5,
    description: "Wooden Quran stand with adjustable height. Elegant design.",
    category: "Religious",
    stock: 30,
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
    name: "Islamic Wall Art",
    price: 899,
    image: tr5,
    rating: 4.4,
    description: "Beautiful Islamic calligraphy wall art. Perfect for home decoration.",
    category: "Religious",
    stock: 40,
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
    name: "Wireless Earbuds",
    price: 2999,
    image: tr1,
    rating: 4.6,
    description: "Premium wireless earbuds with noise cancellation and long battery life.",
    category: "Electronics",
    stock: 50,
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
    name: "Power Bank",
    price: 1499,
    image: tr1,
    rating: 4.5,
    description: "High-capacity power bank with fast charging support.",
    category: "Electronics",
    stock: 80,
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
    name: "Smart Watch",
    price: 4999,
    image: tr1,
    rating: 4.7,
    description: "Feature-rich smartwatch with health monitoring and notifications.",
    category: "Electronics",
    stock: 35,
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
    name: "Bluetooth Speaker",
    price: 1999,
    image: tr1,
    rating: 4.4,
    description: "Portable Bluetooth speaker with 360-degree sound.",
    category: "Electronics",
    stock: 45,
    images: [tr1, tr1, tr1, tr1],
    features: [
      "360-degree sound",
      "10-hour battery",
      "Water resistant",
      "Built-in microphone",
    ],
  },

    {
    id: 29,
    name: "Yoga Mat",
    price: 1299,
    image: tr2,
    rating: 4.6,
    description: "Premium non-slip yoga mat for all types of exercises.",
    category: "Sports",
    stock: 55,
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
    name: "Dumbbell Set",
    price: 3499,
    image: tr3,
    rating: 4.8,
    description: "Adjustable dumbbell set for home workouts. 5-25kg per dumbbell.",
    category: "Sports",
    stock: 25,
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
  return products.filter((product) => product.price >= min && product.price <= max);
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

export const getCategories = () => {
  return [...new Set(products.map((p) => p.category))];
};

export const getProductsByRating = (minRating) => {
  return products.filter((product) => product.rating >= minRating);
};

export const getLowStockProducts = (threshold = 10) => {
  return products.filter((product) => product.stock <= threshold && product.stock > 0);
};

export const getOutOfStockProducts = () => {
  return products.filter((product) => product.stock === 0);
};

export const getFeaturedProducts = () => {
  return products
    .filter((product) => product.rating >= 4.5 && product.stock > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
};

export const getNewArrivals = () => {
  return products
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);
};

export const getBestSellers = () => {
  return products
    .filter((product) => product.stock > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
};