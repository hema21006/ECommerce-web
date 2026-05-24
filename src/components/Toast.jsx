export default function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-fade-up">
      <div className="bg-[#0d0d0d] text-[#f5f0e8] px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 whitespace-nowrap">
        {message}
      </div>
    </div>
  );
}