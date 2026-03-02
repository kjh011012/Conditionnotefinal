/**
 * 13_AI_Reco_RuleSpec
 * AI 추천 룰 스펙 문서 페이지
 * 섹션 A~H: 톤/주의, 입력→상태 정규화, 카테고리 선택, 칩 생성, 서브타입 번들, UNKNOWN, 중복 방지, Reason Code
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Shield, Database, Target, Layers, GitBranch,
  HelpCircle, Copy, Tag, ChevronDown, ChevronRight,
  Moon, Dumbbell, Wind, Utensils, AlertTriangle, Monitor,
} from 'lucide-react';

/* ─── Accordion Section ─── */
function Section({
  id, icon, title, children, defaultOpen = false,
}: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 min-h-[52px]"
      >
        {icon}
        <span className="flex-1 text-left text-[15px] text-[#111827]">{id}. {title}</span>
        {open ? <ChevronDown size={16} className="text-[#9CA3AF]" /> : <ChevronRight size={16} className="text-[#9CA3AF]" />}
      </button>
      {open && <div className="px-4 pb-4 border-t border-[#F3F4F6]">{children}</div>}
    </div>
  );
}

function RuleItem({ children }: { children: React.ReactNode }) {
  return <li className="text-[13px] text-[#374151] py-1" style={{ lineHeight: 1.6 }}>{children}</li>;
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#F7F8FA] rounded-[10px] px-3 py-2.5 text-[11px] text-[#374151] overflow-x-auto whitespace-pre-wrap" style={{ lineHeight: 1.5 }}>
      {children}
    </pre>
  );
}

function SubtypeCard({
  code, name, condition, bundle,
}: { code: string; name: string; condition: string; bundle: { chip: string; id: string; label: string }[] }) {
  return (
    <div className="bg-[#F7F8FA] rounded-[12px] p-3 mb-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] text-white bg-[#6B7280] px-2 py-0.5 rounded-full">{code}</span>
        <span className="text-[13px] text-[#111827]">{name}</span>
      </div>
      <p className="text-[11px] text-[#6B7280] mb-2">조건: {condition}</p>
      <div className="flex flex-col gap-1">
        {bundle.map(b => (
          <div key={b.chip} className="flex items-center gap-2">
            <span className="text-[10px] text-[#9CA3AF] w-12">{b.chip}</span>
            <span className="text-[10px] text-[#1B7A4B] bg-[#E8F5EE] px-1.5 py-0.5 rounded">{b.id}</span>
            <span className="text-[11px] text-[#374151]">"{b.label}"</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIRecoRuleSpecPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">AI 추천 룰 스펙</h2>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-3">
        {/* Intro */}
        <div className="bg-[#E8F5EE] rounded-[14px] p-4">
          <p className="text-[13px] text-[#0E4B2E]" style={{ lineHeight: 1.6 }}>
            이 문서는 "AI 추천 → 카테고리 → YouTube 검색어 칩 3개" 시스템의 룰 스펙입니다.
            의료 진단/치료가 아니라 <strong>생활 리듬 가이드 + 외부(YouTube) 콘텐츠 연결</strong>이며,
            모든 추천에는 "왜 이 추천인지" 설명이 제공됩니다.
          </p>
        </div>

        {/* ═══ 섹션 A ═══ */}
        <Section id="A" icon={<Shield size={16} className="text-[#DC2626]" />} title="제품 톤/주의 (고정)" defaultOpen>
          <ul className="list-disc pl-4 mt-3">
            <RuleItem><strong>"진단/치료/처방/확정"</strong> 표현 금지</RuleItem>
            <RuleItem>"~일 수 있어요 / ~해보세요 / 도움이 될 수 있어요" 톤 유지</RuleItem>
            <RuleItem>결과 화면에 <strong>"외부(YouTube)로 이동합니다."</strong> 고정 표기</RuleItem>
            <RuleItem>위험 신호(정서 Red 등) 시: '콘텐츠 추천'보다 <strong>'도움 연결' CTA 우선</strong>(2단계 확인 모달)</RuleItem>
          </ul>
        </Section>

        {/* ═══ 섹션 B ═══ */}
        <Section id="B" icon={<Database size={16} className="text-[#0EA5E9]" />} title="입력 → 상태(3단계) 정규화">
          <div className="mt-3">
            <p className="text-[12px] text-[#6B7280] mb-2">입력 원천</p>
            <div className="bg-[#F7F8FA] rounded-[10px] p-3 mb-3">
              <ul className="list-disc pl-4">
                <RuleItem>수면(워치), 활동(워치), 피로(기기/워치), 스트레스(기기/워치), 리듬 안정도(앱 점수)</RuleItem>
              </ul>
            </div>
            <p className="text-[12px] text-[#6B7280] mb-2">사용자에게는 "좋음/보통/주의" 3단계로만 표시 (숫자 남발 금지)</p>
            <p className="text-[13px] text-[#374151] mb-2">정규화 규칙:</p>
            <ol className="list-decimal pl-4">
              <RuleItem>기준선(최근 7일 평균)이 있으면 "상대 비교"가 1순위</RuleItem>
              <RuleItem>기준선이 없으면 "완화된 절대 기준(초기값)"로만 분류(단정 금지)</RuleItem>
              <RuleItem>데이터가 없으면 <strong>"알 수 없음(UNKNOWN)"</strong>로 표시, 추천은 '안전한 기본'으로 제한</RuleItem>
            </ol>
            <div className="mt-2 bg-[#F7F8FA] rounded-[10px] p-3">
              <p className="text-[12px] text-[#374151]">상태 값: <strong>GOOD / OK / WARN / UNKNOWN</strong></p>
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 C ═══ */}
        <Section id="C" icon={<Target size={16} className="text-[#FF8A3D]" />} title="추천 카테고리 선택 규칙">
          <div className="mt-3">
            <p className="text-[12px] text-[#6B7280] mb-2">카테고리: 수면루틴 / 명상 / 운동 / 식단 — '오늘 추천' 1개만 배지</p>
            <CodeBlock>{`우선순위 규칙:
1) (수면=WARN) OR (리듬=WARN) → 수면루틴
2) else if (스트레스=WARN) OR (피로=WARN) → 명상
3) else if (활동=WARN) AND (피로!=WARN) → 운동
4) else → 식단
5) (옵션) 사용자 목표 고정이 있고
   "WARN이 하나도 없을 때만" 목표 카테고리로 override`}</CodeBlock>

            <p className="text-[13px] text-[#374151] mt-3 mb-2">"왜" 한 줄 템플릿:</p>
            <div className="flex flex-col gap-1.5">
              {[
                { cat: '수면루틴', icon: Moon, color: '#0EA5E9', text: '"수면/리듬이 조금 들쑥날쑥해서, 오늘은 \'배터리 충전\'부터 도와줄게요."' },
                { cat: '명상', icon: Wind, color: '#7C3AED', text: '"스트레스/피로가 올라가 있어서, 오늘은 \'긴장 풀기\'부터 해보면 좋아요."' },
                { cat: '운동', icon: Dumbbell, color: '#1B7A4B', text: '"오늘 활동이 적어서, 가볍게 몸을 깨우는 움직임을 추천해요."' },
                { cat: '식단', icon: Utensils, color: '#EA580C', text: '"오늘은 전반적으로 안정적이라, 부담 없는 식사 아이디어로 리듬을 유지해볼까요?"' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.cat} className="flex items-start gap-2 bg-[#F7F8FA] rounded-[10px] p-2.5">
                    <Icon size={14} style={{ color: item.color }} className="mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px]" style={{ color: item.color }}>{item.cat}</span>
                      <p className="text-[12px] text-[#374151]">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 D ═══ */}
        <Section id="D" icon={<Layers size={16} className="text-[#7C3AED]" />} title="칩 3개 생성 규칙 (짧게/대안/조금 더)">
          <div className="mt-3">
            <ul className="list-disc pl-4 mb-3">
              <RuleItem><strong>Chip #1</strong> = '짧게/가장 쉬움' (5~10분, 초보/시니어/가벼움)</RuleItem>
              <RuleItem><strong>Chip #2</strong> = '대안' (앉아서/누워서/걷기 등 다른 형태)</RuleItem>
              <RuleItem><strong>Chip #3</strong> = '조금 더' (10~20분 또는 루틴형)</RuleItem>
            </ul>
            <div className="bg-[#FEF2F2] rounded-[10px] p-3">
              <p className="text-[12px] text-[#DC2626]">칩 다양성 규칙 (중요):</p>
              <ul className="list-disc pl-4">
                <RuleItem>3개 칩은 서로 "형태/포지션/맥락"이 달라야 한다 (호흡만 3개 금지)</RuleItem>
                <RuleItem>같은 단어가 반복되는 유사 검색어 3개 금지</RuleItem>
                <RuleItem>사용자 선호(영상 길이/강도)가 있으면 Chip #1과 #2에 우선 반영</RuleItem>
              </ul>
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 E ═══ */}
        <Section id="E" icon={<GitBranch size={16} className="text-[#1B7A4B]" />} title="서브타입 + 번들 (템플릿 3개 묶음)">
          <div className="mt-3">
            <p className="text-[12px] text-[#6B7280] mb-3">카테고리마다 '상황 분기(서브타입)'를 최소로 둔다. 서브타입에 따라 기본 번들(3개 템플릿 ID)을 매칭.</p>

            {/* E-1 수면루틴 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Moon size={14} className="text-[#0EA5E9]" />
                <span className="text-[14px] text-[#111827]">E-1) 수면루틴 (SLEEP)</span>
              </div>
              <SubtypeCard code="S1" name="BedtimePrep (저녁/취침 전)" condition="timeOfDay=EVENING 또는 밤에 진입"
                bundle={[
                  { chip: 'Chip1', id: '수면-05', label: '수면 준비 호흡 5분' },
                  { chip: 'Chip2', id: '수면-03', label: '취침 전 스트레칭 5분 루틴' },
                  { chip: 'Chip3', id: '수면-02', label: '편안한 밤을 위한 저녁 루틴 15분' },
                ]} />
              <SubtypeCard code="S2" name="FragmentedSleep (끊긴 수면)" condition="수면=WARN + 각성/끊김 이슈"
                bundle={[
                  { chip: 'Chip1', id: '수면-22', label: '잠이 안 올 때 4-4-6 호흡' },
                  { chip: 'Chip2', id: '수면-04', label: '자기 전 바디스캔 10분' },
                  { chip: 'Chip3', id: '수면-01', label: '잠들기 전 10분 수면 루틴' },
                ]} />
              <SubtypeCard code="S3" name="RhythmResetMorning (아침 리셋)" condition="리듬=WARN AND timeOfDay=MORNING"
                bundle={[
                  { chip: 'Chip1', id: '수면-11', label: '아침 햇빛 루틴 5분' },
                  { chip: 'Chip2', id: '수면-10', label: '일정한 기상시간 만들기 팁' },
                  { chip: 'Chip3', id: '수면-24', label: '수면 일정 규칙성 만들기' },
                ]} />
              <SubtypeCard code="S4" name="DayNapRecovery (낮 회복)" condition="피로=WARN AND timeOfDay=DAY"
                bundle={[
                  { chip: 'Chip1', id: '수면-05', label: '수면 준비 호흡 5분' },
                  { chip: 'Chip2', id: '수면-14', label: '낮잠 타이머 설정 방법' },
                  { chip: 'Chip3', id: '수면-13', label: '낮잠 가이드 15분' },
                ]} />
              <SubtypeCard code="S5" name="Habits (습관 교정)" condition="수면/리듬=WARN + 습관/환경이 더 적합"
                bundle={[
                  { chip: 'Chip1', id: '수면-15', label: '저녁 카페인 끊는 시간 팁' },
                  { chip: 'Chip2', id: '수면-08', label: '저녁 스마트폰 줄이는 루틴' },
                  { chip: 'Chip3', id: '수면-29', label: '편안한 밤을 위한 방 온도 팁' },
                ]} />
            </div>

            {/* E-2 명상 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind size={14} className="text-[#7C3AED]" />
                <span className="text-[14px] text-[#111827]">E-2) 명상 (MEDITATION)</span>
              </div>
              <SubtypeCard code="M1" name="QuickCalm (즉시 진정)" condition="스트레스=WARN AND 피로!=WARN"
                bundle={[
                  { chip: 'Chip1', id: '명상-03', label: '3분 마음 진정 호흡' },
                  { chip: 'Chip2', id: '명상-08', label: '스트레스 풀어주는 호흡 8분' },
                  { chip: 'Chip3', id: '명상-10', label: '초보를 위한 마음챙김 명상 10분' },
                ]} />
              <SubtypeCard code="M2" name="BodyRelax (긴장 이완)" condition="피로=WARN (스트레스 무관)"
                bundle={[
                  { chip: 'Chip1', id: '명상-01', label: '5분 호흡 명상 초보 따라하기' },
                  { chip: 'Chip2', id: '명상-05', label: '바디스캔 명상 10분 누워서' },
                  { chip: 'Chip3', id: '명상-18', label: '가벼운 요가 니드라 15분' },
                ]} />
              <SubtypeCard code="M3" name="EveningWindDown (저녁 정리)" condition="timeOfDay=EVENING AND (스트레스/피로=WARN)"
                bundle={[
                  { chip: 'Chip1', id: '명상-06', label: '저녁 마음 정리 명상 10분' },
                  { chip: 'Chip2', id: '명상-11', label: '잠들기 전 이완 명상 10분' },
                  { chip: 'Chip3', id: '명상-27', label: '자기 전 바디스캔 12분' },
                ]} />
              <SubtypeCard code="M4" name="WalkMindful (움직이며 안정)" condition="활동=WARN AND 스트레스=WARN"
                bundle={[
                  { chip: 'Chip1', id: '명상-23', label: '아침 햇빛과 함께 짧은 명상 5분' },
                  { chip: 'Chip2', id: '명상-20', label: '걷기 명상 10분 따라하기' },
                  { chip: 'Chip3', id: '명상-28', label: '초보 명상 15분 따라하기' },
                ]} />
            </div>

            {/* E-3 운동 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell size={14} className="text-[#1B7A4B]" />
                <span className="text-[14px] text-[#111827]">E-3) 운동 (EXERCISE)</span>
              </div>
              <SubtypeCard code="E1" name="IndoorWalkMorning (아침 걷기)" condition="활동=WARN AND MORNING AND 피로!=WARN"
                bundle={[
                  { chip: 'Chip1', id: '운동-23', label: '아침 햇빛 산책 준비 스트레칭 5분' },
                  { chip: 'Chip2', id: '운동-07', label: '실내 걷기 15분 초보 따라하기' },
                  { chip: 'Chip3', id: '운동-06', label: '시니어 실내 걷기 운동 20분' },
                ]} />
              <SubtypeCard code="E2" name="ChairFriendly (앉아서 가능)" condition="의자/앉아서 선호 또는 부담이 있는 날"
                bundle={[
                  { chip: 'Chip1', id: '운동-02', label: '의자 스트레칭 5분 목 어깨 풀기' },
                  { chip: 'Chip2', id: '운동-17', label: '의자 요가 10분 초보' },
                  { chip: 'Chip3', id: '운동-19', label: '앉아서 하는 전신 체조 15분' },
                ]} />
              <SubtypeCard code="E3" name="GentleStretchEvening (저녁 스트레칭)" condition="EVENING AND 활동=WARN AND 피로!=WARN"
                bundle={[
                  { chip: 'Chip1', id: '운동-38', label: '잠자기 전 가벼운 스트레칭 5분' },
                  { chip: 'Chip2', id: '운동-05', label: '저녁 몸 풀기 스트레칭 10분' },
                  { chip: 'Chip3', id: '운동-27', label: '전신 릴렉스 스트레칭 12분' },
                ]} />
              <SubtypeCard code="E4" name="BalanceCore (균형/코어)" condition="WARN 없음 + 사용자 목표=운동"
                bundle={[
                  { chip: 'Chip1', id: '운동-16', label: '균형감각 운동 8분 초보' },
                  { chip: 'Chip2', id: '운동-14', label: '등 펴는 스트레칭 6분 루틴' },
                  { chip: 'Chip3', id: '운동-13', label: '부담 적은 코어 운동 8분 초보' },
                ]} />
            </div>

            {/* E-4 식단 */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Utensils size={14} className="text-[#EA580C]" />
                <span className="text-[14px] text-[#111827]">E-4) 식단 (FOOD)</span>
              </div>
              <SubtypeCard code="F1" name="BalancedDay (하루 균형)" condition="전반적으로 GOOD/OK"
                bundle={[
                  { chip: 'Chip1', id: '식단-01', label: '자연식 아침 간단 레시피' },
                  { chip: 'Chip2', id: '식단-06', label: '집밥 점심 한그릇 요리' },
                  { chip: 'Chip3', id: '식단-11', label: '저녁 가볍게 먹는 한그릇 레시피' },
                ]} />
              <SubtypeCard code="F2" name="WarmLightDinner (저녁 가볍게)" condition="EVENING AND 전반 OK 이상"
                bundle={[
                  { chip: 'Chip1', id: '식단-11', label: '저녁 가볍게 먹는 한그릇 레시피' },
                  { chip: 'Chip2', id: '식단-12', label: '속 편한 저녁 국 레시피' },
                  { chip: 'Chip3', id: '식단-21', label: '따뜻한 차 만들기 레시피' },
                ]} />
              <SubtypeCard code="F3" name="CampContinue (캠프 식단 연장)" condition="사용자가 '캠프 식단 이어가기' 선택"
                bundle={[
                  { chip: 'Chip1', id: '식단-17', label: '캠프 스타일 자연식 집밥 레시피' },
                  { chip: 'Chip2', id: '식단-40', label: '캠프 연계 루틴 식단 아이디어' },
                  { chip: 'Chip3', id: '식단-39', label: '장보기 리스트 만들기' },
                ]} />
              <SubtypeCard code="F4" name="WeeklyPlan (주간 계획)" condition="사용자가 '주간 계획' 버튼 클릭 시만"
                bundle={[
                  { chip: 'Chip1', id: '식단-38', label: '일주일 식단 계획 세우기' },
                  { chip: 'Chip2', id: '식단-39', label: '장보기 리스트 만들기' },
                  { chip: 'Chip3', id: '식단-28', label: '싱겁게 맛있게 요리하는 방법' },
                ]} />
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 F ═══ */}
        <Section id="F" icon={<HelpCircle size={16} className="text-[#F59E0B]" />} title="데이터 없을 때 (UNKNOWN) 추천">
          <div className="mt-3">
            <ul className="list-disc pl-4">
              <RuleItem>UNKNOWN이 2개 이상이면: 오늘 추천 카테고리 = <strong>명상(M1_QuickCalm)</strong>으로 제한 (가장 안전/부담 적음)</RuleItem>
              <RuleItem>상단에 <strong>"워치 연결하면 더 정확히 추천할 수 있어요"</strong> 안내 배너 표시</RuleItem>
            </ul>
          </div>
        </Section>

        {/* ═══ 섹션 G ═══ */}
        <Section id="G" icon={<Copy size={16} className="text-[#6B7280]" />} title="중복 방지 (최소 규칙)">
          <div className="mt-3">
            <ul className="list-disc pl-4">
              <RuleItem>최근 3일간 동일 템플릿 ID가 Chip #1로 연속 선택되지 않도록만 회피 (가능할 때)</RuleItem>
              <RuleItem>불가능하면 중복 허용 (추천 품질보다 <strong>안정성/단순성 우선</strong>)</RuleItem>
            </ul>
          </div>
        </Section>

        {/* ═══ 섹션 H ═══ */}
        <Section id="H" icon={<Tag size={16} className="text-[#7C3AED]" />} title='Reason Code 정의 (로그/설명 공통)'>
          <div className="mt-3">
            <CodeBlock>{`상태 Reason:
  R_SLEEP_WARN, R_RHYTHM_WARN, R_STRESS_WARN,
  R_FATIGUE_WARN, R_ACTIVITY_WARN, R_DATA_UNKNOWN

시간 Reason:
  R_TIME_MORNING, R_TIME_DAY, R_TIME_EVENING

목표 Override:
  R_GOAL_OVERRIDE_EXERCISE, R_GOAL_OVERRIDE_MEDITATION`}</CodeBlock>
            <p className="text-[12px] text-[#6B7280] mt-2">이 Reason Code는 아래 3곳에서 공통 사용:</p>
            <ol className="list-decimal pl-4">
              <RuleItem>WhyReco 바텀시트 문장 생성</RuleItem>
              <RuleItem>추천 카테고리/서브타입 결정</RuleItem>
              <RuleItem>로그 분석 (추천 품질 개선)</RuleItem>
            </ol>
          </div>
        </Section>

        {/* ═══ 섹션 I: UI 컴포넌트 연결 다이어그램 ═══ */}
        <Section id="I" icon={<Monitor size={16} className="text-[#0EA5E9]" />} title="UI 컴포넌트 ↔ 룰 연결">
          <div className="mt-3">
            <p className="text-[12px] text-[#6B7280] mb-3">사용자에게 보이는 것은 '상태 칩'과 '왜 추천인지' 1줄 뿐이며, 임상 점수/진단 없음</p>

            {/* Flow diagram */}
            <div className="bg-[#F7F8FA] rounded-[14px] p-4 mb-3">
              <div className="flex flex-col gap-2">
                {[
                  { step: '입력', comp: 'CMP/Chip/MetricState', desc: '수면·활동·피로·스트레스·리듬 (5개 상태 칩)', color: '#0EA5E9' },
                  { step: '카테고리', comp: 'CMP/Tab/RecoCategory', desc: '운동/명상/식단/수면루틴 탭 + "추천" 배지', color: '#FF8A3D' },
                  { step: '검색어', comp: 'CMP/Chip/Query (×3)', desc: '짧게/대안/조금 더 — 칩 3개', color: '#1B7A4B' },
                  { step: '설명', comp: 'CMP/BottomSheet/WhyReco', desc: '상태칩 5개 + 비유 1줄 + 칩 3개 재노출', color: '#7C3AED' },
                  { step: '결과', comp: 'CMP/Card/YouTubeResult', desc: '결과 리스트 (로딩/오류/빈결과 상태 포함)', color: '#DC2626' },
                ].map((item, i) => (
                  <div key={item.step}>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: item.color + '20' }}>
                        <span className="text-[9px]" style={{ color: item.color }}>{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <code className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: item.color + '15', color: item.color }}>{item.comp}</code>
                        <p className="text-[11px] text-[#374151] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    {i < 4 && (
                      <div className="flex justify-center py-0.5">
                        <div className="w-px h-3 bg-[#D1D5DB]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Screen components */}
            <p className="text-[13px] text-[#111827] mb-2">화면 구성 컴포넌트</p>
            <div className="flex flex-col gap-1.5">
              {[
                { comp: 'CMP/Screen/QueryBuilder', desc: '카테고리 탭 + 칩 3개 + "왜 이 추천?" + 추천 옵션(길이/강도)' },
                { comp: 'CMP/Screen/YouTubeResultList', desc: '결과 8~12개, 로딩/오류/빈결과 상태 포함' },
                { comp: 'CMP/BottomSheet/RecoSettings', desc: '영상 길이·강도 최소 설정' },
              ].map(item => (
                <div key={item.comp} className="flex items-start gap-2 bg-white rounded-[10px] p-2.5 border border-[#E5E7EB]">
                  <code className="text-[10px] text-[#0EA5E9] bg-[#E0F2FE] px-1.5 py-0.5 rounded shrink-0">{item.comp}</code>
                  <span className="text-[11px] text-[#374151]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Link buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate('/library/ai-reco-scenarios')}
            className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2"
          >
            상황별 20세트 시나리오 보기 <ChevronRight size={14} />
          </button>
          <button
            onClick={() => navigate('/library/ai-reco-json')}
            className="w-full h-[48px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-2"
          >
            JSON 룰셋 (개발 복사용) <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}