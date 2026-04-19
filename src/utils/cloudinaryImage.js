/**
 * cloudinaryImage.js
 * ─────────────────────────────────────────────────────────────────
 * Central Cloudinary URL utility.
 *
 * ROOT CAUSE of "575 kB oversized images":
 * ─────────────────────────────────────────
 * clImg(url) was called without a width in some places.
 * Without w_N, Cloudinary serves the ORIGINAL upload resolution
 * (sometimes 3000×4000px, 1–5 MB).
 * f_webp + q_auto alone can't fix oversized images — width is required.
 *
 * FIX:
 * - DEFAULT width of 800 so no call can accidentally serve a giant image
 * - q_auto:eco for thumbnails (better compression, imperceptible quality loss)
 * - Dedicated helpers for common use-cases
 */

const CLOUD_NAME = "dltlnoi9z";
const BASE       = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Build a single Cloudinary WebP URL.
 * ✅ ALWAYS applies a width — no call can accidentally serve full-size
 *
 * @param {string}        url     Original Cloudinary URL (any transform)
 * @param {object|number} opts    Options OR legacy numeric width
 * @param {number}  [opts.width=800]    Pixel width (default: 800)
 * @param {string}  [opts.quality='auto'] 'auto'|'auto:eco'|'auto:good'|'auto:best'
 */
export const clImg = (url, opts = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Legacy compat: clImg(url, 400) → clImg(url, { width: 400 })
  if (typeof opts === "number") opts = { width: opts };

  // ✅ DEFAULT width = 800 → prevents accidental full-size delivery
  const { width = 320, quality = "auto" } = opts;

  // Strip existing transforms, keep version + filename
  const afterUpload = url.split("/upload/")[1];
  if (!afterUpload) return url;
  const cleanPath = afterUpload.replace(/^(?:(?!v\d+\/)[^/]+\/)*/, "");

  const transforms = [`f_webp`, `q_${quality}`, `w_${width}`];

  return `${BASE}/${transforms.join(",")}/${cleanPath}`;
};

/**
 * Build a responsive srcSet string.
 *
 * @param {string}   url     Original Cloudinary URL
 * @param {number[]} widths  e.g. [300, 500, 800]
 * @param {string}   quality Cloudinary quality string
 */
export const clSrcSet = (url, widths = [300, 600, 900], quality = "auto") =>
  widths.map((w) => `${clImg(url, { width: w, quality })} ${w}w`).join(", ");

// ─── Preset helpers ──────────────────────────────────────────────
// Use these instead of raw clImg() — they enforce the right size.

/** Product card thumbnail — max 500px, eco quality */
export const clThumb = (url) => clImg(url, { width: 500, quality: "auto:eco" });

/** Product detail main image — max 900px */
export const clDetail = (url) => clImg(url, { width: 900, quality: "auto" });

/** Full-width banner — responsive via srcSet */
export const clBanner = (url, width = 1200) => clImg(url, { width, quality: "auto:good" });

/** Tiny thumbnail (cart icon, swatches) — max 120px */
export const clMicro = (url) => clImg(url, { width: 120, quality: "auto:eco" });

// ─── sizes hints ─────────────────────────────────────────────────
export const PRODUCT_SIZES      = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
export const PRODUCT_WIDE_SIZES = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw";
export const BANNER_SIZES       = "100vw";
export const DETAIL_SIZES       = "(max-width: 768px) 100vw, 450px";
