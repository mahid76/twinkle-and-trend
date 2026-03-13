

	{/* Product Info */}
	<div className="space-y-6">
		<div>
			<h1 className="text-3xl font-primary font-bold text-gray-800 mb-2">
				{product.name}
			</h1>
			<div className="flex items-center space-x-2 mb-4">
				<div className="flex items-center">
					{[...Array(5)].map((_, i) => (
						<span
							key={i}
							className={
								i < Math.floor(product.rating)
									? "text-yellow-500"
									: "text-gray-300"
							}
						>
							★
						</span>
					))}
				</div>
				<span className="text-gray-500 text-sm ml-2">
					({product.rating} / 5.0)
				</span>
				<span className="text-gray-400 text-sm ml-2">(12 reviews)</span>
			</div>
		</div>

		{/* Price Section */}
		<div className="space-y-2">
			{originalPrice && (
				<div className="flex items-center gap-3">
					<span className="text-4xl font-bold text-[#E771A3]">
						৳{displayPrice}
					</span>
					<span className="text-xl text-gray-400 line-through">
						৳{originalPrice}
					</span>
					<span className="text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
						{discount}% OFF
					</span>
				</div>
			)}
			{!originalPrice && (
				<div className="text-4xl font-bold text-[#E771A3]">৳{displayPrice}</div>
			)}
		</div>

		<p className="text-gray-600 leading-relaxed text-lg">
			{product.description}
		</p>

		{/* Quantity Selector */}
		<div className="flex items-center space-x-4">
			<div className="flex items-center space-x-2">
				<span className="text-gray-600 font-medium">Quantity:</span>
				<div className="flex items-center border border-gray-300 rounded-md">
					<button
						onClick={() => handleQuantityChange(-1)}
						className="px-4 py-2 hover:bg-gray-100 transition-colors"
					>
						-
					</button>
					<span className="px-6 py-2 font-medium">{quantity}</span>
					<button
						onClick={() => handleQuantityChange(1)}
						className="px-4 py-2 hover:bg-gray-100 transition-colors"
					>
						+
					</button>
				</div>
			</div>
			<span
				className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
			>
				{product.stock > 0 ? "In Stock" : "Out of Stock"}
			</span>
		</div>

		{/* Buy Now Buttons */}
		<div className="border-t border-gray-200 pt-6 space-y-3">
			{/* WhatsApp Button */}
			<button
				onClick={handleBuyNowWhatsApp}
				disabled={product.stock === 0}
				className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium flex items-center justify-center gap-2"
			>
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
				</svg>
				Buy Now on WhatsApp
			</button>

			{/* Facebook Messenger Button */}
			<div className="flex gap-2">
				{/* Visit Facebook Page Button */}
				<button
					onClick={handleVisitFacebookPage}
					disabled={product.stock === 0}
					className="bg-blue-600 text-white py-1 hidden md:px-8 md:py-3 rounded-md hover:bg-blue-700 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-lg font-medium md:flex items-center justify-center gap-1 md:gap-2"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
					</svg>
					Visit Facebook Page
				</button>
				<button
					onClick={handleSendMessageFacebook}
					disabled={product.stock === 0}
					className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium flex items-center justify-center gap-2"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
					</svg>
					Send Message
				</button>
			</div>
		</div>

		{/* Product Details */}
		<div className="border-t border-gray-200 pt-6 space-y-3">
			<div className="flex items-center space-x-2">
				<span className="text-gray-600 w-24">Category:</span>
				<span className="text-gray-800 font-medium">{product.category}</span>
			</div>
			<div className="flex items-center space-x-2">
				<span className="text-gray-600 w-24">SKU:</span>
				<span className="text-gray-800 font-medium">T&T-{product.id}</span>
			</div>
			<div className="flex items-center space-x-2">
				<span className="text-gray-600 w-24">Stock:</span>
				<span className="text-gray-800 font-medium">{product.stock} units</span>
			</div>
			<div className="flex items-center space-x-2">
				<span className="text-gray-600 w-24">Brand:</span>
				<span className="text-gray-800 font-medium">Twinkle & Trend</span>
			</div>
		</div>

		{/* Features */}
		<div className="border-t border-gray-200 pt-6">
			<h3 className="font-bold text-gray-800 mb-3">Product Features:</h3>
			<ul className="space-y-2">
				{product.features.map((feature, index) => (
					<li key={index} className="flex items-start space-x-2">
						<span className="text-[#E771A3] mt-1">✓</span>
						<span className="text-gray-600">{feature}</span>
					</li>
				))}
			</ul>
		</div>
	</div>

