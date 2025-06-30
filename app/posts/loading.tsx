export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
      <span className="ml-4 text-gray-600 text-lg">Loading...</span>
    </div>
  );
}
