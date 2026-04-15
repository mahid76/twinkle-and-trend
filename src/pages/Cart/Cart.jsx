// src/pages/Cart/Cart.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { useCart } from "../../context/CartContext";
import { clImg } from "../../utils/cloudinaryImage";

const DELIVERY_CHARGES = {
  inside: 60,
  outside: 120,
};

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    suggestions: "",
  });

  const [deliveryZone, setDeliveryZone] = useState(null);
  const [errors, setErrors] = useState({});

  const deliveryCharge = deliveryZone ? DELIVERY_CHARGES[deliveryZone] : null;
  const grandTotal = deliveryZone ? cartTotal + deliveryCharge : null;

  const whatsappNumber = "8801601117737";

  const validate = () => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = "Required";
    if (!customerInfo.address.trim()) newErrors.address = "Required";
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^01[3-9]\d{8}$/.test(customerInfo.phone.trim())) {
      newErrors.phone = "Enter a valid BD number";
    }
    if (!deliveryZone) newErrors.deliveryZone = "Please select a delivery area";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    if (!validate()) return;

    const itemLines = cartItems
      .map(
        (item, i) =>
          `${i + 1}. *${item.name}*${item.color ? ` (${item.color})` : ""} x${item.quantity} = Tk.${item.price * item.quantity}`
      )
      .join("\n");

    const savings = cartItems.reduce((sum, item) => {
      if (item.originalPrice)
        return sum + (item.originalPrice - item.price) * item.quantity;
      return sum;
    }, 0);

    const message = `
*New Order Request*

*Customer Details:*
👤 Name: ${customerInfo.name}
📍 Address: ${customerInfo.address}
📞 Phone: ${customerInfo.phone}
🚚 Delivery: ${deliveryZone === "inside" ? "Inside Dhaka" : "Outside Dhaka"}
${customerInfo.suggestions ? `💬 Note: ${customerInfo.suggestions}` : ""}

*Order Summary:*
${itemLines}

*Subtotal:* Tk.${cartTotal}
*Delivery Charge:* Tk.${deliveryCharge}
${savings > 0 ? `*You Save:* Tk.${savings}` : ""}
*Total Amount:* Tk.${grandTotal}

Please confirm my order!
    `.trim();

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Link
            to="/products"
            className="bg-[#E771A3] text-white px-6 py-3 rounded-md hover:bg-[#d15f93] transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </Container>
    );
  }

  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice)
      return sum + (item.originalPrice - item.price) * item.quantity;
    return sum;
  }, 0);

  const inputBase =
    "w-full px-3 py-2 rounded-lg border text-xs text-gray-800 placeholder-gray-400 outline-none transition-colors";
  const inputNormal = "border-gray-200 focus:border-[#E771A3]";
  const inputError = "border-red-400 bg-red-50";

  return (
    <Container>
      <div className="py-5 md:py-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-primary font-bold text-gray-800">
            My Cart
            <span className="ml-2 text-base text-gray-400 font-normal">
              ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* ── LEFT: Cart Items ── */}
          <div className="flex-1 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 flex gap-3 sm:gap-4"
              >
                <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                  <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden bg-gray-100">
                    {/* Cart thumbnail — small size, w_160 is more than enough */}
                    <img
                      src={clImg(item.image, 160)}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      width="80"
                      height="96"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/products/${item.productId}${item.color ? `?color=${encodeURIComponent(item.color)}` : ""}`}
                        className="font-semibold text-gray-800 text-sm hover:text-[#E771A3] transition-colors line-clamp-2 leading-snug"
                      >
                        {item.name}
                      </Link>
                      {item.color && (
                        <div className="flex items-center gap-1 mt-1">
                          <div
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span className="text-xs text-gray-400">{item.color}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 text-base leading-none mt-0.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[#E771A3] font-bold text-sm">Tk.{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 text-xs line-through">Tk.{item.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-base leading-none"
                      >
                        −
                      </button>
                      <span className="px-2.5 py-1 text-xs font-medium border-x border-gray-200 min-w-[1.75rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-base leading-none"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      Tk.{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT: Order Form ── */}
          <div className="lg:w-80 xl:w-96 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
              {/* Customer Info */}
              <div>
                <h2 className="text-xs font-bold text-gray-700 mb-2">Customer Info</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Name <span className="text-[#E771A3]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Phone <span className="text-[#E771A3]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="017XXXXXXXX"
                      maxLength={11}
                      className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Address <span className="text-[#E771A3]">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="House, Road, Area, District"
                      className={`${inputBase} ${errors.address ? inputError : inputNormal}`}
                    />
                    {errors.address && <p className="text-[10px] text-red-500 mt-0.5">{errors.address}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Suggestions <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="suggestions"
                      value={customerInfo.suggestions}
                      onChange={handleInputChange}
                      placeholder="Special instructions, delivery time..."
                      className={`${inputBase} ${inputNormal}`}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Delivery Zone */}
              <div>
                <h2 className="text-xs font-bold text-gray-700 mb-2">
                  Delivery Area <span className="text-[#E771A3]">*</span>
                </h2>
                <div className="flex flex-col gap-1.5">
                  {[
                    { zone: "inside", label: "Inside Dhaka", emoji: "🏙️", charge: "+Tk.60" },
                    { zone: "outside", label: "Outside Dhaka", emoji: "🗺️", charge: "+Tk.120" },
                  ].map(({ zone, label, emoji, charge }) => (
                    <button
                      key={zone}
                      onClick={() => {
                        setDeliveryZone(zone);
                        if (errors.deliveryZone)
                          setErrors((prev) => ({ ...prev, deliveryZone: "" }));
                      }}
                      className={`flex items-center justify-between w-full py-1.5 px-3 rounded-lg border text-xs font-medium transition-all ${
                        deliveryZone === zone
                          ? "border-[#E771A3] bg-pink-50 text-[#E771A3]"
                          : errors.deliveryZone
                          ? "border-red-400 bg-red-50 text-gray-500"
                          : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{emoji}</span>
                        <span>{label}</span>
                      </span>
                      <span className={`font-semibold text-[11px] ${deliveryZone === zone ? "text-[#E771A3]" : "text-gray-400"}`}>
                        {charge}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.deliveryZone && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.deliveryZone}</p>
                )}
              </div>

              <div className="border-t border-gray-100" />

              {/* Order Summary */}
              <div>
                <h2 className="text-sm font-bold text-gray-700 mb-3">Order Summary</h2>
                <div className="space-y-2 mb-3">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex justify-between text-xs">
                      <span className="text-gray-500 truncate mr-2">
                        {item.name}
                        {item.color && <span className="text-gray-400"> ({item.color})</span>} ×
                        {item.quantity}
                      </span>
                      <span className="text-gray-700 font-medium flex-shrink-0">
                        Tk.{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
                  {savings > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600">You Save</span>
                      <span className="text-green-600 font-medium">Tk.{savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-700 font-medium">Tk.{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Delivery{" "}
                      {deliveryZone && (
                        <span className="text-gray-400">
                          ({deliveryZone === "inside" ? "Inside Dhaka" : "Outside Dhaka"})
                        </span>
                      )}
                    </span>
                    <span className="text-gray-700 font-medium">
                      {deliveryCharge !== null ? `Tk.${deliveryCharge}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-1 border-t border-gray-100">
                    <span className="text-gray-800">Total</span>
                    <span className="text-[#E771A3]">
                      {grandTotal !== null ? `Tk.${grandTotal}` : "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Order via WhatsApp
                </button>
                <Link
                  to="/products"
                  className="w-full border border-gray-200 text-gray-500 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
