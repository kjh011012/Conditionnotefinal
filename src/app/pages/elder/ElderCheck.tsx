/**
 * 어르신 모드 — 체크 (심층 + 직관)
 * 6단계: 기분 → 몸 → 수면 → 식사 → 어울림 → 두뇌
 * 각 단계: 이모지 3선택 + 보조질문(슬라이더/추가선택)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

/* ── 6단계 정의 ── */
interface StepConfig {
  key: string;
  title: string;
  subtitle: string;
  emoji: string;
  options: { emoji: string; label: string; value: string; color: string; bg: string; score: number }[];
  followUp?: {
    question: string;
    type: 'slider' | 'select';
    options?: { emoji: string; label: string; value: string }[];
    sliderConfig?: { min: number; max: number; unit: string; labels: string[] };
  };
}

const steps: StepConfig[] = [
  {
    key: 'mood',
    title: '오늘 기분이 어떠세요?',
    subtitle: '하나만 눌러주세요',
    emoji: '😊',
    options: [
      { emoji: '😊', label: '좋아요', value: 'good', color: '#1B7A4B', bg: '#E8F5EE', score: 90 },
      { emoji: '😐', label: '보통이에요', value: 'normal', color: '#F59E0B', bg: '#FEF3C7', score: 60 },
      { emoji: '😔', label: '안 좋아요', value: 'bad', color: '#DC2626', bg: '#FEF2F2', score: 30 },
    ],
    followUp: {
      question: '기분이 안 좋다면, 어떤 느낌인가요?',
      type: 'select',
      options: [
        { emoji: '😢', label: '슬퍼요', value: 'sad' },
        { emoji: '😤', label: '짜증나요', value: 'irritated' },
        { emoji: '😰', label: '불안해요', value: 'anxious' },
        { emoji: '😞', label: '외로워요', value: 'lonely' },
        { emoji: '🤷', label: '잘 모르겠어요', value: 'unknown' },
      ],
    },
  },
  {
    key: 'body',
    title: '몸 상태는 어떠세요?',
    subtitle: '전체적인 느낌을 골라주세요',
    emoji: '💪',
    options: [
      { emoji: '💪', label: '괜찮아요', value: 'good', color: '#1B7A4B', bg: '#E8F5EE', score: 90 },
      { emoji: '🤕', label: '좀 불편해요', value: 'discomfort', color: '#F59E0B', bg: '#FEF3C7', score: 55 },
      { emoji: '😫', label: '많이 힘들어요', value: 'bad', color: '#DC2626', bg: '#FEF2F2', score: 25 },
    ],
    followUp: {
      question: '어디가 불편하세요?',
      type: 'select',
      options: [
        { emoji: '🦵', label: '다리/무릎', value: 'leg' },
        { emoji: '🤚', label: '어깨/팔', value: 'shoulder' },
        { emoji: '😵‍💫', label: '머리/어지러움', value: 'head' },
        { emoji: '🫁', label: '가슴/숨', value: 'chest' },
        { emoji: '🤢', label: '배/소화', value: 'stomach' },
        { emoji: '📍', label: '기타', value: 'other' },
      ],
    },
  },
  {
    key: 'sleep',
    title: '어젯밤 잠은 잘 주무셨나요?',
    subtitle: '수면 상태를 알려주세요',
    emoji: '🌙',
    options: [
      { emoji: '😴', label: '잘 잤어요', value: 'good', color: '#1B7A4B', bg: '#E8F5EE', score: 90 },
      { emoji: '😪', label: '좀 부족해요', value: 'normal', color: '#F59E0B', bg: '#FEF3C7', score: 55 },
      { emoji: '😵', label: '못 잤어요', value: 'bad', color: '#DC2626', bg: '#FEF2F2', score: 25 },
    ],
    followUp: {
      question: '몇 시간 정도 주무셨나요?',
      type: 'slider',
      sliderConfig: { min: 2, max: 10, unit: '시간', labels: ['2시간', '4시간', '6시간', '8시간', '10시간'] },
    },
  },
  {
    key: 'appetite',
    title: '식사는 잘 하셨나요?',
    subtitle: '오늘 식사 상태를 알려주세요',
    emoji: '🍚',
    options: [
      { emoji: '😋', label: '맛있게 먹었어요', value: 'good', color: '#1B7A4B', bg: '#E8F5EE', score: 90 },
      { emoji: '🤏', label: '조금 먹었어요', value: 'little', color: '#F59E0B', bg: '#FEF3C7', score: 55 },
      { emoji: '🚫', label: '못 먹었어요', value: 'none', color: '#DC2626', bg: '#FEF2F2', score: 20 },
    ],
    followUp: {
      question: '식사가 어려웠다면, 이유가 있나요?',
      type: 'select',
      options: [
        { emoji: '🤢', label: '입맛이 없어요', value: 'no_appetite' },
        { emoji: '😖', label: '소화가 안 돼요', value: 'indigestion' },
        { emoji: '🦷', label: '씹기 불편해요', value: 'chewing' },
        { emoji: '🤷', label: '특별한 이유 없어요', value: 'none' },
      ],
    },
  },
  {
    key: 'social',
    title: '다른 분들과 어울리셨나요?',
    subtitle: '사람들과의 교류를 알려주세요',
    emoji: '🤝',
    options: [
      { emoji: '🥰', label: '즐겁게 어울렸어요', value: 'good', color: '#1B7A4B', bg: '#E8F5EE', score: 90 },
      { emoji: '🙂', label: '조금 이야기했어요', value: 'some', color: '#F59E0B', bg: '#FEF3C7', score: 60 },
      { emoji: '🏠', label: '혼자 있었어요', value: 'alone', color: '#6B7280', bg: '#F3F4F6', score: 35 },
    ],
  },
  {
    key: 'cognitive',
    title: '머리가 맑으세요?',
    subtitle: '오늘 집중력/기억력은 어떠세요',
    emoji: '🧠',
    options: [
      { emoji: '✨', label: '맑고 또렷해요', value: 'good', color: '#1B7A4B', bg: '#E8F5EE', score: 90 },
      { emoji: '🌫️', label: '좀 흐려요', value: 'foggy', color: '#F59E0B', bg: '#FEF3C7', score: 55 },
      { emoji: '😶‍🌫️', label: '많이 멍해요', value: 'bad', color: '#DC2626', bg: '#FEF2F2', score: 25 },
    ],
  },
];

export function ElderCheck() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { main: string; followUp?: string; sliderValue?: number; score: number }>>({});

  const totalSteps = steps.length;
  const currentStep = steps[stepIndex];
  const isDone = stepIndex >= totalSteps;

  // 결과 레이더 데이터
  const getResultData = () => steps.map(s => ({
    subject: `${s.emoji} ${s.title.slice(0, 2)}`,
    value: answers[s.key]?.score ?? 50,
    fullMark: 100,
  }));

  const avgScore = Math.round(
    Object.values(answers).reduce((a, b) => a + b.score, 0) / Math.max(Object.keys(answers).length, 1)
  );

  const getResultMessage = () => {
    if (avgScore >= 80) return { emoji: '🌟', text: '오늘 컨디션이 아주 좋으세요!', sub: '이 좋은 컨디션을 유지해보세요', color: '#1B7A4B' };
    if (avgScore >= 60) return { emoji: '☀️', text: '오늘 상태가 괜찮으세요', sub: '가벼운 산책이나 운동을 추천해요', color: '#0EA5E9' };
    if (avgScore >= 40) return { emoji: '🌤️', text: '조금 쉬어가면 좋겠어요', sub: '무리하지 마시고 편히 쉬세요', color: '#F59E0B' };
    return { emoji: '🌧️', text: '오늘은 쉬는 게 좋겠어요', sub: '불편하시면 코디네이터에게 말씀해주세요', color: '#DC2626' };
  };

  /* ── 완료 화면 ── */
  if (isDone) {
    const result = getResultMessage();
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-4 pt-4 pb-2 flex items-center">
          <div className="w-12" />
          <h2 className="text-[18px] text-[#111827] flex-1 text-center">체크 완료</h2>
          <div className="w-12" />
        </div>

        <div className="flex-1 flex flex-col items-center px-5 pt-4 pb-8">
          {/* 점수 */}
          <div className="text-center mb-2">
            <span className="text-[48px] block mb-1">{result.emoji}</span>
            <span className="text-[36px]" style={{ color: result.color }}>{avgScore}점</span>
            <p className="text-[20px] text-[#111827] mt-1">{result.text}</p>
            <p className="text-[15px] text-[#6B7280] mt-1">{result.sub}</p>
          </div>

          {/* 결과 레이더 차트 */}
          <div style={{ width: '100%', maxWidth: 300, height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={getResultData()} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: '#374151' }} />
                <Radar dataKey="value" stroke={result.color} fill={result.color} fillOpacity={0.15} strokeWidth={2.5}
                  dot={{ r: 5, fill: result.color, strokeWidth: 0 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 항목별 요약 */}
          <div className="w-full max-w-[360px] bg-[#F7F8FA] rounded-[20px] p-4 mb-6">
            {steps.map(s => {
              const a = answers[s.key];
              if (!a) return null;
              const opt = s.options.find(o => o.value === a.main);
              return (
                <div key={s.key} className="flex items-center gap-3 py-2.5 border-t border-[#E5E7EB] first:border-0">
                  <span className="text-[22px]">{s.emoji}</span>
                  <span className="text-[16px] text-[#111827] flex-1">{s.title.replace(/[?？]/, '')}</span>
                  <span className="text-[16px]">{opt?.emoji}</span>
                  <span className="text-[15px]" style={{ color: opt?.color }}>{opt?.label}</span>
                </div>
              );
            })}
          </div>

          {/* AI 비유 코멘트 (목업) */}
          <div className="w-full max-w-[360px] bg-[#E8F5EE] rounded-[20px] p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-[24px] shrink-0">🤖</span>
              <div>
                <span className="text-[15px] text-[#1B7A4B] block mb-1">AI 코디의 한마디</span>
                <p className="text-[16px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                  {avgScore >= 70
                    ? '"오늘 영숙님의 몸은 봄볕 아래 따뜻하게 기지개를 켜는 나무 같아요. 수면은 물을 충분히 준 것처럼 좋고, 활동은 아직 새싹이 돋는 중이에요. 가벼운 산책 한 바퀴 어떠세요?"'
                    : '"오늘은 겨울잠에서 깨어나는 곰처럼 조금 피곤하신 것 같아요. 따뜻한 차 한 잔 드시고, 무리하지 마세요. 내일은 더 좋아질 거예요."'
                  }
                </p>
                <p className="text-[11px] text-[#9CA3AF] mt-2">
                  * AI가 생성한 참고 코멘트이며, 의료 조언이 아닙니다
                </p>
              </div>
            </div>
          </div>

          <button onClick={() => navigate('/elder')}
            className="w-full max-w-[360px] h-[60px] bg-[#1B7A4B] text-white rounded-[18px] text-[20px] active:opacity-90">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  /* ── 체크 단계 화면 ── */
  const currentAnswer = answers[currentStep.key];
  const hasFollowUp = currentStep.followUp && currentAnswer && (currentAnswer.main === 'bad' || currentAnswer.main === 'discomfort' || currentAnswer.main === 'none' || currentAnswer.main === 'little');

  const handleMainSelect = (value: string, score: number) => {
    setAnswers(prev => ({ ...prev, [currentStep.key]: { main: value, score } }));

    const needsFollowUp = currentStep.followUp && (value === 'bad' || value === 'discomfort' || value === 'none' || value === 'little');
    if (needsFollowUp) {
      setTimeout(() => setShowFollowUp(true), 300);
    } else {
      setTimeout(() => {
        setShowFollowUp(false);
        setStepIndex(prev => prev + 1);
      }, 400);
    }
  };

  const handleFollowUpSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep.key]: { ...prev[currentStep.key], followUp: value },
    }));
    setTimeout(() => {
      setShowFollowUp(false);
      setStepIndex(prev => prev + 1);
    }, 400);
  };

  const handleSliderChange = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentStep.key]: { ...prev[currentStep.key], sliderValue: value },
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <button onClick={() => {
          if (showFollowUp) { setShowFollowUp(false); return; }
          if (stepIndex > 0) setStepIndex(prev => prev - 1);
          else navigate(-1);
        }} className="w-12 h-12 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={28} className="text-[#374151]" />
        </button>
        <div className="flex-1">
          <div className="flex gap-1 justify-center">
            {steps.map((_, i) => (
              <div key={i} className={`h-[6px] rounded-full flex-1 max-w-[40px] transition-colors ${i <= stepIndex ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'}`} />
            ))}
          </div>
          <p className="text-[12px] text-[#9CA3AF] text-center mt-1">{stepIndex + 1} / {totalSteps}</p>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex-1 flex flex-col px-5 pb-8">
        {!showFollowUp ? (
          /* ── 메인 질문 ── */
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-[48px] mb-4">{currentStep.emoji}</span>
            <h1 className="text-[24px] text-[#111827] text-center mb-2">
              {currentStep.title}
            </h1>
            <p className="text-[15px] text-[#9CA3AF] text-center mb-8">
              {currentStep.subtitle}
            </p>

            <div className="flex flex-col gap-3 w-full max-w-[360px]">
              {currentStep.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleMainSelect(opt.value, opt.score)}
                  className={`w-full rounded-[20px] p-5 flex items-center gap-5 min-h-[76px] transition-all active:scale-[0.96] border-2`}
                  style={{
                    backgroundColor: opt.bg,
                    borderColor: currentAnswer?.main === opt.value ? opt.color : 'transparent',
                    boxShadow: currentAnswer?.main === opt.value ? `0 4px 16px ${opt.color}20` : 'none',
                  }}
                >
                  <span className="text-[38px]">{opt.emoji}</span>
                  <span className="text-[21px] flex-1" style={{ color: opt.color }}>{opt.label}</span>
                  {currentAnswer?.main === opt.value && <CheckCircle2 size={24} style={{ color: opt.color }} />}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── 보조 질문 ── */
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-[#F7F8FA] rounded-[16px] px-4 py-2 mb-6">
              <span className="text-[14px] text-[#6B7280]">조금 더 알려주세요</span>
            </div>
            <h2 className="text-[22px] text-[#111827] text-center mb-6">
              {currentStep.followUp?.question}
            </h2>

            {currentStep.followUp?.type === 'select' && (
              <div className="flex flex-col gap-2.5 w-full max-w-[360px]">
                {currentStep.followUp.options?.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleFollowUpSelect(opt.value)}
                    className={`w-full rounded-[18px] p-4 flex items-center gap-4 min-h-[64px] transition-all active:scale-[0.97] border-2 ${
                      currentAnswer?.followUp === opt.value ? 'bg-[#E8F5EE] border-[#1B7A4B]' : 'bg-[#F7F8FA] border-transparent'
                    }`}
                  >
                    <span className="text-[28px]">{opt.emoji}</span>
                    <span className="text-[18px] text-[#374151]">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {currentStep.followUp?.type === 'slider' && currentStep.followUp.sliderConfig && (() => {
              const cfg = currentStep.followUp.sliderConfig;
              const val = currentAnswer?.sliderValue ?? 6;
              return (
                <div className="w-full max-w-[360px]">
                  <div className="text-center mb-6">
                    <span className="text-[40px] text-[#6366F1]">{val}</span>
                    <span className="text-[20px] text-[#6B7280] ml-1">{cfg.unit}</span>
                  </div>
                  <input
                    type="range"
                    min={cfg.min}
                    max={cfg.max}
                    step={0.5}
                    value={val}
                    onChange={e => handleSliderChange(parseFloat(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer mb-4"
                    style={{
                      background: `linear-gradient(to right, #6366F1 ${((val - cfg.min) / (cfg.max - cfg.min)) * 100}%, #E5E7EB ${((val - cfg.min) / (cfg.max - cfg.min)) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between">
                    {cfg.labels.map((l, i) => (
                      <span key={i} className="text-[12px] text-[#9CA3AF]">{l}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowFollowUp(false);
                      setStepIndex(prev => prev + 1);
                    }}
                    className="w-full h-[56px] bg-[#1B7A4B] text-white rounded-[16px] text-[18px] mt-8 active:opacity-90"
                  >
                    다음으로
                  </button>
                </div>
              );
            })()}

            {/* 건너뛰기 */}
            <button
              onClick={() => {
                setShowFollowUp(false);
                setStepIndex(prev => prev + 1);
              }}
              className="mt-4 text-[15px] text-[#9CA3AF] py-2 px-4"
            >
              건너뛰기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
