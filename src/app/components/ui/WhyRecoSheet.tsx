/**
 * CMP/BottomSheet/WhyReco
 * "왜 이 추천인가요?" 바텀시트
 * - 상단: MetricState 칩 5개
 * - 중단: 한 줄 결론(쉬운 말 + 비유)
 * - 하단: 오늘 추천 카테고리 + 검색어 칩 3개
 * - 맨 아래 고정 문구
 */
import { X, Sparkles } from 'lucide-react';
import { MetricStateRow, type MetricKey, type MetricLevel } from './MetricStateChip';

export type RecoCategory = 'exercise' | 'meditation' | 'diet' | 'sleep';

interface WhyRecoSheetProps {
  open: boolean;
  onClose: () => void;
  states: { metric: MetricKey; level: MetricLevel }[];
  conclusion: string;
  category: RecoCategory;
  queries: string[];
  onQuerySelect?: (query: string) => void;
}

const categoryLabels: Record<RecoCategory, string> = {
  exercise: '운동',
  meditation: '명상',
  diet: '식단',
  sleep: '수면루틴',
};

export function WhyRecoSheet({
  open, onClose, states, conclusion, category, queries, onQuerySelect,
}: WhyRecoSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center" onClick={onClose}>
      <div
        className="w-full max-w-[430px] bg-white rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mt-3 mb-2" />

        <div className="px-5 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#FF8A3D]" />
              <h3 className="text-[18px] text-[#111827]">왜 이 추천인가요?</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F8FA]">
              <X size={16} className="text-[#6B7280]" />
            </button>
          </div>

          {/* MetricState chips */}
          <div className="mb-4">
            <p className="text-[12px] text-[#9CA3AF] mb-2">오늘 상태</p>
            <MetricStateRow states={states} />
          </div>

          {/* One-line conclusion */}
          <div className="bg-[#FFF1E8] rounded-[14px] p-4 mb-4">
            <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.6 }}>
              {conclusion}
            </p>
          </div>

          {/* Today's category + queries */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] text-[#6B7280]">오늘 추천 카테고리</span>
              <span className="text-[11px] text-white bg-[#FF8A3D] px-2 py-0.5 rounded-full">
                {categoryLabels[category]}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {queries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onQuerySelect?.(q)}
                  className="w-full min-h-[48px] bg-[#F7F8FA] rounded-[12px] px-4 py-3 text-left flex items-center gap-2 active:bg-[#E8F5EE] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#E8F5EE] text-[#1B7A4B] text-[11px] flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-[#374151]">"{q}"</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fixed disclaimer */}
          <div className="bg-[#F7F8FA] rounded-[12px] p-3">
            <p className="text-[11px] text-[#9CA3AF] text-center" style={{ lineHeight: 1.5 }}>
              이 추천은 의료 진단이 아니라, 생활 리듬을 돕기 위한 안내입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}