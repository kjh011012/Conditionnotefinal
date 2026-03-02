/**
 * AI 추천 엔진 (룰 기반)
 * ※ 임상 기준 아님 — UX 납득을 위한 초기 휴리스틱, 튜닝 가능
 * ※ 한 번의 점수보다 추세가 중요
 */

/* ═══════ 1. 타입 정의 ═══════ */

export type MetricState = 'GOOD' | 'OK' | 'WARN' | 'UNKNOWN';
export type TimeOfDay = 'MORNING' | 'DAY' | 'EVENING';
export type RecoCategory = 'SLEEP' | 'MEDITATION' | 'EXERCISE' | 'FOOD';
export type Posture = 'CHAIR' | 'STANDING' | 'ANY';
export type UserAction = 'CAMP_CONTINUE' | 'WEEKLY_PLAN' | null;
export type GoalOverride = 'EXERCISE' | 'MEDITATION' | null;

// Sleep subtypes
export type SleepSubtype = 'S1_BedtimePrep' | 'S2_FragmentedSleep' | 'S3_RhythmResetMorning' | 'S4_DayNapRecovery' | 'S5_Habits';
// Meditation subtypes
export type MeditationSubtype = 'M1_QuickCalm' | 'M2_BodyRelax' | 'M3_EveningWindDown' | 'M4_WalkMindful';
// Exercise subtypes
export type ExerciseSubtype = 'E1_IndoorWalkMorning' | 'E2_ChairFriendly' | 'E3_GentleStretchEvening' | 'E4_BalanceCore';
// Food subtypes
export type FoodSubtype = 'F1_BalancedDay' | 'F2_WarmLightDinner' | 'F3_CampContinue' | 'F4_WeeklyPlan';

export type Subtype = SleepSubtype | MeditationSubtype | ExerciseSubtype | FoodSubtype;

/* ─── Reason Codes ─── */
export type SleepReason = 'RS_SLEEP_SHORT' | 'RS_SLEEP_FRAGMENTED' | 'RS_SLEEP_IRREGULAR' | 'RS_SLEEP_QUALITY_LOW' | 'RS_SLEEP_UNKNOWN';
export type ActivityReason = 'RS_ACTIVITY_LOW' | 'RS_ACTIVITY_UNKNOWN';
export type FatigueReason = 'RS_FATIGUE_HIGH' | 'RS_FATIGUE_UNKNOWN';
export type StressReason = 'RS_STRESS_HIGH' | 'RS_STRESS_UNKNOWN';
export type RhythmReason = 'RS_RHYTHM_LOW' | 'RS_RHYTHM_UNKNOWN';
export type TimeReason = 'RS_TIME_MORNING' | 'RS_TIME_DAY' | 'RS_TIME_EVENING';
export type DataReason = 'RS_DATA_STALE' | 'RS_DATA_PARTIAL';

export type ReasonCode =
  | SleepReason | ActivityReason | FatigueReason | StressReason
  | RhythmReason | TimeReason | DataReason;

/* ─── Input / Output ─── */

export interface InputRaw {
  sleep_total_min?: number;
  deep_min?: number;
  rem_min?: number;
  awakenings_count?: number;
  bedtime_ts?: number;  // unix ms
  waketime_ts?: number;
  steps?: number;
  active_min?: number;
  stress_score?: number;  // 0-100
  fatigue_score?: number; // 0-100
  rhythm_score?: number;  // 0-100
  last_sync_ts?: number;
}

export interface Baseline {
  sleep_total_min: number;
  awakenings_count: number;
  bedtime_ts: number;
  waketime_ts: number;
  deep_min?: number;
  rem_min?: number;
  steps: number;
  active_min: number;
  rhythm_score: number;
  // sleep_efficiency?: number;
}

export interface UserPref {
  posture: Posture;
  goalOverride: GoalOverride;
}

export interface MetricStates {
  sleep: MetricState;
  activity: MetricState;
  fatigue: MetricState;
  stress: MetricState;
  rhythm: MetricState;
}

export interface NormalizeResult {
  states: MetricStates;
  reasons: ReasonCode[];
}

export interface RecoResult {
  category: RecoCategory;
  subtype: Subtype;
  bundle: [string, string, string]; // template IDs
  bundleQueries: [string, string, string]; // query text
  whyText: string;
  reasons: ReasonCode[];
  states: MetricStates;
}

/* ═══════ 2. timeOfDay 분류 ═══════ */

export function getTimeOfDay(now: Date = new Date()): TimeOfDay {
  const h = now.getHours();
  if (h >= 5 && h < 11) return 'MORNING';
  if (h >= 11 && h < 17) return 'DAY';
  return 'EVENING'; // 17~05(next)
}

/* ═══════ 3. normalizeStatesAndReasons ═══════ */

export function normalizeStatesAndReasons(
  raw: InputRaw,
  baseline: Baseline | null,
): NormalizeResult {
  const reasons: ReasonCode[] = [];
  const states: MetricStates = {
    sleep: 'OK', activity: 'OK', fatigue: 'OK', stress: 'OK', rhythm: 'OK',
  };

  // ── Sleep ──
  if (raw.sleep_total_min == null) {
    states.sleep = 'UNKNOWN';
    reasons.push('RS_SLEEP_UNKNOWN');
  } else if (baseline) {
    if (raw.sleep_total_min < baseline.sleep_total_min - 60) {
      states.sleep = 'WARN'; reasons.push('RS_SLEEP_SHORT');
    }
    if (raw.awakenings_count != null && raw.awakenings_count >= baseline.awakenings_count + 2) {
      states.sleep = 'WARN'; reasons.push('RS_SLEEP_FRAGMENTED');
    }
    if (raw.bedtime_ts != null && Math.abs(raw.bedtime_ts - baseline.bedtime_ts) > 90 * 60 * 1000) {
      states.sleep = 'WARN'; reasons.push('RS_SLEEP_IRREGULAR');
    }
    if (baseline.deep_min != null && baseline.rem_min != null &&
        raw.deep_min != null && raw.rem_min != null &&
        (raw.deep_min + raw.rem_min) < (baseline.deep_min + baseline.rem_min) - 30) {
      states.sleep = 'WARN'; reasons.push('RS_SLEEP_QUALITY_LOW');
    }
    if (states.sleep === 'OK' && raw.sleep_total_min >= baseline.sleep_total_min + 30) {
      states.sleep = 'GOOD';
    }
  } else {
    // no baseline
    if (raw.sleep_total_min < 360) { states.sleep = 'WARN'; reasons.push('RS_SLEEP_SHORT'); }
    if (raw.awakenings_count != null && raw.awakenings_count >= 4) { states.sleep = 'WARN'; reasons.push('RS_SLEEP_FRAGMENTED'); }
    if (raw.deep_min != null && raw.rem_min != null && (raw.deep_min + raw.rem_min) < 90) {
      states.sleep = 'WARN'; reasons.push('RS_SLEEP_QUALITY_LOW');
    }
    if (states.sleep === 'OK' && raw.sleep_total_min >= 420) { states.sleep = 'GOOD'; }
  }

  // ── Activity ──
  if (raw.steps == null && raw.active_min == null) {
    states.activity = 'UNKNOWN'; reasons.push('RS_ACTIVITY_UNKNOWN');
  } else if (baseline) {
    if ((raw.steps != null && raw.steps < baseline.steps * 0.6) ||
        (raw.active_min != null && raw.active_min < baseline.active_min * 0.6)) {
      states.activity = 'WARN'; reasons.push('RS_ACTIVITY_LOW');
    } else if ((raw.steps != null && raw.steps >= baseline.steps * 1.2)) {
      states.activity = 'GOOD';
    }
  } else {
    if ((raw.steps != null && raw.steps < 3500) || (raw.active_min != null && raw.active_min < 20)) {
      states.activity = 'WARN'; reasons.push('RS_ACTIVITY_LOW');
    } else if (raw.steps != null && raw.steps >= 7000) {
      states.activity = 'GOOD';
    }
  }

  // ── Fatigue ──
  if (raw.fatigue_score == null) {
    states.fatigue = 'UNKNOWN'; reasons.push('RS_FATIGUE_UNKNOWN');
  } else if (raw.fatigue_score >= 70) {
    states.fatigue = 'WARN'; reasons.push('RS_FATIGUE_HIGH');
  } else if (raw.fatigue_score <= 30) {
    states.fatigue = 'GOOD';
  }

  // ── Stress ──
  if (raw.stress_score == null) {
    states.stress = 'UNKNOWN'; reasons.push('RS_STRESS_UNKNOWN');
  } else if (raw.stress_score >= 70) {
    states.stress = 'WARN'; reasons.push('RS_STRESS_HIGH');
  } else if (raw.stress_score <= 30) {
    states.stress = 'GOOD';
  }

  // ── Rhythm ──
  if (raw.rhythm_score == null) {
    states.rhythm = 'UNKNOWN'; reasons.push('RS_RHYTHM_UNKNOWN');
  } else if (baseline) {
    if (raw.rhythm_score < baseline.rhythm_score - 15 || raw.rhythm_score < 45) {
      states.rhythm = 'WARN'; reasons.push('RS_RHYTHM_LOW');
    } else if (raw.rhythm_score >= baseline.rhythm_score + 10) {
      states.rhythm = 'GOOD';
    }
  } else {
    if (raw.rhythm_score < 45) { states.rhythm = 'WARN'; reasons.push('RS_RHYTHM_LOW'); }
    else if (raw.rhythm_score >= 70) { states.rhythm = 'GOOD'; }
  }

  // ── Data quality ──
  if (raw.last_sync_ts != null && Date.now() - raw.last_sync_ts > 24 * 60 * 60 * 1000) {
    reasons.push('RS_DATA_STALE');
  }

  return { states, reasons };
}

/* ═══════ 4. chooseCategory ═══════ */

export function chooseCategory(
  states: MetricStates,
  goalOverride: GoalOverride,
): RecoCategory {
  const unknownCount = Object.values(states).filter(v => v === 'UNKNOWN').length;
  if (unknownCount >= 2) return 'MEDITATION'; // safe default

  const hasWarn = Object.values(states).some(v => v === 'WARN');

  if (states.sleep === 'WARN' || states.rhythm === 'WARN') return 'SLEEP';
  if (states.stress === 'WARN' || states.fatigue === 'WARN') return 'MEDITATION';
  if (states.activity === 'WARN' && states.fatigue !== 'WARN') return 'EXERCISE';

  // goal override only when no WARN
  if (!hasWarn && goalOverride === 'EXERCISE') return 'EXERCISE';
  if (!hasWarn && goalOverride === 'MEDITATION') return 'MEDITATION';

  return 'FOOD';
}

/* ═══════ 5. chooseSubtype ═══════ */

export function chooseSubtype(
  category: RecoCategory,
  reasons: ReasonCode[],
  timeOfDay: TimeOfDay,
  userPref: UserPref,
  userAction: UserAction,
): Subtype {
  const has = (r: ReasonCode) => reasons.includes(r);

  switch (category) {
    case 'SLEEP': {
      if (timeOfDay === 'MORNING' && (has('RS_RHYTHM_LOW') || has('RS_SLEEP_IRREGULAR')))
        return 'S3_RhythmResetMorning';
      if (timeOfDay === 'DAY' && has('RS_FATIGUE_HIGH'))
        return 'S4_DayNapRecovery';
      if (has('RS_SLEEP_FRAGMENTED'))
        return 'S2_FragmentedSleep';
      if (timeOfDay === 'EVENING')
        return 'S1_BedtimePrep';
      if (has('RS_SLEEP_IRREGULAR'))
        return 'S5_Habits';
      return 'S1_BedtimePrep';
    }
    case 'MEDITATION': {
      if (timeOfDay === 'EVENING' && (has('RS_STRESS_HIGH') || has('RS_FATIGUE_HIGH')))
        return 'M3_EveningWindDown';
      if (has('RS_FATIGUE_HIGH'))
        return 'M2_BodyRelax';
      if (has('RS_STRESS_HIGH') && has('RS_ACTIVITY_LOW'))
        return 'M4_WalkMindful';
      return 'M1_QuickCalm';
    }
    case 'EXERCISE': {
      // goal override
      if (userPref.goalOverride === 'EXERCISE' && !reasons.some(r => r.endsWith('_HIGH') || r.endsWith('_LOW')))
        return 'E4_BalanceCore';
      if (userPref.posture === 'CHAIR')
        return 'E2_ChairFriendly';
      if (timeOfDay === 'EVENING')
        return 'E3_GentleStretchEvening';
      return 'E1_IndoorWalkMorning';
    }
    case 'FOOD': {
      if (userAction === 'CAMP_CONTINUE') return 'F3_CampContinue';
      if (userAction === 'WEEKLY_PLAN') return 'F4_WeeklyPlan';
      if (timeOfDay === 'EVENING') return 'F2_WarmLightDinner';
      return 'F1_BalancedDay';
    }
  }
}

/* ═══════ 6. Subtype → Bundle 매핑 ═══════ */

export const SUBTYPE_BUNDLES: Record<Subtype, { ids: [string, string, string]; queries: [string, string, string] }> = {
  // SLEEP
  S1_BedtimePrep:       { ids: ['수면-05', '수면-03', '수면-02'], queries: ['수면 준비 호흡 5분', '취침 전 스트레칭 5분 루틴', '편안한 밤을 위한 저녁 루틴 15분'] },
  S2_FragmentedSleep:   { ids: ['수면-22', '수면-04', '수면-01'], queries: ['잠이 안 올 때 4-4-6 호흡', '자기 전 바디스캔 10분', '잠들기 전 10분 수면 루틴'] },
  S3_RhythmResetMorning:{ ids: ['수면-11', '수면-10', '수면-24'], queries: ['아침 햇빛 루틴 5분', '일정한 기상시간 만들기 팁', '수면 일정 규칙성 만들기'] },
  S4_DayNapRecovery:    { ids: ['수면-05', '수면-14', '수면-13'], queries: ['수면 준비 호흡 5분', '낮잠 타이머 설정 방법', '낮잠 가이드 15분'] },
  S5_Habits:            { ids: ['수면-15', '수면-08', '수면-29'], queries: ['저녁 카페인 끊는 시간 팁', '저녁 스마트폰 줄이는 루틴', '편안한 밤을 위한 방 온도 팁'] },
  // MEDITATION
  M1_QuickCalm:         { ids: ['명상-03', '명상-01', '명상-10'], queries: ['3분 마음 진정 호흡', '5분 호흡 명상 초보 따라하기', '초보를 위한 마음챙김 명상 10분'] },
  M2_BodyRelax:         { ids: ['명상-01', '명상-05', '명상-18'], queries: ['5분 호흡 명상 초보 따라하기', '바디스캔 명상 10분 누워서', '가벼운 요가 니드라 15분'] },
  M3_EveningWindDown:   { ids: ['명상-06', '명상-11', '명상-27'], queries: ['저녁 마음 정리 명상 10분', '잠들기 전 이완 명상 10분', '자기 전 바디스캔 12분'] },
  M4_WalkMindful:       { ids: ['명상-23', '명상-20', '명상-28'], queries: ['아침 햇빛과 함께 짧은 명상 5분', '걷기 명상 10분 따라하기', '초보 명상 15분 따라하기'] },
  // EXERCISE
  E1_IndoorWalkMorning: { ids: ['운동-23', '운동-07', '운동-06'], queries: ['아침 햇빛 산책 준비 스트레칭 5분', '실내 걷기 15분 초보 따라하기', '시니어 실내 걷기 운동 20분'] },
  E2_ChairFriendly:     { ids: ['운동-02', '운동-17', '운동-19'], queries: ['의자 스트레칭 5분 목 어깨 풀기', '의자 요가 10분 초보', '앉아서 하는 전신 체조 15분'] },
  E3_GentleStretchEvening:{ ids: ['운동-38', '운동-05', '운동-27'], queries: ['잠자기 전 가벼운 스트레칭 5분', '저녁 몸 풀기 스트레칭 10분', '전신 릴렉스 스트레칭 12분'] },
  E4_BalanceCore:       { ids: ['운동-16', '운동-14', '운동-13'], queries: ['균형감각 운동 8분 초보', '등 펴는 스트레칭 6분 루틴', '부담 적은 코어 운동 8분 초보'] },
  // FOOD
  F1_BalancedDay:       { ids: ['식단-01', '식단-06', '식단-11'], queries: ['자연식 아침 간단 레시피', '집밥 점심 한그릇 요리', '저녁 가볍게 먹는 한그릇 레시피'] },
  F2_WarmLightDinner:   { ids: ['식단-11', '식단-12', '식단-21'], queries: ['저녁 가볍게 먹는 한그릇 레시피', '속 편한 저녁 국 레시피', '따뜻한 차 만들기 레시피'] },
  F3_CampContinue:      { ids: ['식단-17', '식단-40', '식단-39'], queries: ['캠프 스타일 자연식 집밥 레시피', '캠프 연계 루틴 식단 아이디어', '장보기 리스트 만들기'] },
  F4_WeeklyPlan:        { ids: ['식단-38', '식단-39', '식단-28'], queries: ['일주일 식단 계획 세우기', '장보기 리스트 만들기', '싱겁게 맛있게 요리하는 방법'] },
};

/* ═══════ 7. Why 텍스트 ═══════ */

const CATEGORY_WHY: Record<RecoCategory, string> = {
  SLEEP:      '수면/리듬이 조금 들쑥날쑥해서, 오늘은 \'배터리 충전\'부터 도와줄게요.',
  MEDITATION: '스트레스/피로가 올라가 있어서, 오늘은 \'긴장 풀기\'부터 해보면 좋아요.',
  EXERCISE:   '오늘 활동이 적어서, 가볍게 몸을 깨우는 움직임을 추천해요.',
  FOOD:       '오늘은 전반적으로 안정적이라, 부담 없는 식사 아이디어로 리듬을 유지해볼까요?',
};

const UNKNOWN_WHY = '데이터가 없을 땐, 가장 부담 적은 호흡부터 시작해보면 좋아요.';

/* ═══════ 8. 통합: getRecommendation ═══════ */

export function getRecommendation(
  raw: InputRaw,
  baseline: Baseline | null,
  userPref: UserPref = { posture: 'ANY', goalOverride: null },
  userAction: UserAction = null,
  now: Date = new Date(),
): RecoResult {
  const { states, reasons } = normalizeStatesAndReasons(raw, baseline);
  const timeOfDay = getTimeOfDay(now);

  // Add time reason
  const timeReason: TimeReason =
    timeOfDay === 'MORNING' ? 'RS_TIME_MORNING'
    : timeOfDay === 'DAY' ? 'RS_TIME_DAY'
    : 'RS_TIME_EVENING';
  const allReasons: ReasonCode[] = [...reasons, timeReason];

  const unknownCount = Object.values(states).filter(v => v === 'UNKNOWN').length;

  const category = chooseCategory(states, userPref.goalOverride);
  const subtype = unknownCount >= 2
    ? 'M1_QuickCalm' as Subtype
    : chooseSubtype(category, allReasons, timeOfDay, userPref, userAction);

  const bundle = SUBTYPE_BUNDLES[subtype];
  const whyText = unknownCount >= 2 ? UNKNOWN_WHY : CATEGORY_WHY[category];

  return {
    category,
    subtype,
    bundle: bundle.ids,
    bundleQueries: bundle.queries,
    whyText,
    reasons: allReasons,
    states,
  };
}
