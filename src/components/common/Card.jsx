export default function Card({ children, className = '' }) {
  return (
    <div className={`group relative bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${className}`}>
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
