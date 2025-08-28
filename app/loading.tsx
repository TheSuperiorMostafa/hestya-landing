export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
        <p className="text-gray-600">Please wait while we load the page.</p>
      </div>
    </div>
  );
}

