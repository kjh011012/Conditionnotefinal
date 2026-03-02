/**
 * N2. 캠프/프로그램 찾기 (탐색 홈)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { Search, MapPin, Calendar, ChevronRight, Star, SlidersHorizontal } from 'lucide-react';

const purposeFilters = ['전체', '수면', '리듬', '스트레스', '인지', '정서', '사회활동'];
const regionFilters = ['전체', '강원', '전남', '경북', '충북', '전북'];

export function ExplorePage() {
  const navigate = useNavigate();
  const { villages, programs } = useVillage();
  const [search, setSearch] = useState('');
  const [purpose, setPurpose] = useState('전체');
  const [tab, setTab] = useState<'village' | 'program'>('village');

  const filteredVillages = villages.filter(v => {
    if (search && !v.name.includes(search) && !v.region.includes(search)) return false;
    return true;
  });

  const filteredPrograms = programs.filter(p => {
    if (p.status === 'completed') return false;
    if (search) {
      const v = villages.find(v => v.id === p.villageId);
      if (!p.name.includes(search) && !(v?.name.includes(search))) return false;
    }
    if (purpose !== '전체' && !p.purpose.includes(purpose)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#EEF1F4] px-4 pt-4 pb-3">
        <h2 className="text-[18px] text-[#111827] mb-3">캠프 찾기</h2>
        <div className="flex items-center gap-2 bg-[#F7F8FA] rounded-[12px] px-3 h-[42px] mb-3">
          <Search size={16} className="text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="마을명, 지역, 프로그램 검색" className="flex-1 bg-transparent text-[13px] outline-none" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {purposeFilters.map(f => (
            <button key={f} onClick={() => setPurpose(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] ${purpose === f ? 'bg-[#1B7A4B] text-white' : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tab */}
      <div className="px-4 pt-3">
        <div className="flex bg-[#F3F4F6] rounded-[10px] p-0.5 mb-4">
          <button onClick={() => setTab('village')}
            className={`flex-1 py-2 rounded-[8px] text-[12px] ${tab === 'village' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'}`}>
            추천 마을
          </button>
          <button onClick={() => setTab('program')}
            className={`flex-1 py-2 rounded-[8px] text-[12px] ${tab === 'program' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'}`}>
            프로그램
          </button>
        </div>
      </div>

      {tab === 'village' ? (
        <div className="px-4 pb-8 flex flex-col gap-3">
          {filteredVillages.map(v => {
            const vPrograms = programs.filter(p => p.villageId === v.id && p.status !== 'completed');
            return (
              <button key={v.id} onClick={() => navigate(`/explore/village/${v.id}`)}
                className="w-full bg-white rounded-[16px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-left active:scale-[0.98] transition-transform">
                <div className="h-[80px] flex items-center justify-center" style={{ backgroundColor: v.secondaryColor }}>
                  <span className="text-[40px]">{v.logo}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[16px] text-[#111827]">{v.name}</span>
                    <span className="flex items-center gap-0.5 text-[11px] text-[#F59E0B]"><Star size={11} fill="#F59E0B" /> 4.8</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#6B7280] mb-2">
                    <MapPin size={10} /> {v.region}
                  </div>
                  <span className="text-[12px] text-[#6B7280] block mb-2">{v.description}</span>
                  <span className="text-[11px]" style={{ color: v.primaryColor }}>
                    진행중·예정 프로그램 {vPrograms.length}개 →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="px-4 pb-8 flex flex-col gap-3">
          {filteredPrograms.map(p => {
            const v = villages.find(v => v.id === p.villageId);
            if (!v) return null;
            return (
              <button key={p.id} onClick={() => navigate(`/explore/program/${p.id}`)}
                className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[22px]">{v.logo}</span>
                  <div className="flex-1">
                    <span className="text-[14px] text-[#111827] block">{p.name}</span>
                    <span className="text-[11px] text-[#6B7280]">{v.name}</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-[#E8F5EE] text-[#1B7A4B]' : 'bg-[#E0F2FE] text-[#0EA5E9]'}`}>
                    {p.status === 'active' ? '진행중' : '모집중'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#6B7280] mb-2">
                  <span className="flex items-center gap-0.5"><Calendar size={9} /> {p.startDate.slice(5)} ~ {p.endDate.slice(5)}</span>
                  <span>₩{p.price.toLocaleString()}</span>
                  <span>{p.enrolled}/{p.capacity}명</span>
                </div>
                <div className="flex gap-1">
                  {p.purpose.map(pp => (
                    <span key={pp} className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: v.secondaryColor, color: v.primaryColor }}>
                      {pp}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
