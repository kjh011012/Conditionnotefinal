/**
 * S3. 현재 참여 공간 선택 (활성 참여 다중일 때)
 */
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { Calendar, ChevronRight } from 'lucide-react';

export function ParticipationSelect() {
  const navigate = useNavigate();
  const { getActiveParticipations, getUpcomingParticipations, getPastParticipations, enterVillage, getVillage, getProgram } = useVillage();

  const active = getActiveParticipations();
  const upcoming = getUpcomingParticipations();

  function handleEnter(participationId: string) {
    enterVillage(participationId);
    navigate('/village/entrance');
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-[430px] mx-auto px-5 pt-14 pb-8">
        <h1 className="text-[22px] text-[#111827] mb-2">참여 공간 선택</h1>
        <p className="text-[14px] text-[#6B7280] mb-6">입장할 치유마을을 선택하세요</p>

        {/* Active */}
        {active.length > 0 && (
          <div className="mb-6">
            <span className="text-[12px] text-[#6B7280] block mb-2 px-1">진행중인 참여</span>
            <div className="flex flex-col gap-3">
              {active.map(pt => {
                const v = getVillage(pt.villageId);
                const prog = getProgram(pt.programId);
                if (!v || !prog) return null;
                const daysLeft = Math.max(0, Math.ceil((new Date(pt.endDate).getTime() - new Date('2026-03-02').getTime()) / 86400000));
                return (
                  <button key={pt.id} onClick={() => handleEnter(pt.id)}
                    className="bg-white rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-left active:scale-[0.98] transition-transform border-l-4"
                    style={{ borderColor: v.primaryColor }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[28px]">{v.logo}</span>
                      <div className="flex-1">
                        <span className="text-[16px] text-[#111827] block">{v.name}</span>
                        <span className="text-[12px] text-[#6B7280]">{prog.name}</span>
                      </div>
                      <span className="text-[11px] px-2 py-1 rounded-full text-white" style={{ backgroundColor: v.primaryColor }}>
                        D-{daysLeft}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#9CA3AF]">
                        {pt.startDate.slice(5).replace('-', '.')} ~ {pt.endDate.slice(5).replace('-', '.')}
                      </span>
                      <span className="text-[13px] flex items-center gap-1" style={{ color: v.primaryColor }}>
                        입장 <ChevronRight size={14} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-6">
            <span className="text-[12px] text-[#6B7280] block mb-2 px-1">예정된 참여</span>
            <div className="flex flex-col gap-2">
              {upcoming.map(pt => {
                const v = getVillage(pt.villageId);
                const prog = getProgram(pt.programId);
                if (!v || !prog) return null;
                const daysUntil = Math.max(0, Math.ceil((new Date(pt.startDate).getTime() - new Date('2026-03-02').getTime()) / 86400000));
                return (
                  <div key={pt.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3">
                      <span className="text-[22px]">{v.logo}</span>
                      <div className="flex-1">
                        <span className="text-[14px] text-[#111827]">{v.name}</span>
                        <span className="text-[11px] text-[#6B7280] block">{prog.name} · 시작까지 D-{daysUntil}</span>
                      </div>
                      <span className="text-[10px] px-2 py-1 bg-[#F3F4F6] rounded-full text-[#6B7280]">대기중</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Past & Timeline link */}
        <button onClick={() => navigate('/village/history')}
          className="w-full h-[48px] border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#6B7280] flex items-center justify-center gap-2 active:bg-[#F7F8FA]">
          <Calendar size={16} /> 예정 / 과거 참여 일정 보기
        </button>
      </div>
    </div>
  );
}
