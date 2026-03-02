/**
 * CMP/Card/Recommendation
 * Variants: primaryPick(오늘 1순위) / secondary / completed(완료 스탬프)
 * 카테고리 태그 + 강도 + 소요시간 + "왜 추천?" 1줄
 * CTA: [YouTube로 보기] 또는 [가이드 보기]
 * 버튼: [오늘 계획에 넣기] [나중에]
 */
import { ExternalLink, Clock, Zap, Plus, Check, Tag } from 'lucide-react';

type RecoCategory = '운동' | '명상' | '식단' | '산책' | '수면루틴' | '체조' | '호흡';
type RecoVariant = 'primaryPick' | 'secondary' | 'completed';

interface RecommendationCardProps {
  variant?: RecoVariant;
  category?: RecoCategory;
  title: string;
  reason: string;
  intensity: '가벼움' | '보통';
  duration: string;
  ctaLabel: string;
  isYoutube?: boolean;
  /** @deprecated use variant='primaryPick' instead */
  isPrimary?: boolean;
  onCta?: () => void;
  onAddToPlan?: () => void;
  onDismiss?: () => void;
}

const categoryColors: Record<RecoCategory, { bg: string; text: string }> = {
  '운동': { bg: 'bg-[#DBEAFE]', text: 'text-[#1D4ED8]' },
  '명상': { bg: 'bg-[#F3E8FF]', text: 'text-[#7C3AED]' },
  '식단': { bg: 'bg-[#FFF1E8]', text: 'text-[#EA580C]' },
  '산책': { bg: 'bg-[#E8F5EE]', text: 'text-[#1B7A4B]' },
  '수면루틴': { bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
  '체조': { bg: 'bg-[#FEF9C3]', text: 'text-[#A16207]' },
  '호흡': { bg: 'bg-[#FCE7F3]', text: 'text-[#DB2777]' },
};

export function RecommendationCard({
  variant = 'secondary',
  category,
  title,
  reason,
  intensity,
  duration,
  ctaLabel,
  isYoutube = false,
  isPrimary,
  onCta,
  onAddToPlan,
  onDismiss,
}: RecommendationCardProps) {
  const isPick = variant === 'primaryPick' || isPrimary;
  const isComplete = variant === 'completed';

  return (
    <div
      className={`rounded-[16px] p-4 relative transition-all ${
        isComplete
          ? 'bg-[#F7F8FA] border border-[#E5E7EB] opacity-70'
          : isPick
          ? 'bg-[#E8F5EE] border border-[#1B7A4B]'
          : 'bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)]'
      }`}
    >
      {/* Completed overlay stamp */}
      {isComplete && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center">
          <Check size={16} className="text-white" />
        </div>
      )}

      {/* Top badges row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {category && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${categoryColors[category]?.bg || 'bg-[#F7F8FA]'} ${categoryColors[category]?.text || 'text-[#6B7280]'}`}
          >
            <Tag size={10} /> {category}
          </span>
        )}
        {isPick && !isComplete && (
          <span className="bg-[#1B7A4B] text-white px-2 py-0.5 rounded-full text-[11px]">
            오늘 1순위
          </span>
        )}
      </div>

      {/* Title */}
      <h4
        className={`text-[15px] mb-1.5 ${
          isComplete ? 'text-[#6B7280] line-through' : isPick ? 'text-[#0E4B2E]' : 'text-[#111827]'
        }`}
      >
        {title}
      </h4>

      {/* Reason (왜 추천?) */}
      <p className="text-[12px] text-[#6B7280] mb-3">{reason}</p>

      {/* Intensity + Duration */}
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center gap-1 text-[12px] text-[#6B7280]">
          <Zap size={12} /> {intensity}
        </span>
        <span className="flex items-center gap-1 text-[12px] text-[#6B7280]">
          <Clock size={12} /> {duration}
        </span>
      </div>

      {/* Actions */}
      {!isComplete && (
        <>
          <button
            onClick={onCta}
            className={`w-full h-[40px] rounded-[12px] text-[13px] flex items-center justify-center gap-1.5 mb-2 ${
              isPick ? 'bg-[#1B7A4B] text-white' : 'border border-[#1B7A4B] text-[#1B7A4B]'
            }`}
          >
            {ctaLabel}
            {isYoutube && <ExternalLink size={13} />}
          </button>
          {isYoutube && (
            <p className="text-[10px] text-[#9CA3AF] text-center mb-2">외부(YouTube)로 이동합니다</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={onAddToPlan}
              className="flex-1 h-[36px] rounded-[10px] bg-[#F7F8FA] text-[#374151] text-[12px] flex items-center justify-center gap-1"
            >
              <Plus size={12} /> 오늘 계획에 넣기
            </button>
            <button
              onClick={onDismiss}
              className="flex-1 h-[36px] rounded-[10px] text-[#9CA3AF] text-[12px] flex items-center justify-center"
            >
              나중에
            </button>
          </div>
        </>
      )}

      {/* Completed state */}
      {isComplete && (
        <div className="bg-[#DCFCE7] rounded-[10px] px-3 py-2 text-center">
          <span className="text-[13px] text-[#15803D]">완료했어요! 잘 하셨어요.</span>
        </div>
      )}
    </div>
  );
}
