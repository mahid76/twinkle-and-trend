/**
 * Cloudinary URL-এ সঠিক ফরম্যাট, কোয়ালিটি এবং উইডথ ইনজেক্ট করার ফাংশন।
 * এটি আগের যেকোনো ট্রান্সফরমেশন সরিয়ে দিয়ে ক্লিন একটি চেইন তৈরি করবে।
 */
export const clImg = (url, width) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Regex টা আপডেট করা হয়েছে যাতে /upload/ এর পর যা-ই থাকুক (যতগুলো স্লাশই থাকুক) 
  // তা v12345 (version number) এর আগ পর্যন্ত সব রিমুভ করে দেয়।
  const match = url.match(
    /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/).*?(v\d+\/.+)/
  );

  if (match) {
    // এখানে q_auto:eco ব্যবহার করা হয়েছে আরও ভালো সেভিংসের জন্য
    // f_auto, q_auto এবং w_width এখন একটি স্ল্যাশের ভেতরে কমা দিয়ে থাকবে
    return `${match[1]}f_auto,q_auto:eco,w_${width}/${match[2]}`;
  }
  
  return url;
};

/**
 * SrcSet তৈরি করার ফাংশন
 */
export const clSrcSet = (url, widths = [400, 700]) =>
  widths.map((w) => `${clImg(url, w)} ${w}w`).join(", ");