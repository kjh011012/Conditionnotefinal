/**
 * VillageModeBanner — NORMAL_MODE 홈에서 활성/예정 참여 표시
 */
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ChevronRight, Calendar } from 'lucide-react';

export function VillageModeBanner() {
  const navigate = useNavigate();
  const { getActiveParticipations, getUpcomingParticipations, getVillage, getProgram, enterVillage } = useVillage();

  const active = getActiveParticipations();
  const upcoming = getUpcomingParticipations();

  if (active.length === 0 && upcoming.length === 0) {
    return (
      <div className="px-4 pt-3">
        <button onClick={() => navigate('/explore')}
          className="w-full bg-gradient-to-r from-[#E8F5EE] to-[#E0F2FE] rounded-[14px] p-4 text-left active:scale-[0.98] transition-transform">
          <span className="text-[13px] text-[#111827] block mb-1">치유마을 캠프를 찾아보세요</span>
          <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
            수면 · 스트레스 · 리듬 관리 프로그램 <ChevronRight size={12} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 flex flex-col gap-2">
      {active.map(pt => {
        const v = getVillage(pt.villageId);
        const prog = getProgram(pt.programId);
        if (!v || !prog) return null;
        const daysLeft = Math.max(0, Math.ceil((new Date(pt.endDate).getTime() - new Date('2026-03-02').getTime()) / 86400000));
        return (
          <button key={pt.id}
            onClick={() => { enterVillage(pt.id); navigate('/village'); }}
            className="w-full rounded-[14px] p-4 text-left active:scale-[0.98] transition-transform border-l-4"
            style={{ backgroundColor: v.secondaryColor, borderColor: v.primaryColor }}>
            <div className="flex items-center gap-3">
              <span className="text-[24px]">{v.logo}</span>
              <div className="flex-1">
                <span className="text-[13px] text-[#111827] block">{v.name} · {prog.name}</span>
                <span className="text-[11px] text-[#6B7280]">진행중 · D-{daysLeft}</span>
              </div>
              <span className="text-[12px] flex items-center gap-1" style={{ color: v.primaryColor }}>
                입장 <ChevronRight size={14} />
              </span>
            </div>
          </button>
        );
      })}
      {upcoming.map(pt => {
        const v = getVillage(pt.villageId);
        const prog = getProgram(pt.programId);
        if (!v || !prog) return null;
        const daysUntil = Math.max(0, Math.ceil((new Date(pt.startDate).getTime() - new Date('2026-03-02').getTime()) / 86400000));
        return (
          <div key={pt.id} className="bg-white rounded-[14px] p-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-3">
            <span className="text-[20px]">{v.logo}</span>
            <div className="flex-1">
              <span className="text-[12px] text-[#111827]">{v.name} · {prog.name}</span>
              <span className="text-[10px] text-[#9CA3AF] block">시작까지 D-{daysUntil}</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 bg-[#E0F2FE] text-[#0EA5E9] rounded-full">예정</span>
          </div>
        );
      })}
    </div>
  );
}
