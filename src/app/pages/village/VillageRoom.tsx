/**
 * V-P4. 숙소 정보 (참가자 보기)
 */
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ContextBar } from '../../components/ui/ContextBar';
import { ChevronLeft, Building2, Phone, MessageSquare, Info } from 'lucide-react';

export function VillageRoom() {
  const navigate = useNavigate();
  const { activeVillage } = useVillage();
  const color = activeVillage?.primaryColor || '#1B7A4B';

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ContextBar />
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/village')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">숙소 정보</h2>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
        {/* My room */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderTop: `3px solid ${color}` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
              <Building2 size={22} style={{ color }} />
            </div>
            <div>
              <span className="text-[16px] text-[#111827] block">A동 2층 203호</span>
              <span className="text-[12px] text-[#6B7280]">2인실 · 화장실 포함</span>
            </div>
          </div>
          <div className="bg-[#F7F8FA] rounded-[12px] p-3 flex flex-col gap-2">
            {[
              { label: '입실', value: '2026.03.10 (월) 15:00' },
              { label: '퇴실', value: '2026.03.17 (월) 11:00' },
              { label: '동반 배정', value: '박순자님' },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-[11px] text-[#6B7280]">{r.label}</span>
                <span className="text-[12px] text-[#111827]">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-3">
            <Info size={14} className="text-[#6B7280]" />
            <span className="text-[13px] text-[#111827]">이용 안내</span>
          </div>
          <ul className="flex flex-col gap-2 text-[12px] text-[#374151]" style={{ lineHeight: 1.6 }}>
            <li className="flex gap-2"><span className="text-[#9CA3AF]">·</span> 실내 흡연 금지</li>
            <li className="flex gap-2"><span className="text-[#9CA3AF]">·</span> 22:00 이후 정숙</li>
            <li className="flex gap-2"><span className="text-[#9CA3AF]">·</span> 객실 내 음식물 반입 자제</li>
            <li className="flex gap-2"><span className="text-[#9CA3AF]">·</span> 비품 파손 시 코디네이터에게 문의</li>
            <li className="flex gap-2"><span className="text-[#9CA3AF]">·</span> 퇴실 시 비품 확인 후 키 반납</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 h-[48px] bg-white border border-[#E5E7EB] rounded-[12px] text-[13px] text-[#374151] flex items-center justify-center gap-2 active:bg-[#F7F8FA]">
            <Phone size={16} /> 코디 연락
          </button>
          <button onClick={() => navigate('/village/inquiry')}
            className="flex-1 h-[48px] bg-white border border-[#E5E7EB] rounded-[12px] text-[13px] text-[#374151] flex items-center justify-center gap-2 active:bg-[#F7F8FA]">
            <MessageSquare size={16} /> 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
