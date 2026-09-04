import Link from 'next/link';
import { getCard } from '@/lib/api';
import CelebrationCard from '@/components/CelebrationCard';
import SeductionCard from '@/components/SeductionCard';

interface CardViewPageProps {
  params: Promise<{ shortId: string }>;
}

export async function generateMetadata({ params }: CardViewPageProps) {
  try {
    const { shortId } = await params;
    const card = await getCard(shortId);
    return {
      title: '유혹',
      description: '유혹',
    };
  } catch {
    return {
      title: '유혹',
    };
  }
}

export default async function CardViewPage({ params }: CardViewPageProps) {
  const { shortId } = await params;

  let card;
  try {
    card = await getCard(shortId);
  } catch {
    card = null;
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">카드를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-4">이 링크가 만료되었거나 잘못되었습니다.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {card.concept === 'celebration' && <CelebrationCard text={card.text} />}
      {card.concept === 'melancholy' && <CelebrationCard text={card.text} />}
      {card.concept === 'seduction' && <SeductionCard text={card.text} />}
    </div>
  );
}
