export function LoadingState(): React.ReactElement {
  return (
    <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-300 font-semibold">Generating visualization steps...</p>
        <p className="text-slate-400 text-sm">This may take a moment for larger datasets</p>
      </div>
    </div>
  );
}