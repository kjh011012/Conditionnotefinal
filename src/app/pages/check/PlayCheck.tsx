/**
 * P-Check-Play (놀이체크 / 진행자)
 * 참가자 결과요약:
 *   - 두뇌 컨디션 지수(0~100)
 *   - 정서 활력 지수(0~100)
 *   - 영역 분해 막대(각 4개)
 *   - "오늘 추천 1개 + 캠프기간 추천 3개"
 * 코디네이터 입력: 30초 내 완료 가능한 Stepper 중심
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, QrCode, Puzzle, Brain, Heart, Sparkles,
  ChevronRight, Info, TrendingUp, TrendingDown, Minus,
  Check, ExternalLink,
} from 'lucide-react';
import { StatusChip } from '../../components/ui/StatusChip';
import { StepperInput } from '../../components/ui/StepperInput';

type Step = 'intro' | 'qr' | 'coordinator-input' | 'result' | 'plan';

const brainAreas = [
  { label: '기억 (Memory)', score: 72, avg: 70, color: '#22C55E' },
  { label: '집중 (Attention)', score: 58, avg: 64, color: '#0EA5E9' },
  { label: '전환 (Flexibility)', score: 65, avg: 62, color: '#F59E0B' },
  { label: '일관성 (Consistency)', score: 76, avg: 72, color: '#7C3AED' },
];

const emotionAreas = [
  { label: '동기 (Motivation)', score: 78, avg: 74, color: '#22C55E' },
  { label: '지속 (Persistence)', score: 72, avg: 70, color: '#0EA5E9' },
  { label: '속도 (Speed)', score: 68, avg: 72, color: '#F59E0B' },
  { label: '리듬 (Rhythm)', score: 80, avg: 76, color: '#1B7A4B' },
];

export function PlayCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('intro');

  // Coordinator stepper values
  const [memoryScore, setMemoryScore] = useState(7);
  const [attentionScore, setAttentionScore] = useState(6);
  const [flexScore, setFlexScore] = useState(7);
  const [consistScore, setConsistScore] = useState(8);
  const [moodScore, setMoodScore] = useState(7);
  const [energyScore, setEnergyScore] = useState(6);

  const brainTotal = Math.round(brainAreas.reduce((s, a) => s + a.score, 0) / brainAreas.length);
  const emotionTotal = Math.round(emotionAreas.reduce((s, a) => s + a.score, 0) / emotionAreas.length);

  const getConditionLabel = (score: number) => {
    if (score >= 75) return { label: '좋음', status: 'green' as const };
    if (score >= 55) return { label: '보통', status: 'yellow' as const };
    return { label: '워밍업 필요', status: 'orange' as const };
  };

  const brainCondition = getConditionLabel(brainTotal);
  const emotionCondition = getConditionLabel(emotionTotal);

  const AreaBar = ({ label, score, avg, color }: { label: string; score: number; avg: number; color: string }) => {
    const diff = score - avg;
    return (
      <div className="mb-3 last:mb-0">
        <div className="flex justify-between text-[12px] mb-1">
          <span className="text-[#374151]">{label}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#111827]">{score}</span>
            <span className="text-[#9CA3AF] text-[10px]">(7일 {avg})</span>
            {diff > 0 ? (
              <TrendingUp size={10} className="text-[#22C55E]" />
            ) : diff < 0 ? (
              <TrendingDown size={10} className="text-[#F59E0B]" />
            ) : (
              <Minus size={10} className="text-[#9CA3AF]" />
            )}
          </div>
        </div>
        <div className="h-2.5 bg-[#EEF1F4] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate('/check')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">두뇌·마음 놀이체크</h2>
      </div>

      {/* ───── INTRO ───── */}
      {step === 'intro' && (
        <div className="px-4 pt-5 pb-8">
          <p className="text-[14px] text-[#6B7280] mb-5">
            진단이 아니라, 오늘 컨디션을 놀이로 확인해요.
          </p>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { icon: Brain, title: '두뇌', desc: '기억 · 집중 · 전환 · 일관성', color: '#7C3AED', bg: '#F3E8FF' },
              { icon: Heart, title: '마음', desc: '동기 · 지속 · 속도 · 리듬', color: '#1B7A4B', bg: '#E8F5EE' },
              { icon: Sparkles, title: '맞춤 활동', desc: '결과 기반 오늘 + 캠프 추천', color: '#FF8A3D', bg: '#FFF1E8' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <div>
                  <span className="text-[15px] text-[#111827] block">{item.title}</span>
                  <span className="text-[13px] text-[#6B7280]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('qr')}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mb-3"
          >
            진행자와 시작하기
          </button>
          <button
            onClick={() => setStep('coordinator-input')}
            className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px]"
          >
            코디네이터 직접 입력
          </button>
        </div>
      )}

      {/* ───── QR ───── */}
      {step === 'qr' && (
        <div className="px-4 pt-8 pb-8 flex flex-col items-center">
          <div className="w-[200px] h-[200px] bg-white rounded-[16px] flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <QrCode size={140} className="text-[#111827]" />
          </div>
          <p className="text-[16px] text-[#111827] mb-2 text-center">
            이 화면을 진행자에게 보여주세요
          </p>
          <p className="text-[13px] text-[#6B7280] mb-1">참가자 ID: KYS-***42</p>
          <p className="text-[12px] text-[#9CA3AF] mt-4 text-center">
            점수는 '진단'이 아니라 상태 점검용입니다.
          </p>

          <button
            onClick={() => setStep('result')}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mt-8"
          >
            결과 확인하기
          </button>
        </div>
      )}

      {/* ───── COORDINATOR INPUT (30초 Stepper) ───── */}
      {step === 'coordinator-input' && (
        <div className="px-4 pt-5 pb-8">
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Puzzle size={16} className="text-[#FF8A3D]" />
              <span className="text-[16px] text-[#111827]">점수 빠른 입력</span>
            </div>
            <p className="text-[12px] text-[#9CA3AF] mb-4">
              관찰 결과를 1~10 Stepper로 입력 (30초 이내 완료)
            </p>

            <div className="space-y-4">
              <div>
                <span className="text-[13px] text-[#6B7280] block mb-1.5">🃏 기억</span>
                <StepperInput value={memoryScore} onChange={setMemoryScore} min={1} max={10} />
              </div>
              <div>
                <span className="text-[13px] text-[#6B7280] block mb-1.5">🎨 집중</span>
                <StepperInput value={attentionScore} onChange={setAttentionScore} min={1} max={10} />
              </div>
              <div>
                <span className="text-[13px] text-[#6B7280] block mb-1.5">🔢 전환</span>
                <StepperInput value={flexScore} onChange={setFlexScore} min={1} max={10} />
              </div>
              <div>
                <span className="text-[13px] text-[#6B7280] block mb-1.5">🗺️ 일관성</span>
                <StepperInput value={consistScore} onChange={setConsistScore} min={1} max={10} />
              </div>

              <div className="border-t border-[#EEF1F4] pt-4">
                <span className="text-[14px] text-[#111827] block mb-3">정서 관찰</span>
                <div>
                  <span className="text-[13px] text-[#6B7280] block mb-1.5">😊 정서 활력</span>
                  <StepperInput value={moodScore} onChange={setMoodScore} min={1} max={10} />
                </div>
                <div className="mt-4">
                  <span className="text-[13px] text-[#6B7280] block mb-1.5">💪 참여 에너지</span>
                  <StepperInput value={energyScore} onChange={setEnergyScore} min={1} max={10} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep('result')}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2"
          >
            <Check size={18} /> 입력 완료 · 결과 보기
          </button>
        </div>
      )}

      {/* ───── RESULT ───── */}
      {step === 'result' && (
        <div className="px-4 pt-5 pb-8">
          <h3 className="text-[20px] text-[#111827] mb-4">오늘의 두뇌·마음 컨디션</h3>

          {/* Two main scores */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-1.5 mb-2">
                <Brain size={14} className="text-[#7C3AED]" />
                <span className="text-[12px] text-[#6B7280]">두뇌 컨디션</span>
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-[32px] text-[#7C3AED]" style={{ lineHeight: 1 }}>{brainTotal}</span>
                <span className="text-[12px] text-[#9CA3AF] mb-1">/100</span>
              </div>
              <StatusChip status={brainCondition.status} label={brainCondition.label} />
              {/* Mini gauge */}
              <div className="h-2 bg-[#EEF1F4] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: `${brainTotal}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-1.5 mb-2">
                <Heart size={14} className="text-[#1B7A4B]" />
                <span className="text-[12px] text-[#6B7280]">정서 활력</span>
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-[32px] text-[#1B7A4B]" style={{ lineHeight: 1 }}>{emotionTotal}</span>
                <span className="text-[12px] text-[#9CA3AF] mb-1">/100</span>
              </div>
              <StatusChip status={emotionCondition.status} label={emotionCondition.label} />
              <div className="h-2 bg-[#EEF1F4] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#1B7A4B] rounded-full" style={{ width: `${emotionTotal}%` }} />
              </div>
            </div>
          </div>

          {/* Brain breakdown (4 bars) */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h4 className="text-[14px] text-[#111827] mb-3">두뇌 영역 분해</h4>
            {brainAreas.map(area => (
              <AreaBar key={area.label} {...area} />
            ))}
          </div>

          {/* Emotion breakdown (4 bars) */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h4 className="text-[14px] text-[#111827] mb-3">정서 영역 분해</h4>
            {emotionAreas.map(area => (
              <AreaBar key={area.label} {...area} />
            ))}
          </div>

          {/* AI Story */}
          <div className="bg-[#FFF1E8] rounded-[16px] p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#FF8A3D]" />
              <span className="text-[14px] text-[#EA580C]">컨디션 해설</span>
            </div>
            <p className="text-[13px] text-[#374151]">
              수면이 짧아 집중 게임이 어려웠을 수 있어요. 전환 속도는 보통 수준이지만, 휴식 후 개선될 수 있어요. 정서 리듬은 안정적이에요.
            </p>
          </div>

          {/* Recommendations: 오늘 1개 + 캠프기간 3개 */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            {/* Today */}
            <div className="mb-4">
              <span className="text-[12px] text-[#FF8A3D] block mb-2">오늘 바로 시작</span>
              <button
                onClick={() => setStep('plan')}
                className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2"
              >
                숲길 산책 20분 <ChevronRight size={16} />
              </button>
            </div>

            {/* Camp period */}
            <span className="text-[12px] text-[#7C3AED] block mb-2">캠프 기간 추천</span>
            <div className="flex flex-col gap-2">
              {[
                { label: '두뇌(기억) 놀이 5분', reason: '기억 게임에서 혼동이 있어 반복 놀이가 도움돼요.', color: 'bg-[#F3E8FF] text-[#7C3AED]' },
                { label: '공동체 프로그램 참여', reason: '사회적 교류가 정서 활력에 긍정적이에요.', color: 'bg-[#E8F5EE] text-[#1B7A4B]' },
                { label: '저녁 수면 루틴 (명상 10분)', reason: '수면 부족이 집중력에 영향을 줄 수 있어요.', color: 'bg-[#E8F5EE] text-[#1B7A4B]' },
              ].map((item, i) => (
                <div key={i} className="bg-[#F7F8FA] rounded-[12px] p-3">
                  <span className="text-[14px] text-[#111827] block mb-0.5">{item.label}</span>
                  <span className="text-[11px] text-[#6B7280]">{item.reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={() => navigate('/daily/youtube-query')}
              className="w-full h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-1.5"
            >
              10분 호흡 명상 (YouTube) <ExternalLink size={12} />
            </button>
            <button
              onClick={() => setStep('hub' as any)}
              className="w-full h-[44px] bg-[#F3E8FF] text-[#7C3AED] rounded-[14px] text-[14px]"
            >
              두뇌 워밍업 1회 더
            </button>
          </div>

          <p className="text-[11px] text-[#9CA3AF] text-center pb-4">
            이 결과는 의료 진단이 아닙니다. 변화 추세를 보기 위한 생활 점검입니다.
          </p>
        </div>
      )}

      {/* ───── PLAN ───── */}
      {step === 'plan' && (
        <div className="px-4 pt-5 pb-8">
          <h3 className="text-[18px] text-[#111827] mb-4">맞춤 예방 활동</h3>

          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <span className="text-[12px] text-[#FF8A3D] block mb-2">오늘 바로 할 것</span>
            <button
              onClick={() => navigate('/daily/plan')}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
            >
              숲길 산책 20분 시작
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { title: '두뇌(기억) 놀이 5분', why: '기억 게임에서 혼동이 있어 반복 놀이가 도움돼요.' },
              { title: '공동체 프로그램 참여', why: '사회적 교류가 정서 활력에 긍정적이에요.' },
              { title: '저녁 수면 루틴 (명상 10분)', why: '수면 부족이 집중력에 영향을 줄 수 있어요.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <span className="text-[15px] text-[#111827] block mb-1">{item.title}</span>
                <span className="text-[12px] text-[#6B7280]">{item.why}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/check')}
            className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] mt-5"
          >
            체크 화면으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}