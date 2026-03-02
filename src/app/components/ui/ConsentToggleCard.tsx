/**
 * CMP/Consent/ToggleCard
 * 필수/선택 뱃지 + 요약 1줄 + "자세히" 펼침(accordion)
 * 동의 철회 UX(설정에서 동일 컴포넌트 재사용)
 */
import { useState } from 'react';
import { ChevronDown, ChevronUp, Shield } from 'lucide-react';

interface ConsentToggleCardProps {
  tag: '필수' | '선택';
  title: string;
  summary: string;
  detailText: string;
  agreed: boolean;
  onToggle: (agreed: boolean) => void;
  disabled?: boolean;
  withdrawable?: boolean;
  onWithdraw?: () => void;
}

export function ConsentToggleCard({
  tag,
  title,
  summary,
  detailText,
  agreed,
  onToggle,
  disabled = false,
  withdrawable = false,
  onWithdraw,
}: ConsentToggleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isRequired = tag === '필수';

  return (
    <div
      className={`rounded-[16px] border transition-all ${
        agreed ? 'border-[#1B7A4B] bg-[#E8F5EE]/30' : 'border-[#E5E7EB] bg-[#F7F8FA]'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] ${
                isRequired
                  ? 'bg-[#FEE2E2] text-[#DC2626]'
                  : 'bg-[#EEF1F4] text-[#6B7280]'
              }`}
            >
              {tag}
            </span>
            <span className="text-[15px] text-[#111827]">{title}</span>
          </div>
          <p className="text-[12px] text-[#6B7280]">{summary}</p>
        </div>

        {/* Toggle */}
        <button
          onClick={() => !disabled && onToggle(!agreed)}
          disabled={disabled}
          className={`w-[48px] h-[28px] rounded-full transition-colors relative shrink-0 ${
            agreed ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={`${title} ${agreed ? '동의됨' : '미동의'}`}
          role="switch"
          aria-checked={agreed}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
              agreed ? 'translate-x-[24px]' : 'translate-x-[4px]'
            }`}
          />
        </button>
      </div>

      {/* Expand trigger */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 py-2 border-t border-[#E5E7EB]/50 text-[12px] text-[#9CA3AF]"
      >
        {expanded ? '접기' : '자세히'}
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {/* Detail accordion */}
      {expanded && (
        <div className="px-4 pb-4">
          <div className="bg-white rounded-[12px] p-3 border border-[#EEF1F4]">
            <p className="text-[12px] text-[#6B7280] whitespace-pre-line leading-[20px]">
              {detailText}
            </p>
          </div>

          {/* Withdraw CTA */}
          {withdrawable && agreed && (
            <button
              onClick={onWithdraw}
              className="mt-3 w-full h-[40px] border border-[#DC2626] text-[#DC2626] rounded-[12px] text-[13px] flex items-center justify-center gap-1.5"
            >
              <Shield size={14} /> 동의 철회
            </button>
          )}
        </div>
      )}
    </div>
  );
}
