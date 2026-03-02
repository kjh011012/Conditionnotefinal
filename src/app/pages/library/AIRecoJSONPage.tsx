/**
 * 15_AI_Reco_JSON (JSON 룰셋 코드블록 — 개발 복사용)
 * category_rules / subtype_rules / bundles 3개 블록으로 분할
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Copy, Check, ChevronRight } from 'lucide-react';

function CopyableCodeBlock({ title, json }: { title: string; json: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6]">
        <span className="text-[14px] text-[#111827]">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#F7F8FA] text-[12px] text-[#374151] min-h-[32px]"
        >
          {copied ? <><Check size={12} className="text-[#1B7A4B]" /> 복사됨</> : <><Copy size={12} /> 복사</>}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="bg-[#F7F8FA] rounded-[12px] px-4 py-3 text-[10px] text-[#374151] whitespace-pre-wrap" style={{ lineHeight: 1.55 }}>
          {json}
        </pre>
      </div>
    </div>
  );
}

/* ─── JSON data ─── */
const categoryRulesJSON = `{
  "category_rules": {
    "description": "first_match_wins, priority asc",
    "note": "임상 기준 아님(UX 휴리스틱), 튜닝 가능",
    "rules": [
      {
        "priority": 1,
        "condition": "sleep == WARN || rhythm == WARN",
        "category": "SLEEP",
        "why_template": "수면/리듬이 조금 들쑥날쑥해서, 오늘은 '배터리 충전'부터 도와줄게요."
      },
      {
        "priority": 2,
        "condition": "stress == WARN || fatigue == WARN",
        "category": "MEDITATION",
        "why_template": "스트레스/피로가 올라가 있어서, 오늘은 '긴장 풀기'부터 해보면 좋아요."
      },
      {
        "priority": 3,
        "condition": "activity == WARN && fatigue != WARN",
        "category": "EXERCISE",
        "why_template": "오늘 활동이 적어서, 가볍게 몸을 깨우는 움직임을 추천해요."
      },
      {
        "priority": 4,
        "condition": "default (all OK/GOOD)",
        "category": "FOOD",
        "why_template": "오늘은 전반적으로 안정적이라, 부담 없는 식사 아이디어로 리듬을 유지해볼까요?"
      }
    ],
    "goal_override": {
      "condition": "no WARN on any metric",
      "allowed_goals": ["EXERCISE", "MEDITATION"]
    },
    "unknown_fallback": {
      "condition": "UNKNOWN count >= 2",
      "category": "MEDITATION",
      "subtype": "M1_QuickCalm",
      "banner": "워치를 연결하면 더 정확히 추천할 수 있어요."
    }
  }
}`;

const subtypeRulesJSON = `{
  "subtype_rules": {
    "SLEEP": [
      { "condition": "time==MORNING && (RS_RHYTHM_LOW || RS_SLEEP_IRREGULAR)", "subtype": "S3_RhythmResetMorning" },
      { "condition": "time==DAY && RS_FATIGUE_HIGH", "subtype": "S4_DayNapRecovery" },
      { "condition": "RS_SLEEP_FRAGMENTED", "subtype": "S2_FragmentedSleep" },
      { "condition": "time==EVENING", "subtype": "S1_BedtimePrep" },
      { "condition": "RS_SLEEP_IRREGULAR", "subtype": "S5_Habits" },
      { "condition": "default", "subtype": "S1_BedtimePrep" }
    ],
    "MEDITATION": [
      { "condition": "time==EVENING && (RS_STRESS_HIGH || RS_FATIGUE_HIGH)", "subtype": "M3_EveningWindDown" },
      { "condition": "RS_FATIGUE_HIGH", "subtype": "M2_BodyRelax" },
      { "condition": "RS_STRESS_HIGH && RS_ACTIVITY_LOW", "subtype": "M4_WalkMindful" },
      { "condition": "default", "subtype": "M1_QuickCalm" }
    ],
    "EXERCISE": [
      { "condition": "goalOverride==EXERCISE && no_WARN", "subtype": "E4_BalanceCore" },
      { "condition": "userPref.posture==CHAIR", "subtype": "E2_ChairFriendly" },
      { "condition": "time==EVENING", "subtype": "E3_GentleStretchEvening" },
      { "condition": "default", "subtype": "E1_IndoorWalkMorning" }
    ],
    "FOOD": [
      { "condition": "userAction==CAMP_CONTINUE", "subtype": "F3_CampContinue" },
      { "condition": "userAction==WEEKLY_PLAN", "subtype": "F4_WeeklyPlan" },
      { "condition": "time==EVENING", "subtype": "F2_WarmLightDinner" },
      { "condition": "default", "subtype": "F1_BalancedDay" }
    ]
  }
}`;

const bundlesJSON = `{
  "bundles": {
    "S1_BedtimePrep":        { "chip1": "수면-05", "chip2": "수면-03", "chip3": "수면-02" },
    "S2_FragmentedSleep":    { "chip1": "수면-22", "chip2": "수면-04", "chip3": "수면-01" },
    "S3_RhythmResetMorning": { "chip1": "수면-11", "chip2": "수면-10", "chip3": "수면-24" },
    "S4_DayNapRecovery":     { "chip1": "수면-05", "chip2": "수면-14", "chip3": "수면-13" },
    "S5_Habits":             { "chip1": "수면-15", "chip2": "수면-08", "chip3": "수면-29" },

    "M1_QuickCalm":          { "chip1": "명상-03", "chip2": "��상-01", "chip3": "명상-10" },
    "M2_BodyRelax":          { "chip1": "명상-01", "chip2": "명상-05", "chip3": "명상-18" },
    "M3_EveningWindDown":    { "chip1": "명상-06", "chip2": "명상-11", "chip3": "명상-27" },
    "M4_WalkMindful":        { "chip1": "명상-23", "chip2": "명상-20", "chip3": "명상-28" },

    "E1_IndoorWalkMorning":  { "chip1": "운동-23", "chip2": "운동-07", "chip3": "운동-06" },
    "E2_ChairFriendly":      { "chip1": "운동-02", "chip2": "운동-17", "chip3": "운동-19" },
    "E3_GentleStretchEvening":{ "chip1": "운동-38", "chip2": "운동-05", "chip3": "운동-27" },
    "E4_BalanceCore":        { "chip1": "운동-16", "chip2": "운동-14", "chip3": "운동-13" },

    "F1_BalancedDay":        { "chip1": "식단-01", "chip2": "식단-06", "chip3": "식단-11" },
    "F2_WarmLightDinner":    { "chip1": "식단-11", "chip2": "식단-12", "chip3": "식단-21" },
    "F3_CampContinue":       { "chip1": "식단-17", "chip2": "식단-40", "chip3": "식단-39" },
    "F4_WeeklyPlan":         { "chip1": "식단-38", "chip2": "식단-39", "chip3": "식단-28" }
  },
  "chip_slot_labels": {
    "chip1": "짧게 (5~10분, 초보/시니어/가벼움)",
    "chip2": "대안 (앉아서/누워서/걷기 등 다른 형태)",
    "chip3": "조금 더 (10~20분 또는 루틴형)"
  },
  "chip_diversity_rule": "3개 칩은 서로 형태/포지션/맥락이 달라야 함 (호흡만 3개 금지)"
}`;

export function AIRecoJSONPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">AI 추천 룰셋 (JSON)</h2>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
        {/* Intro */}
        <div className="bg-[#E8F5EE] rounded-[14px] p-4">
          <h3 className="text-[15px] text-[#0E4B2E] mb-2">AI 추천 룰셋 (JSON) — 개발 복사용</h3>
          <ol className="list-decimal pl-4 text-[12px] text-[#374151] space-y-1" style={{ lineHeight: 1.6 }}>
            <li><code className="bg-[#D1FAE5] px-1 rounded text-[11px]">category_rules</code> → <code className="bg-[#D1FAE5] px-1 rounded text-[11px]">subtype_rules</code> → <code className="bg-[#D1FAE5] px-1 rounded text-[11px]">bundles</code> 순서로 평가</li>
            <li><strong>first_match_wins</strong>, priority asc</li>
            <li>임상 기준 아님 (UX 휴리스틱), 튜닝 가능</li>
          </ol>
        </div>

        {/* Fixed notice */}
        <div className="bg-[#FEF2F2] rounded-[10px] px-4 py-2.5">
          <p className="text-[11px] text-[#DC2626]">
            의료행위(진단/치료/처방) 금지. "외부(YouTube)로 이동합니다."는 결과 화면에 항상 표기.
          </p>
        </div>

        {/* JSON blocks */}
        <CopyableCodeBlock title="1. category_rules (카테고리 선택)" json={categoryRulesJSON} />
        <CopyableCodeBlock title="2. subtype_rules (서브타입 판정 if-else)" json={subtypeRulesJSON} />
        <CopyableCodeBlock title="3. bundles (칩 3개 템플릿 ID)" json={bundlesJSON} />

        {/* Nav */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => navigate('/library/ai-reco-scenarios')}
            className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2"
          >
            시나리오 20세트로 검증 <ChevronRight size={14} />
          </button>
          <button
            onClick={() => navigate('/library/ai-reco-rules')}
            className="w-full h-[48px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[13px] flex items-center justify-center gap-2"
          >
            룰 스펙 문서로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
