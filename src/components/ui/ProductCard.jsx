/**
 * ProductCard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Single reusable card. Previously, the same card was copy-pasted
 * 4× (ProductsHome, Products, BestSelling, OfferHome) with slightly
 * different image/loading logic each time. One component, one fix.
 *
 * VARIANTS
 * ────────
 * Default  → grid card (ProductsHome / Products page)
 * compact  → swiper card (BestSellingProducts / OfferHome)
 *
 * Both variants use <OptimizedImage> which handles:
 *   - Correct loading / fetchPriority per position (priority prop)
 *   - Cloudinary srcSet + sizes
 *   - width/height attributes → no CLS
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import OptimizedImage, { SIZES, WIDTHS } from "./OptimizedImage";
import { getDiscountPercentage } from "../../data/products";

// Cart icon (shared SVG)
const CartIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor"
    strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// Check icon (added-to-cart confirmation)
const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor"
    strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Heart icon (wishlist)
const HeartIcon = ({ filled, className = "w-4 h-4" }) => (
  <svg className={className} fill={filled ? "#E771A3" : "none"}
    stroke="#E771A3" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

/**
 * @param {object}   props
 * @param {object}   props.product        Product data object
 * @param {boolean}  [props.priority]     true for first 4 above-fold cards
 * @param {boolean}  [props.compact]      true for swiper/carousel layouts
 * @param {boolean}  [props.isAdded]      cart added state
 * @param {boolean}  [props.wishlisted]   wishlist state
 * @param {function} props.onAddToCart
 * @param {function} [props.onWishlist]   optional — hide if not provided
 * @param {string}   [props.categoryLabel] human-readable category name
 */
const ProductCard = memo(({
  product,
  priority = false,
  compact = false,
  isAdded = false,
  wishlisted = false,
  onAddToCart,
  onWishlist,
  categoryLabel,
}) => {
  const hasOffer  = product.offerPrice && product.offerPrice < product.price;
  const discount  = hasOffer ? getDiscountPercentage(product.price, product.offerPrice) : 0;
  const displayPrice  = hasOffer ? product.offerPrice : product.price;
  const originalPrice = hasOffer ? product.price : null;

  // ── Image config: compact cards are narrower → different sizes hint ──
  const imgSizes = compact ? SIZES.productWide : SIZES.productGrid;
  const imgWidths = compact ? [300, 500, 700] : WIDTHS.product;
  // eco quality for cards — imperceptible difference, ~40% smaller

  return (
    <Link
      to={`/products/${product.id}`}
      aria-label={`${product.name} — ৳${displayPrice}`}
      className={`
        group bg-white rounded-lg overflow-hidden
        shadow-sm hover:shadow-lg transition-all duration-300
        hover:-translate-y-0.5 flex flex-col
        ${compact ? "border border-slate-100" : ""}
      `}
    >
      {/* ── Image area ────────────────────────────────────────────── */}
      {/*
        The outer div has a fixed aspect-ratio so the browser knows
        the height before the image loads. This eliminates CLS.
        Previously this container had no defined height, causing a
        visible jump as each image loaded.
      */}
      <div className="relative">
        <OptimizedImage
          src={product.image}
          alt={product.name}
          priority={priority}
          aspectRatio="4/5"
          widths={imgWidths}
          sizes={imgSizes}
          quality="auto:eco"
          wrapClass="w-full"
          className="transition-transform duration-500 group-hover:scale-105 select-none"
        />

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <p className="text-[#D15F93] text-xl font-bold opacity-20 rotate-[-20deg] select-none">
            Twinkle and trend
          </p>
        </div>

        {/* Wishlist button (optional) */}
        {onWishlist && (
          <button
            onClick={(e) => { e.preventDefault(); onWishlist(product); }}
            aria-label={wishlisted
              ? `${product.name} wishlist থেকে সরান`
              : `${product.name} wishlist এ যোগ করুন`}
            aria-pressed={wishlisted}
            className="
              absolute top-2 right-2
              bg-white/90 backdrop-blur-sm rounded-full
              w-7 h-7 flex items-center justify-center
              shadow-sm hover:scale-110 transition-transform z-10
            "
          >
            <HeartIcon filled={wishlisted} />
          </button>
        )}

        {/* Badges */}
        {product.stock === 0 && (
          <span role="status"
            className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 text-[10px] md:text-xs rounded-full font-medium">
            Out of Stock
          </span>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <span role="status"
            className="absolute top-2 left-2 bg-[#E771A3] text-white px-2 py-0.5 text-[10px] md:text-xs rounded-full font-medium">
            Only {product.stock} left!
          </span>
        )}
        {product.isBestSeller && product.stock >= 10 && (
          <span
            className="absolute top-2 left-2 bg-[#F6D6DF] text-[#E771A3] px-2 py-0.5 text-[10px] md:text-xs rounded-full font-bold">
            ⭐ Best Seller
          </span>
        )}
        {hasOffer && (
          <span
            className="absolute bottom-2 left-2 bg-[#E771A3] text-white px-2 py-0.5 text-[10px] md:text-xs rounded-full font-bold">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* ── Info area ─────────────────────────────────────────────── */}
      <div className={`flex flex-col flex-1 ${compact ? "p-2 md:p-3" : "px-2 py-2 md:p-4"}`}>

        {/* Category + Rating row */}
        {!compact && categoryLabel && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-[60%]">
              {categoryLabel}
            </span>
            <div className="flex items-center" aria-label={`Rating: ${product.rating} out of 5`}>
              <span className="text-yellow-500 text-xs" aria-hidden="true">★</span>
              <span className="text-gray-600 text-xs ml-0.5">{product.rating}</span>
            </div>
          </div>
        )}

        {/* Name */}
        <h3 className={`
          font-semibold text-gray-800 line-clamp-2 leading-snug
          ${compact ? "text-sm md:text-base mb-1" : "text-sm md:text-lg mb-1.5"}
        `}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-2">
          {hasOffer ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[#E771A3] font-bold text-base md:text-xl">
                ৳{displayPrice}
              </span>
              <span className="text-gray-400 text-xs line-through">৳{originalPrice}</span>
            </div>
          ) : (
            <p className="text-[#E771A3] font-bold text-base md:text-xl">৳{displayPrice}</p>
          )}
        </div>

        {/* Add to cart — pushed to bottom */}
        <div className="mt-auto">
          <button
            onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
            disabled={product.stock === 0}
            aria-label={isAdded ? "Cart এ যোগ হয়েছে" : `${product.name} cart এ যোগ করুন`}
            className={`
              w-full px-3 py-2 rounded-md text-sm font-medium
              transition-all duration-300
              flex items-center justify-center gap-1.5
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isAdded
                ? "bg-green-500 text-white"
                : "bg-[#E771A3] text-white hover:bg-[#d15f93]"
              }
            `}
          >
            {isAdded ? (
              <><CheckIcon /> Added!</>
            ) : (
              <><CartIcon /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
