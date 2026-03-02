/**
 * A11. 예약 및 결제 상태 확인
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, CreditCard, CheckCircle2, Clock, XCircle, RotateCcw, Search, Download } from 'lucide-react';

type ResStatus = 'payment_pending' | 'paid' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'refunded';

interface Booking {
  id: string;
  participantName: string;
  programName: string;
  period: string;
  amount: number;
  reservationStatus: ResStatus;
  paymentDate?: string;
  autoParticipation: boolean;
}

const statusConfig: Record<ResStatus, { label: string; color: string; bg: string; Icon: any }> = {
  payment_pending: { label: '결제대기', color: '#F59E0B', bg: '#FEF3C7', Icon: Clock },
  paid: { label: '결제완료', color: '#0EA5E9', bg: '#E0F2FE', Icon: CreditCard },
  confirmed: { label: '참여확정', color: '#1B7A4B', bg: '#E8F5EE', Icon: CheckCircle2 },
  active: { label: '진행중', color: '#7C3AED', bg: '#F3E8FF', Icon: CheckCircle2 },
  completed: { label: '완료', color: '#6B7280', bg: '#F3F4F6', Icon: CheckCircle2 },
  cancelled: { label: '취소', color: '#DC2626', bg: '#FEF2F2', Icon: XCircle },
  refunded: { label: '환불', color: '#DC2626', bg: '#FEF2F2', Icon: RotateCcw },
};

const bookings: Booking[] = [
  { id: 'b1', participantName: '김영숙', programName: '3월 치유캠프', period: '03.10~03.17', amount: 890000, reservationStatus: 'active', paymentDate: '02.28', autoParticipation: true },
  { id: 'b2', participantName: '박순자', programName: '3월 치유캠프', period: '03.10~03.17', amount: 890000, reservationStatus: 'active', paymentDate: '03.01', autoParticipation: true },
  { id: 'b3', participantName: '이정희', programName: '3월 치유캠프', period: '03.10~03.17', amount: 890000, reservationStatus: 'confirmed', paymentDate: '03.02', autoParticipation: true },
  { id: 'b4', participantName: '정수진', programName: '4월 봄맞이 캠프', period: '04.07~04.14', amount: 950000, reservationStatus: 'paid', paymentDate: '03.01', autoParticipation: false },
  { id: 'b5', participantName: '최미영', programName: '4월 봄맞이 캠프', period: '04.07~04.14', amount: 950000, reservationStatus: 'payment_pending', autoParticipation: false },
  { id: 'b6', participantName: '한옥순', programName: '2월 동계 힐링', period: '02.10~02.17', amount: 850000, reservationStatus: 'completed', paymentDate: '02.01', autoParticipation: true },
  { id: 'b7', participantName: '윤말순', programName: '2월 동계 힐링', period: '02.10~02.17', amount: 850000, reservationStatus: 'refunded', paymentDate: '02.05', autoParticipation: false },
];

const tabs: { key: string; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'payment_pending', label: '결제대기' },
  { key: 'paid', label: '결제완료' },
  { key: 'active', label: '진행중' },
  { key: 'completed', label: '완료' },
  { key: 'cancelled', label: '취소/환불' },
];

export function AdminBookings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = bookings.filter(b => {
    if (search && !b.participantName.includes(search) && !b.programName.includes(search)) return false;
    if (tab === 'all') return true;
    if (tab === 'cancelled') return b.reservationStatus === 'cancelled' || b.reservationStatus === 'refunded';
    return b.reservationStatus === tab;
  });

  const totalRevenue = bookings
    .filter(b => b.reservationStatus !== 'cancelled' && b.reservationStatus !== 'refunded' && b.reservationStatus !== 'payment_pending')
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/admin/more')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827] flex-1">예약 · 결제 관리</h2>
        <button className="h-8 px-3 bg-[#F3F4F6] rounded-[8px] text-[11px] text-[#374151] flex items-center gap-1">
          <Download size={12} /> 내보내기
        </button>
      </div>

      {/* KPI */}
      <div className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: '총 예약', value: `${bookings.length}건`, color: '#7C3AED' },
            { label: '결제 완료', value: `${bookings.filter(b => !['payment_pending', 'cancelled', 'refunded'].includes(b.reservationStatus)).length}건`, color: '#1B7A4B' },
            { label: '총 매출', value: `₩${(totalRevenue / 10000).toFixed(0)}만`, color: '#0EA5E9' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-[12px] p-3 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[10px] text-[#6B7280] block">{k.label}</span>
              <span className="text-[16px]" style={{ color: k.color }}>{k.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white rounded-[10px] px-3 h-[38px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-3">
          <Search size={14} className="text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="참가자명 또는 프로그램 검색" className="flex-1 bg-transparent text-[12px] outline-none" />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] ${tab === t.key ? 'bg-[#7C3AED] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-2">
        {filtered.map(b => {
          const st = statusConfig[b.reservationStatus];
          return (
            <div key={b.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                    <span className="text-[11px] text-[#7C3AED]">{b.participantName[0]}</span>
                  </div>
                  <div>
                    <span className="text-[13px] text-[#111827] block">{b.participantName}</span>
                    <span className="text-[10px] text-[#6B7280]">{b.programName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <st.Icon size={11} style={{ color: st.color }} />
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] border-t border-[#F3F4F6] pt-2">
                <span>{b.period}</span>
                <span>₩{b.amount.toLocaleString()}</span>
                {b.paymentDate && <span>결제일: {b.paymentDate}</span>}
              </div>
              {b.autoParticipation && (
                <div className="mt-2 flex items-center gap-1 text-[9px] text-[#1B7A4B]">
                  <CheckCircle2 size={9} /> 참여 자동 생성 완료
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
