import React from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number; // percentage width
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  type: 'petal' | 'spark' | 'diya';
  rotateSpeed: number;
}

export const MaharashtrianSparks: React.FC = () => {
  const [particles, setParticles] = React.useState<Particle[]>([]);

  React.useEffect(() => {
    // Generate organic traditional particles (Marigold Saffron Petals & Gold Sparks)
    const generated: Particle[] = Array.from({ length: 22 }).map((_, i) => {
      const types: ('petal' | 'spark')[] = ['petal', 'spark'];
      const currentType = i % 3 === 0 ? 'petal' : 'spark';
      return {
        id: i,
        x: Math.random() * 100, // random start horizontal
        size: currentType === 'petal' ? Math.random() * 12 + 6 : Math.random() * 4 + 2,
        delay: Math.random() * 10,
        duration: Math.random() * 12 + 10,
        opacity: Math.random() * 0.4 + 0.3,
        color: i % 2 === 0 
          ? '#A37E43' // Vintage Classic Gold
          : i % 3 === 0 
            ? '#E8D8C8' // Shimmering Champagne
            : '#B8975A', // Soft Warm Gold
        type: currentType,
        rotateSpeed: Math.random() * 360 + 120,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15 select-none" id="luxury-dust-bg">
      {particles.map((p) => {
        if (p.type === 'petal') {
          return (
            <motion.div
              key={p.id}
              initial={{ 
                x: `${p.x}vw`, 
                y: '-10vh', 
                rotate: 0, 
                opacity: 0 
              }}
              animate={{ 
                y: '110vh', 
                x: [`${p.x}vw`, `${p.x + (Math.sin(p.id) * 8)}vw`],
                rotate: p.rotateSpeed,
                opacity: [0, p.opacity, p.opacity, 0]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: '50%', // Elegant spherical golden bokeh
                boxShadow: `0 0 12px ${p.color}60`,
                filter: 'blur(1px)',
              }}
            />
          );
        } else {
          return (
            <motion.div
              key={p.id}
              initial={{ 
                x: `${p.x}vw`, 
                y: '100vh', 
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                y: '-10vh', 
                x: [`${p.x}vw`, `${p.x + (Math.cos(p.id) * 10)}vw`],
                opacity: [0, p.opacity, p.opacity * 1.5, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: p.duration * 0.9,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: '#E8D8C8',
                borderRadius: '50%',
                boxShadow: '0 0 8px #B8975A, 0 0 16px #A37E43',
                filter: 'blur(0.3px)',
              }}
            />
          );
        }
      })}
    </div>
  );
};
