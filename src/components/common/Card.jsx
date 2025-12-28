export default function Card({ children, className = '' }) {
  return (
    <div className={`group relative bg-mantle border border-surface0/50 rounded-xl p-6 hover:border-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple/10 ${className}`}>
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
