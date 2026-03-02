/**
 * 08_Detail_Spec
 * 디테일 화면/모달/바텀시트/플로우 인터랙션 스펙 라이브러리
 * 모든 컴포넌트의 Variant를 인터랙티브 데모로 확인 가능
 */
import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ModeSwitch } from '../../components/ui/ModeSwitch';
import { SyncStatusPill } from '../../components/ui/SyncStatusPill';
import { RhythmScoreCard } from '../../components/ui/RhythmScoreCard';
import { MetricCard } from '../../components/ui/MetricCard';
import { RecommendationCard } from '../../components/ui/RecommendationCard';
import { YouTubeSearchCard } from '../../components/ui/YouTubeSearchCard';
import { ExplainWhySheet } from '../../components/ui/ExplainWhySheet';
import { StepperInput } from '../../components/ui/StepperInput';
import { DailyPlanChecklist } from '../../components/ui/DailyPlanChecklist';
import { SafetyConfirmDialog } from '../../components/ui/SafetyConfirmDialog';
import { ConsentToggleCard } from '../../components/ui/ConsentToggleCard';
import { Moon, Activity, Heart } from 'lucide-react';

type Section = 'segment' | 'sync' | 'rhythm' | 'metric' | 'reco' | 'youtube' | 'explain' | 'stepper' | 'plan' | 'safety' | 'consent';

const sections: { key: Section; label: string }[] = [
  { key: 'segment', label: '① ModeSwitch' },
  { key: 'sync', label: '② SyncStatusPill' },
  { key: 'rhythm', label: '③ RhythmScore' },
  { key: 'metric', label: '④ MetricCard' },
  { key: 'reco', label: '⑤ Recommendation' },
  { key: 'youtube', label: '⑥ YouTubeResult' },
  { key: 'explain', label: '⑦ ExplainWhy' },
  { key: 'stepper', label: '⑧ StepperInput' },
  { key: 'plan', label: '⑨ DailyPlan' },
  { key: 'safety', label: '⑩ SafetyConfirm' },
  { key: 'consent', label: '⑪ ConsentToggle' },
];

export function DetailSpecPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('segment');

  // Demo states
  const [modeKey, setModeKey] = useState('daily');
  const [showExplain, setShowExplain] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [stepperVal, setStepperVal] = useState(65);
  const [planItems, setPlanItems] = useState([
    { id: '1', label: '아침 스트레칭 8분', done: false },
    { id: '2', label: '호흡 명상 10분', done: true },
    { id: '3', label: '저녁 수면 루틴', done: false },
  ]);
  const [consentA, setConsentA] = useState(true);
  const [consentB, setConsentB] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/more')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">08 · 디테일 스펙</h2>
      </div>

      {/* Section selector */}
      <div className="px-4 pt-3 pb-2 bg-white overflow-x-auto">
        <div className="flex gap-2 pb-1 scrollbar-hide">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                activeSection === s.key
                  ? 'bg-[#1B7A4B] text-white'
                  : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="px-4 pt-5 pb-8">
        {/* ① ModeSwitch */}
        {activeSection === 'segment' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Segment/ModeSwitch" />
            <Subtitle text="default / selected" />
            <ModeSwitch
              segments={[{ key: 'daily', label: '일상' }, { key: 'camp', label: '캠프' }]}
              activeKey={modeKey}
              onChange={setModeKey}
            />
            <Subtitle text="disabled" />
            <ModeSwitch
              segments={[{ key: 'daily', label: '일상' }, { key: 'camp', label: '캠프' }]}
              activeKey="daily"
              onChange={() => {}}
              disabled
            />
            <Subtitle text="3-segment (리포트)" />
            <ModeSwitch
              segments={[
                { key: 'camp', label: '캠프 리포트' },
                { key: 'weekly', label: '주간 리듬' },
                { key: 'monthly', label: '월간 리듬' },
              ]}
              activeKey="weekly"
              onChange={() => {}}
            />
            <SpecNote text="선택 영역 높이 44px 이상 확보. role=tablist, aria-selected 적용." />
          </div>
        )}

        {/* ② SyncStatusPill */}
        {activeSection === 'sync' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Sync/StatusPill" />
            <div className="flex flex-wrap gap-2">
              <SyncStatusPill status="synced" lastSyncTime="방금" />
              <SyncStatusPill status="needsSync" />
              <SyncStatusPill status="failed" />
              <SyncStatusPill status="offlineSaving" />
            </div>
            <SpecNote text="탭하면 바텀시트로 상세(왜/해결 방법) 표시. 동기화 필요/실패 시 [지금 동기화 시도] CTA." />
          </div>
        )}

        {/* ③ RhythmScore */}
        {activeSection === 'rhythm' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Card/RhythmScore" />
            <Subtitle text="normal" />
            <RhythmScoreCard
              variant="normal"
              score={62}
              ctaLabel="가벼운 산책 20분 시작"
              secondaryCta="다른 추천 보기"
            />
            <Subtitle text="empty (워치 미연결)" />
            <RhythmScoreCard variant="empty" />
            <Subtitle text="stale (동기화 오래됨)" />
            <RhythmScoreCard variant="stale" score={55} lastSyncTime="6시간 전" />
            <Subtitle text="loading" />
            <RhythmScoreCard variant="loading" />
            <SpecNote text="게이지 0~100. 비유 설명 + Primary CTA 1개 + 보조 CTA(텍스트 링크). 의학적 지표 아님 명시." />
          </div>
        )}

        {/* ④ MetricCard */}
        {activeSection === 'metric' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Card/Metric" />
            <Subtitle text="normal" />
            <MetricCard icon={<Moon size={18} />} title="수면" value="5.2" unit="시간" change="-18%" changePositive={false} status="yellow" metaphor="배터리 충전이 60%에서 멈춘 것과 비슷해요" />
            <Subtitle text="compact" />
            <MetricCard variant="compact" icon={<Activity size={18} />} title="활동" value="4,280" unit="걸음" status="green" />
            <Subtitle text="expanded" />
            <MetricCard variant="expanded" icon={<Heart size={18} />} title="스트레스" value="62" unit="점" change="+12%" changePositive={false} status="yellow" metaphor="엔진이 살짝 과열된 상태와 비슷해요" />
            <Subtitle text="empty" />
            <MetricCard variant="empty" icon={<Moon size={18} />} title="수면" emptyMessage="워치를 연결하면 수면을 기록할 수 있어요" />
            <Subtitle text="loading" />
            <MetricCard variant="loading" icon={<Moon size={18} />} title="수면" />
            <Subtitle text="error" />
            <MetricCard variant="error" icon={<Moon size={18} />} title="수면" />
            <SpecNote text="비유 1줄 필수. 상태색은 StatusChip(아이콘+라벨 동시). [오늘 추천 보기] CTA." />
          </div>
        )}

        {/* ⑤ RecommendationCard */}
        {activeSection === 'reco' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Card/Recommendation" />
            <Subtitle text="primaryPick (오늘 1순위)" />
            <RecommendationCard variant="primaryPick" category="운동" title="아침 스트레칭 가이드" reason="수면이 짧았을 때 가벼운 스트레칭이 활력에 도움이 될 수 있어요" intensity="가벼움" duration="8분" ctaLabel="YouTube로 보기" isYoutube />
            <Subtitle text="secondary" />
            <RecommendationCard variant="secondary" category="명상" title="호흡 명상 가이드" reason="스트레스가 높을 때 호흡 명상이 마음을 안정시킬 수 있어요" intensity="가벼움" duration="10분" ctaLabel="YouTube로 보기" isYoutube />
            <Subtitle text="completed (완료 스탬프)" />
            <RecommendationCard variant="completed" category="산책" title="가벼운 산책 20분" reason="규칙적 걷기는 리듬 안정에 도움이 될 수 있어요" intensity="보통" duration="20분" ctaLabel="가이드 보기" />
            <SpecNote text="카테고리 태그 + 강도 + 소요시간 + '왜 추천?' 1줄. [오늘 계획에 넣기] [나중에] 액션." />
          </div>
        )}

        {/* ⑥ YouTubeResult */}
        {activeSection === 'youtube' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Card/YouTubeResult" />
            <Subtitle text="normal" />
            <YouTubeSearchCard
              variant="normal"
              searchQuery="시니어 스트레칭 5분"
              suggestedChips={['10분 호흡 명상', '수면 루틴', '의자 체조']}
              videos={[
                { title: '시니어 맞춤 10분 전신 스트레칭', channel: '건강TV', duration: '10:23' },
                { title: '5분 호흡 명상 가이드 (초보자용)', channel: '마음챙김', duration: '5:45' },
              ]}
            />
            <Subtitle text="loading" />
            <YouTubeSearchCard variant="loading" searchQuery="시니어 스트레칭 5분" />
            <Subtitle text="noResult" />
            <YouTubeSearchCard variant="noResult" searchQuery="존재하지않는검색어" suggestedChips={['10분 호흡 명상', '수면 루틴']} />
            <SpecNote text="하단 '외부(YouTube)로 이동합니다' 고정. 검색어 칩 자동 생성. [검색어 바꾸기] [다시 검색]." />
          </div>
        )}

        {/* ⑦ ExplainWhy */}
        {activeSection === 'explain' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/BottomSheet/ExplainWhy" />
            <button
              onClick={() => setShowExplain(true)}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
            >
              "왜 이렇게 나왔나요?" 바텀시트 열기
            </button>
            <ExplainWhySheet
              open={showExplain}
              onClose={() => setShowExplain(false)}
              steps={[
                { label: '깊은 수면 부족', metaphor: '배터리가 50%만 충전된 것과 비슷해요' },
                { label: '회복 속도 느림', metaphor: '충전 속도가 느려진 상태예요' },
                { label: '스트레스 상승', metaphor: '엔진 과열 경고등이 켜진 것과 비슷해요' },
              ]}
              metaphorCard={{
                title: '오늘의 비유',
                description: '어제 잠이 얕아서 충전이 덜 됐어요. 가벼운 산책으로 충전 속도를 높여볼 수 있어요.',
              }}
              recommendations={[
                { label: '10분 호흡 명상 보기' },
                { label: '가벼운 산책 20분' },
              ]}
            />
            <SpecNote text="70% 높이, sticky CTA. 3~5단계 연결 스토리(칩+화살표) + 비유 카드 + 추천 2~3개." />
          </div>
        )}

        {/* ⑧ StepperInput */}
        {activeSection === 'stepper' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Form/StepperInput" />
            <Subtitle text="default (코디네이터 점수 입력)" />
            <StepperInput
              label="두뇌 컨디션 지수"
              value={stepperVal}
              onChange={setStepperVal}
              min={0}
              max={100}
              unit="점"
              description="관찰된 반응을 기반으로 점수를 입력해 주세요."
            />
            <Subtitle text="large 사이즈" />
            <StepperInput
              label="기분 점수"
              value={7}
              onChange={() => {}}
              min={0}
              max={10}
              step={1}
              unit="/10"
              size="large"
            />
            <Subtitle text="disabled" />
            <StepperInput
              label="스트레스 점수"
              value={42}
              onChange={() => {}}
              disabled
            />
            <SpecNote text="+/- 버튼 48px 이상. 최소/최대 표시. 직접 입력은 기본 숨김(토글)." />
          </div>
        )}

        {/* ⑨ DailyPlan */}
        {activeSection === 'plan' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Checklist/DailyPlan" />
            <Subtitle text="active (진행 중)" />
            <DailyPlanChecklist
              items={planItems}
              onToggle={(id) =>
                setPlanItems(prev =>
                  prev.map(i => i.id === id ? { ...i, done: !i.done } : i)
                )
              }
              onSubmitNote={(note) => alert(`저장: ${note}`)}
            />
            <Subtitle text="empty" />
            <DailyPlanChecklist items={[]} onToggle={() => {}} />
            <SpecNote text="1~3개 체크. 모두 완료 → '오늘 한 줄 기록(선택)' CTA. 프로그레스 바 표시." />
          </div>
        )}

        {/* ⑩ SafetyConfirm */}
        {activeSection === 'safety' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Dialog/SafetyConfirm" />
            <button
              onClick={() => setShowSafety(true)}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
            >
              연계 확인 대화상자 열기
            </button>
            <button
              onClick={() => setShowSafety(true)}
              className="w-full h-[52px] bg-[#DC2626] text-white rounded-[14px] text-[16px]"
            >
              긴급 연결 대화상자 열기
            </button>
            <SafetyConfirmDialog
              open={showSafety}
              onClose={() => setShowSafety(false)}
              onConfirm={() => setShowSafety(false)}
              phoneNumber="1577-0199"
              variant="referral"
            />
            <SpecNote text="2단계 확인: 탭 → 모달 → [전화하기]/[취소]. 긴급(emergency) variant는 빨간 배경." />
          </div>
        )}

        {/* ⑪ ConsentToggle */}
        {activeSection === 'consent' && (
          <div className="flex flex-col gap-5">
            <Label text="CMP/Consent/ToggleCard" />
            <ConsentToggleCard
              tag="필수"
              title="서비스 운영 필수"
              summary="앱 이용을 위해 반드시 필요합니다."
              detailText="컨디션노트 서비스 제공을 위해 수면, 활동, 스트레스 데이터를 수집합니다. 수집된 데이터는 앱 내 점검/추천 기능에만 사용되며, 제3자에게 제공되지 않습니다."
              agreed={consentA}
              onToggle={setConsentA}
            />
            <ConsentToggleCard
              tag="선택"
              title="익명 통계 제공"
              summary="프로그램 개선/지역 예방 인프라 성과 측정"
              detailText="이 데이터는 이름/전화번호 없이 '전후 변화' 같은 통계로만 사용될 수 있어요. 언제든지 끌 수 있어요."
              agreed={consentB}
              onToggle={setConsentB}
              withdrawable
              onWithdraw={() => setConsentB(false)}
            />
            <SpecNote text="필수/선택 뱃지. 아코디언 펼침. 동의 철회 UX(설정에서 동일 컴포넌트 재사용)." />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helper sub-components ──
function Label({ text }: { text: string }) {
  return (
    <div className="bg-[#111827] text-white px-3 py-2 rounded-[10px] text-[14px]">
      {text}
    </div>
  );
}

function Subtitle({ text }: { text: string }) {
  return <p className="text-[13px] text-[#6B7280] -mb-2">{text}</p>;
}

function SpecNote({ text }: { text: string }) {
  return (
    <div className="bg-[#FFF1E8] rounded-[12px] p-3 mt-1">
      <p className="text-[12px] text-[#EA580C]">📐 스펙: {text}</p>
    </div>
  );
}
