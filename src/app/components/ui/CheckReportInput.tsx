/**
 * 체크리포트 입력 — 토글/3단 선택/메모
 */
import { useState } from 'react';

type ThreeLevel = 'good' | 'normal' | 'bad' | null;
const levelMeta = {
  good: { label: '좋음', bg: '#E8F5EE', text: '#1B7A4B' },
  normal: { label: '보통', bg: '#FFF1E8', text: '#EA580C' },
  bad: { label: '나쁨', bg: '#FEF2F2', text: '#DC2626' },
};

interface CheckReportInputProps {
  label: string;
  value: ThreeLevel;
  onChange: (v: ThreeLevel) => void;
}

export function CheckReportInput({ label, value, onChange }: CheckReportInputProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="text-[13px] text-[#374151] flex-1 min-w-0">{label}</span>
      <div className="flex gap-1.5">
        {(['good', 'normal', 'bad'] as const).map(lv => {
          const m = levelMeta[lv];
          const active = value === lv;
          return (
            <button key={lv} onClick={() => onChange(active ? null : lv)}
              className={`px-3 py-1.5 rounded-full text-[11px] transition-all min-w-[44px] min-h-[32px] ${active ? 'ring-2' : 'opacity-60'}`}
              style={{ backgroundColor: m.bg, color: m.text, ...(active ? { ringColor: m.text } : {}) }}>
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ToggleCheckProps {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}

export function ToggleCheck({ label, value, onChange, yesLabel = '있음', noLabel = '없음' }: ToggleCheckProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="text-[13px] text-[#374151] flex-1 min-w-0">{label}</span>
      <div className="flex gap-1.5">
        <button onClick={() => onChange(true)}
          className={`px-3 py-1.5 rounded-full text-[11px] min-w-[44px] min-h-[32px] transition-all ${value === true ? 'bg-[#FEF2F2] text-[#DC2626] ring-2 ring-[#DC2626]/30' : 'bg-[#F3F4F6] text-[#6B7280] opacity-60'}`}>
          {yesLabel}
        </button>
        <button onClick={() => onChange(false)}
          className={`px-3 py-1.5 rounded-full text-[11px] min-w-[44px] min-h-[32px] transition-all ${value === false ? 'bg-[#E8F5EE] text-[#1B7A4B] ring-2 ring-[#1B7A4B]/30' : 'bg-[#F3F4F6] text-[#6B7280] opacity-60'}`}>
          {noLabel}
        </button>
      </div>
    </div>
  );
}
