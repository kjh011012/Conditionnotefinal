/**
 * CMP/Form/StepperInput
 * 코디네이터 점수 입력용 + 참가자 최소 입력용 공용
 * +/- 버튼, 최소/최대, 숫자 직접 입력은 선택(기본 숨김)
 * 접근성: 버튼 48px, 큰 글씨 대응
 */
import { useState } from 'react';
import { Minus, Plus, Keyboard } from 'lucide-react';

interface StepperInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
  showDirectInput?: boolean;
  disabled?: boolean;
  size?: 'default' | 'large';
}

export function StepperInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  description,
  showDirectInput: defaultShowDirect = false,
  disabled = false,
  size = 'default',
}: StepperInputProps) {
  const [showDirect, setShowDirect] = useState(defaultShowDirect);
  const isLarge = size === 'large';

  const increment = () => {
    const next = Math.min(value + step, max);
    onChange(next);
  };

  const decrement = () => {
    const next = Math.max(value - step, min);
    onChange(next);
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (isNaN(raw)) return;
    onChange(Math.max(min, Math.min(raw, max)));
  };

  return (
    <div className={`${disabled ? 'opacity-50' : ''}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[#374151] ${isLarge ? 'text-[16px]' : 'text-[14px]'}`}>
            {label}
          </span>
          {!showDirect && (
            <button
              onClick={() => setShowDirect(true)}
              className="text-[12px] text-[#9CA3AF] flex items-center gap-1"
              aria-label="숫자 직접 입력"
            >
              <Keyboard size={12} /> 직접 입력
            </button>
          )}
        </div>
      )}

      {description && (
        <p className="text-[12px] text-[#6B7280] mb-3">{description}</p>
      )}

      <div className="flex items-center gap-3">
        {/* Decrement */}
        <button
          onClick={decrement}
          disabled={disabled || value <= min}
          className={`shrink-0 rounded-[14px] flex items-center justify-center border border-[#E5E7EB] transition-colors ${
            isLarge ? 'w-[56px] h-[56px]' : 'w-[48px] h-[48px]'
          } ${
            value <= min || disabled
              ? 'bg-[#F7F8FA] text-[#D1D5DB]'
              : 'bg-white text-[#374151] active:bg-[#E8F5EE]'
          }`}
          aria-label="감소"
        >
          <Minus size={isLarge ? 24 : 20} />
        </button>

        {/* Value display / Direct input */}
        <div className="flex-1 text-center">
          {showDirect ? (
            <input
              type="number"
              value={value}
              onChange={handleDirectInput}
              min={min}
              max={max}
              disabled={disabled}
              className={`w-full text-center bg-[#F7F8FA] rounded-[12px] border border-[#E5E7EB] outline-none text-[#111827] ${
                isLarge ? 'h-[56px] text-[28px]' : 'h-[48px] text-[24px]'
              }`}
            />
          ) : (
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-[#111827] ${isLarge ? 'text-[36px]' : 'text-[28px]'}`} style={{ lineHeight: 1 }}>
                {value}
              </span>
              {unit && (
                <span className={`text-[#6B7280] ${isLarge ? 'text-[16px]' : 'text-[14px]'}`}>
                  {unit}
                </span>
              )}
            </div>
          )}
          <div className="flex justify-center gap-1 mt-1">
            <span className="text-[11px] text-[#9CA3AF]">{min}</span>
            <span className="text-[11px] text-[#D1D5DB]">~</span>
            <span className="text-[11px] text-[#9CA3AF]">{max}</span>
          </div>
        </div>

        {/* Increment */}
        <button
          onClick={increment}
          disabled={disabled || value >= max}
          className={`shrink-0 rounded-[14px] flex items-center justify-center border border-[#E5E7EB] transition-colors ${
            isLarge ? 'w-[56px] h-[56px]' : 'w-[48px] h-[48px]'
          } ${
            value >= max || disabled
              ? 'bg-[#F7F8FA] text-[#D1D5DB]'
              : 'bg-white text-[#374151] active:bg-[#E8F5EE]'
          }`}
          aria-label="증가"
        >
          <Plus size={isLarge ? 24 : 20} />
        </button>
      </div>
    </div>
  );
}