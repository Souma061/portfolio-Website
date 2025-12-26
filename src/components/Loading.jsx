import { useEffect, useState } from 'react';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(() => !sessionStorage.getItem('portfolio_loaded'));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('portfolio_loaded', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 z-9999 flex items-center justify-center">
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-cyan-400 animate-spin"></div>

          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

          <div className="absolute inset-4 rounded-full bg-linear-to-r from-blue-500/30 to-cyan-500/30 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Loading Portfolio
          </h2>
          <p className="text-sm text-slate-400">Building something amazing...</p>
        </div>

        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
