/**
 * V-P7. 참여 종료 (수료/완료) 화면
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { CheckCircle2, TrendingUp, Moon, Activity, Heart, Brain, ChevronRight, Sparkles } from 'lucide-react';

const changeSummary = [
  { icon: Moon, label: '수면', before: '5.2시간', after: '6.8시간', change: '+1.6시간', positive: true },
  { icon: Activity, label: '스트레스', before: '높음', after: '낮음', change: '2단계 개선', positive: true },
  { icon: Heart, label: '자율신경', before: '불안정', after: '안정', change: '정상화', positive: true },
  { icon: Brain, label: '인지활력', before: '58점', after: '74점', change: '+16점', positive: true },
];

export function VillageCompletion() {
  const navigate = useNavigate();
  const { activeVillage, activeProgram, exitVillage } = useVillage();
  const [phase, setPhase] = useState<'congrats' | 'report'>('congrats');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => { setTimeout(() => setFadeIn(true), 200); }, []);

  const color = activeVillage?.primaryColor || '#1B7A4B';
  const bg = activeVillage?.secondaryColor || '#E8F5EE';

  function handleReturn() {
    exitVillage();
    navigate('/');
  }

  if (phase === 'congrats') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-700"
        style={{ backgroundColor: bg }}>
        <div className={`flex flex-col items-center transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: color }}>
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <span className="text-[22px] text-[#111827] mb-2">수고하셨습니다!</span>
          <span className="text-[14px] text-[#6B7280] text-center mb-2" style={{ lineHeight: 1.6 }}>
            {activeVillage?.name} · {activeProgram?.name}
          </span>
          <span className="text-[13px] text-[#9CA3AF] text-center mb-8" style={{ lineHeight: 1.6 }}>
            참여 기간 동안의 변화를 정리해드렸어요
          </span>
          <button onClick={() => setPhase('report')}
            className="h-[52px] px-8 text-white rounded-[14px] text-[15px] flex items-center gap-2 active:opacity-90"
            style={{ backgroundColor: color }}>
            <Sparkles size={18} /> 변화 요약 보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-[430px] mx-auto px-5 pt-8 pb-8">
        <div className="text-center mb-6">
          <span className="text-[32px] block mb-2">{activeVillage?.logo}</span>
          <span className="text-[18px] text-[#111827] block">{activeProgram?.name} 변화 요약</span>
          <span className="text-[12px] text-[#9CA3AF]">{activeVillage?.name}</span>
        </div>

        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
          <span className="text-[14px] text-[#111827] block mb-4">참여 기간 동안의 변화</span>
          <div className="flex flex-col gap-4">
            {changeSummary.map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <c.icon size={18} style={{ color }} />
                </div>
                <div className="flex-1">
                  <span className="text-[12px] text-[#6B7280] block">{c.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#9CA3AF]">{c.before}</span>
                    <ChevronRight size={10} className="text-[#D1D5DB]" />
                    <span className="text-[13px] text-[#111827]">{c.after}</span>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: bg, color }}>
                  {c.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-6 text-center">
          <span className="text-[13px] text-[#374151] block mb-1">다음 참여도 기대해주세요</span>
          <span className="text-[11px] text-[#9CA3AF]">일상에서도 컨디션노트와 함께 건강을 관리하실 수 있어요</span>
        </div>

        <button onClick={handleReturn}
          className="w-full h-[52px] text-white rounded-[14px] text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          style={{ backgroundColor: color }}>
          일반 모드로 돌아가기
        </button>

        <p className="text-[10px] text-[#9CA3AF] text-center mt-4">
          본 요약은 참고용이며, 의료적 진단이나 처방이 아닙니다
        </p>
      </div>
    </div>
  );
}
