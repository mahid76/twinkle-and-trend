import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getBestSellers } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedMap, setAddedMap] = useState({});
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setProducts(getBestSellers());
        setLoading(false);
    }, []);

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

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">Best Selling Products</h1>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-4 md:py-8 px-4">
            <div className="mb-6 md:mb-10">
                <h1 className="text-2xl text-center sm:text-4xl font-primary font-bold text-gray-800 mb-2">Best Selling Products</h1>
            </div>

            <div className="relative group">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20} loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true, el: ".custom-pagination", renderBullet: (index, className) => `<span class="${className}"></span>` }}
                    navigation={true}
                    breakpoints={{
                        0: { slidesPerView: 1, navigation: false, pagination: false },
                        640: { slidesPerView: 2, navigation: false },
                        1024: { slidesPerView: 3, navigation: true },
                        1280: { slidesPerView: 4, navigation: true },
                    }}
                    className="rounded-xl"
                >
                    {products.map((product) => {
                        const isAdded = addedMap[product.id];
                        const wishlisted = isInWishlist(product.id);
                        return (
                            <SwiperSlide key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <div className="flex justify-center md:block">
                                        <div className="bg-white rounded-xl shadow p-2 md:p-4 border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                                            <div className="relative overflow-hidden rounded-lg max-w-70 md:w-full">
                                                <div className="relative overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
                                                    <img draggable="false" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}
                                                        src={product.image} alt={product.name}
                                                        className="aspect-4/5 object-cover select-none transition-transform duration-500 hover:scale-105" />
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
                                            </div>

                                            <div className="mt-3 md:mt-4 flex flex-col grow">
                                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                                                <p className="text-emerald-600 font-bold text-xl mt-1 md:mt-2">৳{product.price}</p>
                                                <div className="flex items-center mt-1 md:mt-2">
                                                    <span className="text-yellow-500 text-sm">★</span>
                                                    <span className="text-gray-600 text-sm ml-1">{product.rating}</span>
                                                </div>
                                                <button onClick={(e) => handleAddToCart(e, product)} disabled={product.stock === 0}
                                                    className={`mt-2 md:mt-4 w-full py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm ${
                                                        isAdded ? "bg-green-500 text-white" : "bg-[#E771A3] text-white hover:bg-[#d15f93]"
                                                    }`}>
                                                    {isAdded ? (
                                                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>Added!</>
                                                    ) : (
                                                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Add to Cart</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="custom-pagination flex justify-center gap-2 mt-8" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-pagination .swiper-pagination-bullet { width:12px; height:12px; background:#cbd5e1; opacity:1; transition:all 0.3s; }
                .custom-pagination .swiper-pagination-bullet-active { background:#0f172a; width:30px; border-radius:6px; }
            ` }} />
        </div>
    );
};

export default BestSellingProducts;