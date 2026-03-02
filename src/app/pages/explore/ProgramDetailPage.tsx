/**
 * N4. 프로그램 상세 (예약/결제 진입)
 */
import { useNavigate, useParams } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import {
  ChevronLeft, Calendar, MapPin, Users, Clock, CreditCard,
  Check, AlertCircle, ChevronRight,
} from 'lucide-react';

export function ProgramDetailPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { getProgram, getVillage } = useVillage();
  const p = getProgram(programId || '');
  const v = p ? getVillage(p.villageId) : null;

  if (!p || !v) return <div className="p-8 text-center text-[#9CA3AF]">프로그램 정보를 찾을 수 없습니다</div>;

  const days = Math.ceil((new Date(p.endDate).getTime() - new Date(p.startDate).getTime()) / 86400000);
  const spotsLeft = p.capacity - p.enrolled;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Hero */}
      <div className="relative h-[160px] flex items-end px-4 pb-4" style={{ backgroundColor: v.secondaryColor }}>
        <button onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <div>
          <span className="text-[28px] block mb-1">{v.logo}</span>
          <span className="text-[11px] text-[#6B7280]">{v.name}</span>
        </div>
      </div>

      <div className="px-4 pt-5 pb-32">
        <h1 className="text-[20px] text-[#111827] mb-3">{p.name}</h1>

        {/* Key info */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
          {[
            { icon: Calendar, label: '기간', value: `${p.startDate} ~ ${p.endDate} (${days}일)` },
            { icon: MapPin, label: '장소', value: v.region },
            { icon: Users, label: '정원', value: `${p.capacity}명 (잔여 ${spotsLeft}명)` },
            { icon: CreditCard, label: '참가비', value: `₩${p.price.toLocaleString()}` },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0">
              <row.icon size={15} className="text-[#9CA3AF] shrink-0" />
              <span className="text-[12px] text-[#6B7280] w-16">{row.label}</span>
              <span className="text-[13px] text-[#111827] flex-1">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Purpose */}
        <div className="mb-4">
          <span className="text-[13px] text-[#111827] block mb-2">프로그램 목적</span>
          <div className="flex gap-1.5">
            {p.purpose.map(pp => (
              <span key={pp} className="text-[11px] px-3 py-1.5 rounded-full" style={{ backgroundColor: v.secondaryColor, color: v.primaryColor }}>
                {pp}
              </span>
            ))}
          </div>
        </div>

        {/* Includes */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
          <span className="text-[13px] text-[#111827] block mb-2">포함 사항</span>
          {p.includes.map(inc => (
            <div key={inc} className="flex items-center gap-2 py-1.5">
              <Check size={14} style={{ color: v.primaryColor }} />
              <span className="text-[12px] text-[#374151]">{inc}</span>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
          <span className="text-[13px] text-[#111827] block mb-2">유의사항</span>
          <ul className="text-[12px] text-[#6B7280] flex flex-col gap-1.5" style={{ lineHeight: 1.6 }}>
            <li>· 편한 운동화 지참 권장</li>
            <li>· 개인 세면도구 준비</li>
            <li>· 건강 상태 사전 설문 작성 필요</li>
          </ul>
        </div>

        {/* Cancellation */}
        <div className="bg-[#FFF8ED] rounded-[14px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-[#F59E0B]" />
            <span className="text-[12px] text-[#92400E]">취소/환불 정책</span>
          </div>
          <ul className="text-[11px] text-[#78716C] flex flex-col gap-1" style={{ lineHeight: 1.5 }}>
            <li>· 시작 7일 전: 전액 환불</li>
            <li>· 시작 3~6일 전: 50% 환불</li>
            <li>· 시작 2일 이내: 환불 불가</li>
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#EEF1F4] px-4 py-4 z-30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[18px] text-[#111827]">₩{p.price.toLocaleString()}</span>
            <span className="text-[11px] text-[#9CA3AF] block">{days}일 · {p.includes.join(' · ')}</span>
          </div>
          {spotsLeft <= 5 && (
            <span className="text-[10px] px-2 py-0.5 bg-[#FEF2F2] text-[#DC2626] rounded-full">잔여 {spotsLeft}명</span>
          )}
        </div>
        <button onClick={() => navigate(`/explore/booking/${p.id}`)}
          className="w-full h-[52px] text-white rounded-[14px] text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          style={{ backgroundColor: v.primaryColor }}>
          예약하기
        </button>
      </div>
    </div>
  );
}
