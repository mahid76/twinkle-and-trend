import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories } from "./Categories";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

const LogoutModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <div className="text-center mb-5">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Logout করবেন?</h3>
                <p className="text-gray-500 text-sm mt-1">আপনি কি সত্যিই logout করতে চান?</p>
            </div>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">Cancel</button>
                <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors text-sm">Logout</button>
            </div>
        </div>
    </div>
);

const DesktopMenu = ({ onLinkClick }) => {
    const [open, setOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);
    const userMenuRef = useRef(null);
    const hoverTimeout = useRef(null); // ✅ hover delay এর জন্য
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const { wishlistCount } = useWishlist();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpen(false);
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setUserMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoutConfirm = async () => {
        await logout();
        setShowLogoutModal(false);
        setUserMenuOpen(false);
    };

    // ✅ Hover handlers — 150ms delay দিয়ে accidental trigger এড়ানো হচ্ছে
    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpen(true), 100);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpen(false), 200);
    };

    // Cleanup on unmount
    useEffect(() => () => clearTimeout(hoverTimeout.current), []);

    return (
        <>
            {showLogoutModal && <LogoutModal onConfirm={handleLogoutConfirm} onCancel={() => setShowLogoutModal(false)} />}

            <ul className="hidden md:flex font-secondary space-x-1 text-sm items-center text-[#1F2937]">
                <Link to="/" onClick={onLinkClick} className="px-4 py-3 hover:text-[#C2185B] transition-colors">Home</Link>
                <Link to="/products" onClick={onLinkClick} className="px-4 py-3 hover:text-[#C2185B] transition-colors">Product</Link>

                {/* ✅ Categories — hover + click দুটোতেই খোলে */}
                <li
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        aria-expanded={open}
                        aria-haspopup="true"
                        className="px-4 py-3 hover:text-[#C2185B] flex items-center gap-1 transition-colors"
                    >
                        Categories
                        <svg className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown — open state দিয়ে control হচ্ছে */}
                    <ul
                        role="menu"
                        className={`absolute top-full left-0 bg-white text-black w-52 rounded-xl border border-[#FAD0E4] shadow-xl transition-all duration-200 overflow-hidden z-50 ${
                            open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                        }`}
                    >
                        {categories.map((cat) => (
                            <Link
                                key={cat.slug}
                                to={`/products?category=${cat.slug}`}
                                role="menuitem"
                                onClick={() => { setOpen(false); onLinkClick?.(); }}
                                className="block px-4 py-3 hover:bg-[#FCE4EC] hover:text-[#C2185B] transition-colors text-sm"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </ul>
                </li>

                <Link to="/offers" onClick={onLinkClick} className="px-4 py-3 hover:text-[#C2185B] transition-colors">Offers</Link>
                <Link to="/ContactUs" onClick={onLinkClick} className="px-4 py-3 hover:text-[#C2185B] transition-colors">Contact Us</Link>

                {/* Wishlist */}
                <Link to="/wishlist" onClick={onLinkClick} aria-label={`Wishlist — ${wishlistCount} items`} className="relative p-2.5 hover:text-[#C2185B] hover:bg-[#FCE4EC] rounded-full transition-all">
                    <svg className="w-5 h-5" fill={wishlistCount > 0 ? "#E771A3" : "none"} stroke="#E771A3" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {wishlistCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-[#E771A3] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {wishlistCount > 9 ? "9+" : wishlistCount}
                        </span>
                    )}
                </Link>

                {/* Cart */}
                <Link to="/cart" onClick={onLinkClick} aria-label={`Cart — ${cartCount} items`} className="relative p-2.5 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-full transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-[#E771A3] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {cartCount > 9 ? "9+" : cartCount}
                        </span>
                    )}
                </Link>

                {/* User */}
                {user ? (
                    <li ref={userMenuRef} className="relative">
                        <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#FCE4EC] transition-colors">
                            {user.photoURL
                                ? <img src={user.photoURL?.replace('=s96-c', '') + '=s64-c'} alt="avatar" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 rounded-full object-cover" />
                                : <div className="w-8 h-8 rounded-full bg-[#E771A3] text-white flex items-center justify-center text-sm font-bold">
                                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                                  </div>
                            }
                            <span className="text-sm text-gray-700 max-w-[80px] truncate hidden lg:block">
                                {user.displayName?.split(" ")[0] || "User"}
                            </span>
                            <svg className={`w-3 h-3 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-xl w-52 py-2 z-50 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100 bg-[#FFF7FB]">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{user.displayName || "User"}</p>
                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                </div>
                                <Link to="/wishlist" onClick={() => { setUserMenuOpen(false); onLinkClick?.(); }}
                                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FCE4EC] hover:text-[#E771A3] transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    My Wishlist
                                    {wishlistCount > 0 && <span className="ml-auto bg-[#FCE4EC] text-[#E771A3] text-xs px-1.5 py-0.5 rounded-full font-bold">{wishlistCount}</span>}
                                </Link>
                                <Link to="/cart" onClick={() => { setUserMenuOpen(false); onLinkClick?.(); }}
                                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FCE4EC] hover:text-[#E771A3] transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    My Cart
                                    {cartCount > 0 && <span className="ml-auto bg-[#FCE4EC] text-[#E771A3] text-xs px-1.5 py-0.5 rounded-full font-bold">{cartCount}</span>}
                                </Link>
                                <div className="border-t border-gray-100 mt-1 pt-1">
                                    <button onClick={() => setShowLogoutModal(true)}
                                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ) : (
                    <Link to="/login" onClick={onLinkClick}
                        className="ml-1 bg-[#E771A3] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#d15f93] transition-colors">
                        Login
                    </Link>
                )}
            </ul>
        </>
    );
};

export default DesktopMenu;
