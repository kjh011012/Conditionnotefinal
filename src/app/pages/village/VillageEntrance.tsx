/**
 * S2. 마을 입장 트랜지션 화면
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';

export function VillageEntrance() {
  const navigate = useNavigate();
  const { activeVillage, activeProgram, getDaysRemaining } = useVillage();
  const [phase, setPhase] = useState<'enter' | 'welcome' | 'done'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('welcome'), 800);
    const t2 = setTimeout(() => setPhase('done'), 2200);
    const t3 = setTimeout(() => navigate('/village'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  if (!activeVillage || !activeProgram) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-700"
      style={{ backgroundColor: phase === 'enter' ? '#F7F8FA' : activeVillage.secondaryColor }}>

      <div className={`transition-all duration-700 flex flex-col items-center ${phase === 'enter' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <span className="text-[64px] mb-4">{activeVillage.logo}</span>
        <h1 className="text-[22px] text-[#111827] mb-2">{activeVillage.name}</h1>
        <p className="text-[14px] text-[#6B7280] text-center mb-6" style={{ lineHeight: 1.6 }}>
          {activeProgram.name}에 오신 것을 환영합니다
        </p>

        <div className={`transition-all duration-500 delay-300 ${phase === 'welcome' || phase === 'done' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white/80 rounded-[16px] px-6 py-4 text-center backdrop-blur-sm">
            <span className="text-[13px] text-[#374151] block mb-1">
              오늘의 일정이 준비되어 있어요
            </span>
            <span className="text-[12px] px-3 py-1 rounded-full text-white inline-block mt-1"
              style={{ backgroundColor: activeVillage.primaryColor }}>
              남은 일정 D-{getDaysRemaining()}
            </span>
          </div>
        </div>
      </div>

      <div className={`mt-12 transition-all duration-500 ${phase === 'done' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeVillage.primaryColor, animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
