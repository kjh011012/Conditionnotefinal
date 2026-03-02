/**
 * P-Food-01_TodayIdeas (식단 추천 — 의료표현 금지)
 * - "오늘의 식사 아이디어(아침/점심/저녁)"
 * - 각 카드: 메뉴 1~2개 + 포인트(따뜻함/가벼움/제철) 1줄
 * - [레시피 영상(YouTube)] [장보기 메모]
 * - "치료/예방" 표현 금지
 * - (선택) "캠프 식단을 집에서도 이어가요" 배너
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Play, ExternalLink, ShoppingCart, Copy, Check,
  Utensils, Sun, CloudSun, MoonStar, Sparkles, Heart,
} from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

interface MealCard {
  type: '아침' | '점심' | '저녁';
  icon: any;
  menus: string[];
  point: string;
  ingredients: string[];
  hasYoutube: boolean;
}

const meals: MealCard[] = [
  {
    type: '아침',
    icon: Sun,
    menus: ['따뜻한 오트밀 & 제철 과일', '견과류 토핑'],
    point: '따뜻한 식사로 하루를 시작해요',
    ingredients: ['오트밀', '바나나', '꿀', '견과류', '우유(두유)'],
    hasYoutube: true,
  },
  {
    type: '점심',
    icon: CloudSun,
    menus: ['현미밥 & 된장찌개 정식', '계절 나물 반찬'],
    point: '소화에 편안한 가벼운 한식이에요',
    ingredients: ['현미', '두부', '된장', '계절 나물', '달걀'],
    hasYoutube: false,
  },
  {
    type: '저녁',
    icon: MoonStar,
    menus: ['닭가슴살 샐러드', '고구마 한 개'],
    point: '편안한 수면을 위한 가벼운 저녁이에요',
    ingredients: ['닭가슴살', '고구마', '브로콜리', '올리브유', '레몬즙'],
    hasYoutube: true,
  },
];

export function FoodIdeasPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [campInterest, setCampInterest] = useState(false);

  const copyIngredients = (ingredients: string[], idx: number) => {
    const text = `장보기 메모: ${ingredients.join(', ')}`;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedIdx(idx);
    showToast('success', '장보기 메모를 복사했어요');
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">오늘의 식사 아이디어</h2>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4]">
        <p className="text-[11px] text-[#9CA3AF]">
          캠프 연계 루틴 식단 아이디어예요. 개인 상황에 맞게 조절해 주세요.
        </p>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Meal cards */}
        <div className="flex flex-col gap-4 mb-6">
          {meals.map((meal, idx) => {
            const Icon = meal.icon;
            const isCopied = copiedIdx === idx;
            return (
              <div
                key={meal.type}
                className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF1E8] flex items-center justify-center">
                    <Icon size={18} className="text-[#FF8A3D]" />
                  </div>
                  <span className="text-[16px] text-[#111827]">{meal.type}</span>
                </div>

                {/* Menus */}
                <div className="mb-2">
                  {meal.menus.map((menu, i) => (
                    <p key={i} className="text-[15px] text-[#374151]">
                      {i === 0 ? menu : `+ ${menu}`}
                    </p>
                  ))}
                </div>

                {/* Point */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles size={12} className="text-[#FF8A3D]" />
                  <p className="text-[13px] text-[#6B7280]">{meal.point}</p>
                </div>

                {/* Ingredients */}
                <div className="bg-[#F7F8FA] rounded-[12px] p-3 mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] text-[#9CA3AF]">재료</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {meal.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="bg-white text-[#374151] px-2 py-1 rounded-full text-[12px] border border-[#E5E7EB]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {meal.hasYoutube && (
                    <button className="flex-1 h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[12px] text-[13px] flex items-center justify-center gap-1.5">
                      <Play size={14} /> 레시피 영상
                      <ExternalLink size={11} className="opacity-60" />
                    </button>
                  )}
                  <button
                    onClick={() => copyIngredients(meal.ingredients, idx)}
                    className={`flex-1 h-[44px] rounded-[12px] text-[13px] flex items-center justify-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-[#E8F5EE] text-[#1B7A4B]'
                        : 'bg-[#F7F8FA] text-[#374151] border border-[#E5E7EB]'
                    }`}
                  >
                    {isCopied ? (
                      <><Check size={14} /> 복사됨</>
                    ) : (
                      <><Copy size={14} /> 장보기 메모</>
                    )}
                  </button>
                </div>
                {meal.hasYoutube && (
                  <p className="text-[10px] text-[#9CA3AF] text-center mt-1.5">
                    외부(YouTube)로 이동합니다
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Camp food banner */}
        <div className={`rounded-[16px] p-5 transition-all ${
          campInterest ? 'bg-[#E8F5EE] border border-[#1B7A4B]' : 'bg-[#FFF1E8]'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Utensils size={16} className={campInterest ? 'text-[#1B7A4B]' : 'text-[#FF8A3D]'} />
            <span className="text-[15px] text-[#111827]">
              캠프 식단을 집에서도 이어가요
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-3">
            캠프에서 제공되는 식단을 참고해서 집에서도 비슷하게 만들어 볼 수 있어요. 간단한 재료로 비슷한 효과를 느낄 수 있어요.
          </p>
          {campInterest ? (
            <div className="flex items-center gap-2 bg-white rounded-[10px] px-3 py-2">
              <Check size={16} className="text-[#1B7A4B]" />
              <span className="text-[13px] text-[#1B7A4B]">관심 등록 완료! 캠프 정보를 보내드릴게요.</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setCampInterest(true);
                showToast('success', '관심 등록했어요! 캠프 식단 정보를 보내드릴게요.');
              }}
              className="w-full h-[44px] bg-white border border-[#FF8A3D] text-[#FF8A3D] rounded-[12px] text-[14px] flex items-center justify-center gap-1.5"
            >
              <Heart size={14} /> 관심 등록하기
            </button>
          )}
          <p className="text-[10px] text-[#9CA3AF] mt-2">
            구매/결제가 아닌 정보 안내 등록이에요.
          </p>
        </div>
      </div>
    </div>
  );
}
