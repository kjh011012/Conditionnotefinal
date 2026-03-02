[작업 목표]
기존에 만든 AI 추천 룰(카테고리 선택 + 칩3개 번들)을 ‘코드로 옮기기 쉬운 Reason→Subtype 매핑표’ 수준으로 정교화한다.
산출물은 “개발자가 그대로 구현 가능한 문서”이며, 과잉 기능(복잡한 ML/임상 기준/고난도 개인화)은 추가하지 않는다.
이 기능은 의료 진단/치료가 아니라 ‘생활 리듬 가이드 + 외부(YouTube) 콘텐츠 연결’이다.

[추가할 페이지]
15_AI_Reco_ReasonMapping (Reason 생성/서브타입 판정/if-else 표)
16_AI_Reco_Pseudocode (구현용 의사코드 + 데이터 구조)

[문서 톤/주의]
- “진단/치료/처방/확정” 표현 금지
- 권고는 “~일 수 있어요 / ~해보세요 / 도움이 될 수 있어요”
- 추천 결과 화면에는 “외부(YouTube)로 이동합니다.” 고정 표기
- 정서 위기(도움 필요) 신호는 콘텐츠 추천보다 ‘도움 연결’ CTA 우선(2단계 확인)

====================================================
15_AI_Reco_ReasonMapping 페이지 구성
====================================================

[섹션 1] 입력 → 상태(3단계) 정규화(사용자에게 보이는 것)
- 상태 값: GOOD / OK / WARN / UNKNOWN
- 대상: 수면, 활동, 피로, 스트레스, 리듬(5개)
- 기준선(최근 7일 평균)이 있으면 상대 비교 우선, 없으면 완화된 절대 기준 사용
- 데이터가 없으면 UNKNOWN이며, UNKNOWN이 많을수록 추천은 ‘안전한 기본’으로 제한

[섹션 2] Reason Code(원인) 정의(개발/로그/설명 공통)
※ 기존 상위 Reason(R_SLEEP_WARN 등) 외에, ‘서브타입 판정용’ 원인 코드를 최소만 추가한다.

(A) SleepIssue (수면 원인 코드)
- RS_SLEEP_SHORT        : 총 수면시간 부족
- RS_SLEEP_FRAGMENTED   : 각성/끊김(자주 깨거나 효율 저하)
- RS_SLEEP_IRREGULAR    : 취침/기상 시간이 들쑥날쑥(규칙성 저하)
- RS_SLEEP_QUALITY_LOW  : 깊은/렘 등 ‘질’ 지표가 평소보다 낮음(데이터 있을 때만)
- RS_SLEEP_UNKNOWN      : 수면 데이터 부족/부정확

(B) ActivityIssue
- RS_ACTIVITY_LOW       : 걸음/활동시간이 평소보다 낮음
- RS_ACTIVITY_UNKNOWN

(C) FatigueIssue
- RS_FATIGUE_HIGH        : 피로 높음(기기/워치 분류 또는 스코어 기반)
- RS_FATIGUE_UNKNOWN

(D) StressIssue
- RS_STRESS_HIGH         : 스트레스 높음(기기/워치 분류 또는 스코어 기반)
- RS_STRESS_UNKNOWN

(E) RhythmIssue
- RS_RHYTHM_LOW           : 리듬 안정도 낮음(앱 점수)
- RS_RHYTHM_UNKNOWN

(F) Time Reason
- RS_TIME_MORNING / RS_TIME_DAY / RS_TIME_EVENING

(G) Data quality (선택, 최소)
- RS_DATA_STALE           : 마지막 동기화가 오래됨(예: 24h+)
- RS_DATA_PARTIAL         : 일부 지표만 있음

[섹션 3] Reason 생성 규칙(원천 데이터 → 원인 코드)
※ 임상 기준이 아니라 UX 납득을 위한 ‘초기 휴리스틱’이며, 기기별로 튜닝 가능하다는 문구를 명시한다.

1) timeOfDay 분류(예시)
- MORNING: 05:00~11:00
- DAY:     11:00~17:00
- EVENING: 17:00~05:00(다음날 새벽 포함)

2) Baseline이 있는 경우(권장)
- RS_SLEEP_SHORT:
  if sleep_total_min < baseline_sleep_total_min - 60
- RS_SLEEP_FRAGMENTED:
  if awakenings_count >= baseline_awakenings_count + 2
  (or sleep_efficiency available and < baseline_efficiency - 5%)
- RS_SLEEP_IRREGULAR:
  if abs(bedtime - baseline_bedtime) > 90min OR abs(waketime - baseline_waketime) > 90min
- RS_SLEEP_QUALITY_LOW:
  if (deep_min + rem_min) < (baseline_deep_min + baseline_rem_min) - 30
  (deep/rem 데이터가 없으면 이 규칙은 스킵)

- RS_ACTIVITY_LOW:
  if steps < baseline_steps * 0.6 OR active_min < baseline_active_min * 0.6

- RS_FATIGUE_HIGH:
  if fatigue_score_normalized >= 70 (또는 기기 분류가 HIGH)
- RS_STRESS_HIGH:
  if stress_score_normalized >= 70 (또는 기기 분류가 HIGH)

- RS_RHYTHM_LOW:
  if rhythm_score < baseline_rhythm_score - 15 OR rhythm_score < 45

3) Baseline이 없는 경우(완화된 초기 기준)
- RS_SLEEP_SHORT:
  if sleep_total_min < 360 (6시간 미만)
- RS_SLEEP_FRAGMENTED:
  if awakenings_count >= 4 (데이터가 있으면)
- RS_SLEEP_IRREGULAR:
  if bedtime_after_01:00 OR abs(bedtime - yesterday_bedtime) > 90min
- RS_SLEEP_QUALITY_LOW:
  if deep/rem 데이터가 존재하고 (deep_min + rem_min) < 90min

- RS_ACTIVITY_LOW:
  if steps < 3500 OR active_min < 20

- RS_FATIGUE_HIGH / RS_STRESS_HIGH:
  기기 제공 분류 우선, 없으면 스코어 0~100 기준 70 이상을 WARN로 간주(튜닝 가능)

- RS_RHYTHM_LOW:
  if rhythm_score < 45

4) UNKNOWN 처리
- 해당 데이터가 없으면 RS_*_UNKNOWN
- UNKNOWN이 2개 이상이면 추천은 “명상(QuickCalm)”으로 제한(가장 안전/부담 낮음)
- 상단 배너: “워치를 연결하면 더 정확히 추천할 수 있어요.”

[섹션 4] 카테고리 선택(오늘 추천 1개만)
- if (sleep_state=WARN) OR (rhythm_state=WARN) → category = SLEEP
- else if (stress_state=WARN) OR (fatigue_state=WARN) → category = MEDITATION
- else if (activity_state=WARN) AND (fatigue_state != WARN) → category = EXERCISE
- else → category = FOOD
- (옵션) 사용자 목표 고정(운동/명상) override는 “WARN이 하나도 없을 때만” 허용

[섹션 5] 핵심: Reason → Subtype 매핑표(if-else)
각 카테고리별로 ‘서브타입’을 if-else로 결정한다.
서브타입은 최소 개수 유지(과잉 분기 금지). 결과는 UX에서 “왜” 설명 가능해야 한다.

--------------------------------------
(1) SLEEP 카테고리 서브타입 결정
--------------------------------------
if timeOfDay == MORNING and (RS_RHYTHM_LOW or RS_SLEEP_IRREGULAR):
    subtype = S3_RhythmResetMorning
else if timeOfDay == DAY and RS_FATIGUE_HIGH:
    subtype = S4_DayNapRecovery
else if RS_SLEEP_FRAGMENTED:
    subtype = S2_FragmentedSleep
else if timeOfDay == EVENING:
    subtype = S1_BedtimePrep
else if RS_SLEEP_IRREGULAR:
    subtype = S5_Habits
else:
    subtype = S1_BedtimePrep

※ 보완 규칙(과잉 분기 대신 ‘칩 교체’로 해결)
- RS_SLEEP_IRREGULAR이면서 EVENING이면 subtype은 S1로 두되,
  Chip2를 “디지털 디톡스/환경” 템플릿(수면-08 또는 수면-29)로 교체 가능.

--------------------------------------
(2) MEDITATION 카테고리 서브타입 결정
--------------------------------------
if timeOfDay == EVENING and (RS_STRESS_HIGH or RS_FATIGUE_HIGH):
    subtype = M3_EveningWindDown
else if RS_FATIGUE_HIGH:
    subtype = M2_BodyRelax
else if RS_STRESS_HIGH and RS_ACTIVITY_LOW:
    subtype = M4_WalkMindful
else:
    subtype = M1_QuickCalm

--------------------------------------
(3) EXERCISE 카테고리 서브타입 결정
--------------------------------------
if userPreference.posture == CHAIR:
    subtype = E2_ChairFriendly
else if timeOfDay == EVENING:
    subtype = E3_GentleStretchEvening
else if timeOfDay == MORNING:
    subtype = E1_IndoorWalkMorning
else:
    subtype = E1_IndoorWalkMorning

(옵션 목표 override)
if goalOverride == EXERCISE and no WARN on all metrics:
    subtype = E4_BalanceCore

--------------------------------------
(4) FOOD 카테고리 서브타입 결정
--------------------------------------
if userAction == CAMP_CONTINUE:
    subtype = F3_CampContinue
else if userAction == WEEKLY_PLAN:
    subtype = F4_WeeklyPlan
else if timeOfDay == EVENING:
    subtype = F2_WarmLightDinner
else:
    subtype = F1_BalancedDay

[섹션 6] Subtype → 기본 번들(칩3개 템플릿 ID) 매핑(기존 라이브러리 ID 사용)
각 subtype마다 “짧게/대안/조금 더” 3개의 템플릿ID를 고정 번들로 정의한다.
(이미 만든 12_Query_Template_Library 번호 체계를 그대로 사용)

S1_BedtimePrep:
- Chip1 수면-05 / Chip2 수면-03 / Chip3 수면-02
S2_FragmentedSleep:
- Chip1 수면-22 / Chip2 수면-04 / Chip3 수면-01
S3_RhythmResetMorning:
- Chip1 수면-11 / Chip2 수면-10 / Chip3 수면-24
S4_DayNapRecovery:
- Chip1 수면-05 / Chip2 수면-14 / Chip3 수면-13
S5_Habits:
- Chip1 수면-15 / Chip2 수면-08 / Chip3 수면-29

M1_QuickCalm:
- Chip1 명상-03 / Chip2 명상-01 / Chip3 명상-10
M2_BodyRelax:
- Chip1 명상-01 / Chip2 명상-05 / Chip3 명상-18
M3_EveningWindDown:
- Chip1 명상-06 / Chip2 명상-11 / Chip3 명상-27
M4_WalkMindful:
- Chip1 명상-23 / Chip2 명상-20 / Chip3 명상-28

E1_IndoorWalkMorning:
- Chip1 운동-23 / Chip2 운동-07 / Chip3 운동-06
E2_ChairFriendly:
- Chip1 운동-02 / Chip2 운동-17 / Chip3 운동-19
E3_GentleStretchEvening:
- Chip1 운동-38 / Chip2 운동-05 / Chip3 운동-27
E4_BalanceCore:
- Chip1 운동-16 / Chip2 운동-14 / Chip3 운동-13

F1_BalancedDay:
- Chip1 식단-01 / Chip2 식단-06 / Chip3 식단-11
F2_WarmLightDinner:
- Chip1 식단-11 / Chip2 식단-12 / Chip3 식단-21
F3_CampContinue:
- Chip1 식단-17 / Chip2 식단-40 / Chip3 식단-39
F4_WeeklyPlan:
- Chip1 식단-38 / Chip2 식단-39 / Chip3 식단-28

[섹션 7] 최소한의 “대체(스왑) 규칙”(사용자 옵션 반영)
- 사용자 옵션: 영상 길이(5~10/10~15/15~20), 강도(가벼움/보통), 자세(의자 선호)
- 적용 방식은 ‘번들 고정 + 일부 칩만 교체’로 단순화한다.
예:
- 길이=5~10이면 Chip3가 15분 이상일 때 10~12분 템플릿으로 교체(동일 subtype 내 대체 후보 1개만 지정)
- 자세=의자면 운동 카테고리는 E2로 강제(위 if-else)

====================================================
16_AI_Reco_Pseudocode 페이지 구성(코드로 옮기기 쉬운 형태)
====================================================

[데이터 구조(예시)]
- InputRaw: sleep_total_min, deep_min, rem_min, awakenings_count, bedtime_ts, waketime_ts,
            steps, active_min,
            stress_score, fatigue_score,
            rhythm_score, last_sync_ts
- Baseline: 7d avg + (선택) stddev
- UserPref: preferredDuration, intensity, posture(CHAIR), goalOverride
- Context: now_ts, timeOfDay

[의사코드 블록 4개를 큰 텍스트 프레임으로 작성]
1) normalizeStatesAndReasons(raw, baseline) -> {states, reasons}
2) chooseCategory(states, unknownCount, goalOverride) -> category
3) chooseSubtype(category, reasons, timeOfDay, userPref, userAction) -> subtype
4) chooseBundle(subtype, userPref, history) -> [templateId1, templateId2, templateId3]

각 의사코드 블록은 주석으로:
- “임상 기준 아님, UX 납득을 위한 초기 휴리스틱, 튜닝 가능”
- “한 번의 점수보다 추세가 중요”
를 포함한다.

[마지막: 테스트 연결]
- 14_AI_Reco_Scenarios(20세트)와 연결 링크(텍스트)로 “이 룰로 재현 가능” 표기.