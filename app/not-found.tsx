import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-gray-300">404</div>
        <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
        <p className="text-gray-600 max-w-md">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

