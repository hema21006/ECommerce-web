export default function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-fade-up">
      <div className="glass-strong border border-purple-500/20 text-white px-6 py-3 rounded-2xl shadow-2xl font-semibold text-sm flex items-center gap-2"
        style={{ boxShadow: "0 8px 32px rgba(168,85,247,0.3)" }}>
        {message}
      </div>
    </div>
  );
}