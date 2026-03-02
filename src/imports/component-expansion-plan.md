[목표]
현재 컴포넌트 라이브러리를 “기능 구현 가능한 수준”으로 확장한다.
각 컴포넌트는 반드시 상태(기본/로딩/비활성/오류/완료) Variant가 있고,
텍스트는 한국어 고령친화 톤으로 구성한다.

[신규/확장 컴포넌트 목록 — 반드시 추가]
1) CMP/Segment/ModeSwitch
- “일상 | 캠프” 상단 세그먼트
- 상태: default/selected/disabled
- 접근성: 선택 영역 높이 44 이상

2) CMP/Sync/StatusPill
- “동기화됨(방금)” “동기화 필요” “동기화 실패” “오프라인 저장 중”
- 탭하면 Bottom Sheet로 상세(왜/해결 방법)

3) CMP/Card/RhythmScore
- 제목: “오늘의 리듬 안정도”
- 게이지(0~100) + 1줄 쉬운 설명(비유)
- CTA(Primary 1개) + 보조 CTA(텍스트 링크 1개)
- Variants: normal / empty(워치 미연결) / stale(마지막 동기화 오래됨)

4) CMP/Card/Metric (기존 강화)
- 상단: 아이콘 + 지표명 + 기준선 대비/어제 대비
- 중앙: 값(큰글씨) + Status Chip
- 하단: “비유 1줄” + [오늘 추천 보기]
- Variants: compact/normal/expanded + empty + loading(skeleton) + error

5) CMP/Card/Recommendation
- 구성: 카테고리 태그(운동/명상/식단/산책/수면루틴) + 강도 라벨(가벼움/보통) + 소요시간
- “왜 추천?” 1줄(필수)
- CTA: [YouTube로 보기] 또는 [가이드 보기]
- 버튼 2개: [오늘 계획에 넣기] [나중에]
- Variants: primaryPick(오늘 1순위) / secondary / completed(완료 스탬프)

6) CMP/Card/YouTubeResult
- 썸네일 + 제목(2줄) + 채널명 + 재생시간
- 하단 문구: “외부(YouTube)로 이동합니다.”
- 버튼: [바로 보기]
- Variants: normal / loading / noResult(검색 결과 없음)

7) CMP/BottomSheet/ExplainWhy
- 제목: “왜 이렇게 나왔나요?”
- 3~5단계 연결 스토리(칩+화살표) + 비유 카드 + 오늘 추천 2~3개

8) CMP/Toast & CMP/Snackbar
- “저장했어요” “오늘 계획에 추가했어요” “오프라인으로 저장 중이에요”

9) CMP/Form/StepperInput
- 코디네이터 점수 입력용 + 참가자 최소 입력용 공용
- + / - 버튼, 최소/최대, 숫자 직접 입력은 선택(기본 숨김)

10) CMP/Checklist/DailyPlan
- 오늘 할 일 1~3개 체크박스
- 완료 시 “오늘 한 줄 기록(선택)”으로 이어지는 버튼

11) CMP/Dialog/SafetyConfirm (2단계 확인)
- 긴급 전화/연계 전: “지금 연결할까요?” 확인
- 버튼: [전화하기] [취소]

12) CMP/Consent/ToggleCard
- 필수/선택 뱃지
- 요약 1줄 + “자세히” 펼침(accordion)
- 동의 철회 UX(설정에서 동일 컴포넌트 재사용)

[디자인 규칙 재확인]
- 버튼 높이 52, 카드 radius 16, 여백 16
- 상태색은 색만 사용 금지(아이콘+라벨 동시)
- 차트는 ‘설명 가능한 최소’만(고령친화)