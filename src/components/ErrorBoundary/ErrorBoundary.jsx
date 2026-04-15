// src/components/ErrorBoundary/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Silent in production
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF7FB] px-4 text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">কিছু একটা ঠিক হয়নি</h2>
          <p className="text-gray-500 mb-6 text-sm">Page টি load হতে সমস্যা হয়েছে।</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#E771A3] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d15f93] transition-colors"
          >
            Reload করুন
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
