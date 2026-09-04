'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CelebrationCardProps {
  text: string;
}

export default function CelebrationCard({ text }: CelebrationCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const confettiContainerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const createConfetti = () => {
    const container = confettiContainerRef.current;
    if (!container) return;

    const colors = ['#FFD700', '#FFC700', '#FF69B4', '#FF1493', '#00D4FF', '#00FF00', '#FF6B6B', '#FFB6C1'];
    const confettiCount = 80;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 15 + 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.3;
      const duration = Math.random() * 3 + 3;
      const rotation = Math.random() * 360;

      confetti.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        left: ${left}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0%'};
        pointer-events: none;
        animation: fall ${duration}s linear ${delay}s forwards;
        transform: rotate(${rotation}deg);
      `;

      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
  };

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
      createConfetti();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-amber-200 via-yellow-100 to-orange-200 flex items-center justify-center overflow-hidden perspective">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        @keyframes boxGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8));
          }
        }

        .card-3d {
          perspective: 1200px;
          width: 100%;
          max-width: 500px;
          height: 350px;
          position: relative;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s ease-out;
          transform-style: preserve-3d;
          transform: rotateY(${isOpened ? '180deg' : '0deg'});
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 3px solid #FFD700;
        }

        .card-front {
          background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
          color: #fff;
          font-size: 60px;
          font-weight: bold;
          transform: rotateY(0deg);
        }

        .card-back {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%);
          transform: rotateY(180deg);
          flex-direction: column;
          padding: 40px;
          text-align: center;
          gap: 20px;
        }

        .gift-box {
          animation: ${isOpened ? 'none' : 'boxGlow 1.5s infinite'};
        }
      `}</style>

      {/* Confetti Container */}
      <div ref={confettiContainerRef} />

      {/* Sound */}
      <audio ref={audioRef} src="/sounds/celebration-open.mp3" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-12">
        {/* Gift Box - 선물상자 */}
        <motion.div
          className="gift-box"
          initial={{ scale: 1, y: 0 }}
          animate={isOpened ? { scale: 0, y: -200, opacity: 0 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
            alt="gift box"
            className="w-32 h-32 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* 3D Card Container */}
        <div className="card-3d" ref={cardContainerRef}>
          <motion.div
            className="card-inner"
            initial={{ rotateY: 0 }}
            animate={isOpened ? { rotateY: 180 } : { rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of Card */}
            <motion.div
              className="card-front"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-4xl font-bold">축하!</div>
              </div>
            </motion.div>

            {/* Back of Card */}
            <motion.div
              className="card-back"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-3xl font-bold text-yellow-600 mb-4">🎊</div>
              <div className="text-3xl font-bold text-gray-800 break-words leading-relaxed">
                {text}
              </div>
              <div className="text-sm text-gray-500 mt-4">✨ Card Pop ✨</div>
            </motion.div>
          </motion.div>
        </div>

        {/* 왼쪽 박수치는 사람 */}
        <motion.div
          className="absolute left-2 md:left-8 bottom-1/4"
          initial={{ opacity: 0, x: -100 }}
          animate={isOpened ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3050/3050159.png"
            alt="clapping person left"
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* 오른쪽 박수치는 사람 */}
        <motion.div
          className="absolute right-2 md:right-8 bottom-1/4"
          initial={{ opacity: 0, x: 100 }}
          animate={isOpened ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3050/3050159.png"
            alt="clapping person right"
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg transform scale-x-[-1]"
          />
        </motion.div>

        {/* 맨 왼쪽 박수 */}
        <motion.div
          className="absolute left-2 md:left-4 top-1/4 text-7xl"
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          👏
        </motion.div>

        {/* 맨 오른쪽 박수 */}
        <motion.div
          className="absolute right-2 md:right-4 top-1/4 text-7xl"
          initial={{ opacity: 0 }}
          animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          👏
        </motion.div>
      </div>

      {/* Back to Home */}
      <motion.a
        href="/"
        className="absolute bottom-8 right-8 px-6 py-3 bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-shadow font-semibold hover:bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        ← 홈으로
      </motion.a>

      {/* Celebration Text */}
      <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        🎊 축하합니다! 🎊
      </motion.div>
    </div>
  );
}
