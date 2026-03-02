/**
 * 14_AI_Reco_Scenarios_UI
 * 상황별 20세트 — 각 시나리오를 미니 QueryBuilder 화면 형태로 표시
 * 칩 탭 → YouTube 결과 / "왜?" → WhyReco 확장
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Play, ChevronRight, Search, Sparkles } from 'lucide-react';
import { MetricStateChip, type MetricKey, type MetricLevel } from '../../components/ui/MetricStateChip';

type TimeOfDay = 'MORNING' | 'DAY' | 'EVENING';
type Category = '수면루틴' | '명상' | '운동' | '식단';

interface Scenario {
  id: string;
  input: { metric: MetricKey; level: MetricLevel }[];
  time: TimeOfDay;
  extra?: string;
  category: Category;
  subtype: string;
  chips: [string, string, string];
  chipLabels: [string, string, string];
  why: string;
  reasons: string[];
}

const timeMeta: Record<TimeOfDay, { label: string; color: string; bg: string }> = {
  MORNING: { label: '아침', color: '#EA580C', bg: '#FFF1E8' },
  DAY:     { label: '낮',   color: '#0EA5E9', bg: '#E0F2FE' },
  EVENING: { label: '저녁', color: '#7C3AED', bg: '#F3E8FF' },
};

const catMeta: Record<Category, { color: string; bg: string }> = {
  '수면루틴': { color: '#0EA5E9', bg: '#E0F2FE' },
  '명상':     { color: '#7C3AED', bg: '#F3E8FF' },
  '운동':     { color: '#1B7A4B', bg: '#E8F5EE' },
  '식단':     { color: '#EA580C', bg: '#FFF1E8' },
};

const scenarios: Scenario[] = [
  { id:'S01', input:[{metric:'sleep',level:'caution'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'caution'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'caution'}], time:'EVENING', category:'수면루틴', subtype:'S1_BedtimePrep', chips:['수면-05','수면-03','수면-02'], chipLabels:['수면 준비 호흡 5분','취침 전 스트레칭 5분 루틴','편안한 밤을 위한 저녁 루틴 15분'], why:'배터리가 덜 충전된 날이라, 오늘은 수면 준비부터 해보면 좋아요.', reasons:['R_SLEEP_WARN','R_FATIGUE_WARN','R_RHYTHM_WARN','R_TIME_EVENING'] },
  { id:'S02', input:[{metric:'sleep',level:'caution'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'caution'},{metric:'rhythm',level:'normal'}], time:'EVENING', category:'수면루틴', subtype:'S2_FragmentedSleep', chips:['수면-22','수면-04','수면-01'], chipLabels:['잠이 안 올 때 4-4-6 호흡','자기 전 바디스캔 10분','잠들기 전 10분 수면 루틴'], why:"잠이 끊긴 날은 '숨→몸 이완→짧은 루틴' 순서가 도움이 될 수 있어요.", reasons:['R_SLEEP_WARN','R_STRESS_WARN','R_TIME_EVENING'] },
  { id:'S03', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'caution'},{metric:'stress',level:'caution'},{metric:'rhythm',level:'normal'}], time:'DAY', category:'명상', subtype:'M2_BodyRelax', chips:['명상-01','명상-05','명상-18'], chipLabels:['5분 호흡 명상 초보 따라하기','바디스캔 명상 10분 누워서','가벼운 요가 니드라 15분'], why:'피로가 높을 땐 몸을 먼저 풀어주면 마음도 같이 안정될 수 있어요.', reasons:['R_FATIGUE_WARN','R_STRESS_WARN','R_TIME_DAY'] },
  { id:'S04', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'caution'},{metric:'rhythm',level:'normal'}], time:'DAY', category:'명상', subtype:'M1_QuickCalm', chips:['명상-03','명상-08','명상-10'], chipLabels:['3분 마음 진정 호흡','스트레스 풀어주는 호흡 8분','초보를 위한 마음챙김 명상 10분'], why:'엔진 과열 경고등이 켜진 느낌이면, 짧은 호흡부터 해보세요.', reasons:['R_STRESS_WARN','R_TIME_DAY'] },
  { id:'S05', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'caution'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'MORNING', category:'운동', subtype:'E1_IndoorWalkMorning', chips:['운동-23','운동-07','운동-06'], chipLabels:['아침 햇빛 산책 준비 스트레칭 5분','실내 걷기 15분 초보 따라하기','시니어 실내 걷기 운동 20분'], why:'오늘은 몸을 깨우는 가벼운 걷기부터 시작해보면 좋아요.', reasons:['R_ACTIVITY_WARN','R_TIME_MORNING'] },
  { id:'S06', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'caution'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'DAY', extra:'앉아서 선호', category:'운동', subtype:'E2_ChairFriendly', chips:['운동-02','운동-17','운동-19'], chipLabels:['의자 스트레칭 5분 목 어깨 풀기','의자 요가 10분 초보','앉아서 하는 전신 체조 15분'], why:"부담을 줄이려면 '앉아서 하는 움직임'부터 해보면 좋아요.", reasons:['R_ACTIVITY_WARN','R_TIME_DAY'] },
  { id:'S07', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'caution'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'caution'},{metric:'rhythm',level:'normal'}], time:'DAY', category:'명상', subtype:'M4_WalkMindful', chips:['명상-23','명상-20','명상-28'], chipLabels:['아침 햇빛과 함께 짧은 명상 5분','걷기 명상 10분 따라하기','초보 명상 15분 따라하기'], why:'움직이며 마음을 안정시키는 방식이 오늘은 부담이 덜할 수 있어요.', reasons:['R_ACTIVITY_WARN','R_STRESS_WARN','R_TIME_DAY'] },
  { id:'S08', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'caution'}], time:'MORNING', category:'수면루틴', subtype:'S3_RhythmResetMorning', chips:['수면-11','수면-10','수면-24'], chipLabels:['아침 햇빛 루틴 5분','일정한 기상시간 만들기 팁','수면 일정 규칙성 만들기'], why:"리듬은 '아침 한 번'이 방향을 잡아줄 때가 많아요.", reasons:['R_RHYTHM_WARN','R_TIME_MORNING'] },
  { id:'S09', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'caution'},{metric:'rhythm',level:'caution'}], time:'EVENING', category:'수면루틴', subtype:'S1_BedtimePrep+디지털디톡스', chips:['수면-08','수면-29','수면-02'], chipLabels:['저녁 스마트폰 줄이는 루틴','편안한 밤을 위한 방 온도 팁','편안한 밤을 위한 저녁 루틴 15분'], why:"오늘은 리듬을 정리하는 '저녁 루틴'이 도움이 될 수 있어요.", reasons:['R_RHYTHM_WARN','R_STRESS_WARN','R_TIME_EVENING'] },
  { id:'S10', input:[{metric:'sleep',level:'caution'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'caution'}], time:'MORNING', category:'수면루틴', subtype:'S5_Habits', chips:['수면-11','수면-15','수면-08'], chipLabels:['아침 햇빛 루틴 5분','저녁 카페인 끊는 시간 팁','저녁 스마트폰 줄이는 루틴'], why:"오늘 하루를 '리듬 정리 모드'로 만들어보면 좋아요.", reasons:['R_SLEEP_WARN','R_RHYTHM_WARN','R_TIME_MORNING'] },
  { id:'S11', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'caution'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'DAY', category:'명상', subtype:'M2_BodyRelax', chips:['명상-01','명상-05','명상-18'], chipLabels:['5분 호흡 명상 초보 따라하기','바디스캔 명상 10분 누워서','가벼운 요가 니드라 15분'], why:"피곤할 땐 '짧게 숨 고르기→몸 이완'이 먼저예요.", reasons:['R_FATIGUE_WARN','R_TIME_DAY'] },
  { id:'S12', input:[{metric:'sleep',level:'good'},{metric:'activity',level:'good'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'good'}], time:'DAY', category:'식단', subtype:'F1_BalancedDay', chips:['식단-01','식단-06','식단-11'], chipLabels:['자연식 아침 간단 레시피','집밥 점심 한그릇 요리','저녁 가볍게 먹는 한그릇 레시피'], why:'오늘은 안정적이라, 부담 없는 식사로 리듬을 유지해볼까요?', reasons:['R_TIME_DAY'] },
  { id:'S13', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'EVENING', category:'식단', subtype:'F2_WarmLightDinner', chips:['식단-11','식단-12','식단-21'], chipLabels:['저녁 가볍게 먹는 한그릇 레시피','속 편한 저녁 국 레시피','따뜻한 차 만들기 레시피'], why:'저녁은 가볍고 따뜻하게 마무리하면 수면 준비에 도움이 될 수 있어요.', reasons:['R_TIME_EVENING'] },
  { id:'S14', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'DAY', extra:'주간 계획 클릭', category:'식단', subtype:'F4_WeeklyPlan', chips:['식단-38','식단-39','식단-28'], chipLabels:['일주일 식단 계획 세우기','장보기 리스트 만들기','싱겁게 맛있게 요리하는 방법'], why:"계획을 한 번 세워두면 '고민 비용'이 줄어들 수 있어요.", reasons:['R_TIME_DAY'] },
  { id:'S15', input:[{metric:'sleep',level:'good'},{metric:'activity',level:'good'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'good'}], time:'DAY', extra:'목표=운동', category:'운동', subtype:'E4_BalanceCore', chips:['운동-16','운동-14','운동-13'], chipLabels:['균형감각 운동 8분 초보','등 펴는 스트레칭 6분 루틴','부담 적은 코어 운동 8분 초보'], why:"좋은 날엔 가볍게 '유지 루틴'을 해보는 것도 좋아요.", reasons:['R_GOAL_OVERRIDE_EXERCISE','R_TIME_DAY'] },
  { id:'S16', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'EVENING', extra:'목표=명상', category:'명상', subtype:'M3_EveningWindDown', chips:['명상-06','명상-11','명상-28'], chipLabels:['저녁 마음 정리 명상 10분','잠들기 전 이완 명상 10분','초보 명상 15분 따라하기'], why:'하루를 정리하는 마음 루틴으로 편안하게 마무리해볼까요?', reasons:['R_GOAL_OVERRIDE_MEDITATION','R_TIME_EVENING'] },
  { id:'S17', input:[{metric:'sleep',level:'unknown'},{metric:'activity',level:'unknown'},{metric:'fatigue',level:'unknown'},{metric:'stress',level:'unknown'},{metric:'rhythm',level:'unknown'}], time:'DAY', category:'명상', subtype:'M1_QuickCalm (안전 기본)', chips:['명상-03','명상-01','명상-10'], chipLabels:['3분 마음 진정 호흡','5분 호흡 명상 초보 따라하기','초보를 위한 마음챙김 명상 10분'], why:'데이터가 없을 땐, 가장 부담 적은 호흡부터 시작해보면 좋아요.', reasons:['R_DATA_UNKNOWN','R_TIME_DAY'] },
  { id:'S18', input:[{metric:'sleep',level:'caution'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'caution'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'DAY', category:'수면루틴', subtype:'S4_DayNapRecovery', chips:['수면-05','수면-14','수면-13'], chipLabels:['수면 준비 호흡 5분','낮잠 타이머 설정 방법','낮잠 가이드 15분'], why:'낮에 잠깐 회복해두면 저녁 리듬이 덜 무너질 수 있어요.', reasons:['R_SLEEP_WARN','R_FATIGUE_WARN','R_TIME_DAY'] },
  { id:'S19', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'caution'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'normal'},{metric:'rhythm',level:'normal'}], time:'EVENING', category:'운동', subtype:'E3_GentleStretchEvening', chips:['운동-38','운동-05','운동-27'], chipLabels:['잠자기 전 가벼운 스트레칭 5분','저녁 몸 풀기 스트레칭 10분','전신 릴렉스 스트레칭 12분'], why:"오늘은 무리보다 '부드럽게 풀기'가 더 잘 맞을 수 있어요.", reasons:['R_ACTIVITY_WARN','R_TIME_EVENING'] },
  { id:'S20', input:[{metric:'sleep',level:'normal'},{metric:'activity',level:'normal'},{metric:'fatigue',level:'normal'},{metric:'stress',level:'caution'},{metric:'rhythm',level:'normal'}], time:'EVENING', category:'명상', subtype:'M3_EveningWindDown', chips:['명상-06','명상-11','명상-27'], chipLabels:['저녁 마음 정리 명상 10분','잠들기 전 이완 명상 10분','자기 전 바디스캔 12분'], why:'마음을 먼저 가라앉히면, 밤이 더 편안해질 수 있어요.', reasons:['R_STRESS_WARN','R_TIME_EVENING'] },
];

const chipSlotLabels = ['짧게', '대안', '조금 더'] as const;

/* ─── Scenario Screen Card (mini QueryBuilder) ─── */
function ScenarioScreen({ s, onChipClick }: { s: Scenario; onChipClick: (q: string) => void }) {
  const [showWhy, setShowWhy] = useState(false);
  const cm = catMeta[s.category];
  const tm = timeMeta[s.time];

  return (
    <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* ─ Header bar ─ */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#F7F8FA] border-b border-[#EEF1F4]">
        <span className="text-[13px] text-[#111827]">{s.id}</span>
        <div className="flex items-center gap-1.5">
          {s.extra && <span className="text-[9px] text-[#6B7280] bg-white px-1.5 py-0.5 rounded-full border border-[#E5E7EB]">{s.extra}</span>}
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: tm.bg, color: tm.color }}>{tm.label}</span>
        </div>
      </div>

      <div className="p-3">
        {/* ─ MetricState chips ─ */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {s.input.map(i => (
            <MetricStateChip key={i.metric} metric={i.metric} level={i.level} compact className="!text-[9px] !px-1.5 !py-0.5 !gap-0.5" />
          ))}
        </div>

        {/* ─ Category badge + subtype ─ */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ backgroundColor: cm.bg, color: cm.color }}>{s.category}</span>
          <span className="text-[9px] text-[#9CA3AF]">{s.subtype}</span>
        </div>

        {/* ─ Chips (mini QueryBuilder) ─ */}
        <div className="flex flex-col gap-1.5 mb-2.5">
          {s.chipLabels.map((label, idx) => (
            <button
              key={s.chips[idx]}
              onClick={() => onChipClick(label)}
              className="w-full flex items-start gap-2 bg-[#F7F8FA] rounded-[10px] px-2.5 py-2 text-left hover:bg-[#E8F5EE] transition-colors"
            >
              <Search size={10} className="text-[#9CA3AF] mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] text-[#9CA3AF] block">{chipSlotLabels[idx]}</span>
                <span className="text-[11px] text-[#374151] block truncate">"{label}"</span>
              </div>
              <Play size={8} className="text-[#1B7A4B] mt-1 shrink-0" />
            </button>
          ))}
        </div>

        {/* ─ Why button + expandable ─ */}
        <button
          onClick={() => setShowWhy(!showWhy)}
          className="flex items-center gap-1 text-[11px] text-[#1B7A4B] mb-1"
        >
          <Sparkles size={10} /> 왜 이 추천인가요? <ChevronRight size={10} className={`transition-transform ${showWhy ? 'rotate-90' : ''}`} />
        </button>

        {showWhy && (
          <div className="bg-[#FFF1E8] rounded-[10px] p-2.5 mb-2">
            <p className="text-[11px] text-[#374151]" style={{ lineHeight: 1.5 }}>{s.why}</p>
            <div className="flex flex-wrap gap-0.5 mt-1.5">
              {s.reasons.map(r => (
                <span key={r} className="text-[7px] text-[#9CA3AF] bg-white px-1 py-0.5 rounded">{r}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function AIRecoScenariosPage() {
  const navigate = useNavigate();
  const [filterCat, setFilterCat] = useState<Category | 'all'>('all');

  const filtered = filterCat === 'all' ? scenarios : scenarios.filter(s => s.category === filterCat);

  const handleChipClick = (query: string) => {
    navigate(`/daily/youtube-results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">시나리오 20세트</h2>
        <span className="text-[12px] text-[#9CA3AF] ml-auto">{filtered.length}개</span>
      </div>

      {/* Filter */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4] overflow-x-auto">
        <div className="flex gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {(['all', '수면루틴', '명상', '운동', '식단'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                filterCat === cat
                  ? 'bg-[#1B7A4B] text-white'
                  : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
              }`}
            >
              {cat === 'all' ? `전체 (${scenarios.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario screens — 2-column grid */}
      <div className="px-3 pt-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(s => (
            <ScenarioScreen key={s.id} s={s} onChipClick={handleChipClick} />
          ))}
        </div>

        {/* Notice */}
        <div className="mt-4 bg-[#F7F8FA] rounded-[14px] p-3 text-center">
          <p className="text-[11px] text-[#9CA3AF]" style={{ lineHeight: 1.5 }}>
            칩을 탭하면 YouTube 결과 화면으로 이동합니다.
            <br />
            "왜 이 추천?" 버튼으로 추천 근거를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
