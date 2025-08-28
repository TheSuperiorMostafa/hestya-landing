'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-gray-300">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
        <p className="text-gray-600 max-w-md">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

