/**
 * 16_AI_Reco_Pseudocode
 * 구현용 의사코드 + 데이터 구조
 * 4개 블록: normalizeStatesAndReasons / chooseCategory / chooseSubtype / chooseBundle
 */
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight, Code2, Database, Cpu, Layers } from 'lucide-react';

function CodeBlock({ title, icon, children }: { title: string; icon: React.ReactNode; children: string }) {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F3F4F6]">
        {icon}
        <span className="text-[14px] text-[#111827]">{title}</span>
      </div>
      <div className="p-4">
        <pre className="bg-[#F7F8FA] rounded-[12px] px-4 py-3 text-[11px] text-[#374151] overflow-x-auto whitespace-pre-wrap" style={{ lineHeight: 1.6 }}>
          {children}
        </pre>
      </div>
    </div>
  );
}

export function AIRecoPseudocodePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">구현용 의사코드</h2>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
        {/* Intro */}
        <div className="bg-[#E8F5EE] rounded-[14px] p-4">
          <p className="text-[13px] text-[#0E4B2E]" style={{ lineHeight: 1.6 }}>
            개발자가 <strong>그대로 구현 가능한 의사코드</strong>입니다. 4개 함수로 구성되며,
            실제 구현은 <code className="bg-[#D1FAE5] px-1 rounded">recoEngine.ts</code>에 반영되어 있습니다.
          </p>
          <p className="text-[11px] text-[#6B7280] mt-2">
            ※ 임상 기준 아님. UX 납득을 위한 초기 휴리스틱. 한 번의 점수보다 추세가 중요.
          </p>
        </div>

        {/* Data structures */}
        <CodeBlock
          title="데이터 구조 (InputRaw / Baseline / UserPref)"
          icon={<Database size={16} className="text-[#0EA5E9]" />}
        >{`interface InputRaw {
  sleep_total_min?: number     // 총 수면(분)
  deep_min?: number            // 깊은 수면(분)
  rem_min?: number             // 렘 수면(분)
  awakenings_count?: number    // 각성 횟수
  bedtime_ts?: number          // 취침 시각(unix ms)
  waketime_ts?: number         // 기상 시각(unix ms)
  steps?: number               // 걸음 수
  active_min?: number          // 활동 시간(분)
  stress_score?: number        // 0~100
  fatigue_score?: number       // 0~100
  rhythm_score?: number        // 0~100 (앱 점수)
  last_sync_ts?: number        // 마지막 동기화(unix ms)
}

interface Baseline {
  // 최근 7일 평균 (선택: stddev)
  sleep_total_min, awakenings_count,
  bedtime_ts, waketime_ts,
  deep_min?, rem_min?,
  steps, active_min,
  rhythm_score
}

interface UserPref {
  posture: 'CHAIR' | 'STANDING' | 'ANY'
  goalOverride: 'EXERCISE' | 'MEDITATION' | null
}

type UserAction = 'CAMP_CONTINUE' | 'WEEKLY_PLAN' | null
type TimeOfDay  = 'MORNING' | 'DAY' | 'EVENING'`}</CodeBlock>

        {/* Block 1 */}
        <CodeBlock
          title="1) normalizeStatesAndReasons(raw, baseline)"
          icon={<Cpu size={16} className="text-[#EA580C]" />}
        >{`// ※ 임상 기준 아님, UX 납득을 위한 초기 휴리스틱
// ※ 한 번의 점수보다 추세가 중요

function normalizeStatesAndReasons(raw, baseline):
  states = { sleep:OK, activity:OK, fatigue:OK,
             stress:OK, rhythm:OK }
  reasons = []

  // ── Sleep ──
  if raw.sleep_total_min == null:
    states.sleep = UNKNOWN
    reasons += RS_SLEEP_UNKNOWN
  else if baseline exists:
    if sleep < baseline - 60:
      WARN, RS_SLEEP_SHORT
    if awakenings >= baseline + 2:
      WARN, RS_SLEEP_FRAGMENTED
    if |bedtime - baseline| > 90min:
      WARN, RS_SLEEP_IRREGULAR
    if (deep+rem) < baseline(deep+rem) - 30:
      WARN, RS_SLEEP_QUALITY_LOW
    if sleep >= baseline + 30:
      GOOD
  else: // no baseline
    if sleep < 360: WARN, RS_SLEEP_SHORT
    if awakenings >= 4: WARN, RS_SLEEP_FRAGMENTED
    if (deep+rem) < 90: WARN, RS_SLEEP_QUALITY_LOW
    if sleep >= 420: GOOD

  // ── Activity ──
  if steps==null and active_min==null:
    UNKNOWN, RS_ACTIVITY_UNKNOWN
  else if baseline:
    if steps < baseline*0.6 or active < baseline*0.6:
      WARN, RS_ACTIVITY_LOW
    if steps >= baseline*1.2: GOOD
  else:
    if steps < 3500 or active < 20: WARN, RS_ACTIVITY_LOW
    if steps >= 7000: GOOD

  // ── Fatigue ──
  if null: UNKNOWN, RS_FATIGUE_UNKNOWN
  else if score >= 70: WARN, RS_FATIGUE_HIGH
  else if score <= 30: GOOD

  // ── Stress ──  (same pattern)
  // ── Rhythm ──
  if null: UNKNOWN, RS_RHYTHM_UNKNOWN
  else if baseline and (score < baseline-15 or < 45):
    WARN, RS_RHYTHM_LOW
  else if no baseline and score < 45: WARN, RS_RHYTHM_LOW

  // ── Data quality ──
  if last_sync > 24h ago: reasons += RS_DATA_STALE

  return { states, reasons }`}</CodeBlock>

        {/* Block 2 */}
        <CodeBlock
          title="2) chooseCategory(states, goalOverride)"
          icon={<Layers size={16} className="text-[#7C3AED]" />}
        >{`function chooseCategory(states, goalOverride):
  unknownCount = count(states where == UNKNOWN)
  if unknownCount >= 2:
    return MEDITATION  // 안전한 기본

  if states.sleep==WARN or states.rhythm==WARN:
    return SLEEP
  else if states.stress==WARN or states.fatigue==WARN:
    return MEDITATION
  else if states.activity==WARN and states.fatigue!=WARN:
    return EXERCISE

  // 목표 override (WARN 없을 때만)
  hasWarn = any(states where == WARN)
  if !hasWarn and goalOverride == EXERCISE:
    return EXERCISE
  if !hasWarn and goalOverride == MEDITATION:
    return MEDITATION

  return FOOD  // 기본(안정적인 날)`}</CodeBlock>

        {/* Block 3 */}
        <CodeBlock
          title="3) chooseSubtype(category, reasons, timeOfDay, userPref, userAction)"
          icon={<Code2 size={16} className="text-[#1B7A4B]" />}
        >{`function chooseSubtype(cat, reasons, time, pref, action):
  has = (r) => reasons.includes(r)

  switch cat:
    case SLEEP:
      if time==MORNING and (RS_RHYTHM_LOW or RS_SLEEP_IRREGULAR):
        return S3_RhythmResetMorning
      if time==DAY and RS_FATIGUE_HIGH:
        return S4_DayNapRecovery
      if RS_SLEEP_FRAGMENTED:
        return S2_FragmentedSleep
      if time==EVENING:
        return S1_BedtimePrep
      if RS_SLEEP_IRREGULAR:
        return S5_Habits
      return S1_BedtimePrep

    case MEDITATION:
      if time==EVENING and (RS_STRESS_HIGH or RS_FATIGUE_HIGH):
        return M3_EveningWindDown
      if RS_FATIGUE_HIGH:
        return M2_BodyRelax
      if RS_STRESS_HIGH and RS_ACTIVITY_LOW:
        return M4_WalkMindful
      return M1_QuickCalm

    case EXERCISE:
      if goalOverride==EXERCISE and no WARN reasons:
        return E4_BalanceCore
      if pref.posture == CHAIR:
        return E2_ChairFriendly
      if time==EVENING:
        return E3_GentleStretchEvening
      return E1_IndoorWalkMorning

    case FOOD:
      if action == CAMP_CONTINUE: return F3_CampContinue
      if action == WEEKLY_PLAN:   return F4_WeeklyPlan
      if time==EVENING:           return F2_WarmLightDinner
      return F1_BalancedDay`}</CodeBlock>

        {/* Block 4 */}
        <CodeBlock
          title="4) chooseBundle(subtype, userPref, history)"
          icon={<Database size={16} className="text-[#FF8A3D]" />}
        >{`function chooseBundle(subtype, pref, history):
  bundle = SUBTYPE_BUNDLES[subtype]
  // bundle = { ids: [chip1, chip2, chip3],
  //            queries: [q1, q2, q3] }

  // ── 대체(스왑) 규칙 (최소) ──
  // 1) 길이 선호: 5~10분이면 Chip3가 15분+일 때
  //    동일 subtype 내 대체 후보 1개로 교체
  // 2) 자세=의자: 이미 chooseSubtype에서 E2 강제
  // 3) 중복 방지: 최근 3일 Chip1 동일 ID 연속 → 회피
  //    불가능하면 중복 허용 (안정성 우선)

  if pref.duration == '5~10' and bundle[2].min > 14:
    bundle[2] = SWAP_TABLE[subtype] ?? bundle[2]

  if history.last3days.chip1 includes bundle[0]:
    // 대체 시도, 불가하면 유지
    alt = findAltChip1(subtype)
    if alt: bundle[0] = alt

  return bundle`}</CodeBlock>

        {/* Test connection */}
        <div className="bg-[#F7F8FA] rounded-[14px] p-4 mt-2">
          <p className="text-[12px] text-[#6B7280] text-center mb-3">
            이 룰은 <strong>14_AI_Reco_Scenarios(20세트)</strong>로 재현 가능합니다.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate('/library/ai-reco-scenarios')}
              className="w-full h-[44px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2"
            >
              시나리오 20세트로 검증 <ChevronRight size={14} />
            </button>
            <button
              onClick={() => navigate('/library/ai-reco-reason-mapping')}
              className="w-full h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[13px] flex items-center justify-center gap-2"
            >
              Reason 매핑표로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
