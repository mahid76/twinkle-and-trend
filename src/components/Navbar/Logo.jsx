// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";
import OptimizedImage, { WIDTHS, SIZES } from "../ui/OptimizedImage";

/**
 * Logo — fixed CLS issues:
 *
 * BEFORE:
 *   width="80" height="40" but CSS used h-8 (32px) on mobile
 *   → Browser allocated 80×40, then CSS shrunk it → layout shift
 *   fetchpriority (lowercase) → React ignored it
 *
 * AFTER:
 *   Uses OptimizedImage with:
 *   - width="64" height="32" matching mobile CSS (h-8)
 *   - style={{ aspectRatio: "2/1" }} locks ratio across breakpoints
 *   - fetchPriority="high" (camelCase) → React correctly sets it
 *   - fill=false → no absolute positioning for logo (it's inline)
 */
const Logo = ({ onClick }) => {
  return (
    <Link to="/" onClick={onClick} aria-label="Twinkle and Trend — হোম পেজ">
      <div className="flex items-center gap-2">
        {/*
          h-8 md:h-10 on the wrapper div controls rendered height.
          The img itself has fill=false so it respects the parent height.
          aspectRatio="2/1" + explicit width/height attrs prevent CLS.
        */}
        <div
          className="h-8 md:h-10 flex-shrink-0"
          style={{ aspectRatio: "2/1" }}
        >
          <OptimizedImage
            src="https://res.cloudinary.com/dltlnoi9z/image/upload/f_webp,q_auto,w_80/v1776204520/logo_bs89oj.png"
            alt="Twinkle and Trend logo"
            priority
            aspectRatio="2/1"
            widths={WIDTHS.thumb}
            sizes="80px"
            wrapClass="h-full"
            fill={false}
            className="h-full w-auto object-contain"
          />
        </div>

        <span className="text-base md:text-xl font-logo font-bold leading-tight">
          Twinkle and Trend
        </span>
      </div>
    </Link>
  );
};

export default Logo;
