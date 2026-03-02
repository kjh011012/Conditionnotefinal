/**
 * 참여 진행 바 — 전체 기간 대비 진행률 표시
 */
import { useVillage } from '../../context/VillageContext';

export function ParticipationProgressBar({ compact = false }: { compact?: boolean }) {
  const { activeVillage, activeParticipation, getProgressPercent, getDaysRemaining } = useVillage();
  if (!activeVillage || !activeParticipation) return null;

  const pct = getProgressPercent();
  const daysLeft = getDaysRemaining();
  const start = activeParticipation.startDate.slice(5).replace('-', '.');
  const end = activeParticipation.endDate.slice(5).replace('-', '.');

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[4px] bg-[#F3F4F6] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: activeVillage.primaryColor }} />
        </div>
        <span className="text-[10px] text-[#6B7280] shrink-0">D-{daysLeft}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] text-[#111827]">참여 진행률</span>
        <span className="text-[12px] px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: activeVillage.primaryColor }}>
          D-{daysLeft}
        </span>
      </div>
      <div className="w-full h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: activeVillage.primaryColor }} />
      </div>
      <div className="flex items-center justify-between text-[10px] text-[#9CA3AF]">
        <span>{start} 시작</span>
        <span>{pct}% 진행</span>
        <span>{end} 종료</span>
      </div>
    </div>
  );
}
