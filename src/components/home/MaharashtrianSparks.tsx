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
          ? '#F04E23' // Royal Saffron
          : i % 3 === 0 
            ? '#FFC20E' // Marigold Kanak Gold
            : '#F58220', // Genda Orange
        type: currentType,
        rotateSpeed: Math.random() * 360 + 120,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15 select-none" id="mushar-sparks-bg">
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
                height: p.size * 1.3,
                backgroundColor: p.color,
                borderRadius: '80% 15% 55% 50%', // Marigold flower leaf petal style
                boxShadow: `0 0 10px ${p.color}40`,
                filter: 'blur(0.5px)',
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
                backgroundColor: '#FFA500',
                borderRadius: '50%',
                boxShadow: '0 0 8px #FF8C00, 0 0 16px #FFD700',
                filter: 'blur(0.3px)',
              }}
            />
          );
        }
      })}
    </div>
  );
};
