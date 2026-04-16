// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";

const Logo = ({ onClick }) => {
  return (
    <Link to="/" onClick={onClick} aria-label="Twinkle and Trend — হোম পেজ">
      <div className="flex items-center">
        <img
          // ✅ f_webp explicit + small size (logo ছোট)
          src="https://res.cloudinary.com/dltlnoi9z/image/upload/f_webp,q_auto,w_80/v1776204520/logo_bs89oj.png"
          alt="Twinkle and Trend logo"
          className="h-10 mr-3"
          width="80"
          height="40"
          // Logo always visible, eager load
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        <span className="md:text-2xl text-lg font-primary font-bold" aria-hidden="true">
          Twinkle and Trend
        </span>
      </div>
    </Link>
  );
};

export default Logo;
