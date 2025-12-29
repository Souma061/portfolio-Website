import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  // Store position in ref to avoid re-renders
  const positionRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Make visible on first move
      if (cursor.style.opacity === '0') {
        cursor.style.opacity = '1';
      }
    };

    const handleMouseOut = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    let animationId;

    const animate = () => {
      const { x: targetX, y: targetY } = mouseRef.current;
      const { x: currentX, y: currentY } = positionRef.current;

      // Smooth follow effect (Linear Interpolation)
      // Adjust standard speed (0.1 to 0.2 is good)
      const speed = 0.15;

      const nextX = currentX + (targetX - currentX) * speed;
      const nextY = currentY + (targetY - currentY) * speed;

      positionRef.current = { x: nextX, y: nextY };

      // Center the 32px (w-8) circle: subtract 16px
      cursor.style.transform = `translate3d(${nextX - 16}px, ${nextY - 16}px, 0)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 border-2 border-purple shadow-lg shadow-purple/30 rounded-full pointer-events-none z-9999 opacity-0 transition-opacity duration-300 hidden md:block"
      style={{ willChange: 'transform' }}
    />
  );
}
