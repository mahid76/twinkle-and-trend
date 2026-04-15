const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only fixed top-3 left-3 bg-white shadow px-3 py-1 rounded text-pink-600 z-[9999]"
    >
      Skip
    </a>
  );
};

export default SkipToContent;