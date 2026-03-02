/**
 * CMP/Segment/ModeSwitch
 * "일상 | 캠프" 상단 세그먼트 전환
 * Variants: default / selected / disabled
 * 접근성: 선택 영역 높이 44px 이상
 */

interface ModeSwitchProps {
  segments: { key: string; label: string }[];
  activeKey: string;
  onChange: (key: string) => void;
  disabled?: boolean;
  size?: 'default' | 'compact';
}

export function ModeSwitch({
  segments,
  activeKey,
  onChange,
  disabled = false,
  size = 'default',
}: ModeSwitchProps) {
  const height = size === 'compact' ? 'h-[40px]' : 'h-[44px]';

  return (
    <div
      className={`flex rounded-[12px] p-1 ${
        disabled ? 'bg-[#EEF1F4] opacity-50' : 'bg-[#EEF1F4]'
      }`}
      role="tablist"
      aria-label="모드 전환"
    >
      {segments.map((seg) => {
        const isActive = activeKey === seg.key;
        return (
          <button
            key={seg.key}
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={() => !disabled && onChange(seg.key)}
            className={`flex-1 ${height} rounded-[10px] text-[14px] transition-all flex items-center justify-center ${
              isActive
                ? 'bg-white text-[#1B7A4B] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                : 'text-[#6B7280]'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
