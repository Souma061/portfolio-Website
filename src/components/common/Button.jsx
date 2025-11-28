export default function Button({ children, variant = 'primary', ...props }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105';

  const variants = {
    primary: 'bg-linear-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-blue-500/50',
    secondary: 'border-2 border-slate-400 text-slate-300 hover:border-white hover:text-white hover:bg-slate-800/50',
    outline: 'border border-blue-500/50 text-blue-300 hover:border-blue-400 hover:text-blue-200 hover:bg-blue-500/10',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
