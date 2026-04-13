import { useState } from "react";
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

const MobileMenu = ({
    isMobile = false, mobileMenuOpen, setMobileMenuOpen,
    mobileDropdownOpen, setMobileDropdownOpen, toggleSearchModal, handleLinkClick,
}) => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const { wishlistCount } = useWishlist();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = async () => {
        await logout();
        setShowLogoutModal(false);
        handleLinkClick();
    };

    if (isMobile) {
        return (
            <>
                {showLogoutModal && <LogoutModal onConfirm={handleLogoutConfirm} onCancel={() => setShowLogoutModal(false)} />}
                <div className="md:hidden flex items-center gap-1">
                    <button onClick={toggleSearchModal} className="p-2 hover:bg-[#FCE4EC] rounded-full transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <Link to="/wishlist" className="relative p-2 hover:bg-[#FCE4EC] rounded-full transition-all">
                        <svg className="w-5 h-5" fill={wishlistCount > 0 ? "#E771A3" : "none"} stroke="#E771A3" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {wishlistCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#E771A3] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount > 9 ? "9+" : wishlistCount}</span>}
                    </Link>
                    <Link to="/cart" className="relative p-2 hover:bg-[#FCE4EC] rounded-full transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#E771A3] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount > 9 ? "9+" : cartCount}</span>}
                    </Link>
                    <button onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileDropdownOpen(false); }} className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            {showLogoutModal && <LogoutModal onConfirm={handleLogoutConfirm} onCancel={() => setShowLogoutModal(false)} />}
            {mobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />}
            <div className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#FAD0E4] shadow-xl transition-all duration-300 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="p-4 max-h-[90vh] overflow-y-auto">
                    {user && (
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#FFF7FB] rounded-xl mb-3">
                            {user.photoURL
                                ? <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                                : <div className="w-10 h-10 rounded-full bg-[#E771A3] text-white flex items-center justify-center font-bold">{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</div>
                            }
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{user.displayName || "User"}</p>
                                <p className="text-xs text-gray-400 truncate max-w-[180px]">{user.email}</p>
                            </div>
                        </div>
                    )}

                    <ul className="flex flex-col space-y-1">
                        <Link to="/" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium">Home</Link>
                        <Link to="/products" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium">Product</Link>
                        <li>
                            <button onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium">
                                <span>Categories</span>
                                <svg className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {mobileDropdownOpen && (
                                <ul className="ml-4 mt-1 space-y-1 bg-[#FFF7FB] rounded-xl p-2 border border-[#FAD0E4]">
                                    {categories.map((cat) => (
                                        <Link key={cat.slug} to={`/products?category=${cat.slug}`} onClick={handleLinkClick}
                                            className="px-4 py-2.5 hover:bg-[#FCE4EC] text-gray-700 block rounded-lg transition-colors text-sm">{cat.name}</Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <Link to="/offers" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium">Offers</Link>
                        <Link to="/ContactUs" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium">Contact Us</Link>

                        <div className="flex gap-2 pt-1">
                            <Link to="/wishlist" onClick={handleLinkClick} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors text-sm font-medium border border-[#FAD0E4]">
                                <svg className="w-4 h-4" fill={wishlistCount > 0 ? "#E771A3" : "none"} stroke="#E771A3" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                Wishlist {wishlistCount > 0 && <span className="bg-[#E771A3] text-white text-[9px] px-1.5 py-0.5 rounded-full">{wishlistCount}</span>}
                            </Link>
                            <Link to="/cart" onClick={handleLinkClick} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-xl transition-colors text-sm font-medium border border-[#FAD0E4]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Cart {cartCount > 0 && <span className="bg-[#E771A3] text-white text-[9px] px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                            </Link>
                        </div>

                        <div className="border-t border-gray-100 pt-2 mt-2">
                            {user ? (
                                <button onClick={() => setShowLogoutModal(true)}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Logout
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login" onClick={handleLinkClick} className="flex-1 text-center bg-[#E771A3] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#d15f93] transition-colors">Login</Link>
                                    <Link to="/register" onClick={handleLinkClick} className="flex-1 text-center border-2 border-[#E771A3] text-[#E771A3] py-3 rounded-xl text-sm font-semibold hover:bg-[#FCE4EC] transition-colors">Register</Link>
                                </div>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;