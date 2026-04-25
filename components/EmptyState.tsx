export function EmptyState(): React.ReactElement {
  return (
    <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 border-dashed text-center">
      <div className="space-y-3">
        <p className="text-slate-300 font-semibold text-lg">No Algorithm Selected</p>
        <p className="text-slate-400">Choose an algorithm from the dropdown menu to get started</p>
      </div>
    </div>
  );
}