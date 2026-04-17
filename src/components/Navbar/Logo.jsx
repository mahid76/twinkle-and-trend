// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";

const Logo = ({ onClick }) => {
  return (
    <Link to="/" onClick={onClick} aria-label="Twinkle and Trend — হোম পেজ">
      <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dltlnoi9z/image/upload/f_webp,q_auto,w_80/v1776204520/logo_bs89oj.png"
          alt="Twinkle and Trend logo"
          // ✅ FIX: h-8 mobile, h-10 desktop — w-auto দিয়ে ratio ঠিক রাখা
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
        {/* ✅ FIX: text-base mobile, text-xl desktop — আগে md:text-2xl ছিল যেটা wrap হতো */}
        <span className="text-base md:text-xl font-primary font-bold leading-tight">
          Twinkle and Trend
        </span>
      </div>
    </Link>
  );
};

export default Logo;
