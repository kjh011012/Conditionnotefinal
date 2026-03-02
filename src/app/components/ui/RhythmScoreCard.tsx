/**
 * CMP/Card/RhythmScore
 * "오늘의 리듬 안정도" 카드
 * Variants: normal / empty(워치 미연결) / stale(마지막 동기화 오래됨) / loading
 * 게이지(0~100) + 비유 설명 + Primary CTA + 보조 CTA
 */
import { Watch, WifiOff, Clock, AlertTriangle } from 'lucide-react';

type RhythmVariant = 'normal' | 'empty' | 'stale' | 'loading';

interface RhythmScoreCardProps {
  variant?: RhythmVariant;
  score?: number;
  description?: string;
  ctaLabel?: string;
  secondaryCta?: string;
  lastSyncTime?: string;
  onCta?: () => void;
  onSecondaryCta?: () => void;
  onConnectWatch?: () => void;
}

export function RhythmScoreCard({
  variant = 'normal',
  score = 0,
  description,
  ctaLabel = '가벼운 산책 20분 시작',
  secondaryCta,
  lastSyncTime,
  onCta,
  onSecondaryCta,
  onConnectWatch,
}: RhythmScoreCardProps) {
  const getColor = () => {
    if (score >= 70) return '#22C55E';
    if (score >= 40) return '#F59E0B';
    return '#F97316';
  };
  const getStatusLabel = () => {
    if (score >= 70) return '✔ 안정';
    if (score >= 40) return '⚠ 보통';
    return '➜ 불안정';
  };

  // ── Loading skeleton ──
  if (variant === 'loading') {
    return (
      <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-28 bg-[#EEF1F4] rounded" />
          <div className="h-5 w-14 bg-[#EEF1F4] rounded-full" />
        </div>
        <div className="h-3 bg-[#EEF1F4] rounded-full mb-3" />
        <div className="h-10 w-20 bg-[#EEF1F4] rounded mb-2" />
        <div className="h-3 w-full bg-[#EEF1F4] rounded mb-4" />
        <div className="h-[48px] bg-[#EEF1F4] rounded-[14px]" />
      </div>
    );
  }

  // ── Empty: 워치 미연결 ──
  if (variant === 'empty') {
    return (
      <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[14px] text-[#6B7280]">오늘의 리듬 안정도</span>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="w-14 h-14 rounded-full bg-[#F7F8FA] flex items-center justify-center mb-3">
            <Watch size={28} className="text-[#D1D5DB]" />
          </div>
          <p className="text-[15px] text-[#374151] mb-1">워치 연결이 필요해요</p>
          <p className="text-[13px] text-[#6B7280] text-center mb-1">
            수면과 활동 데이터를 기반으로 리듬 점수를 계산해요.
          </p>
          <p className="text-[12px] text-[#9CA3AF] mb-4">
            워치 없이도 마음 체크, 두뇌 놀이는 가능해요.
          </p>
          <button
            onClick={onConnectWatch}
            className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[15px]"
          >
            워치 연결하기
          </button>
          <button
            onClick={onCta}
            className="w-full h-[40px] text-[#1B7A4B] text-[14px] mt-2"
          >
            워치 없이 체크하기
          </button>
        </div>
      </div>
    );
  }

  // ── Stale: 동기화 오래됨 ──
  if (variant === 'stale') {
    return (
      <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#F59E0B]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-[#6B7280]">오늘의 리듬 안정도</span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF9C3] text-[#A16207] text-[12px]">
            <AlertTriangle size={12} /> 오래된 데이터
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-3 text-[12px] text-[#F59E0B]">
          <Clock size={12} />
          마지막 동기화: {lastSyncTime || '6시간 전'}
        </div>

        {/* Gauge (dimmed) */}
        <div className="relative h-3 bg-[#EEF1F4] rounded-full mb-2 overflow-hidden opacity-50">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ width: `${score}%`, backgroundColor: '#9CA3AF' }}
          />
        </div>
        <div className="flex items-end gap-1 mb-2 opacity-50">
          <span className="text-[36px] text-[#6B7280]" style={{ lineHeight: 1 }}>{score}</span>
          <span className="text-[14px] text-[#9CA3AF] mb-1">/100</span>
        </div>
        <p className="text-[13px] text-[#9CA3AF] mb-4">
          정확한 점수를 위해 워치를 동기화해 주세요.
        </p>

        <button
          onClick={onConnectWatch}
          className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[15px] mb-2"
        >
          지금 동기화하기
        </button>
        <button
          onClick={onCta}
          className="w-full h-[40px] text-[#6B7280] text-[14px]"
        >
          이전 점수로 추천 보기
        </button>
      </div>
    );
  }

  // ── Normal ──
  return (
    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] text-[#6B7280]">오늘의 리듬 안정도</span>
        <span
          className="px-2.5 py-0.5 rounded-full text-[12px]"
          style={{ backgroundColor: `${getColor()}20`, color: getColor() }}
        >
          {getStatusLabel()}
        </span>
      </div>

      {/* Gauge */}
      <div className="relative h-3 bg-[#EEF1F4] rounded-full mb-2 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${score}%`, backgroundColor: getColor() }}
        />
      </div>
      <div className="flex items-end gap-1 mb-2">
        <span className="text-[36px] text-[#111827]" style={{ lineHeight: 1 }}>{score}</span>
        <span className="text-[14px] text-[#9CA3AF] mb-1">/100</span>
      </div>
      <p className="text-[13px] text-[#6B7280] mb-4">
        {description || '수면 규칙성과 활동량을 기반으로 한 생활 리듬 점수예요. 의학적 지표가 아닌 생활 습관 점수입니다.'}
      </p>

      <button
        onClick={onCta}
        className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[15px]"
      >
        {ctaLabel}
      </button>
      {secondaryCta && (
        <button
          onClick={onSecondaryCta}
          className="w-full h-[38px] text-[#1B7A4B] text-[14px] mt-1"
        >
          {secondaryCta}
        </button>
      )}
    </div>
  );
}
