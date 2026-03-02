import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Stethoscope,
  Heart,
  Brain,
  Puzzle,
  Sparkles,
  Watch,
  Wifi,
  ChevronRight,
} from 'lucide-react';

const checkItems = [
  {
    id: 'stress',
    icon: Stethoscope,
    title: '측정 (기기/워치)',
    desc: '혈압, 스트레스, 자율신경 점검',
    time: '현장 기기 연동',
    path: '/check/stress',
    color: '#FF8A3D',
    bg: '#FFF1E8',
  },
  {
    id: 'mind',
    icon: Heart,
    title: '마음 체크',
    desc: '기분, 불안, 의욕 간단 체크',
    time: '약 2분',
    path: '/check/mind',
    color: '#1B7A4B',
    bg: '#E8F5EE',
  },
  {
    id: 'brain',
    icon: Brain,
    title: '두뇌 놀이',
    desc: '기억, 집중, 반응 놀이형 체크',
    time: '약 5분',
    path: '/check/brain',
    color: '#7C3AED',
    bg: '#F3E8FF',
  },
  {
    id: 'play',
    icon: Puzzle,
    title: '두뇌·마음 놀이체크',
    desc: '진행자와 함께하는 카드 놀이 점검',
    time: '약 15분',
    path: '/check/play',
    color: '#0EA5E9',
    bg: '#E0F2FE',
  },
  {
    id: 'recommend',
    icon: Sparkles,
    title: '오늘 추천',
    desc: '운동 · 명상 · 식단 추천 보기',
    time: '일상 루틴',
    path: '/check/recommend',
    color: '#FF8A3D',
    bg: '#FFF1E8',
  },
];

export function CheckHub() {
  const navigate = useNavigate();
  const [completed] = useState<string[]>(['stress']);

  const totalItems = checkItems.length - 1; // exclude recommend from progress
  const completedCount = completed.filter(c => c !== 'recommend').length;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-3 pb-4 bg-white">
        <h1 className="text-[22px] text-[#111827] mb-2">오늘 체크</h1>
        {/* Progress */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-2 bg-[#EEF1F4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B7A4B] rounded-full transition-all"
              style={{ width: `${(completedCount / totalItems) * 100}%` }}
            />
          </div>
          <span className="text-[13px] text-[#6B7280]">
            {totalItems}개 중 {completedCount}개 완료
          </span>
        </div>
        {/* Device status */}
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5EE] text-[#1B7A4B] px-3 py-1 rounded-full text-[12px]">
            <Watch size={14} /> 워치 연결됨
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#FFF1E8] text-[#FF8A3D] px-3 py-1 rounded-full text-[12px]">
            <Wifi size={14} /> 현장기기 대기
          </span>
        </div>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-3">
        {checkItems.map(item => {
          const done = completed.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-4 text-left transition-all ${
                done ? 'opacity-60' : ''
              }`}
            >
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[16px] text-[#111827]">{item.title}</span>
                  {done && (
                    <span className="bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full text-[11px]">완료</span>
                  )}
                </div>
                <p className="text-[13px] text-[#6B7280]">{item.desc}</p>
                <span className="text-[12px] text-[#9CA3AF]">{item.time}</span>
              </div>
              <ChevronRight size={20} className="text-[#D1D5DB]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
