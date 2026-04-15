// src/utils/cloudinaryImage.js
// ─────────────────────────────────────────────────────────
// Usage:
//   import { clImg, clSrcSet } from "../../utils/cloudinaryImage";
//
//   <img
//     src={clImg(product.image, 400)}
//     srcSet={clSrcSet(product.image, [400, 700])}
//     sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//     ...
//   />
// ─────────────────────────────────────────────────────────

/**
 * Inject a width (and quality/format) transformation into a Cloudinary URL.
 * Works regardless of what transformations are already in the URL.
 *
 * Input:  https://res.cloudinary.com/.../upload/q_auto/f_auto/v17xxx/file.jpg
 * Output: https://res.cloudinary.com/.../upload/w_400,q_auto,f_auto/v17xxx/file.jpg
 */
export const clImg = (url, width) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  const match = url.match(
    /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/).*?(v\d+\/.+)/
  );
  if (match) return `${match[1]}w_${width},q_auto,f_auto/${match[2]}`;
  return url;
};

/**
 * Build a srcSet string for the given widths.
 * @param {string} url      - Cloudinary image URL
 * @param {number[]} widths - e.g. [400, 700, 1000]
 */
export const clSrcSet = (url, widths = [400, 700]) =>
  widths.map((w) => `${clImg(url, w)} ${w}w`).join(", ");
