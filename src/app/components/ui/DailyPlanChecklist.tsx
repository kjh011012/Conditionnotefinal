/**
 * CMP/Checklist/DailyPlan
 * 오늘 할 일 1~3개 체크박스
 * 완료 시 "오늘 한 줄 기록(선택)" 이어짐
 * Variants: active / allComplete / empty
 */
import { useState } from 'react';
import { Check, Pencil, Sparkles } from 'lucide-react';

interface PlanItem {
  id: string;
  label: string;
  done: boolean;
}

interface DailyPlanChecklistProps {
  items: PlanItem[];
  onToggle: (id: string) => void;
  onSubmitNote?: (note: string) => void;
}

export function DailyPlanChecklist({
  items,
  onToggle,
  onSubmitNote,
}: DailyPlanChecklistProps) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const allDone = items.length > 0 && items.every(i => i.done);
  const doneCount = items.filter(i => i.done).length;

  // ── Empty ──
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-[#FF8A3D]" />
          <span className="text-[16px] text-[#111827]">오늘의 계획</span>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center mb-3">
            <Pencil size={20} className="text-[#D1D5DB]" />
          </div>
          <p className="text-[14px] text-[#374151] mb-1">아직 계획이 없어요</p>
          <p className="text-[13px] text-[#9CA3AF]">추천에서 오늘 계획에 넣어보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#FF8A3D]" />
          <span className="text-[16px] text-[#111827]">오늘의 계획</span>
        </div>
        <span className="text-[13px] text-[#6B7280]">
          {doneCount}/{items.length} 완료
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[#EEF1F4] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#1B7A4B] rounded-full transition-all duration-500"
          style={{ width: `${(doneCount / items.length) * 100}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className="flex items-center gap-3 min-h-[48px] text-left"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
                item.done ? 'bg-[#1B7A4B] text-white' : 'border-2 border-[#E5E7EB]'
              }`}
            >
              {item.done && <Check size={16} />}
            </div>
            <span
              className={`text-[14px] transition-all ${
                item.done ? 'text-[#9CA3AF] line-through' : 'text-[#374151]'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* All complete celebration */}
      {allDone && !showNoteInput && (
        <div className="mt-4 bg-[#E8F5EE] rounded-[14px] p-4 text-center">
          <p className="text-[15px] text-[#0E4B2E] mb-2">모두 완료했어요! 잘 하셨어요 👏</p>
          <button
            onClick={() => setShowNoteInput(true)}
            className="h-[40px] px-4 bg-[#1B7A4B] text-white rounded-[12px] text-[13px] inline-flex items-center gap-1.5"
          >
            <Pencil size={13} /> 오늘 한 줄 기록 남기기 (선택)
          </button>
        </div>
      )}

      {/* Note input */}
      {showNoteInput && (
        <div className="mt-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="오늘 느낀 점을 한 줄로 적어보세요 (선택)"
            className="w-full h-[80px] bg-[#F7F8FA] rounded-[12px] border border-[#E5E7EB] p-3 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] resize-none outline-none"
            maxLength={100}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-[#9CA3AF]">{note.length}/100</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNoteInput(false)}
                className="h-[36px] px-3 text-[13px] text-[#6B7280]"
              >
                건너뛰기
              </button>
              <button
                onClick={() => {
                  onSubmitNote?.(note);
                  setShowNoteInput(false);
                }}
                className="h-[36px] px-4 bg-[#1B7A4B] text-white rounded-[10px] text-[13px]"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
