/**
 * N6. 내 예약/결제
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const statusTabs = ['전체', '결제완료', '진행중', '완료', '취소'];
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: '결제완료', color: '#0EA5E9', bg: '#E0F2FE' },
  active: { label: '진행중', color: '#1B7A4B', bg: '#E8F5EE' },
  completed: { label: '완료', color: '#6B7280', bg: '#F3F4F6' },
  cancelled: { label: '취소', color: '#DC2626', bg: '#FEF2F2' },
};

export function MyBookingsPage() {
  const navigate = useNavigate();
  const { participations, getVillage, getProgram } = useVillage();
  const [tab, setTab] = useState('전체');

  const bookings = participations.map(pt => {
    const v = getVillage(pt.villageId);
    const p = getProgram(pt.programId);
    return { ...pt, village: v, program: p };
  }).filter(b => b.village && b.program);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">내 예약 · 결제</h2>
      </div>

      <div className="px-4 pt-3">
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {statusTabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] ${tab === t ? 'bg-[#1B7A4B] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-8 flex flex-col gap-3">
        {bookings.map(b => {
          const st = statusConfig[b.reservationStatus === 'paid' && b.status === 'active' ? 'active' :
            b.status === 'completed' ? 'completed' :
            b.reservationStatus === 'paid' ? 'paid' : 'cancelled'] || statusConfig.paid;

          return (
            <div key={b.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[22px]">{b.village!.logo}</span>
                <div className="flex-1">
                  <span className="text-[14px] text-[#111827] block">{b.program!.name}</span>
                  <span className="text-[11px] text-[#6B7280]">{b.village!.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                  {st.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#9CA3AF]">
                <span>{b.startDate} ~ {b.endDate}</span>
                <span>₩{b.program!.price.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
