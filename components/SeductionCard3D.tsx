'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface SeductionCard3DProps {
  text: string;
}

export default function SeductionCard3D({ text }: SeductionCard3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const calcRotateX = (4 / 30) * y - 20;
      const calcRotateY = (-1 / 5) * x + 20;

      setRotateX(calcRotateX);
      setRotateY(calcRotateY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/manwithrose.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 50%' }}
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Simple Red Card - Mouse Tracking */}
      <div
        ref={containerRef}
        style={{
          perspective: '350px',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="z-20"
      >
        <motion.div
          className="relative w-96 h-80 bg-red-500 rounded-lg shadow-2xl flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="text-center p-8 w-full h-full flex flex-col items-center justify-center text-white">
            <div className="text-5xl font-bold break-words leading-relaxed">
              {text}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Button Container */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-3 z-20">
        {/* 다른 카드 만들기 Button */}
        <motion.a
          href="/"
          className="px-6 py-3 bg-white text-red-500 rounded-full shadow-xl hover:shadow-2xl transition-shadow font-semibold hover:bg-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ← 다른 카드 만들기
        </motion.a>

        {/* 다시보기 Button */}
        <motion.button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-white text-red-500 rounded-full shadow-xl hover:shadow-2xl transition-shadow font-semibold hover:bg-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          🔄 다시보기
        </motion.button>
      </div>
    </div>
  );
}
