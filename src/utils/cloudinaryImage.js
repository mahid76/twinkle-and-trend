// src/utils/cloudinary.js
// ✅ Cloudinary URL helper — সব image এ WebP + responsive srcSet দেবে

const CLOUD_NAME = "dltlnoi9z";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Cloudinary URL থেকে public ID extract করে
 * যেকোনো format এর Cloudinary URL handle করে
 */
const extractPublicId = (url) => {
  if (!url || !url.includes("cloudinary.com")) return null;
  // /upload/ এর পরের transformation strip করে public ID বের করি
  const match = url.match(/\/upload\/(?:[^/]+\/)*v\d+\/(.+)$/);
  if (match) return match[1];
  // fallback — just get everything after last /upload/
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;
  // strip transformation params (v\d+ এর আগের অংশ)
  return parts[1].replace(/^(?:[^/]+\/)*/, "").replace(/^v\d+\//, "");
};

/**
 * ✅ Main function — WebP URL বানায়
 * @param {string} url - Original Cloudinary URL (যেকোনো format)
 * @param {object} opts
 * @param {number} opts.width - Image width
 * @param {string} opts.quality - 'auto' | 'auto:good' | 'auto:best' (default: 'auto')
 */
export const clImg = (url, { width, quality = "auto" } = {}) => {
  if (!url) return url;
  if (!url.includes("cloudinary.com")) return url;

  // URL থেকে version + public ID বের করি
  const versionMatch = url.match(/\/v(\d+)\//);
  const version = versionMatch ? `v${versionMatch[1]}` : "";

  // Public ID (filename with folder)
  const afterUpload = url.split("/upload/")[1];
  if (!afterUpload) return url;

  // Existing transformations সরিয়ে clean public ID পাই
  // Pattern: সব transform params remove, শুধু version + filename রাখি
  const cleanPath = afterUpload.replace(/^(?:(?!v\d+\/)[^/]+\/)*/, "");

  // ✅ f_webp — সরাসরি WebP format (f_auto এর চেয়ে reliable)
  const transforms = [`f_webp`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);

  return `${BASE}/${transforms.join(",")}/${cleanPath}`;
};

/**
 * Responsive srcSet বানায় — Cloudinary URL থেকে
 * @param {string} url - Original Cloudinary URL
 * @param {number[]} widths - [400, 800, 1200]
 * @param {string} quality
 */
export const clSrcSet = (url, widths = [400, 800, 1200], quality = "auto") => {
  return widths
    .map((w) => `${clImg(url, { width: w, quality })} ${w}w`)
    .join(", ");
};

/**
 * Product card এর জন্য standard sizes attribute
 */
export const PRODUCT_SIZES =
  "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw";

export const BANNER_SIZES = "100vw";
