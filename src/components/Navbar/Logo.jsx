// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";

/**
 * Logo — plain <img>, no wrapper complexity.
 *
 * WHY NOT OptimizedImage here:
 *   OptimizedImage adds a relative/overflow-hidden wrapper div which
 *   disrupted the navbar flex layout causing the text to wrap.
 *   For a tiny 80px logo, srcSet is overkill — one sharp WebP is fine.
 *
 * CLS fix:
 *   width="80" height="40" matches the largest rendered size (md:h-10 = 40px).
 *   style={{ aspectRatio }} locks it as the browser scales it down on mobile.
 *   This prevents any layout shift.
 */
const Logo = ({ onClick }) => (
  <Link to="/" onClick={onClick} aria-label="Twinkle and Trend — হোম পেজ">
    <div className="flex items-center gap-2">
      <img
        src="https://res.cloudinary.com/dltlnoi9z/image/upload/f_webp,q_auto,w_80/v1776204520/logo_bs89oj.png"
        alt="Twinkle and Trend logo"
        width={80}
        height={40}
        style={{ aspectRatio: "2/1" }}
        className="h-8 md:h-10 w-auto flex-shrink-0"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      <span className="text-base md:text-xl font-logo font-bold leading-tight whitespace-nowrap">
        Twinkle and Trend
      </span>
    </div>
  </Link>
);


export default Logo;
