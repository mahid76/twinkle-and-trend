/**
 * cloudinaryImage.js  (refactored)
 * ─────────────────────────────────────────────────────────────────
 * Central Cloudinary URL utility.
 *
 * BEFORE → AFTER
 * ──────────────
 * BEFORE: clImg(url, width) — width was a plain number positional arg,
 *   easy to pass the wrong thing, no quality control.
 *
 * AFTER:  clImg(url, { width, quality }) — named options, safer.
 *   Old positional call clImg(url, 400) still works via compat shim.
 *
 * All URL building is centralised here. No component should ever
 * construct a Cloudinary URL by hand.
 */

const CLOUD_NAME = "dltlnoi9z";
const BASE       = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Build a single Cloudinary WebP URL.
 *
 * @param {string}         url     Original Cloudinary URL (any transform)
 * @param {object|number}  opts    Options object OR legacy numeric width
 * @param {number}  [opts.width]   Pixel width (omit for auto)
 * @param {string}  [opts.quality] 'auto' | 'auto:good' | 'auto:best' (default 'auto')
 * @returns {string}
 */
export const clImg = (url, opts = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  // ── Legacy compat: clImg(url, 400) → clImg(url, { width: 400 }) ──
  if (typeof opts === "number") opts = { width: opts };

  const { width, quality = "auto" } = opts;

  // Strip any existing transform params, keep version + filename
  const afterUpload = url.split("/upload/")[1];
  if (!afterUpload) return url;
  const cleanPath = afterUpload.replace(/^(?:(?!v\d+\/)[^/]+\/)*/, "");

  const transforms = [`f_webp`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);

  return `${BASE}/${transforms.join(",")}/${cleanPath}`;
};

/**
 * Build a responsive srcSet string.
 *
 * @param {string}   url     Original Cloudinary URL
 * @param {number[]} widths  Array of pixel widths, e.g. [300, 600, 1200]
 * @param {string}   quality Cloudinary quality string
 * @returns {string}  "…/w_300/… 300w, …/w_600/… 600w, …"
 */
export const clSrcSet = (url, widths = [400, 800, 1200], quality = "auto") =>
  widths.map((w) => `${clImg(url, { width: w, quality })} ${w}w`).join(", ");

// ─── Standard sizes hints ────────────────────────────────────────
// Import these in components — don't hardcode sizes strings inline.

/** 2-col mobile → 3-col tablet → 4-col desktop (standard product grid) */
export const PRODUCT_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

/** 1-col mobile → 2-col tablet → 3-col desktop (wider cards / swiper) */
export const PRODUCT_WIDE_SIZES = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw";

/** Full-width banner */
export const BANNER_SIZES = "100vw";

/** Product detail main image */
export const DETAIL_SIZES = "(max-width: 768px) 100vw, 450px";
