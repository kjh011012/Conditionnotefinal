/**
 * CMP/BottomSheet/RecoSettings
 * 추천 옵션 (선택/최소 — 과잉 설정 금지)
 * - 영상 길이: 5~10분 / 10~15분 / 15~20분
 * - 강도: 가벼움 / 보통
 * - [적용하기] CTA
 */
import { useState, useEffect } from 'react';
import { X, Settings2 } from 'lucide-react';

export interface RecoSettings {
  duration: '5-10' | '10-15' | '15-20';
  intensity: 'light' | 'normal';
}

interface RecoSettingsSheetProps {
  open: boolean;
  onClose: () => void;
  settings: RecoSettings;
  onApply: (settings: RecoSettings) => void;
}

export function RecoSettingsSheet({ open, onClose, settings, onApply }: RecoSettingsSheetProps) {
  const [draft, setDraft] = useState<RecoSettings>(settings);

  useEffect(() => {
    if (open) setDraft(settings);
  }, [open, settings]);

  if (!open) return null;

  const durationOptions: { key: RecoSettings['duration']; label: string }[] = [
    { key: '5-10', label: '5~10분' },
    { key: '10-15', label: '10~15분' },
    { key: '15-20', label: '15~20분' },
  ];

  const intensityOptions: { key: RecoSettings['intensity']; label: string }[] = [
    { key: 'light', label: '가벼움' },
    { key: 'normal', label: '보통' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center" onClick={onClose}>
      <div
        className="w-full max-w-[430px] bg-white rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mt-3 mb-2" />

        <div className="px-5 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Settings2 size={18} className="text-[#6B7280]" />
              <h3 className="text-[18px] text-[#111827]">추천 옵션</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F8FA]">
              <X size={16} className="text-[#6B7280]" />
            </button>
          </div>

          {/* Duration */}
          <div className="mb-5">
            <p className="text-[14px] text-[#374151] mb-2">영상 길이</p>
            <div className="flex gap-2">
              {durationOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setDraft(d => ({ ...d, duration: opt.key }))}
                  className={`flex-1 h-[44px] rounded-[12px] text-[14px] transition-all ${
                    draft.duration === opt.key
                      ? 'bg-[#E8F5EE] text-[#1B7A4B] border border-[#1B7A4B]'
                      : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div className="mb-6">
            <p className="text-[14px] text-[#374151] mb-2">강도</p>
            <div className="flex gap-2">
              {intensityOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setDraft(d => ({ ...d, intensity: opt.key }))}
                  className={`flex-1 h-[44px] rounded-[12px] text-[14px] transition-all ${
                    draft.intensity === opt.key
                      ? 'bg-[#E8F5EE] text-[#1B7A4B] border border-[#1B7A4B]'
                      : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Apply */}
          <button
            onClick={() => { onApply(draft); onClose(); }}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
