export function EmptyState(): React.ReactElement {
  return (
    <div className="bg-gray-50 rounded-lg p-12 border border-gray-300 text-center">
      <div className="space-y-3">
        <p className="text-gray-900 font-semibold text-lg">No Algorithm Selected</p>
        <p className="text-gray-600">Choose an algorithm from the dropdown menu to get started</p>
      </div>
    </div>
  );
}
