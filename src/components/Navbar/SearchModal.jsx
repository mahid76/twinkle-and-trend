// src/components/Navbar/SearchModal.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const SearchModal = ({
	showSearchModal,
	setShowSearchModal,
	searchQuery,
	setSearchQuery,
	showSuggestions,
	searchResults,
	handleSearch,
	handleProductClick,
	inputRef,
	searchRef,
}) => {
	// ✅ Mobile keyboard fix — modal open হলে input focus
	useEffect(() => {
		if (showSearchModal && inputRef?.current) {
			// setTimeout ছাড়া mobile এ কাজ করে না
			setTimeout(() => {
				inputRef.current?.focus();
			}, 150);
		}
	}, [showSearchModal]);

	return (
		<AnimatePresence>
			{showSearchModal && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setShowSearchModal(false)}
					/>

					{/* Modal */}
					<motion.div
						ref={searchRef}
						className="fixed top-4 left-0 right-0 z-[70] mx-4 max-w-lg md:mx-auto"
						initial={{ opacity: 0, y: -40 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -40 }}
					>
						<div className="relative bg-[#FFF7FB] rounded-xl shadow-2xl border border-[#F7B3D3]">

							{/* Search Form — X button ফর্মের ভেতরেই */}
							<form
								onSubmit={handleSearch}
								className="flex items-center gap-2 p-3 md:p-4"
							>
								{/* Search icon */}
								<svg className="w-5 h-5 text-[#E771A3] flex-shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>

								<input
									ref={inputRef}
									type="text"
									placeholder="Search products..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									// ✅ mobile এ keyboard আনার জন্য
									autoFocus
									autoComplete="off"
									className="flex-1 px-2 py-2.5 text-black bg-transparent outline-none text-sm md:text-base placeholder-gray-400"
								/>

								{/* ✅ X button — input এর ডান পাশে, form এর ভেতরে */}
								{searchQuery && (
									<button
										type="button"
										onClick={() => setSearchQuery("")}
										className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								)}

								{/* ✅ Modal বন্ধ করার X — input এর বাইরে ডান কোণে */}
								<button
									type="button"
									onClick={() => {
										setShowSearchModal(false);
										setSearchQuery("");
									}}
									className="flex-shrink-0 bg-[#FCE4EC] hover:bg-[#F7B3D3] text-[#E771A3] rounded-full w-8 h-8 flex items-center justify-center transition-colors"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</form>

							{/* Suggestions */}
							{showSuggestions && (
								<div className="max-h-72 overflow-y-auto border-t border-[#FAD0E4] rounded-b-xl">
									{searchResults.length > 0 ? (
										searchResults.map((p) => (
											<button
												key={p.id}
												type="button"
												onClick={() => handleProductClick(p.id)}
												className="w-full px-4 py-3 flex gap-3 items-center hover:bg-[#FCE4EC] text-left transition-colors"
											>
												<img
													src={p.image}
													className="w-11 h-11 object-cover rounded-lg flex-shrink-0"
												/>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
													<p className="text-xs text-[#E771A3] font-semibold mt-0.5">৳{p.price}</p>
												</div>
												<svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
											</button>
										))
									) : (
										<div className="p-5 text-gray-400 text-center text-sm">
											No products found
										</div>
									)}
								</div>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SearchModal;