// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";

const Logo = ({ onClick }) => {
  return (
    <Link to="/" onClick={onClick} aria-label="Twinkle and Trend — হোম পেজ">
      <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dltlnoi9z/image/upload/f_webp,q_auto,w_80/v1776204520/logo_bs89oj.png"
          alt="Twinkle and Trend logo"
          className="h-8 md:h-10 w-auto flex-shrink-0"
          width="80"
          height="40"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        {/* ✅ font-logo → Didot font (index.css এ --font-logo define করা আছে) */}
        <span className="text-base md:text-xl font-logo font-bold leading-tight">
          Twinkle and Trend
        </span>
      </div>
    </Link>
  );
};

export default Logo;
