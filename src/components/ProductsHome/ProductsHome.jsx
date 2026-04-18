// src/components/ProductsHome/ProductsHome.jsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import ProductCard from "../ui/ProductCard";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export const CATEGORY_LABELS = {
  catBag:              "Cat Bag",
  bags:                "Bags & Accessories",
  toys:                "Toys",
  drinkWare:           "Drink Ware",
  digitalPrayerTasbih: "Digital Prayer Tasbih",
};

const ProductsHome = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [addedMap, setAddedMap]         = useState({});
  const { addToCart }                   = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user }                        = useAuth();
  const navigate                        = useNavigate();

  const visibleProducts = products.slice(0, visibleCount);

  const handleAddToCart = useCallback((product) => {
    addToCart(product, product.variants?.[0] ?? null, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 2000);
  }, [addToCart]);

  const handleWishlist = useCallback((product) => {
    if (!user) { navigate("/login"); return; }
    toggleWishlist(product);
  }, [user, navigate, toggleWishlist]);

  return (
    <Container>
      <section className="py-5 md:py-8" aria-labelledby="shop-all-heading">
        <div className="text-center mb-6 md:mb-10">
          <h2 id="shop-all-heading" className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">
            Shop All Products
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
              isAdded={addedMap[product.id] ?? false}
              wishlisted={isInWishlist(product.id)}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
              categoryLabel={CATEGORY_LABELS[product.category] ?? product.category}
            />
          ))}
        </div>

        <div className="flex justify-center mt-5 md:mt-10">
          {visibleCount < products.length ? (
            <button onClick={() => setVisibleCount((prev) => prev + 4)} aria-label="আরো পণ্য দেখুন"
              className="bg-[#E771A3] text-white px-6 py-3 rounded-md hover:bg-[#d15f93] transition-all duration-300 hover:scale-105">
              View More
            </button>
          ) : (
            <button onClick={() => setVisibleCount(4)} aria-label="কম পণ্য দেখুন"
              className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-all duration-300 hover:scale-105">
              View Less
            </button>
          )}
        </div>
      </section>
    </Container>
  );
};

export default ProductsHome;
