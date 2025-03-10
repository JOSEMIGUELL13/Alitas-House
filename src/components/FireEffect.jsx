import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FireEffect = ({ children, intensity = 0.5 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Fire glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.7 : 0,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 69, 0, ${intensity}), transparent 70%)`
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default FireEffect;