/**
 * N7. 내 참여 이력 타임라인
 */
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2, Clock, Play } from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; bg: string; Icon: any }> = {
  active: { label: '진행중', color: '#1B7A4B', bg: '#E8F5EE', Icon: Play },
  confirmed: { label: '참여 확정', color: '#0EA5E9', bg: '#E0F2FE', Icon: Clock },
  completed: { label: '완료', color: '#6B7280', bg: '#F3F4F6', Icon: CheckCircle2 },
};

export function ParticipationHistory() {
  const navigate = useNavigate();
  const { participations, getVillage, getProgram, enterVillage } = useVillage();

  const sorted = [...participations].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  function handleEnter(pt: typeof participations[0]) {
    if (pt.status === 'active') {
      enterVillage(pt.id);
      navigate('/village');
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
            <ChevronLeft size={22} className="text-[#374151]" />
          </button>
          <h2 className="text-[16px] text-[#111827]">내 참여 이력</h2>
        </div>

        <div className="px-4 pt-4 pb-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[#E5E7EB]" />

            <div className="flex flex-col gap-4">
              {sorted.map(pt => {
                const v = getVillage(pt.villageId);
                const prog = getProgram(pt.programId);
                if (!v || !prog) return null;
                const cfg = statusConfig[pt.status] || statusConfig.completed;

                return (
                  <div key={pt.id} className="relative pl-12">
                    {/* Dot */}
                    <div className="absolute left-3 top-4 w-5 h-5 rounded-full flex items-center justify-center z-10"
                      style={{ backgroundColor: cfg.bg }}>
                      <cfg.Icon size={11} style={{ color: cfg.color }} />
                    </div>

                    <button
                      onClick={() => handleEnter(pt)}
                      className={`w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left transition-transform
                        ${pt.status === 'active' ? 'border-l-4 active:scale-[0.98]' : ''}
                      `}
                      style={pt.status === 'active' ? { borderColor: v.primaryColor } : {}}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[22px]">{v.logo}</span>
                        <div className="flex-1">
                          <span className="text-[14px] text-[#111827]">{v.name}</span>
                          <span className="text-[11px] text-[#6B7280] block">{prog.name}</span>
                        </div>
                        <span className="text-[10px] px-2 py-1 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#9CA3AF]">
                          {pt.startDate} ~ {pt.endDate}
                        </span>
                        {pt.status === 'active' && (
                          <span className="text-[12px] flex items-center gap-1" style={{ color: v.primaryColor }}>
                            입장 <ChevronRight size={12} />
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
