// src/components/Navbar/SearchModal.jsx
// ✅ FIX: framer-motion সরানো হয়েছে — 37.7 KiB unused JS বাঁচবে
// CSS transitions দিয়ে একই animation করা হচ্ছে
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
  useEffect(() => {
    if (showSearchModal && inputRef?.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showSearchModal]);

  // ✅ Body scroll lock when modal open
  useEffect(() => {
    if (showSearchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showSearchModal]);

  if (!showSearchModal) return null;

  return (
    <>
      {/* ✅ Backdrop — CSS transition */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={() => setShowSearchModal(false)}
        aria-hidden="true"
      />

      {/* ✅ Modal — CSS slide-down animation */}
      <div
        ref={searchRef}
        role="dialog"
        aria-modal="true"
        aria-label="পণ্য খুঁজুন"
        className="fixed top-4 left-0 right-0 z-[70] mx-4 max-w-lg md:mx-auto animate-[slideDown_0.2s_ease]"
      >
        <div className="relative bg-[#FFF7FB] rounded-xl shadow-2xl border border-[#F7B3D3]">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 p-3 md:p-4"
            role="search"
          >
            <svg
              className="w-5 h-5 text-[#E771A3] flex-shrink-0 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              ref={inputRef}
              type="search"
              placeholder="পণ্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              autoComplete="off"
              aria-label="পণ্যের নাম লিখুন"
              className="flex-1 px-2 py-2.5 text-black bg-transparent outline-none text-sm md:text-base placeholder-gray-400"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="search মুছুন"
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={() => { setShowSearchModal(false); setSearchQuery(""); }}
              aria-label="search বন্ধ করুন"
              className="flex-shrink-0 bg-[#FCE4EC] hover:bg-[#F7B3D3] text-[#E771A3] rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>

          {showSuggestions && (
            <div
              className="max-h-72 overflow-y-auto border-t border-[#FAD0E4] rounded-b-xl"
              role="listbox"
              aria-label="search results"
            >
              {searchResults.length > 0 ? (
                searchResults.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="option"
                    aria-selected="false"
                    onClick={() => handleProductClick(p.id)}
                    className="w-full px-4 py-3 flex gap-3 items-center hover:bg-[#FCE4EC] text-left transition-colors"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-11 h-11 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                      <p className="text-xs text-[#E771A3] font-semibold mt-0.5">৳{p.price}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))
              ) : (
                <div className="p-5 text-gray-400 text-center text-sm" role="status">
                  কোনো পণ্য পাওয়া যায়নি
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ✅ CSS animations — framer-motion replace */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default SearchModal;
