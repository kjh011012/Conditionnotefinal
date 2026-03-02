/**
 * V-P1. 마을 전용 대시보드 (참가자)
 */
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ContextBar } from '../../components/ui/ContextBar';
import { ParticipationProgressBar } from '../../components/ui/ParticipationProgressBar';
import {
  Bell, Calendar, MessageSquare, Megaphone, Phone,
  Clock, MapPin, ChevronRight, Moon, Activity, Heart, Brain,
  UtensilsCrossed, Building2,
} from 'lucide-react';

const todaySchedule = [
  { time: '07:30', name: '아침 명상', place: '명상실', status: 'done' },
  { time: '09:00', name: '숲길 걷기', place: '치유숲', status: 'current' },
  { time: '14:00', name: '자연식 요리', place: '쿠킹홀', status: 'upcoming' },
  { time: '16:00', name: '숲속 대화', place: '쉼터', status: 'upcoming' },
];

const statusStyle: Record<string, { label: string; color: string; bg: string }> = {
  done: { label: '완료', color: '#6B7280', bg: '#F3F4F6' },
  current: { label: '진행중', color: '#1B7A4B', bg: '#E8F5EE' },
  upcoming: { label: '예정', color: '#0EA5E9', bg: '#E0F2FE' },
};

const conditionSummary = [
  { icon: Moon, label: '수면', value: '6.5시간', status: '보통', color: '#6366F1' },
  { icon: Activity, label: '스트레스', value: '낮음', status: '양호', color: '#1B7A4B' },
  { icon: Heart, label: '자율신경', value: '안정', status: '양호', color: '#EC4899' },
  { icon: Brain, label: '인지활력', value: '72점', status: '보통', color: '#F59E0B' },
];

export function VillageDashboard() {
  const navigate = useNavigate();
  const { activeVillage, activeProgram, coordinator, appMode } = useVillage();

  if (appMode !== 'VILLAGE_MODE' || !activeVillage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Context Bar */}
      <ContextBar />

      <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
        {/* Welcome */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          style={{ borderTop: `3px solid ${activeVillage.primaryColor}` }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[32px]">{activeVillage.logo}</span>
            <div>
              <h2 className="text-[18px] text-[#111827]">안녕하세요, 김영숙님</h2>
              <span className="text-[12px] text-[#6B7280]">{activeVillage.name}에서의 하루를 시작해보세요</span>
            </div>
          </div>
          <ParticipationProgressBar />
        </div>

        {/* Today schedule */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[15px] text-[#111827]">오늘 일정</span>
            <button onClick={() => navigate('/village/schedule')} className="text-[11px] flex items-center gap-0.5" style={{ color: activeVillage.primaryColor }}>
              전체 일정 <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {todaySchedule.map((s, i) => {
              const st = statusStyle[s.status];
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-[12px] ${s.status === 'current' ? 'border-l-[3px]' : ''}`}
                  style={s.status === 'current' ? { backgroundColor: activeVillage.secondaryColor, borderColor: activeVillage.primaryColor } : { backgroundColor: '#F7F8FA' }}>
                  <span className="text-[13px] text-[#374151] w-12 shrink-0">{s.time}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] text-[#111827] block">{s.name}</span>
                    <span className="text-[10px] text-[#9CA3AF] flex items-center gap-0.5"><MapPin size={8} /> {s.place}</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coordinator card */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] text-[#111827] block mb-3">담당 코디네이터</span>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-[24px]"
              style={{ backgroundColor: activeVillage.secondaryColor }}>
              {coordinator.photo}
            </div>
            <div className="flex-1">
              <span className="text-[14px] text-[#111827] block">{coordinator.name}</span>
              <span className="text-[11px] text-[#6B7280]">근무시간 {coordinator.workHours}</span>
            </div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: activeVillage.secondaryColor }}>
              <Phone size={16} style={{ color: activeVillage.primaryColor }} />
            </button>
          </div>
        </div>

        {/* Guardian connection status */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#111827]">보호자 연결 상태</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#1B7A4B]">연결됨</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Heart size={14} className="text-[#EC4899]" />
            <span className="text-[12px] text-[#374151]">김민수 (자녀)</span>
            <span className="text-[10px] text-[#9CA3AF] ml-auto">요약 공유 중</span>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: UtensilsCrossed, label: '식단', path: '/village/meal', color: '#F59E0B' },
            { icon: Building2, label: '숙소', path: '/village/room', color: '#7C3AED' },
            { icon: Megaphone, label: '공지', path: '/village/notices', color: '#0EA5E9' },
            { icon: MessageSquare, label: '문의', path: '/village/inquiry', color: '#EC4899' },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)] active:scale-[0.96] transition-transform">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: item.color + '15' }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <span className="text-[11px] text-[#374151]">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Today condition summary */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">오늘 내 컨디션</span>
          <div className="grid grid-cols-2 gap-2">
            {conditionSummary.map(c => (
              <div key={c.label} className="bg-[#F7F8FA] rounded-[12px] p-3 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: c.color + '15' }}>
                  <c.icon size={16} style={{ color: c.color }} />
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] block">{c.label}</span>
                  <span className="text-[13px] text-[#111827]">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data scope note */}
        <p className="text-[10px] text-[#9CA3AF] text-center px-4">
          현재 {activeVillage.name} · {activeProgram?.name} 기준 정보입니다
        </p>
      </div>
    </div>
  );
}
