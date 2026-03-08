// src/pages/ProductDetail/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Container from "../../components/layout/Container";
import tr1 from "../../assets/t&tr1.JPEG";
import tr2 from "../../assets/t&tr2.jpg";
import tr3 from "../../assets/t&tr3.jpg";
import tr4 from "../../assets/t&tr4.jpg";
import tr5 from "../../assets/t&tr5.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [_activeTab, _setActiveTab] = useState("description");

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Bag",
      price: 2999,
      image: tr1,
      rating: 4.5,
      description: "Premium quality leather bag with multiple compartments. Perfect for daily use.",
      category: "Fashion",
      stock: 5,
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
      id: 3,
      name: "Stanley",
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
      id: 4,
      name: "Two doll",
      price: 1999,
      image: tr4,
      rating: 4.6,
      description: "Beautiful two doll set. Perfect for collection.",
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
      id: 5,
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
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = mockProducts.find((p) => p.id === parseInt(id));
        if (product) {
          setProduct(product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-red-500 text-xl mb-4">Error: {error || "Product not found"}</p>
          <Link to="/products" className="text-teal-500 hover:underline text-lg">
            ← Back to Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#E6A0B5]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#E6A0B5]">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${
                    activeImage === index 
                      ? "border-[#E6A0B5] ring-2 ring-[#E6A0B5] ring-opacity-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-primary font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">({product.rating} / 5.0)</span>
                <span className="text-gray-400 text-sm ml-2">(12 reviews)</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-teal-500">
              ৳{product.price}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 w-24">Category:</span>
                <span className="text-gray-800 font-medium">{product.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 w-24">SKU:</span>
                <span className="text-gray-800 font-medium">T&T-{product.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 w-24">Stock:</span>
                <span className="text-gray-800 font-medium">{product.stock} units</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 w-24">Brand:</span>
                <span className="text-gray-800 font-medium">Twinkle & Trend</span>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-gray-800 mb-3">Product Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#E6A0B5] mt-1">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;