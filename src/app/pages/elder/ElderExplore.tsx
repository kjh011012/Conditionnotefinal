/**
 * 어르신 모드 — 캠프 찾기 (초간편)
 * 카드 2~3개만. 큰 글씨, 큰 버튼
 */
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';

export function ElderExplore() {
  const navigate = useNavigate();
  const { villages, programs } = useVillage();

  const upcomingPrograms = programs
    .filter(p => p.status !== 'completed')
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="px-5 pt-8 pb-5 bg-[#FFFBEB]">
        <h1 className="text-[26px] text-[#111827]">치유마을 찾기 🏕️</h1>
        <p className="text-[16px] text-[#6B7280] mt-1">가까운 치유마을을 찾아보세요</p>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-4">

        {/* 추천 프로그램 */}
        <h2 className="text-[20px] text-[#111827]">추천 프로그램</h2>

        {upcomingPrograms.map(p => {
          const v = villages.find(vl => vl.id === p.villageId);
          if (!v) return null;
          const days = Math.ceil((new Date(p.endDate).getTime() - new Date(p.startDate).getTime()) / 86400000);
          const spotsLeft = p.capacity - p.enrolled;
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/explore/program/${p.id}`)}
              className="w-full rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-left active:scale-[0.98] transition-transform"
            >
              <div className="h-[72px] flex items-center justify-center px-5" style={{ backgroundColor: v.secondaryColor }}>
                <span className="text-[36px] mr-3">{v.logo}</span>
                <div className="flex-1">
                  <span className="text-[18px] text-[#111827] block">{v.name}</span>
                  <span className="text-[14px] text-[#6B7280] flex items-center gap-1"><MapPin size={12} />{v.region}</span>
                </div>
              </div>
              <div className="bg-white p-5">
                <h3 className="text-[20px] text-[#111827] mb-2">{p.name}</h3>
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-center gap-2 text-[16px] text-[#374151]">
                    <Calendar size={16} className="text-[#6B7280]" />
                    <span>{p.startDate.slice(5).replace('-', '.')} ~ {p.endDate.slice(5).replace('-', '.')} ({days}일)</span>
                  </div>
                  <div className="flex items-center gap-4 text-[16px]">
                    <span className="text-[#111827]">₩{p.price.toLocaleString()}</span>
                    {spotsLeft <= 5 && <span className="text-[#DC2626]">잔여 {spotsLeft}명</span>}
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {p.purpose.map(pp => (
                    <span key={pp} className="text-[14px] px-3 py-1 rounded-full" style={{ backgroundColor: v.secondaryColor, color: v.primaryColor }}>
                      {pp}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-1 text-[18px]" style={{ color: v.primaryColor }}>
                  자세히 보기 <ChevronRight size={20} />
                </div>
              </div>
            </button>
          );
        })}

        {/* 도움 안내 */}
        <div className="bg-[#F7F8FA] rounded-[20px] p-5 text-center mt-2">
          <span className="text-[32px] block mb-2">📞</span>
          <p className="text-[18px] text-[#374151] mb-1">
            예약이 어려우시면
          </p>
          <p className="text-[16px] text-[#6B7280]">
            코디네이터에게 전화로 문의하세요
          </p>
        </div>
      </div>
    </div>
  );
}
