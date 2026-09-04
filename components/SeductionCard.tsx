'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RosePetals from './RosePetals';

interface SeductionCardProps {
  text: string;
}

export default function SeductionCard({ text }: SeductionCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpened, setIsOpened] = useState(false);

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

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-rose-900 via-red-900 to-pink-900 flex items-center justify-center overflow-hidden">

      {/* Rose Petals Effect */}
      <RosePetals />

      {/* Sound */}
      <audio ref={audioRef} src="/sounds/seduction.mp3" />

      {/* Background Image - Man with Rose */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.95 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/manwithrose.jpg"
          alt="Man with rose"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
        />
      </motion.div>

      {/* Overlay for better card visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 z-5" />

      {/* Simple Red Card with Text */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={isOpened ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="bg-red-500 rounded-lg shadow-2xl p-12 w-96 h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-white break-words leading-tight">
              {text}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back to Home */}
      <motion.a
        href="/"
        className="absolute bottom-8 left-8 px-6 py-3 bg-white/80 text-red-600 rounded-full shadow-xl hover:shadow-2xl transition-shadow font-semibold hover:bg-white z-20"
        initial={{ opacity: 0 }}
        animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        ← 돌아가기
      </motion.a>
    </div>
  );
}
