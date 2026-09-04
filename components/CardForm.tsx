'use client';

import { useState } from 'react';
import { createCard, validateText } from '@/lib/api';

export default function CardForm() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const MAX_TEXT_LENGTH = 10;
  const textLength = text.length;
  const isValid = validateText(text);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setGeneratedUrl('');

    if (!isValid) {
      setError('한글 10자 이내로 입력해주세요');
      return;
    }

    setIsLoading(true);

    try {
      const shortId = await createCard({ concept: 'seduction', text });
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const url = `${baseUrl}/kingbad/${shortId}`;
      setGeneratedUrl(url);
      setText('');
      setCopied(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create card');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy URL');
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/rosepetal.gif)',
        backgroundRepeat: 'repeat',
        backgroundSize: '300px auto',
      }}
    >
      {/* Cat Image - Centered */}
      <img
        src="/images/cat.jpg"
        alt="Cat"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ maxWidth: '300px', height: 'auto', margin: '0 auto' }}
      />

      {/* Form Content - On Top */}
      <div className="relative z-10 w-full max-w-md px-4">
        {!generatedUrl ? (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Text Input */}
            <div>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
                placeholder="텍스트 입력 (10자)"
                className="w-full px-4 py-3 border-2 border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/90 text-gray-800 placeholder-gray-500"
                maxLength={MAX_TEXT_LENGTH}
              />
              <div className="text-right text-sm text-white mt-1">
                {textLength}/{MAX_TEXT_LENGTH}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/80 text-white rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full bg-white border-2 border-pink-500 text-pink-600 font-bold py-3 px-4 rounded-lg hover:bg-pink-50 disabled:bg-gray-200 disabled:border-gray-400 disabled:text-gray-400 transition-colors"
            >
              {isLoading ? '생성 중...' : '생성'}
            </button>
          </form>
        ) : (
          /* Success Result */
          <div className="space-y-4 bg-white/90 rounded-lg p-6">
            {/* URL Display with Copy Button */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono text-gray-800 flex-1 break-all">{generatedUrl}</p>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded transition-colors text-sm"
              >
                {copied ? '✅ 복사됨' : '복사'}
              </button>
            </div>

            {/* Go to Card Button */}
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              카드 보러가기
            </a>

            {/* New Card Button */}
            <button
              onClick={() => {
                setGeneratedUrl('');
                setText('');
                setError('');
              }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              다시 만들기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
