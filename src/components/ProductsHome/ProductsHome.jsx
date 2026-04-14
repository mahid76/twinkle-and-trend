import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const ProductsHome = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const [addedMap, setAddedMap] = useState({});
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { user } = useAuth();
    const navigate = useNavigate();

    const visibleProducts = products.slice(0, visibleCount);

    const categoryMap = {
        fashion: "Fashion", toys: "Toys", "home-kitchen": "Home & Kitchen",
        religious: "Religious", electronics: "Electronics", sports: "Sports",
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        addToCart(product, product.variants?.[0] ?? null, 1);
        setAddedMap((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 2000);
    };

    const handleWishlist = (e, product) => {
        e.preventDefault();
        if (!user) { navigate("/login"); return; }
        toggleWishlist(product);
    };

    return (
        <Container>
            <div className="py-5 md:py-8">
                <div className="text-center mb-6 md:mb-10">
                    <h1 className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">
                        Shop All Products
                    </h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {visibleProducts.map((product) => {
                        const hasOffer = product.offerPrice && product.offerPrice < product.price;
                        const discount = hasOffer ? getDiscountPercentage(product.price, product.offerPrice) : 0;
                        const isAdded = addedMap[product.id];
                        const wishlisted = isInWishlist(product.id);

                        return (
                            <Link key={product.id} to={`/products/${product.id}`}
                                className="bg-white rounded-md md:rounded-lg shadow-sm md:shadow-lg overflow-hidden hover:shadow-md md:hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative overflow-hidden">
                                    <div className="relative overflow-hidden aspect-4/5" onContextMenu={(e) => e.preventDefault()}>
                                        <img src={product.image} alt={product.name} draggable="false"
                                            onDragStart={(e) => e.preventDefault()}
                                            className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105" />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">Twinkle and trend</p>
                                        </div>
                                        <div className="absolute inset-0" />
                                    </div>

                                    {/* ✅ Wishlist heart */}
                                    <button onClick={(e) => handleWishlist(e, product)}
                                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10">
                                        <svg className="w-4 h-4" fill={wishlisted ? "#E771A3" : "none"} stroke="#E771A3" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>

                                    {product.stock === 0 && <div className="absolute top-2 left-2 bg-red-500 text-white px-2 md:px-3 py-1 text-[10px] md:text-sm rounded-full font-medium">Out of Stock</div>}
                                    {product.stock < 10 && product.stock > 0 && <div className="absolute top-10 left-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 text-[10px] md:text-sm rounded-full font-medium">Only {product.stock} left!</div>}
                                    {hasOffer && <div className="absolute bottom-2 left-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 text-[10px] md:text-sm rounded-full font-bold">{discount}% OFF</div>}
                                    {product.isBestSeller && <div className="absolute top-2 left-2 bg-[#F6D6DF] text-[#E771A3] px-2 md:px-3 py-1 rounded-full text-[10px] md:text-sm font-bold">⭐ Best Seller</div>}
                                </div>

                                <div className="px-2 py-2 md:p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{categoryMap[product.category] || product.category}</span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-500 text-sm">★</span>
                                            <span className="text-gray-600 text-sm ml-1">{product.rating}</span>
                                        </div>
                                    </div>
                                    <h1 className="text-md md:text-xl mb-2 font-semibold text-gray-800 line-clamp-2">{product.name}</h1>
                                    <div className="mb-2 md:mb-3">
                                        {hasOffer ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E771A3] font-bold text-lg md:text-xl">৳{product.offerPrice}</span>
                                                <span className="text-gray-400 text-sm line-through">৳{product.price}</span>
                                            </div>
                                        ) : (
                                            <p className="text-[#E771A3] font-bold text-lg md:text-xl">৳{product.price}</p>
                                        )}
                                    </div>
                                    <button onClick={(e) => handleAddToCart(e, product)} disabled={product.stock === 0}
                                        className={`w-full px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                                            isAdded ? "bg-green-500 text-white" : "bg-[#E771A3] text-white hover:bg-[#d15f93]"
                                        }`}>
                                        {isAdded ? (
                                            <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>Added!</>
                                        ) : (
                                            <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Add to Cart</>
                                        )}
                                    </button>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-5 md:mt-10">
                    {visibleCount < products.length ? (
                        <button onClick={() => setVisibleCount((prev) => prev + 4)}
                            className="bg-[#E771A3] text-white px-6 py-3 rounded-md hover:bg-[#d15f93] transition-all duration-300 hover:scale-105">
                            View More
                        </button>
                    ) : (
                        <button onClick={() => setVisibleCount(4)}
                            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            View Less
                        </button>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ProductsHome;