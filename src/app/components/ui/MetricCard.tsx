/**
 * CMP/Card/Metric (강화)
 * Variants: compact / normal / expanded / empty / loading / error
 * 상단: 아이콘 + 지표명 + 기준선 대비/어제 대비
 * 중앙: 값(큰글씨) + Status Chip
 * 하단: "비유 1줄" + [오늘 추천 보기]
 */
import { StatusChip } from './StatusChip';
import { ChevronRight, AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import type { ReactNode } from 'react';

type MetricVariant = 'compact' | 'normal' | 'expanded' | 'empty' | 'loading' | 'error';

interface MetricCardProps {
  variant?: MetricVariant;
  icon: ReactNode;
  title: string;
  value?: string;
  unit?: string;
  change?: string;
  changeLabel?: string;
  changePositive?: boolean;
  status?: 'green' | 'yellow' | 'orange' | 'red';
  metaphor?: string;
  onDetail?: () => void;
  onRecommend?: () => void;
  onRetry?: () => void;
  emptyMessage?: string;
}

export function MetricCard({
  variant = 'normal',
  icon,
  title,
  value,
  unit,
  change,
  changeLabel = '기준선 대비',
  changePositive,
  status,
  metaphor,
  onDetail,
  onRecommend,
  onRetry,
  emptyMessage,
}: MetricCardProps) {
  const isCompact = variant === 'compact';
  const cardWidth = isCompact ? 'min-w-[200px]' : 'min-w-[280px]';

  // ── Loading skeleton ──
  if (variant === 'loading') {
    return (
      <div className={`bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${cardWidth} snap-center animate-pulse`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#EEF1F4]" />
          <div className="h-4 w-16 bg-[#EEF1F4] rounded" />
        </div>
        <div className="h-8 w-20 bg-[#EEF1F4] rounded mb-2" />
        <div className="h-5 w-16 bg-[#EEF1F4] rounded-full mb-3" />
        <div className="h-3 w-full bg-[#EEF1F4] rounded mb-4" />
        <div className="flex gap-2">
          <div className="flex-1 h-[40px] bg-[#EEF1F4] rounded-[14px]" />
          <div className="flex-1 h-[40px] bg-[#EEF1F4] rounded-[14px]" />
        </div>
      </div>
    );
  }

  // ── Error ──
  if (variant === 'error') {
    return (
      <div className={`bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${cardWidth} snap-center border border-[#FEE2E2]`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <AlertCircle size={18} className="text-[#DC2626]" />
          </div>
          <span className="text-[14px] text-[#374151]">{title}</span>
        </div>
        <div className="flex flex-col items-center py-4">
          <WifiOff size={24} className="text-[#D1D5DB] mb-2" />
          <p className="text-[14px] text-[#374151] mb-1">데이터를 불러올 수 없어요</p>
          <p className="text-[12px] text-[#6B7280] text-center mb-3">
            인터넷 연결을 확인하거나 잠시 후 다시 시도해 주세요.
          </p>
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-4 h-[40px] border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151]"
          >
            <RefreshCw size={14} /> 다시 시도
          </button>
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (variant === 'empty') {
    return (
      <div className={`bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${cardWidth} snap-center`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#1B7A4B]">
            {icon}
          </div>
          <span className="text-[14px] text-[#374151]">{title}</span>
        </div>
        <div className="flex flex-col items-center py-4">
          <span className="text-[32px] text-[#D1D5DB]" style={{ lineHeight: 1.2 }}>—</span>
          <p className="text-[13px] text-[#9CA3AF] mt-2 text-center">
            {emptyMessage || '아직 기록된 데이터가 없어요'}
          </p>
          <button
            onClick={onDetail}
            className="mt-3 px-4 h-[36px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[12px] text-[13px]"
          >
            기록 시작하기
          </button>
        </div>
      </div>
    );
  }

  // ── Normal / Compact / Expanded ──
  return (
    <div className={`bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${cardWidth} snap-center`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#1B7A4B]">
            {icon}
          </div>
          <span className="text-[14px] text-[#374151]">{title}</span>
        </div>
        {change && (
          <span
            className={`text-[12px] ${changePositive ? 'text-[#22C55E]' : 'text-[#F97316]'}`}
          >
            {changeLabel} {change}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end gap-2 mb-2">
        <span className="text-[32px] text-[#111827]" style={{ lineHeight: 1.2 }}>
          {value || '—'}
        </span>
        {unit && <span className="text-[14px] text-[#6B7280] mb-1">{unit}</span>}
      </div>

      {/* Status */}
      {status && (
        <div className="mb-3">
          <StatusChip status={status} />
        </div>
      )}

      {/* Metaphor */}
      {metaphor && !isCompact && (
        <p className="text-[13px] text-[#6B7280] mb-4">{metaphor}</p>
      )}

      {/* Expanded: extra detail area */}
      {variant === 'expanded' && (
        <div className="bg-[#F7F8FA] rounded-[12px] p-3 mb-4">
          <p className="text-[12px] text-[#6B7280]">
            이 수치는 의학적 검사가 아닌 생활 리듬 점검 결과예요.
            지속적으로 변화를 관찰하면 도움이 될 수 있어요.
          </p>
        </div>
      )}

      {/* Actions */}
      {!isCompact && (
        <div className="flex gap-2">
          <button
            onClick={onDetail}
            className="flex-1 h-[40px] rounded-[14px] border border-[#1B7A4B] text-[#1B7A4B] text-[14px] flex items-center justify-center gap-1"
          >
            자세히 <ChevronRight size={14} />
          </button>
          <button
            onClick={onRecommend}
            className="flex-1 h-[40px] rounded-[14px] bg-[#1B7A4B] text-white text-[14px] flex items-center justify-center"
          >
            오늘 추천 보기
          </button>
        </div>
      )}
    </div>
  );
}
