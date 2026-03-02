/**
 * N3. 마을 상세 (소개)
 */
import { useNavigate, useParams } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ChevronLeft, MapPin, Star, Calendar, ChevronRight, Phone } from 'lucide-react';

export function VillageDetailPage() {
  const navigate = useNavigate();
  const { villageId } = useParams();
  const { getVillage, programs } = useVillage();
  const v = getVillage(villageId || '');

  if (!v) return <div className="p-8 text-center text-[#9CA3AF]">마을 정보를 찾을 수 없습니다</div>;

  const vPrograms = programs.filter(p => p.villageId === v.id && p.status !== 'completed');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Hero */}
      <div className="relative h-[180px] flex items-center justify-center" style={{ backgroundColor: v.secondaryColor }}>
        <button onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <span className="text-[72px]">{v.logo}</span>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[22px] text-[#111827]">{v.name}</h1>
            <span className="flex items-center gap-0.5 text-[12px] text-[#F59E0B]"><Star size={13} fill="#F59E0B" /> 4.8</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#6B7280] mb-3">
            <MapPin size={12} /> {v.region}
          </div>
          <p className="text-[13px] text-[#374151]" style={{ lineHeight: 1.7 }}>
            {v.description}. 전문 코디네이터와 함께하는 체계적인 건강 관리 프로그램을 제공합니다. 
            자연 환경 속에서 수면, 스트레스, 생체리듬 개선을 위한 다양한 활동을 경험하실 수 있습니다.
          </p>
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
          <span className="text-[14px] text-[#111827] block mb-3">시설 · 특징</span>
          <div className="flex flex-wrap gap-2">
            {['자연 치유숲', '명상실', '다목적홀', '쿠킹룸', '정원 산책로', '숙소 2인/4인실'].map(f => (
              <span key={f} className="text-[11px] px-3 py-1.5 rounded-full" style={{ backgroundColor: v.secondaryColor, color: v.primaryColor }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="mb-4">
          <span className="text-[14px] text-[#111827] block mb-3">운영 프로그램</span>
          <div className="flex flex-col gap-2">
            {vPrograms.map(p => (
              <button key={p.id} onClick={() => navigate(`/explore/program/${p.id}`)}
                className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left flex items-center gap-3 active:scale-[0.98] transition-transform">
                <div className="flex-1">
                  <span className="text-[14px] text-[#111827] block">{p.name}</span>
                  <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mt-1">
                    <span><Calendar size={9} className="inline" /> {p.startDate.slice(5)} ~ {p.endDate.slice(5)}</span>
                    <span>₩{p.price.toLocaleString()}</span>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-[#E8F5EE] text-[#1B7A4B]' : 'bg-[#E0F2FE] text-[#0EA5E9]'}`}>
                  {p.status === 'active' ? '진행중' : '모집중'}
                </span>
                <ChevronRight size={16} className="text-[#D1D5DB]" />
              </button>
            ))}
          </div>
        </div>

        <button className="w-full h-[48px] border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151] flex items-center justify-center gap-2 active:bg-[#F7F8FA]">
          <Phone size={16} /> 문의하기
        </button>
      </div>
    </div>
  );
}
