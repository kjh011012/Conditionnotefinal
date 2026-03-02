/**
 * V-P3. 식단 (참가자 보기)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ContextBar } from '../../components/ui/ContextBar';
import { ChevronLeft, AlertTriangle, Megaphone } from 'lucide-react';

const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
const mealColors: Record<string, string> = { '아침': '#F59E0B', '점심': '#0EA5E9', '저녁': '#7C3AED' };

const mealData: Record<string, { meal: string; name: string; allergens: string[] }[]> = {
  '월': [
    { meal: '아침', name: '현미밥 · 된장국 · 나물 3종', allergens: ['대두'] },
    { meal: '점심', name: '닭가슴살 샐러드 · 잡곡밥', allergens: [] },
    { meal: '저녁', name: '생선구이 · 미역국 · 계절 과일', allergens: ['생선'] },
  ],
  '화': [
    { meal: '아침', name: '오트밀 · 과일 요거트', allergens: ['유제품'] },
    { meal: '점심', name: '비빔밥 · 두부탕', allergens: ['대두', '계란'] },
    { meal: '저녁', name: '두부스테이크 · 잡곡밥', allergens: ['대두'] },
  ],
  '수': [
    { meal: '아침', name: '잡곡밥 · 시래기국 · 계란말이', allergens: ['계란'] },
    { meal: '점심', name: '닭가슴살 카레 · 현미밥', allergens: [] },
    { meal: '저녁', name: '연어구이 · 채소볶음 · 과일', allergens: ['생선'] },
  ],
  '목': [
    { meal: '아침', name: '토스트 · 스크램블 에그', allergens: ['계란', '밀'] },
    { meal: '점심', name: '불고기덮밥 · 콩나물국', allergens: ['대두'] },
    { meal: '저녁', name: '닭볶음탕 · 현미밥 · 김치', allergens: [] },
  ],
  '금': [
    { meal: '아침', name: '죽 · 반찬 2종', allergens: [] },
    { meal: '점심', name: '잔치국수 · 유부초밥', allergens: ['밀', '대두'] },
    { meal: '저녁', name: '삼겹살구이 · 쌈채소', allergens: [] },
  ],
  '토': [
    { meal: '아침', name: '샌드위치 · 우유 · 과일', allergens: ['밀', '유제품'] },
    { meal: '점심', name: '해물파전 · 잡곡밥', allergens: ['갑각류'] },
  ],
  '일': [],
};

export function VillageMeal() {
  const navigate = useNavigate();
  const { activeVillage } = useVillage();
  const [selectedDay, setSelectedDay] = useState('월');
  const meals = mealData[selectedDay] || [];
  const color = activeVillage?.primaryColor || '#1B7A4B';

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ContextBar />
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/village')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">이번 주 식단</h2>
      </div>

      {/* Notice banner */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 bg-[#FFF8ED] rounded-[10px] px-3 py-2">
          <Megaphone size={14} className="text-[#F59E0B] shrink-0" />
          <span className="text-[11px] text-[#92400E]">3/3(월) 저녁 메뉴가 생선구이로 변경되었습니다</span>
        </div>
      </div>

      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-1.5">
          {weekDays.map(d => (
            <button key={d} onClick={() => setSelectedDay(d)}
              className={`flex-1 py-2.5 rounded-[10px] text-[12px] transition-all ${selectedDay === d ? 'text-white' : 'bg-white text-[#6B7280]'}`}
              style={selectedDay === d ? { backgroundColor: color } : {}}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-2 pb-8 flex flex-col gap-3">
        {meals.length === 0 ? (
          <div className="bg-white rounded-[16px] p-8 text-center">
            <span className="text-[14px] text-[#9CA3AF]">식단 정보가 없습니다</span>
          </div>
        ) : meals.map((m, i) => (
          <div key={i} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: mealColors[m.meal] + '18' }}>
                <span className="text-[11px]" style={{ color: mealColors[m.meal] }}>{m.meal}</span>
              </div>
              <div className="flex-1">
                <span className="text-[13px] text-[#111827] block mb-1">{m.name}</span>
                {m.allergens.length > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={10} className="text-[#DC2626]" />
                    <span className="text-[10px] text-[#DC2626]">{m.allergens.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
