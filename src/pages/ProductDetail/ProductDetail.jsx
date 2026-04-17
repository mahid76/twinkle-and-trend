// src/pages/ProductDetail/ProductDetail.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { getDiscountPercentage, getProductById } from "../../data/products";

// ─── Cloudinary WebP ──────────────────────────────────────────────────────────
const cldWebp = (url, width) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace(/\/upload\/[^/]*\//, `/upload/f_webp,q_auto,w_${width}/`);
};

// ─── Skeleton (শুধু প্রথমবার lazy chunk load এ দেখাবে) ───────────────────────
const ProductDetailSkeleton = () => (
  <Container>
    <div className="py-4 md:py-6 animate-pulse">
      <div className="flex gap-2 mb-6">
        {[10,2,16,2,32].map((w, i) => <div key={i} className={`h-4 bg-gray-200 rounded w-${w}`} />)}
      </div>
      <div className="block md:flex gap-10">
        <div className="flex-shrink-0">
          <div className="hidden md:flex gap-3">
            <div className="w-[450px] aspect-[4/5] bg-gray-200 rounded-lg" />
            <div className="flex flex-col gap-2">
              {[1,2,3].map(i => <div key={i} className="w-[100px] aspect-[4/5] bg-gray-200 rounded-lg" />)}
            </div>
          </div>
          <div className="md:hidden" style={{ maxWidth: "75%", margin: "0 auto" }}>
            <div className="aspect-[4/5] bg-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="flex-1 mt-5 md:mt-0 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
          <div className="h-16 bg-gray-200 rounded w-full" />
          <div className="flex gap-2">{[1,2,3].map(i=><div key={i} className="w-9 h-9 bg-gray-200 rounded-full"/>)}</div>
          <div className="flex gap-2">{[1,2,3].map(i=><div key={i} className="w-12 h-8 bg-gray-200 rounded"/>)}</div>
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex gap-3"><div className="flex-1 h-12 bg-gray-200 rounded-xl"/><div className="flex-1 h-12 bg-gray-200 rounded-xl"/></div>
            <div className="h-11 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  </Container>
);

// ─── HD Zoom Modal (mobile) ────────────────────────────────────────────────────
const ImageZoomModal = ({ image, onClose }) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState(null);
  const handleTouchStart = (e) => { e.preventDefault(); setIsDragging(true); setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY }); };
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging || !lastTouch) return;
    const dx = ((e.touches[0].clientX - lastTouch.x) / window.innerWidth) * 80;
    const dy = ((e.touches[0].clientY - lastTouch.y) / window.innerHeight) * 80;
    setPos((p) => ({ x: Math.min(100, Math.max(0, p.x - dx)), y: Math.min(100, Math.max(0, p.y - dy)) }));
    setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 flex-shrink-0">
        <span className="text-white/70 text-sm">HD Zoom — drag করে দেখুন</span>
        <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center">✕</button>
      </div>
      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => setIsDragging(false)}
        className="flex-1 relative overflow-hidden select-none" style={{ touchAction: "none" }}>
        <div className="w-full h-full" style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "250%", backgroundPosition: `${pos.x}% ${pos.y}%` }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <p className="text-white text-2xl font-bold opacity-15 rotate-[-20deg] whitespace-nowrap">Twinkle and trend</p>
        </div>
      </div>
    </div>
  );
};

// ─── Desktop hover zoom ────────────────────────────────────────────────────────
const ZoomPanel = ({ src, zoomPos, containerRef, panelSize = 380, zoom = 3 }) => {
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    let left = r.right + 20;
    if (left + panelSize > window.innerWidth - 10) left = r.left - panelSize - 20;
    let top = Math.min(r.top, window.innerHeight - panelSize - 10);
    setStyle({ left, top, width: panelSize, height: panelSize });
  }, [containerRef, panelSize]);
  return (
    <div className="hidden md:block fixed z-40 rounded-xl overflow-hidden shadow-2xl border border-gray-200" style={style}>
      <div className="w-full h-full" style={{ backgroundImage: `url(${src})`, backgroundRepeat: "no-repeat", backgroundSize: `${zoom * 50}%`, backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%` }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <p className="text-[#D15F93] text-lg font-bold opacity-25 rotate-[-20deg] whitespace-nowrap">Twinkle and trend</p>
      </div>
    </div>
  );
};

const HoverZoomImage = ({ image, children }) => {
  const [hovered, setHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const L = 100;
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setLensPos({ x: Math.min(Math.max(x - L/2, 0), r.width - L), y: Math.min(Math.max(y - L/2, 0), r.height - L) });
    setZoomPos({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };
  return (
    <>
      <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseMove={onMove} className="relative cursor-crosshair">
        {children}
        {hovered && <div className="absolute border-2 border-[#E771A3] bg-white/20 pointer-events-none z-20" style={{ left: lensPos.x, top: lensPos.y, width: L, height: L }} />}
      </div>
      {hovered && <ZoomPanel src={image} zoomPos={zoomPos} containerRef={ref} />}
    </>
  );
};

// ─── Color Swatch ─────────────────────────────────────────────────────────────
const VariantSwatch = ({ variant, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [pStyle, setPStyle] = useState({});
  const ref = useRef(null);
  const onEnter = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const P = 200;
    let left = r.right + 12;
    if (left + P > window.innerWidth - 10) left = r.left - P - 12;
    setPStyle({ left, top: Math.max(10, Math.min(r.top + r.height/2 - P/2, window.innerHeight - P - 10)), width: P, height: P });
    setHovered(true);
  };
  return (
    <>
      <div ref={ref} onMouseEnter={onEnter} onMouseLeave={() => setHovered(false)} onClick={() => variant.stock > 0 && onClick(variant)} className="relative">
        <div title={variant.color}
          className={`w-9 h-9 rounded-full border-2 transition-all ${isSelected ? "border-[#E771A3] scale-110 shadow-md" : "border-gray-300 hover:border-gray-400 hover:scale-105"} ${variant.stock === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          style={{ backgroundColor: variant.colorHex }}>
          {isSelected && <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">✓</span>}
          {variant.stock === 0 && <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"><div className="w-full h-0.5 bg-gray-500 rotate-45" /></span>}
        </div>
      </div>
      {hovered && variant.images?.[0] && (
        <div className="hidden md:block fixed z-50 rounded-xl overflow-hidden shadow-2xl border-2 border-[#E771A3] pointer-events-none" style={pStyle}>
          <img src={variant.images[0]} alt={variant.color} draggable={false} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/55 text-white text-xs text-center py-2 font-medium">
            {variant.color} — ৳{variant.offerPrice && variant.offerPrice < variant.price ? variant.offerPrice : variant.price}
          </div>
        </div>
      )}
    </>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ FIX: loading state সরানো হয়েছে
  // getProductById → synchronous (local data) → কোনো async নেই
  // তাই loading state দিয়ে skeleton দেখানোর দরকার নেই
  // Suspense (main.jsx এ) প্রথমবার lazy chunk load এ skeleton দেখাবে
  // তারপর navigate করলে আর skeleton আসবে না
  const [product, setProduct]               = useState(null);
  const [notFound, setNotFound]             = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize]     = useState(null);
  const [activeImage, setActiveImage]       = useState(0);
  const [zoomOpen, setZoomOpen]             = useState(false);
  const [quantity, setQuantity]             = useState(1);
  const [addedToCart, setAddedToCart]       = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  // ✅ Synchronous lookup — no async, no loading state
  useEffect(() => {
    const found = getProductById(id);
    if (!found) { setNotFound(true); setProduct(null); return; }
    setNotFound(false);
    setProduct(found);
    setActiveImage(0);
    setQuantity(1);
    setAddedToCart(false);

    // Variant
    const colorParam = searchParams.get("color");
    if (found.variants?.length > 0) {
      const matched = colorParam ? found.variants.find(v => v.color === colorParam) : null;
      setSelectedVariant(matched || found.variants[0]);
    } else {
      setSelectedVariant(null);
    }

    // Size — default প্রথম in-stock size
    if (found.sizes?.length > 0) {
      const inStock = found.sizes.find(s => s.stock > 0) || found.sizes[0];
      setSelectedSize(inStock);
    } else {
      setSelectedSize(null);
    }
  }, [id]);

  // Not found
  if (notFound) return (
    <Container>
      <div className="text-center py-20">
        <p className="text-red-500 text-xl mb-4">Product পাওয়া যায়নি</p>
        <Link to="/products" className="text-[#E771A3] hover:underline">← Back to Shop</Link>
      </div>
    </Container>
  );

  // ✅ Product নেই মানে প্রথমবার mount (Suspense skeleton দেখাচ্ছে)
  if (!product) return <ProductDetailSkeleton />;

  // ─── Derived values ─────────────────────────────────────────────────────────
  const displayName = selectedVariant?.name || product.name;
  const activeImages = selectedVariant?.images || product.images || [];
  const currentImage = activeImages[activeImage] || "";
  const currentHdImage = selectedVariant?.hdImages?.[activeImage] || product.hdImages?.[activeImage] || currentImage;

  const sizeExtra = selectedSize?.extraPrice || 0;

  const basePrice = selectedVariant?.offerPrice && selectedVariant.offerPrice < selectedVariant.price
    ? selectedVariant.offerPrice
    : selectedVariant?.price ?? (product.offerPrice && product.offerPrice < product.price ? product.offerPrice : product.price);
  const baseOriginal = selectedVariant?.offerPrice && selectedVariant.offerPrice < selectedVariant.price
    ? selectedVariant.price
    : product.offerPrice && product.offerPrice < product.price ? product.price : null;

  const displayPrice = (basePrice || 0) + sizeExtra;
  const originalPrice = baseOriginal ? baseOriginal + sizeExtra : null;
  const discount = originalPrice ? getDiscountPercentage(originalPrice, displayPrice) : 0;
  const activeStock = selectedSize?.stock ?? selectedVariant?.stock ?? product.stock ?? 0;
  const totalAmount = displayPrice * quantity;
  const wishlisted = isInWishlist(product.id);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleVariantChange = (v) => { setSelectedVariant(v); setActiveImage(0); setQuantity(1); };
  const handleSizeChange    = (s) => { setSelectedSize(s); setQuantity(1); };
  const handleQty           = (d) => setQuantity(p => { const n = p + d; return n >= 1 && n <= activeStock ? n : p; });
  const handleWishlist      = () => { if (!user) { navigate("/login"); return; } toggleWishlist(product); };

  // ✅ size → CartContext addToCart এ pass হচ্ছে
  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // WhatsApp message — size ও include
  const buildOrderMessage = () => `
*New Order — Twinkle and Trend*

*Product:* ${displayName}
${selectedVariant ? `*Color:* ${selectedVariant.color}` : ""}
${selectedSize    ? `*Size:* ${selectedSize.label}`     : ""}
${originalPrice   ? `*Original Price:* ৳${originalPrice}` : ""}
*Price:* ৳${displayPrice}
*Quantity:* ${quantity}
*Total:* ৳${totalAmount}
${originalPrice   ? `*You Save:* ৳${(originalPrice - displayPrice) * quantity}` : ""}
*SKU:* T&T-${product.id}${selectedVariant ? `-${selectedVariant.color?.slice(0,3).toUpperCase()}` : ""}${selectedSize ? `-${selectedSize.label}` : ""}

Please confirm my order!
  `.trim();

  const whatsappNumber = "8801601117737";
  const facebookPageUsername = "profile.php?id=61574753113504";

  const handleBuyNow = () => {
    if (activeStock > 0)
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildOrderMessage())}`, "_blank");
  };
  const handleFacebookMessage = () => {
    if (activeStock > 0)
      window.open(`https://m.me/${facebookPageUsername}?ref=product&message=${encodeURIComponent(buildOrderMessage())}`, "_blank");
  };

  // ─── JSX ────────────────────────────────────────────────────────────────────
  return (
    <Container>
      {zoomOpen && <ImageZoomModal image={currentHdImage} onClose={() => setZoomOpen(false)} />}
      <div className="py-4 md:py-6" />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="breadcrumb">
        <Link to="/" className="hover:text-[#E771A3]">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-[#E771A3]">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 line-clamp-1">{displayName}</span>
      </nav>

      <div className="block md:flex md:items-start mb-8 md:mb-12 md:gap-10">

        {/* IMAGE COLUMN */}
        <div className="flex-shrink-0">
          {/* Desktop */}
          <div className="hidden md:flex items-start gap-3">
            <HoverZoomImage image={currentHdImage}>
              <div className="relative overflow-hidden rounded-lg" style={{ width: 450, aspectRatio: "4/5" }} onContextMenu={(e) => e.preventDefault()}>
                <img src={cldWebp(currentImage, 900)} srcSet={`${cldWebp(currentImage, 500)} 500w, ${cldWebp(currentImage, 900)} 900w`} sizes="450px"
                  alt={displayName} loading="eager" fetchpriority="high" decoding="sync" draggable={false} onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover" width="450" height="562" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">Twinkle and trend</p>
                </div>
                <div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full items-center gap-1.5 pointer-events-none" aria-hidden="true">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round"/></svg>
                  Hover to zoom
                </div>
              </div>
            </HoverZoomImage>
            <div className="flex flex-col gap-2">
              {activeImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} aria-label={`Image ${i+1}`}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${activeImage === i ? "border-[#E771A3] ring-2 ring-[#E771A3]/50" : "border-gray-200 hover:border-gray-300"}`}>
                  <div className="w-[100px] aspect-[4/5]" onContextMenu={(e) => e.preventDefault()}>
                    <img src={cldWebp(img, 200)} alt={`${displayName} ${i+1}`} draggable={false} loading="lazy" decoding="async" className="w-full h-full object-cover" width="100" height="125" />
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Mobile */}
          <div className="md:hidden">
            <div className="relative overflow-hidden rounded-lg mx-auto" style={{ maxWidth: "75%", aspectRatio: "4/5" }} onContextMenu={(e) => e.preventDefault()}>
              <img src={cldWebp(currentImage, 600)} alt={displayName} loading="eager" fetchpriority="high" draggable={false} className="w-full h-full object-cover" width="300" height="375" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">Twinkle and trend</p>
              </div>
              <button onClick={() => setZoomOpen(true)} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg flex items-center gap-1.5 z-10" aria-label="HD Zoom">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round"/></svg>
                HD Zoom
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {activeImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} aria-label={`Image ${i+1}`}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${activeImage === i ? "border-[#E771A3] ring-2 ring-[#E771A3]/50" : "border-gray-200"}`}>
                  <div className="w-[60px] aspect-[4/5]" onContextMenu={(e) => e.preventDefault()}>
                    <img src={cldWebp(img, 120)} alt={`${displayName} ${i+1}`} draggable={false} loading="lazy" decoding="async" className="w-full h-full object-cover" width="60" height="75" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DETAILS COLUMN */}
        <div className="flex-1 mt-5 md:mt-0">

          <h1 className="text-2xl md:text-3xl font-primary font-bold text-gray-800 mb-2 leading-tight">{displayName}</h1>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex" aria-label={`Rating: ${product.rating} out of 5`}>
              {[...Array(5)].map((_, i) => <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"} aria-hidden="true">★</span>)}
            </div>
            <span className="text-gray-500 text-sm">({product.rating} / 5.0)</span>
            <span className="text-gray-400 text-sm">(12 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl md:text-4xl font-bold text-[#E771A3]">৳{displayPrice}</span>
            {originalPrice && (
              <><span className="text-lg text-gray-400 line-through">৳{originalPrice}</span>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{discount}% OFF</span></>
            )}
          </div>

          {/* Wishlist */}
          <button onClick={handleWishlist} aria-pressed={wishlisted} aria-label={wishlisted ? "Wishlist থেকে সরান" : "Wishlist এ যোগ করুন"}
            className={`flex items-center gap-2 text-sm font-medium mb-4 transition-colors ${wishlisted ? "text-[#E771A3]" : "text-gray-500 hover:text-[#E771A3]"}`}>
            <svg className="w-5 h-5" fill={wishlisted ? "#E771A3" : "none"} stroke="#E771A3" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-5">{selectedVariant?.description || product.description}</p>

          {/* Color variants */}
          {product.variants?.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2 text-sm">Color: <span className="text-[#E771A3] font-semibold">{selectedVariant?.color}</span></p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, i) => (
                  <VariantSwatch key={i} variant={v} isSelected={selectedVariant?.color === v.color} onClick={handleVariantChange} />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-5">
              <p className="text-gray-700 font-medium mb-2 text-sm">
                Size: <span className="text-[#E771A3] font-semibold">{selectedSize?.label}</span>
                {selectedSize?.extraPrice > 0 && <span className="text-gray-400 text-xs ml-2">(+৳{selectedSize.extraPrice})</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button key={i} onClick={() => s.stock > 0 && handleSizeChange(s)} disabled={s.stock === 0}
                    aria-pressed={selectedSize?.label === s.label}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize?.label === s.label ? "border-[#E771A3] bg-[#FCE4EC] text-[#E771A3]" : "border-gray-300 text-gray-700 hover:border-[#E771A3] hover:text-[#E771A3]"
                    } ${s.stock === 0 ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Stock */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-gray-600 font-medium text-sm">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => handleQty(-1)} className="px-3 py-2 hover:bg-gray-100 transition-colors font-bold" aria-label="কমান">−</button>
              <span className="px-4 py-2 font-semibold min-w-[40px] text-center">{quantity}</span>
              <button onClick={() => handleQty(+1)} className="px-3 py-2 hover:bg-gray-100 transition-colors font-bold" aria-label="বাড়ান">+</button>
            </div>
            <span className={`text-sm font-medium ${activeStock > 0 ? "text-green-600" : "text-red-500"}`}>
              {activeStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="border-t border-gray-100 pt-5 space-y-3">
            <div className="flex gap-3">
              {/* Add to Cart */}
              <button onClick={handleAddToCart} disabled={activeStock === 0}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  addedToCart ? "bg-green-500 border-green-500 text-white" : "bg-white border-[#E771A3] text-[#E771A3] hover:bg-[#E771A3] hover:text-white"
                }`}>
                {addedToCart ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>Added!</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>Add to Cart</>
                )}
              </button>

              {/* ✅ View Cart (Buy Now এর জায়গায়) */}
              <Link to="/cart"
                className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#E771A3] text-white hover:bg-[#d15f93] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                View Cart
              </Link>
            </div>

            {/* Buy Now on WhatsApp */}
            {/* <button onClick={handleBuyNow} disabled={activeStock === 0}
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Buy Now on WhatsApp
            </button> */}

            {/* Facebook Message */}
            <button onClick={handleFacebookMessage} disabled={activeStock === 0}
              className="w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Message on Facebook
            </button>
          </div>

          {/* Meta */}
          <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-sm text-gray-600">
            <div className="flex gap-2"><span className="font-semibold text-gray-800 w-20">Category:</span><span>{product.category}</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-800 w-20">SKU:</span><span>T&T-{product.id}</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-800 w-20">Brand:</span><span>Twinkle & Trend</span></div>
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="font-semibold text-gray-800 mb-2">Product Features:</p>
              <ul className="space-y-1.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#E771A3] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
