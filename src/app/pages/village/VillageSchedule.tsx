/**
 * V-P2. 프로그램 일정 (참가자)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ContextBar } from '../../components/ui/ContextBar';
import { ChevronLeft, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
const scheduleByDay: Record<string, { time: string; name: string; place: string; prep: string; duration: string }[]> = {
  '월': [
    { time: '07:30', name: '아침 명상', place: '명상실', prep: '매트', duration: '30분' },
    { time: '09:00', name: '숲길 걷기', place: '치유숲', prep: '편한 신발', duration: '60분' },
    { time: '14:00', name: '자연식 요리', place: '쿠킹홀', prep: '앞치마', duration: '90분' },
  ],
  '화': [
    { time: '07:30', name: '아침 명상', place: '명상실', prep: '매트', duration: '30분' },
    { time: '11:00', name: '치유 요가', place: '다목적실', prep: '요가매트', duration: '50분' },
    { time: '16:00', name: '숲속 대화', place: '쉼터', prep: '-', duration: '60분' },
  ],
  '수': [
    { time: '07:30', name: '아침 명상', place: '명상실', prep: '매트', duration: '30분' },
    { time: '09:00', name: '숲길 걷기', place: '치유숲', prep: '편한 신발', duration: '60분' },
    { time: '14:00', name: '두뇌 활동', place: '교육실', prep: '필기구', duration: '40분' },
  ],
  '목': [
    { time: '07:30', name: '아침 명상', place: '명상실', prep: '매트', duration: '30분' },
    { time: '11:00', name: '치유 요가', place: '다목적실', prep: '요가매트', duration: '50분' },
    { time: '14:00', name: '원예 치유', place: '정원', prep: '장갑', duration: '60분' },
  ],
  '금': [
    { time: '07:30', name: '아침 명상', place: '명상실', prep: '매트', duration: '30분' },
    { time: '09:00', name: '숲길 걷기', place: '치유숲', prep: '편한 신발', duration: '60분' },
  ],
  '토': [
    { time: '09:00', name: '자유 산책', place: '마을 주변', prep: '-', duration: '자유' },
  ],
  '일': [],
};

export function VillageSchedule() {
  const navigate = useNavigate();
  const { activeVillage } = useVillage();
  const [selectedDay, setSelectedDay] = useState('월');
  const sessions = scheduleByDay[selectedDay] || [];
  const color = activeVillage?.primaryColor || '#1B7A4B';

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ContextBar />
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/village')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">프로그램 일정</h2>
      </div>

      {/* Day selector */}
      <div className="px-4 pt-4 pb-2">
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
        {sessions.length === 0 ? (
          <div className="bg-white rounded-[16px] p-8 text-center">
            <span className="text-[14px] text-[#9CA3AF]">자유 일정입니다</span>
          </div>
        ) : sessions.map((s, i) => (
          <div key={i} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border-l-[3px]"
            style={{ borderColor: color }}>
            <div className="flex items-start gap-3">
              <div className="text-center shrink-0">
                <span className="text-[16px] text-[#111827] block">{s.time}</span>
                <span className="text-[10px] text-[#9CA3AF]">{s.duration}</span>
              </div>
              <div className="flex-1">
                <span className="text-[14px] text-[#111827] block mb-1">{s.name}</span>
                <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                  <span className="flex items-center gap-0.5"><MapPin size={9} /> {s.place}</span>
                  {s.prep !== '-' && <span>준비물: {s.prep}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
