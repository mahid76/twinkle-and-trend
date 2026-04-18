// src/components/Navbar/SearchBar.jsx
const SearchBar = ({
	searchQuery,
	setSearchQuery,
	showSuggestions,
	searchResults,
	handleSearch,
	handleProductClick,
	searchRef,
}) => {
	return (
		<div className="hidden md:flex items-center w-64 relative" ref={searchRef}>
			<form onSubmit={handleSearch} className="relative flex w-full">
				<input
					type="text"
					placeholder="Search here..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onFocus={() => searchQuery && setShowSuggestions(true)}
					className="px-3 py-1 text-black bg-[#f8e7ef] rounded-l-md outline-none w-full "
				/>

				{showSuggestions && (
					<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
						{searchResults.length > 0 ? (
							searchResults.map((p) => (
								<button
									key={p.id}
									type="button"
									onClick={() => handleProductClick(p.id)}
									className="w-full px-4 py-3 flex gap-3 items-center hover:bg-[#fae7ed] text-left"
								>
									<img
										src={p.image}
										className="w-10 h-10 object-cover rounded"
									/>
									<div>
										<p className="text-sm font-medium">{p.name}</p>
										<p className="text-xs text-[#E771A3]">৳{p.price}</p>
									</div>
								</button>
							))
						) : (
							<div className="p-3 text-gray-500">No products found</div>
						)}
					</div>
				)}

				<button
					type="submit"
					className="bg-[#ec7dac] cursor-pointer px-4 py-1 rounded-r-md hover:bg-[#d15f93] text-white"
				>
					Search
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
