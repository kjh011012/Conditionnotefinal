/**
 * CMP/BottomSheet/ExplainWhy
 * "왜 이렇게 나왔나요?" 바텀시트
 * 3~5단계 연결 스토리(칩+화살표) + 비유 카드 + 오늘 추천 2~3개
 */
import { useState } from 'react';
import { ArrowRight, Sparkles, X, Lightbulb } from 'lucide-react';

interface InsightStep {
  label: string;
  metaphor?: string;
}

interface ExplainWhySheetProps {
  open: boolean;
  onClose: () => void;
  steps: InsightStep[];
  metaphorCard?: { title: string; description: string };
  recommendations?: { label: string; onClick?: () => void }[];
}

export function ExplainWhySheet({
  open,
  onClose,
  steps,
  metaphorCard,
  recommendations = [],
}: ExplainWhySheetProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] bg-white rounded-t-[20px] max-h-[70vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="sticky top-0 bg-white pt-3 pb-2 px-5 z-10">
          <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#FF8A3D]" />
              <span className="text-[18px] text-[#111827]">왜 이렇게 나왔나요?</span>
            </div>
            <button onClick={onClose} className="text-[#9CA3AF]">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-8">
          {/* Connection story */}
          <div className="py-4">
            <p className="text-[13px] text-[#6B7280] mb-3">상태 연결 흐름</p>
            <div className="flex flex-wrap items-center gap-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-[#E8F5EE] text-[#1B7A4B] px-3 py-2 rounded-full text-[13px] min-h-[36px] flex items-center">
                    {step.label}
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight size={14} className="text-[#6B7280] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Metaphor card */}
          {metaphorCard && (
            <div className="bg-[#FFF1E8] rounded-[14px] p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-[#FF8A3D]" />
                <span className="text-[14px] text-[#EA580C]">{metaphorCard.title}</span>
              </div>
              <p className="text-[13px] text-[#374151]">{metaphorCard.description}</p>
            </div>
          )}

          {/* Step metaphors */}
          {steps.some(s => s.metaphor) && (
            <div className="flex flex-col gap-2 mb-4">
              {steps
                .filter(s => s.metaphor)
                .map((s, i) => (
                  <div key={i} className="bg-[#F7F8FA] rounded-[12px] p-3">
                    <span className="text-[12px] text-[#6B7280]">{s.label}</span>
                    <p className="text-[13px] text-[#374151] mt-0.5">{s.metaphor}</p>
                  </div>
                ))}
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="border-t border-[#EEF1F4] pt-4">
              <p className="text-[13px] text-[#6B7280] mb-3">그래서 오늘은…</p>
              <div className="flex flex-col gap-2">
                {recommendations.map((rec, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      rec.onClick?.();
                      onClose();
                    }}
                    className="w-full h-[48px] rounded-[14px] bg-[#E8F5EE] text-[#1B7A4B] text-[14px] flex items-center justify-center gap-2"
                  >
                    {rec.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
