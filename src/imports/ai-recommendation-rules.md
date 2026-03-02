[목표]
컨디션노트 앱의 “AI 추천 → 추천 카테고리 → YouTube 검색어 칩 3개”를 개발자가 그대로 구현할 수 있도록
‘룰 스펙(문서)’ 형태로 Figma에 정리한다.
중요: 의료 진단/치료가 아니라 생활 리듬 가이드 + 외부(YouTube) 콘텐츠 연결이며,
UX에서 납득 가능한 설명(왜 이 추천인지)이 반드시 제공되어야 한다.

[추가할 페이지]
13_AI_Reco_RuleSpec (룰 스펙 문서)
14_AI_Reco_Scenarios (상황별 20세트 매칭 카드)

[선행 조건]
- 이미 생성된 “12_Query_Template_Library(150개 템플릿)”를 기준으로 한다.
- 템플릿 ID 규칙(문서 전체에서 통일):
  운동-01~40, 명상-01~40, 식단-01~40, 수면-01~30
  (각 ID는 Query Template Library의 번호와 1:1 매칭)

====================================================
13_AI_Reco_RuleSpec 페이지 구성(문서 레이아웃)
====================================================

섹션 A) 제품 톤/주의(고정)
- “진단/치료/처방/확정” 표현 금지
- “~일 수 있어요 / ~해보세요 / 도움이 될 수 있어요” 톤 유지
- 결과 화면에 “외부(YouTube)로 이동합니다.” 고정 표기
- 위험 신호(정서 Red 등) 시: ‘콘텐츠 추천’보다 ‘도움 연결’ CTA 우선(2단계 확인 모달)

섹션 B) 입력 → 상태(3단계) 정규화
입력(원천):
- 수면(워치), 활동(워치), 피로(기기/워치), 스트레스(기기/워치), 리듬 안정도(앱 점수)
사용자에게는 “좋음/보통/주의” 3단계로만 보여준다(숫자 남발 금지).

[정규화 기본 규칙]
1) 기준선(최근 7일 평균)이 있으면 “상대 비교”가 1순위
2) 기준선이 없으면 “완화된 절대 기준(초기값)”로만 분류(단정 금지)
3) 데이터가 없으면 “알 수 없음(unknown)”로 표시하고, 추천은 ‘안전한 기본’으로 제한

[상태 값]
- GOOD / OK / WARN / UNKNOWN

섹션 C) 추천 카테고리 선택 규칙(‘오늘 추천’ 1개만 배지)
카테고리: 수면루틴 / 명상 / 운동 / 식단

[우선순위 규칙(설명 가능한 단순 로직)]
1) (수면=WARN) OR (리듬=WARN) → 오늘 추천 카테고리 = 수면루틴
2) else if (스트레스=WARN) OR (피로=WARN) → 명상
3) else if (활동=WARN) AND (피로!=WARN) → 운동
4) else → 식단
5) (옵션) 사용자 목표 고정(설정에서 1개만 선택 가능)이 있고 “WARN이 하나도 없을 때만” 목표 카테고리로 override 가능

[UX에 보이는 ‘왜’ 한 줄 템플릿(카테고리별)]
- 수면루틴: “수면/리듬이 조금 들쑥날쑥해서, 오늘은 ‘배터리 충전’부터 도와줄게요.”
- 명상: “스트레스/피로가 올라가 있어서, 오늘은 ‘긴장 풀기’부터 해보면 좋아요.”
- 운동: “오늘 활동이 적어서, 가볍게 몸을 깨우는 움직임을 추천해요.”
- 식단: “오늘은 전반적으로 안정적이라, 부담 없는 식사 아이디어로 리듬을 유지해볼까요?”

섹션 D) “칩 3개” 생성 규칙(짧게/대안/조금 더)
선택된 카테고리 안에서 검색어 칩 3개를 생성한다.
- Chip #1 = ‘짧게/가장 쉬움’ (5~10분, 초보/시니어/가벼움)
- Chip #2 = ‘대안’ (앉아서/누워서/걷기 등 다른 형태로 회피 가능)
- Chip #3 = ‘조금 더’ (10~20분 또는 루틴형)

[칩 다양성 규칙(중요)]
- 3개 칩은 서로 “형태/포지션/맥락”이 달라야 한다(호흡만 3개 금지).
- 같은 단어가 반복되는 유사 검색어 3개 금지.
- 사용자 선호(영상 길이/강도)가 있으면 Chip #1과 #2에 우선 반영.

섹션 E) 서브타입(상황 분기) + 번들(템플릿 3개 묶음)
카테고리마다 ‘상황 분기(서브타입)’를 최소로 둔다(과잉 분기 금지).
서브타입에 따라 기본 번들(3개 템플릿 ID)을 매칭한다.
(사용자 선호가 있으면 번들 내에서 대체 템플릿으로 교체 가능)

-----------------------
E-1) 수면루틴(SLEEP) 서브타입
-----------------------
S1_BedtimePrep (저녁/취침 전)
조건: timeOfDay=EVENING 또는 사용자가 밤에 추천 화면 진입
번들:
- Chip1 수면-05 “수면 준비 호흡 5분”
- Chip2 수면-03 “취침 전 스트레칭 5분 루틴”
- Chip3 수면-02 “편안한 밤을 위한 저녁 루틴 15분”

S2_FragmentedSleep (잠이 끊기거나 잠들기 어려움)
조건: 수면=WARN 이고 ‘각성/끊김’ 이슈가 이유로 잡힐 때(내부 reason)
번들:
- Chip1 수면-22 “잠이 안 올 때 4-4-6 호흡”
- Chip2 수면-04 “자기 전 바디스캔 10분”
- Chip3 수면-01 “잠들기 전 10분 수면 루틴”

S3_RhythmResetMorning (아침 리듬 리셋)
조건: 리듬=WARN AND timeOfDay=MORNING
번들:
- Chip1 수면-11 “아침 햇빛 루틴 5분”
- Chip2 수면-10 “일정한 기상시간 만들기 팁”
- Chip3 수면-24 “수면 일정 규칙성 만들기”

S4_DayNapRecovery (낮 피로/회복)
조건: 피로=WARN AND timeOfDay=DAY
번들:
- Chip1 수면-05 “수면 준비 호흡 5분”
- Chip2 수면-14 “낮잠 타이머 설정 방법”
- Chip3 수면-13 “낮잠 가이드 15분”

S5_Habits (습관 교정/생활 팁)
조건: 수면=WARN 또는 리듬=WARN 이지만 “지금 당장 영상”보다 습관/환경이 더 적합할 때(내부 reason)
번들:
- Chip1 수면-15 “저녁 카페인 끊는 시간 팁”
- Chip2 수면-08 “저녁 스마트폰 줄이는 루틴”
- Chip3 수면-29 “편안한 밤을 위한 방 온도 팁”

-----------------------
E-2) 명상(MEDITATION) 서브타입
-----------------------
M1_QuickCalm (즉시 진정/스트레스 완화)
조건: 스트레스=WARN AND 피로!=WARN
번들:
- Chip1 명상-03 “3분 마음 진정 호흡”
- Chip2 명상-08 “스트레스 풀어주는 호흡 8분”
- Chip3 명상-10 “초보를 위한 마음챙김 명상 10분”

M2_BodyRelax (피로/무기력/긴장 이완)
조건: 피로=WARN (스트레스 무관)
번들:
- Chip1 명상-01 “5분 호흡 명상 초보 따라하기”
- Chip2 명상-05 “바디스캔 명상 10분 누워서”
- Chip3 명상-18 “가벼운 요가 니드라 15분”

M3_EveningWindDown (저녁 정리)
조건: timeOfDay=EVENING AND (스트레스=WARN OR 피로=WARN)
번들:
- Chip1 명상-06 “저녁 마음 정리 명상 10분”
- Chip2 명상-11 “잠들기 전 이완 명상 10분”
- Chip3 명상-27 “자기 전 바디스캔 12분”

M4_WalkMindful (움직이며 마음 안정)
조건: 활동=WARN AND 스트레스=WARN (과한 운동은 부담) → ‘걷기/소리/짧은 명상’으로 유도
번들:
- Chip1 명상-23 “아침 햇빛과 함께 짧은 명상 5분”
- Chip2 명상-20 “걷기 명상 10분 따라하기”
- Chip3 명상-28 “초보 명상 15분 따라하기”

-----------------------
E-3) 운동(EXERCISE) 서브타입
-----------------------
E1_IndoorWalkMorning (아침 걷기 유도)
조건: 활동=WARN AND timeOfDay=MORNING AND 피로!=WARN
번들:
- Chip1 운동-23 “아침 햇빛 산책 준비 스트레칭 5분”
- Chip2 운동-07 “실내 걷기 15분 초보 따라하기”
- Chip3 운동-06 “시니어 실내 걷기 운동 20분”

E2_ChairFriendly (앉아서 가능)
조건: 사용자가 ‘의자/앉아서’ 선호(접근성 설정) 또는 피로=OK 이지만 부담이 있는 날
번들:
- Chip1 운동-02 “의자 스트레칭 5분 목 어깨 풀기”
- Chip2 운동-17 “의자 요가 10분 초보”
- Chip3 운동-19 “앉아서 하는 전신 체조 15분”

E3_GentleStretchEvening (저녁 가벼운 스트레칭)
조건: timeOfDay=EVENING AND 활동=WARN AND 피로!=WARN
번들:
- Chip1 운동-38 “잠자기 전 가벼운 스트레칭 5분”
- Chip2 운동-05 “저녁 몸 풀기 스트레칭 10분”
- Chip3 운동-27 “전신 릴렉스 스트레칭 12분”

E4_BalanceCore (균형/코어(가벼움))
조건: WARN이 하나도 없고 사용자 목표가 ‘운동’으로 고정된 날(옵션 override)
번들:
- Chip1 운동-16 “균형감각 운동 8분 초보”
- Chip2 운동-14 “등 펴는 스트레칭 6분 루틴”
- Chip3 운동-13 “부담 적은 코어 운동 8분 초보”

-----------------------
E-4) 식단(FOOD) 서브타입
-----------------------
F1_BalancedDay (하루 균형 아이디어)
조건: 전반적으로 GOOD/OK 위주
번들:
- Chip1 식단-01 “자연식 아침 간단 레시피”
- Chip2 식단-06 “집밥 점심 한그릇 요리”
- Chip3 식단-11 “저녁 가볍게 먹는 한그릇 레시피”

F2_WarmLightDinner (저녁 부담 줄이기)
조건: timeOfDay=EVENING AND 전반적으로 OK 이상
번들:
- Chip1 식단-11 “저녁 가볍게 먹는 한그릇 레시피”
- Chip2 식단-12 “속 편한 저녁 국 레시피”
- Chip3 식단-21 “따뜻한 차 만들기 레시피”

F3_CampContinue (캠프 식단 연장)
조건: 사용자가 ‘캠프 식단 이어가기’ 선택(배너 클릭 등)
번들:
- Chip1 식단-17 “캠프 스타일 자연식 집밥 레시피”
- Chip2 식단-40 “캠프 연계 루틴 식단 아이디어”
- Chip3 식단-39 “장보기 리스트 만들기”

F4_WeeklyPlan (주간 계획)
조건: (옵션) 사용자가 ‘주간 계획’ 버튼을 눌렀을 때만(자동 추천 금지)
번들:
- Chip1 식단-38 “일주일 식단 계획 세우기”
- Chip2 식단-39 “장보기 리스트 만들기”
- Chip3 식단-28 “싱겁게 맛있게 요리하는 방법”

섹션 F) 데이터 없을 때(UNKNOWN) 추천
- UNKNOWN이 2개 이상이면: 오늘 추천 카테고리=명상(M1_QuickCalm)로 제한(가장 안전/부담 적음)
- 상단에 “워치 연결하면 더 정확히 추천할 수 있어요” 안내 배너 표시

섹션 G) (선택) 중복 방지 — 과잉 기능 금지, 최소 규칙만
- 최근 3일간 동일 템플릿 ID가 Chip #1로 연속 선택되지 않도록만 회피(가능할 때)
- 불가능하면 중복 허용(추천 품질보다 안정성/단순성 우선)

섹션 H) 개발 구현용 “Reason Code” 정의(로그/설명 공통)
- R_SLEEP_WARN, R_RHYTHM_WARN, R_STRESS_WARN, R_FATIGUE_WARN, R_ACTIVITY_WARN, R_DATA_UNKNOWN
- R_TIME_MORNING, R_TIME_DAY, R_TIME_EVENING
- R_GOAL_OVERRIDE_EXERCISE, R_GOAL_OVERRIDE_MEDITATION
이 Reason Code는:
(1) WhyReco 바텀시트 문장 생성
(2) 추천 카테고리/서브타입 결정
(3) 로그 분석(추천 품질 개선)
에 공통 사용한다.

====================================================
14_AI_Reco_Scenarios 페이지(상황별 매칭 예시 20세트)
====================================================
[레이아웃 요구]
- 20개의 “Scenario Card”를 2열 그리드로 배치(스크롤)
- 각 카드 구성:
  (1) 입력: MetricState 칩 5개 + timeOfDay
  (2) 출력: 오늘 추천 카테고리(배지) + Chip 3개(짧게/대안/조금 더 라벨)
  (3) “왜” 한 줄(비유 포함)
  (4) 적용 서브타입 + Reason code (작게)

[시나리오 20세트 — 아래 내용을 그대로 카드로 생성]
S01
입력: 수면=WARN, 활동=OK, 피로=WARN, 스트레스=OK, 리듬=WARN, time=EVENING
출력: 카테고리=수면루틴, 서브타입=S1_BedtimePrep
Chip1 수면-05 / Chip2 수면-03 / Chip3 수면-02
Why: “배터리가 덜 충전된 날이라, 오늘은 수면 준비부터 해보면 좋아요.”
Reason: R_SLEEP_WARN, R_FATIGUE_WARN, R_RHYTHM_WARN, R_TIME_EVENING

S02
입력: 수면=WARN, 활동=OK, 피로=OK, 스트레스=WARN, 리듬=OK, time=EVENING
출력: 수면루틴, 서브타입=S2_FragmentedSleep
Chip1 수면-22 / Chip2 수면-04 / Chip3 수면-01
Why: “잠이 끊긴 날은 ‘숨→몸 이완→짧은 루틴’ 순서가 도움이 될 수 있어요.”
Reason: R_SLEEP_WARN, R_STRESS_WARN, R_TIME_EVENING

S03
입력: 수면=OK, 활동=OK, 피로=WARN, 스트레스=WARN, 리듬=OK, time=DAY
출력: 명상, 서브타입=M2_BodyRelax
Chip1 명상-01 / Chip2 명상-05 / Chip3 명상-18
Why: “피로가 높을 땐 몸을 먼저 풀어주면 마음도 같이 안정될 수 있어요.”
Reason: R_FATIGUE_WARN, R_STRESS_WARN, R_TIME_DAY

S04
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=WARN, 리듬=OK, time=DAY
출력: 명상, 서브타입=M1_QuickCalm
Chip1 명상-03 / Chip2 명상-08 / Chip3 명상-10
Why: “엔진 과열 경고등이 켜진 느낌이면, 짧은 호흡부터 해보세요.”
Reason: R_STRESS_WARN, R_TIME_DAY

S05
입력: 수면=OK, 활동=WARN, 피로=OK, 스트레스=OK, 리듬=OK, time=MORNING
출력: 운동, 서브타입=E1_IndoorWalkMorning
Chip1 운동-23 / Chip2 운동-07 / Chip3 운동-06
Why: “오늘은 몸을 깨우는 가벼운 걷기부터 시작해보면 좋아요.”
Reason: R_ACTIVITY_WARN, R_TIME_MORNING

S06
입력: 수면=OK, 활동=WARN, 피로=OK, 스트레스=OK, 리듬=OK, time=DAY + (접근성)앉아서 선호
출력: 운동, 서브타입=E2_ChairFriendly
Chip1 운동-02 / Chip2 운동-17 / Chip3 운동-19
Why: “부담을 줄이려면 ‘앉아서 하는 움직임’부터 해보면 좋아요.”
Reason: R_ACTIVITY_WARN, R_TIME_DAY

S07
입력: 수면=OK, 활동=WARN, 피로=OK, 스트레스=WARN, 리듬=OK, time=DAY
출력: 명상, 서브타입=M4_WalkMindful
Chip1 명상-23 / Chip2 명상-20 / Chip3 명상-28
Why: “움직이며 마음을 안정시키는 방식이 오늘은 부담이 덜할 수 있어요.”
Reason: R_ACTIVITY_WARN, R_STRESS_WARN, R_TIME_DAY

S08
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=OK, 리듬=WARN, time=MORNING
출력: 수면루틴, 서브타입=S3_RhythmResetMorning
Chip1 수면-11 / Chip2 수면-10 / Chip3 수면-24
Why: “리듬은 ‘아침 한 번’이 방향을 잡아줄 때가 많아요.”
Reason: R_RHYTHM_WARN, R_TIME_MORNING

S09
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=WARN, 리듬=WARN, time=EVENING
출력: 수면루틴, 서브타입=S1_BedtimePrep(우선) + 디지털디톡스 섞기
Chip1 수면-08 / Chip2 수면-25 / Chip3 수면-02
Why: “오늘은 리듬을 정리하는 ‘저녁 루틴’이 도움이 될 수 있어요.”
Reason: R_RHYTHM_WARN, R_STRESS_WARN, R_TIME_EVENING

S10
입력: 수면=WARN, 활동=OK, 피로=OK, 스트레스=OK, 리듬=WARN, time=MORNING
출력: 수면루틴, 서브타입=S5_Habits
Chip1 수면-11 / Chip2 수면-15 / Chip3 수면-08
Why: “오늘 하루를 ‘리듬 정리 모드’로 만들어보면 좋아요.”
Reason: R_SLEEP_WARN, R_RHYTHM_WARN, R_TIME_MORNING

S11
입력: 수면=OK, 활동=OK, 피로=WARN, 스트레스=OK, 리듬=OK, time=DAY
출력: 명상, 서브타입=M2_BodyRelax
Chip1 명상-38 / Chip2 명상-05 / Chip3 명상-18
Why: “피곤할 땐 ‘짧게 숨 고르기→몸 이완’이 먼저예요.”
Reason: R_FATIGUE_WARN, R_TIME_DAY

S12
입력: 수면=GOOD, 활동=GOOD, 피로=OK, 스트레스=OK, 리듬=GOOD, time=DAY
출력: 식단, 서브타입=F1_BalancedDay
Chip1 식단-01 / Chip2 식단-06 / Chip3 식단-11
Why: “오늘은 안정적이라, 부담 없는 식사로 리듬을 유지해볼까요?”
Reason: R_TIME_DAY

S13
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=OK, 리듬=OK, time=EVENING
출력: 식단, 서브타입=F2_WarmLightDinner
Chip1 식단-11 / Chip2 식단-12 / Chip3 식단-21
Why: “저녁은 가볍고 따뜻하게 마무리하면 수면 준비에 도움이 될 수 있어요.”
Reason: R_TIME_EVENING

S14
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=OK, 리듬=OK, time=DAY + 사용자가 ‘주간 계획’ 버튼 클릭
출력: 식단, 서브타입=F4_WeeklyPlan
Chip1 식단-38 / Chip2 식단-39 / Chip3 식단-28
Why: “계획을 한 번 세워두면 ‘고민 비용’이 줄어들 수 있어요.”
Reason: R_TIME_DAY

S15
입력: 수면=GOOD, 활동=GOOD, 피로=OK, 스트레스=OK, 리듬=GOOD, time=DAY + 사용자 목표=운동(고정)
출력: 운동, 서브타입=E4_BalanceCore(옵션 override)
Chip1 운동-16 / Chip2 운동-14 / Chip3 운동-13
Why: “좋은 날엔 가볍게 ‘유지 루틴’을 해보는 것도 좋아요.”
Reason: R_GOAL_OVERRIDE_EXERCISE, R_TIME_DAY

S16
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=OK, 리듬=OK, time=EVENING + 사용자 목표=명상(고정)
출력: 명상, 서브타입=M3_EveningWindDown(옵션 override)
Chip1 명상-15 / Chip2 명상-16 / Chip3 명상-28
Why: “하루를 정리하는 마음 루틴으로 편안하게 마무리해볼까요?”
Reason: R_GOAL_OVERRIDE_MEDITATION, R_TIME_EVENING

S17
입력: 수면=UNKNOWN, 활동=UNKNOWN, 피로=UNKNOWN, 스트레스=UNKNOWN, 리듬=UNKNOWN, time=DAY
출력: 명상, 서브타입=M1_QuickCalm(기본 안전 추천)
Chip1 명상-03 / Chip2 명상-01 / Chip3 명상-10
Why: “데이터가 없을 땐, 가장 부담 적은 호흡부터 시작해보면 좋아요.”
Reason: R_DATA_UNKNOWN, R_TIME_DAY

S18
입력: 수면=WARN, 활동=OK, 피로=WARN, 스트레스=OK, 리듬=OK, time=DAY
출력: 수면루틴, 서브타입=S4_DayNapRecovery
Chip1 수면-05 / Chip2 수면-14 / Chip3 수면-13
Why: “낮에 잠깐 회복해두면 저녁 리듬이 덜 무너질 수 있어요.”
Reason: R_SLEEP_WARN, R_FATIGUE_WARN, R_TIME_DAY

S19
입력: 수면=OK, 활동=WARN, 피로=OK, 스트레스=OK, 리듬=OK, time=EVENING
출력: 운동, 서브타입=E3_GentleStretchEvening
Chip1 운동-38 / Chip2 운동-05 / Chip3 운동-27
Why: “오늘은 무리보다 ‘부드럽게 풀기’가 더 잘 맞을 수 있어요.”
Reason: R_ACTIVITY_WARN, R_TIME_EVENING

S20
입력: 수면=OK, 활동=OK, 피로=OK, 스트레스=WARN, 리듬=OK, time=EVENING
출력: 명상, 서브타입=M3_EveningWindDown
Chip1 명상-06 / Chip2 명상-11 / Chip3 명상-27
Why: “마음을 먼저 가라앉히면, 밤이 더 편안해질 수 있어요.”
Reason: R_STRESS_WARN, R_TIME_EVENING

[시나리오 카드 UI 구성 요소]
- 입력 칩: CMP/Chip/MetricState
- 출력 칩: CMP/Chip/Query (각 칩 위에 라벨: “짧게/대안/조금 더”)
- Why: 한 줄 + 비유
- 하단 작게: 서브타입/Reason code