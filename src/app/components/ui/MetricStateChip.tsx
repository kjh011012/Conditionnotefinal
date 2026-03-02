/**
 * CMP/Chip/MetricState
 * pill chip: 아이콘 + 라벨 + 상태(좋음/보통/주의)
 * 색만으로 표현 금지 — 아이콘+라벨 동시 표시
 */
import { Moon, Footprints, Zap, Brain, Activity, type LucideIcon } from 'lucide-react';

export type MetricKey = 'sleep' | 'activity' | 'fatigue' | 'stress' | 'rhythm';
export type MetricLevel = 'good' | 'normal' | 'caution' | 'unknown';

interface MetricStateChipProps {
  metric: MetricKey;
  level: MetricLevel;
  compact?: boolean;
  className?: string;
}

const metricMeta: Record<MetricKey, { label: string; icon: LucideIcon }> = {
  sleep:    { label: '수면',     icon: Moon },
  activity: { label: '활동',     icon: Footprints },
  fatigue:  { label: '피로',     icon: Zap },
  stress:   { label: '스트레스', icon: Brain },
  rhythm:   { label: '리듬',     icon: Activity },
};

const levelMeta: Record<MetricLevel, { label: string; emoji: string; bg: string; text: string; border: string }> = {
  good:    { label: '좋음', emoji: '✔', bg: 'bg-[#E8F5EE]', text: 'text-[#1B7A4B]', border: 'border-[#A7F3D0]' },
  normal:  { label: '보통', emoji: '–',  bg: 'bg-[#FEF9C3]', text: 'text-[#A16207]', border: 'border-[#FDE68A]' },
  caution: { label: '주의', emoji: '⚠', bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', border: 'border-[#FCA5A5]' },
  unknown: { label: '알 수 없음', emoji: '?', bg: 'bg-[#F3F4F6]', text: 'text-[#6B7280]', border: 'border-[#D1D5DB]' },
};

export function MetricStateChip({ metric, level, compact = false, className = '' }: MetricStateChipProps) {
  const m = metricMeta[metric];
  const l = levelMeta[level];
  const Icon = m.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${l.bg} ${l.border} ${className}`}
    >
      <Icon size={compact ? 12 : 14} className={l.text} />
      <span className={`${compact ? 'text-[11px]' : 'text-[12px]'} ${l.text}`}>
        {m.label}
      </span>
      <span className={`${compact ? 'text-[10px]' : 'text-[11px]'} ${l.text}`}>
        {l.emoji} {l.label}
      </span>
    </span>
  );
}

/** 5개 MetricState를 한 줄로 보여주는 래퍼 */
export function MetricStateRow({
  states,
  className = '',
}: {
  states: { metric: MetricKey; level: MetricLevel }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {states.map(s => (
        <MetricStateChip key={s.metric} metric={s.metric} level={s.level} compact />
      ))}
    </div>
  );
}