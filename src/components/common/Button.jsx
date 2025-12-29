export default function Button({ children, variant = 'primary', ...props }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105';

  const variants = {
    primary: 'bg-surface0 border border-purple/30 text-main hover:border-purple hover:bg-surface0/80 shadow-lg hover:shadow-purple/20',
    secondary: 'border border-surface2 text-subtext0 hover:border-main hover:text-main hover:bg-surface0/50',
    outline: 'border border-blue/30 text-blue hover:border-blue hover:bg-blue/10',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
