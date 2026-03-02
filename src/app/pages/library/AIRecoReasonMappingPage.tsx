/**
 * 15_AI_Reco_ReasonMapping
 * Reason 생성 → 서브타입 판정 → if-else 표
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, ChevronDown, ChevronRight, Database,
  Moon, Wind, Dumbbell, Utensils, Clock, AlertTriangle, Tag, Cpu,
} from 'lucide-react';

/* ─── Reusable Section ─── */
function Section({
  id, icon, title, children, defaultOpen = false,
}: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 min-h-[52px]">
        {icon}
        <span className="flex-1 text-left text-[15px] text-[#111827]">{id}. {title}</span>
        {open ? <ChevronDown size={16} className="text-[#9CA3AF]" /> : <ChevronRight size={16} className="text-[#9CA3AF]" />}
      </button>
      {open && <div className="px-4 pb-4 border-t border-[#F3F4F6]">{children}</div>}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#F7F8FA] rounded-[10px] px-3 py-2.5 text-[11px] text-[#374151] overflow-x-auto whitespace-pre-wrap" style={{ lineHeight: 1.55 }}>
      {children}
    </pre>
  );
}

function ReasonRow({ code, desc }: { code: string; desc: string }) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-[#F3F4F6] last:border-0">
      <code className="text-[11px] text-[#7C3AED] bg-[#F3E8FF] px-1.5 py-0.5 rounded shrink-0">{code}</code>
      <span className="text-[12px] text-[#374151]">{desc}</span>
    </div>
  );
}

export function AIRecoReasonMappingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">Reason → Subtype 매핑</h2>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-3">
        {/* Intro */}
        <div className="bg-[#FFF1E8] rounded-[14px] p-4">
          <p className="text-[13px] text-[#374151]" style={{ lineHeight: 1.6 }}>
            이 문서는 원천 데이터 → Reason Code 생성 → 카테고리/서브타입 판정의 <strong>if-else 매핑표</strong>입니다.
            임상 기준이 아니라 UX 납득을 위한 초기 휴리스틱이며, 기기별로 튜닝 가능합니다.
          </p>
        </div>

        {/* ═══ 섹션 1 ═══ */}
        <Section id="1" icon={<Database size={16} className="text-[#0EA5E9]" />} title="입력 → 상태 정규화" defaultOpen>
          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {['GOOD', 'OK', 'WARN', 'UNKNOWN'].map(s => {
                const colors: Record<string, string> = {
                  GOOD: 'bg-[#E8F5EE] text-[#1B7A4B]',
                  OK: 'bg-[#FEF9C3] text-[#A16207]',
                  WARN: 'bg-[#FEE2E2] text-[#DC2626]',
                  UNKNOWN: 'bg-[#F3F4F6] text-[#6B7280]',
                };
                return <span key={s} className={`text-[11px] px-2 py-1 rounded-full ${colors[s]}`}>{s}</span>;
              })}
            </div>
            <ul className="list-disc pl-4 text-[12px] text-[#374151] space-y-1">
              <li>대상: 수면, 활동, 피로, 스트레스, 리듬 (5개)</li>
              <li>기준선(7일 평균)이 있으면 <strong>상대 비교</strong> 우선</li>
              <li>기준선 없으면 완화된 절대 기준 사용</li>
              <li>데이터 없으면 <strong>UNKNOWN</strong> → 안전한 기본 추천으로 제한</li>
            </ul>
          </div>
        </Section>

        {/* ═══ 섹션 2 ═══ */}
        <Section id="2" icon={<Tag size={16} className="text-[#7C3AED]" />} title="Reason Code 정의">
          <div className="mt-3 flex flex-col gap-3">
            {/* Sleep */}
            <div>
              <p className="text-[12px] text-[#0EA5E9] mb-1 flex items-center gap-1"><Moon size={12} /> (A) SleepIssue</p>
              <ReasonRow code="RS_SLEEP_SHORT" desc="총 수면시간 부족" />
              <ReasonRow code="RS_SLEEP_FRAGMENTED" desc="각성/끊김 (자주 깨거나 효율 저하)" />
              <ReasonRow code="RS_SLEEP_IRREGULAR" desc="취침/기상 시간 들쑥날쑥 (규칙성 저하)" />
              <ReasonRow code="RS_SLEEP_QUALITY_LOW" desc="깊은/렘 '질' 지표가 평소보다 낮음" />
              <ReasonRow code="RS_SLEEP_UNKNOWN" desc="수면 데이터 부족/부정확" />
            </div>
            {/* Activity */}
            <div>
              <p className="text-[12px] text-[#1B7A4B] mb-1 flex items-center gap-1"><Dumbbell size={12} /> (B) ActivityIssue</p>
              <ReasonRow code="RS_ACTIVITY_LOW" desc="걸음/활동시간이 평소보다 낮음" />
              <ReasonRow code="RS_ACTIVITY_UNKNOWN" desc="활동 데이터 없음" />
            </div>
            {/* Fatigue */}
            <div>
              <p className="text-[12px] text-[#EA580C] mb-1">(C) FatigueIssue</p>
              <ReasonRow code="RS_FATIGUE_HIGH" desc="피로 높음 (기기/워치 분류 또는 스코어)" />
              <ReasonRow code="RS_FATIGUE_UNKNOWN" desc="피로 데이터 없음" />
            </div>
            {/* Stress */}
            <div>
              <p className="text-[12px] text-[#7C3AED] mb-1 flex items-center gap-1"><Wind size={12} /> (D) StressIssue</p>
              <ReasonRow code="RS_STRESS_HIGH" desc="스트레스 높음 (기기/워치 분류 또는 스코어)" />
              <ReasonRow code="RS_STRESS_UNKNOWN" desc="스트레스 데이터 없음" />
            </div>
            {/* Rhythm */}
            <div>
              <p className="text-[12px] text-[#6B7280] mb-1">(E) RhythmIssue</p>
              <ReasonRow code="RS_RHYTHM_LOW" desc="리듬 안정도 낮음 (앱 점수)" />
              <ReasonRow code="RS_RHYTHM_UNKNOWN" desc="리듬 데이터 없음" />
            </div>
            {/* Time */}
            <div>
              <p className="text-[12px] text-[#6B7280] mb-1 flex items-center gap-1"><Clock size={12} /> (F) TimeReason</p>
              <ReasonRow code="RS_TIME_MORNING" desc="05:00~11:00" />
              <ReasonRow code="RS_TIME_DAY" desc="11:00~17:00" />
              <ReasonRow code="RS_TIME_EVENING" desc="17:00~05:00 (다음날 새벽 포함)" />
            </div>
            {/* Data quality */}
            <div>
              <p className="text-[12px] text-[#9CA3AF] mb-1">(G) DataQuality (선택)</p>
              <ReasonRow code="RS_DATA_STALE" desc="마지막 동기화가 24시간 이상 전" />
              <ReasonRow code="RS_DATA_PARTIAL" desc="일부 지표만 있음" />
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 3 ═══ */}
        <Section id="3" icon={<Cpu size={16} className="text-[#EA580C]" />} title="Reason 생성 규칙 (원천→코드)">
          <div className="mt-3 flex flex-col gap-3">
            <div className="bg-[#FEF2F2] rounded-[10px] p-2.5">
              <p className="text-[11px] text-[#DC2626]">※ 임상 기준 아님. UX 납득을 위한 초기 휴리스틱이며 기기별 튜닝 가능.</p>
            </div>

            <div>
              <p className="text-[13px] text-[#111827] mb-2">Baseline 있는 경우 (권장)</p>
              <Code>{`RS_SLEEP_SHORT:
  sleep_total_min < baseline - 60분

RS_SLEEP_FRAGMENTED:
  awakenings >= baseline + 2
  (or efficiency < baseline - 5%)

RS_SLEEP_IRREGULAR:
  |bedtime - baseline| > 90분
  OR |waketime - baseline| > 90분

RS_SLEEP_QUALITY_LOW:
  (deep + rem) < baseline(deep+rem) - 30분
  (데이터 없으면 스킵)

RS_ACTIVITY_LOW:
  steps < baseline × 0.6
  OR active_min < baseline × 0.6

RS_FATIGUE_HIGH:
  fatigue_score >= 70 (or 기기 HIGH)

RS_STRESS_HIGH:
  stress_score >= 70 (or 기기 HIGH)

RS_RHYTHM_LOW:
  rhythm_score < baseline - 15
  OR rhythm_score < 45`}</Code>
            </div>

            <div>
              <p className="text-[13px] text-[#111827] mb-2">Baseline 없는 경우 (완화된 초기 기준)</p>
              <Code>{`RS_SLEEP_SHORT:    sleep < 360분 (6시간)
RS_SLEEP_FRAGMENTED: awakenings >= 4
RS_SLEEP_QUALITY_LOW: (deep+rem) < 90분
RS_ACTIVITY_LOW:   steps < 3,500 or active < 20분
RS_FATIGUE/STRESS: score >= 70 → WARN
RS_RHYTHM_LOW:     rhythm_score < 45`}</Code>
            </div>

            <div>
              <p className="text-[13px] text-[#111827] mb-2">UNKNOWN 처리</p>
              <div className="bg-[#F3F4F6] rounded-[10px] p-3">
                <ul className="list-disc pl-4 text-[12px] text-[#374151] space-y-1">
                  <li>데이터 없음 → RS_*_UNKNOWN</li>
                  <li>UNKNOWN ≥ 2 → 카테고리 = 명상(M1_QuickCalm)</li>
                  <li>배너: "워치를 연결하면 더 정확히 추천할 수 있어요."</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 4 ═══ */}
        <Section id="4" icon={<AlertTriangle size={16} className="text-[#F59E0B]" />} title="카테고리 선택 (오늘 추천 1개)">
          <div className="mt-3">
            <Code>{`1) (sleep=WARN) OR (rhythm=WARN) → SLEEP
2) else if (stress=WARN) OR (fatigue=WARN) → MEDITATION
3) else if (activity=WARN) AND (fatigue!=WARN) → EXERCISE
4) else → FOOD
5) (옵션) 목표 고정이 있고 WARN 없을 때만 override`}</Code>
          </div>
        </Section>

        {/* ═══ 섹션 5 ═══ */}
        <Section id="5" icon={<Database size={16} className="text-[#1B7A4B]" />} title="Reason → Subtype 매핑표 (if-else)">
          <div className="mt-3 flex flex-col gap-4">
            {/* SLEEP */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Moon size={14} className="text-[#0EA5E9]" />
                <span className="text-[14px] text-[#111827]">(1) SLEEP 서브타입</span>
              </div>
              <Code>{`if time==MORNING and (RS_RHYTHM_LOW or RS_SLEEP_IRREGULAR):
    → S3_RhythmResetMorning
else if time==DAY and RS_FATIGUE_HIGH:
    → S4_DayNapRecovery
else if RS_SLEEP_FRAGMENTED:
    → S2_FragmentedSleep
else if time==EVENING:
    → S1_BedtimePrep
else if RS_SLEEP_IRREGULAR:
    → S5_Habits
else:
    → S1_BedtimePrep (기본)

※ 보완: RS_SLEEP_IRREGULAR + EVENING이면
  S1 유지, Chip2를 수면-08/수면-29로 교체 가능`}</Code>
            </div>

            {/* MEDITATION */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wind size={14} className="text-[#7C3AED]" />
                <span className="text-[14px] text-[#111827]">(2) MEDITATION 서브타입</span>
              </div>
              <Code>{`if time==EVENING and (RS_STRESS_HIGH or RS_FATIGUE_HIGH):
    → M3_EveningWindDown
else if RS_FATIGUE_HIGH:
    → M2_BodyRelax
else if RS_STRESS_HIGH and RS_ACTIVITY_LOW:
    → M4_WalkMindful
else:
    → M1_QuickCalm (기본/안전)`}</Code>
            </div>

            {/* EXERCISE */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell size={14} className="text-[#1B7A4B]" />
                <span className="text-[14px] text-[#111827]">(3) EXERCISE 서브타입</span>
              </div>
              <Code>{`if userPref.posture == CHAIR:
    → E2_ChairFriendly
else if time==EVENING:
    → E3_GentleStretchEvening
else if time==MORNING:
    → E1_IndoorWalkMorning
else:
    → E1_IndoorWalkMorning (기본)

(옵션) goalOverride==EXERCISE and no WARN:
    → E4_BalanceCore`}</Code>
            </div>

            {/* FOOD */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Utensils size={14} className="text-[#EA580C]" />
                <span className="text-[14px] text-[#111827]">(4) FOOD 서브타입</span>
              </div>
              <Code>{`if userAction == CAMP_CONTINUE:
    → F3_CampContinue
else if userAction == WEEKLY_PLAN:
    → F4_WeeklyPlan
else if time==EVENING:
    → F2_WarmLightDinner
else:
    → F1_BalancedDay (기본)`}</Code>
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 6 ═══ */}
        <Section id="6" icon={<Tag size={16} className="text-[#FF8A3D]" />} title="Subtype → 번들 매핑 (칩 3개)">
          <div className="mt-3">
            <p className="text-[12px] text-[#6B7280] mb-2">짧게 / 대안 / 조금 더 — 12_Query_Template_Library ID 매칭</p>
            <div className="flex flex-col gap-1.5">
              {[
                { sub: 'S1_BedtimePrep',       chips: '수면-05 / 수면-03 / 수면-02' },
                { sub: 'S2_FragmentedSleep',   chips: '수면-22 / 수면-04 / 수면-01' },
                { sub: 'S3_RhythmResetMorning',chips: '수면-11 / 수면-10 / 수면-24' },
                { sub: 'S4_DayNapRecovery',    chips: '수면-05 / 수면-14 / 수면-13' },
                { sub: 'S5_Habits',            chips: '수면-15 / 수면-08 / 수면-29' },
                { sub: 'M1_QuickCalm',         chips: '명상-03 / 명상-01 / 명상-10' },
                { sub: 'M2_BodyRelax',         chips: '명상-01 / 명상-05 / 명상-18' },
                { sub: 'M3_EveningWindDown',   chips: '명상-06 / 명상-11 / 명상-27' },
                { sub: 'M4_WalkMindful',       chips: '명상-23 / 명상-20 / 명상-28' },
                { sub: 'E1_IndoorWalkMorning', chips: '운동-23 / 운동-07 / 운동-06' },
                { sub: 'E2_ChairFriendly',     chips: '운동-02 / 운동-17 / 운동-19' },
                { sub: 'E3_GentleStretchEvening', chips: '운동-38 / 운동-05 / 운동-27' },
                { sub: 'E4_BalanceCore',       chips: '운동-16 / 운동-14 / 운동-13' },
                { sub: 'F1_BalancedDay',       chips: '식단-01 / 식단-06 / 식단-11' },
                { sub: 'F2_WarmLightDinner',   chips: '식단-11 / 식단-12 / 식단-21' },
                { sub: 'F3_CampContinue',      chips: '식단-17 / 식단-40 / 식단-39' },
                { sub: 'F4_WeeklyPlan',        chips: '식단-38 / 식단-39 / 식단-28' },
              ].map(r => (
                <div key={r.sub} className="flex items-center gap-2 bg-[#F7F8FA] rounded-[8px] px-3 py-2">
                  <code className="text-[10px] text-[#7C3AED] bg-[#F3E8FF] px-1.5 py-0.5 rounded w-[130px] shrink-0 truncate">{r.sub}</code>
                  <span className="text-[11px] text-[#374151]">{r.chips}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 섹션 7 ═══ */}
        <Section id="7" icon={<Cpu size={16} className="text-[#6B7280]" />} title="대체(스왑) 규칙 (최소)">
          <div className="mt-3">
            <ul className="list-disc pl-4 text-[12px] text-[#374151] space-y-1">
              <li><strong>영상 길이</strong>: 5~10분 선호 시, Chip3가 15분+이면 10~12분 템플릿으로 교체 (동일 subtype 내 대체 후보 1개만)</li>
              <li><strong>자세</strong>: 의자 선호 → 운동 카테고리는 E2_ChairFriendly로 강제</li>
              <li>번들 고정 + 일부 칩만 교체로 단순화 (과잉 교체 금지)</li>
            </ul>
          </div>
        </Section>

        {/* Nav buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => navigate('/library/ai-reco-pseudocode')}
            className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2"
          >
            의사코드 보기 <ChevronRight size={14} />
          </button>
          <button
            onClick={() => navigate('/library/ai-reco-scenarios')}
            className="w-full h-[48px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-2"
          >
            시나리오 20세트로 검증 <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
