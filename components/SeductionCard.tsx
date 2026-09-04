'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RosePetals from './RosePetals';

interface SeductionCardProps {
  text: string;
}

export default function SeductionCard({ text }: SeductionCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Audio autoplay failed - browser policy
      });
    }

    // Start animation
    const timer = setTimeout(() => {
      setIsOpened(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * 10;
      const rotY = ((x - centerX) / centerX) * -10;

      setRotateX(rotX);
      setRotateY(rotY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-rose-900 via-red-900 to-pink-900 flex items-center justify-center overflow-hidden">

      {/* Rose Petals Effect */}
      <RosePetals />

      {/* Sound */}
      <audio ref={audioRef} src="/sounds/seduction.mp3" autoPlay />

      {/* Background Image - Man with Rose */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.95 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/manwithrose.png"
          alt="Man with rose"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
        />
      </motion.div>

      {/* Overlay for better card visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 z-5" />

      {/* Heart Shaped Card with Text */}
      <div
        ref={containerRef}
        style={{
          perspective: '1000px',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="relative z-10"
      >
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={isOpened ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div
            className="bg-red-500 shadow-2xl flex items-center justify-center"
            style={{
              width: '350px',
              height: '350px',
              clipPath: 'polygon(50% 100%, 0% 65%, 0% 30%, 25% 0%, 50% 20%, 75% 0%, 100% 30%, 100% 65%)',
            }}
          >
            <div className="text-center px-8">
              <div className="text-4xl md:text-5xl font-bold text-white break-words leading-tight">
                {text}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Refresh Button */}
      <motion.button
        onClick={() => window.location.reload()}
        className="absolute bottom-8 left-8 bg-white border-2 border-pink-500 text-pink-600 font-bold py-3 px-4 rounded-lg hover:bg-pink-50 transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        다시열기
      </motion.button>
    </div>
  );
}
