/**
 * OptimizedImage.jsx
 * ─────────────────────────────────────────────────────────────────
 * Reusable Cloudinary-aware image component.
 *
 * WHY THIS EXISTS
 * ───────────────
 * Every <img> in this project used to have copy-pasted Cloudinary
 * URL transforms, inconsistent loading/fetchPriority values, and
 * missing width/height attributes (causing CLS). This component
 * centralises all of that so one fix here fixes every image.
 *
 * WHAT IT DOES
 * ────────────
 * 1. Builds a proper Cloudinary srcSet automatically.
 * 2. Sets loading="eager" + fetchPriority="high" for LCP images,
 *    loading="lazy" + decoding="async" for everything else.
 * 3. Always outputs width + height attributes so the browser can
 *    reserve space before the image loads → zero CLS.
 * 4. Wraps in an aspect-ratio container so the card never jumps.
 *
 * USAGE
 * ─────
 * // Normal (lazy) product card image
 * <OptimizedImage src={product.image} alt={product.name} />
 *
 * // LCP / above-the-fold hero image  (priority prop)
 * <OptimizedImage src={banner.src} alt={banner.title} priority />
 *
 * // Custom aspect ratio + full-width
 * <OptimizedImage
 *   src={url}
 *   alt="..."
 *   aspectRatio="16/9"
 *   widths={[768, 1200, 1920]}
 *   sizes="100vw"
 *   className="rounded-xl"
 * />
 */

import { memo } from "react";
import { clImg, clSrcSet } from "../../utils/cloudinaryImage";

// ─── Default responsive widths for different use-cases ──────────────
export const WIDTHS = {
	product: [300, 500, 800], // product cards
	banner: [768, 1200, 1920], // full-width banners
	thumb: [80, 120, 200], // thumbnails / logo
	detail: [500, 900, 1200], // product detail main image
};

// ─── Default sizes hints (tells browser which width to pick) ────────
export const SIZES = {
	/** 2-col mobile → 3-col tablet → 4-col desktop */
	productGrid: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
	/** Single-col mobile → 2-col tablet → 3-col desktop */
	productWide: "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw",
	banner: "100vw",
	detail: "(max-width: 768px) 100vw, 450px",
};

// ─── Cloudinary aspect-ratio denominator → width/height attrs ───────
const ASPECT_DIMS = {
	"1/1": { w: 1, h: 1 },
	"4/5": { w: 4, h: 5 },
	"16/9": { w: 16, h: 9 },
	"16/5": { w: 16, h: 5 },
	"3/4": { w: 3, h: 4 },
};

/**
 * @param {object}  props
 * @param {string}  props.src          Cloudinary image URL (any format)
 * @param {string}  props.alt          Alt text (required for a11y)
 * @param {boolean} [props.priority]   true → LCP image (eager + high priority)
 * @param {string}  [props.aspectRatio] CSS aspect-ratio value e.g. "4/5", "16/9"
 * @param {number[]}[props.widths]     Cloudinary widths to generate srcSet
 * @param {string}  [props.sizes]      <img sizes="..."> value
 * @param {string}  [props.className]  Extra classes for the <img> tag
 * @param {string}  [props.wrapClass]  Extra classes for the wrapper <div>
 * @param {boolean} [props.fill]       true → img fills wrapper (object-cover)
 * @param {function}[props.onContextMenu] optional, for right-click protection
 */
const OptimizedImage = memo(
	({
		src,
		alt,
		priority = false,
		aspectRatio = "4/5",
		widths = WIDTHS.product,
		sizes = SIZES.productGrid,
		quality = "auto",
		className = "",
		wrapClass = "",
		fill = true,
		onContextMenu,
		...rest
	}) => {
		// ── Derive intrinsic width/height from aspect ratio ─────────────
		// This allows the browser to reserve space BEFORE the image loads
		// → prevents CLS even without the image being in the HTML.
		const dims = ASPECT_DIMS[aspectRatio] ?? { w: 4, h: 5 };
		// Use a base of 400px width for the attribute (browser uses srcSet for actual size)
		const attrW = widths[0];
		const attrH = Math.round((attrW * dims.h) / dims.w);

		// ── Cloudinary srcSet ────────────────────────────────────────────
		// clSrcSet builds "…/w_300/… 300w, …/w_500/… 500w" automatically
		const srcSet = clSrcSet(src, widths, quality);
		// clImg picks the middle width as the default src (good for no-JS fallback)
		const defaultSrc = clImg(src, {
			width: widths[0],
			quality,
		});

		// ── Loading strategy ─────────────────────────────────────────────
		// LCP images: eager + high → browser fetches immediately
		// Everything else: lazy + async → browser skips off-screen images
		const loading = priority ? "eager" : "lazy";
		const fetchPriority = priority ? "high" : "auto";
		const decoding = "async";
		return (
			<div
				className={`relative overflow-hidden ${wrapClass}`}
				style={{ aspectRatio }}
			>
				<img
					src={defaultSrc}
					srcSet={srcSet}
					sizes={sizes}
					alt={alt}
					loading={loading}
					fetchPriority={fetchPriority}
					decoding={decoding}
					draggable="false"
					// ✅ width + height = intrinsic aspect ratio → browser reserves space
					// This is the single most important CLS fix for images
					width={attrW}
					height={attrH}
					onContextMenu={onContextMenu ?? ((e) => e.preventDefault())}
					onDragStart={(e) => e.preventDefault()}
					className={`${fill ? "absolute inset-0 w-full h-full object-cover" : ""} ${className}`}
					{...rest}
				/>
			</div>
		);
	},
);

OptimizedImage.displayName = "OptimizedImage";
export default OptimizedImage;
