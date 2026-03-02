import { ArrowRight, Sparkles } from 'lucide-react';

interface InsightStoryCardProps {
  steps: string[];
  recommendations: { label: string; onClick?: () => void }[];
}

export function InsightStoryCard({ steps, recommendations }: InsightStoryCardProps) {
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-[#FF8A3D]" />
        <h3 className="text-[16px] text-[#111827]">오늘의 컨디션 이야기</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="bg-[#E8F5EE] text-[#1B7A4B] px-3 py-1.5 rounded-full text-[13px]">
              {step}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight size={14} className="text-[#6B7280]" />
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[#EEF1F4] pt-4">
        <p className="text-[13px] text-[#6B7280] mb-3">그래서 오늘은…</p>
        <div className="flex flex-col gap-2">
          {recommendations.map((rec, i) => (
            <button
              key={i}
              onClick={rec.onClick}
              className="w-full h-[44px] rounded-[14px] bg-[#E8F5EE] text-[#1B7A4B] text-[14px] flex items-center justify-center gap-2 hover:bg-[#d4eddf] transition-colors"
            >
              {rec.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
