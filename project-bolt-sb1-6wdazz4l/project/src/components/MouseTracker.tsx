import React, { useState, useEffect } from 'react';

const MouseTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="custom-cursor hidden md:block" style={{ 
      left: `${mousePosition.x}px`, 
      top: `${mousePosition.y}px`,
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: '1px solid black',
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 50,
      transform: 'translate(-50%, -50%)',
      transition: 'transform 100ms ease-out',
      mixBlendMode: 'difference'
    }} />
  );
};

export default MouseTracker;