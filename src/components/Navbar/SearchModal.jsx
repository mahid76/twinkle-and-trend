// src/components/Navbar/SearchModal.jsx
import { AnimatePresence, motion } from "framer-motion";

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
						className="fixed top-4 left-0 right-0 z-[70] mx-4 max-w-lg"
						initial={{ opacity: 0, y: -40 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -40 }}
					>
						<div className="relative bg-[#FFF7FB] rounded-lg shadow-2xl border border-[#F7B3D3]">
							{/* Close Button */}
							<button
								onClick={() => setShowSearchModal(false)}
								className="absolute top-4 right-4 text-gray-500 hover:text-black"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>

							{/* Search Form */}
							<form
								onSubmit={handleSearch}
								className="flex items-center gap-2 p-4"
							>
								<input
									ref={inputRef}
									type="text"
									placeholder="Search products..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onFocus={() => searchQuery && setShowSuggestions(true)}
									className="flex-1 px-4 py-3 text-black bg-[#FFE6F1] rounded-lg outline-none focus:ring-2 focus:ring-[#E771A3]"
								/>

								<button
									type="submit"
									className="bg-[#E771A3] text-white px-6 py-3 rounded-lg hover:bg-[#d15f93]"
								>
									Search
								</button>
							</form>

							{/* Suggestions */}
							{showSuggestions && (
								<div className="max-h-80 overflow-y-auto border-t border-[#FAD0E4]">
									{searchResults.length > 0 ? (
										searchResults.map((p) => (
											<button
												key={p.id}
												type="button"
												onClick={() => handleProductClick(p.id)}
												className="w-full px-4 py-3 flex gap-3 hover:bg-[#FCE4EC] text-left"
											>
												<img
													src={p.image}
													className="w-12 h-12 object-cover rounded"
												/>
												<div className="flex-1">
													<p className="text-sm font-medium text-gray-800">
														{p.name}
													</p>
													<p className="text-xs text-[#E771A3]">৳{p.price}</p>
												</div>
											</button>
										))
									) : (
										<div className="p-4 text-gray-500 text-center">
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
