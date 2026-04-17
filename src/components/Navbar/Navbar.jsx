// src/components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { products } from "../../data/products";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const navigate = useNavigate();
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setShowSearchModal(false);
                setSearchQuery("");
            }
        };
        if (showSearchModal) document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [showSearchModal]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                const filtered = products.filter((p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(filtered.slice(0, 6));
                setShowSuggestions(true);
            } else {
                setSearchResults([]);
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        setShowSuggestions(false);
        setShowSearchModal(false);
    };

    const handleProductClick = (id) => {
        setShowSuggestions(false);
        setShowSearchModal(false);
        navigate(`/products/${id}`);
    };

    const toggleSearchModal = () => {
        setShowSearchModal(!showSearchModal);
        if (!showSearchModal) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(false);
    };

    return (
        <>
            {/*
              ✅ FIX: Mobile gap সমস্যা
              Mobile navbar আসল height = logo h-8(32px) + py-2(16px) = 48px = h-12
              Desktop navbar আসল height = logo h-10(40px) + py-2(16px) = 56px ≈ h-[60px]
              আগে সব জায়গায় h-[60px] ছিল → mobile এ 12px extra gap তৈরি হতো
            */}
            <div className="h-12 md:h-[60px]" aria-hidden="true" />

            <nav
                className="w-full fixed top-0 left-0 right-0 z-50 bg-white text-black shadow-md"
                aria-label="Main navigation"
                id="main-nav"
            >
                <Container>
                    <div className="flex items-center justify-between py-2">
                        <Logo onClick={handleLinkClick} />
                        <DesktopMenu onLinkClick={handleLinkClick} />
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            showSuggestions={showSuggestions}
                            searchResults={searchResults}
                            handleSearch={handleSearch}
                            handleProductClick={handleProductClick}
                            searchRef={searchRef}
                        />
                        <MobileMenu
                            isMobile={true}
                            mobileMenuOpen={mobileMenuOpen}
                            setMobileMenuOpen={setMobileMenuOpen}
                            mobileDropdownOpen={mobileDropdownOpen}
                            setMobileDropdownOpen={setMobileDropdownOpen}
                            toggleSearchModal={toggleSearchModal}
                            handleLinkClick={handleLinkClick}
                        />
                    </div>
                </Container>

                <MobileMenu
                    isMobile={false}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                    mobileDropdownOpen={mobileDropdownOpen}
                    setMobileDropdownOpen={setMobileDropdownOpen}
                    handleLinkClick={handleLinkClick}
                />

                <SearchModal
                    showSearchModal={showSearchModal}
                    setShowSearchModal={setShowSearchModal}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    showSuggestions={showSuggestions}
                    searchResults={searchResults}
                    handleSearch={handleSearch}
                    handleProductClick={handleProductClick}
                    inputRef={inputRef}
                    searchRef={searchRef}
                />
            </nav>
        </>
    );
};

export default Navbar;
