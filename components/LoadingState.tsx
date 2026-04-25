export function LoadingState(): React.ReactElement {
  return (
    <div className="bg-gray-50 rounded-lg p-12 border border-gray-300 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin-subtle"></div>
        </div>
        <p className="text-gray-900 font-semibold">Generating visualization steps...</p>
        <p className="text-gray-600 text-sm">This may take a moment for larger datasets</p>
      </div>
    </div>
  );
}
