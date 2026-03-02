/**
 * P-Reco-YouTube-01_QueryBuilder (11_AI_Reco_YT)
 *
 * AI 추천 → YouTube 검색어 칩 3개 UX
 * - 오늘 추천 카드 (한 줄 결론 + "왜 이 추천인가요?" 링크)
 * - 카테고리 탭 (운동/명상/식단/수면루틴) + "추천" 배지
 * - 검색어 칩 3개 (짧게/대안/조금 더)
 * - 추천 옵션 바텀시트
 * - 템플릿 라이브러리 링크
 * - 고정: "외부(YouTube)로 이동합니다."
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Sparkles, Play, ChevronRight, Settings2,
  Search, BookOpen, ExternalLink, Copy, Check,
  Dumbbell, Wind, Utensils, Moon,
} from 'lucide-react';
import { MetricStateRow, type MetricKey, type MetricLevel } from '../../components/ui/MetricStateChip';
import { WhyRecoSheet, type RecoCategory } from '../../components/ui/WhyRecoSheet';
import { RecoSettingsSheet, type RecoSettings } from '../../components/ui/RecoSettingsSheet';
import { APP_COPY } from '../../components/ui/AppCopy';

/* ─── 오늘 상태 (mock) ─── */
const todayStates: { metric: MetricKey; level: MetricLevel }[] = [
  { metric: 'sleep', level: 'caution' },
  { metric: 'activity', level: 'normal' },
  { metric: 'fatigue', level: 'caution' },
  { metric: 'stress', level: 'normal' },
  { metric: 'rhythm', level: 'caution' },
];

/* ─── 카테고리별 검색어 템플릿 ─── */
interface CategoryData {
  key: RecoCategory;
  icon: any;
  label: string;
  conclusion: string;
  queries: [string, string, string]; // 짧게 / 대안 / 조금 더
  queryDescs: [string, string, string];
}

const categoryData: CategoryData[] = [
  {
    key: 'exercise',
    icon: Dumbbell,
    label: '운동',
    conclusion: '오늘 활동이 적어서, 가볍게 몸을 깨우는 움직임을 추천해요.',
    queries: ['의자 스트레칭 5분 목 어깨 풀기', '가벼운 유산소 10분 집에서', '시니어 전신 스트레칭 10분 따라하기'],
    queryDescs: ['가장 짧고 쉬운 버전', '실내에서 하는 대안', '조금 더 충분한 버전'],
  },
  {
    key: 'meditation',
    icon: Wind,
    label: '명상',
    conclusion: '스트레스/피로가 올라가 있어서, 오늘은 \'긴장 풀기\'부터 해보면 좋아요.',
    queries: ['5분 호흡 명상 초보 따라하기', '바디스캔 명상 10분 누워서', '초보를 위한 마음챙김 명상 10분'],
    queryDescs: ['가장 짧고 쉬운 버전', '누워서 하는 대안', '조금 더 충분한 버전'],
  },
  {
    key: 'diet',
    icon: Utensils,
    label: '식단',
    conclusion: '오늘은 전반적으로 안정적이라, 부담 없는 식단 아이디어로 리듬을 유지해볼까요?',
    queries: ['자��식 아침 간단 레시피', '따뜻한 죽 레시피 간단하게', '속 편한 저녁 국 레시피'],
    queryDescs: ['가벼운 아침 아이디어', '따뜻한 한 그릇 대안', '저녁 리듬 정리용'],
  },
  {
    key: 'sleep',
    icon: Moon,
    label: '수면루틴',
    conclusion: '수면이 조금 들쑥날쑥해서, 오늘은 \'배터리 충전\'부터 도와줄게요.',
    queries: ['취침 전 스트레칭 5분 루틴', '수면 준비 호흡 5분', '잠들기 전 10분 수면 루틴'],
    queryDescs: ['가장 짧고 쉬운 버전', '호흡 중심 대안', '조금 더 충분한 버전'],
  },
];

/* ─── 우선순위 규칙으로 오늘 추천 카테고리 결정 ─── */
function pickTodayCategory(states: typeof todayStates): RecoCategory {
  const get = (k: MetricKey) => states.find(s => s.metric === k)?.level || 'normal';
  // A) 수면루틴: 수면 주의 또는 리듬 주의
  if (get('sleep') === 'caution' || get('rhythm') === 'caution') return 'sleep';
  // B) 명상: 스트레스 주의 또는 피로 주의 (수면루틴 아닐 때)
  if (get('stress') === 'caution' || get('fatigue') === 'caution') return 'meditation';
  // C) 운동: 활동 주의 + 피로 주의 아님
  if (get('activity') === 'caution' && get('fatigue') !== 'caution') return 'exercise';
  // D) 식단: 전반 안정
  return 'diet';
}

export function YouTubeQueryPage() {
  const navigate = useNavigate();

  const todayCategory = pickTodayCategory(todayStates);
  const [activeCategory, setActiveCategory] = useState<RecoCategory>(todayCategory);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  // Sheets
  const [showWhySheet, setShowWhySheet] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [settings, setSettings] = useState<RecoSettings>({ duration: '5-10', intensity: 'light' });

  const currentCat = categoryData.find(c => c.key === activeCategory)!;
  const todayCatData = categoryData.find(c => c.key === todayCategory)!;

  const handleQuerySelect = (query: string) => {
    navigate(`/daily/youtube-results?q=${encodeURIComponent(query)}`);
  };

  const handleCopyQuery = (query: string) => {
    navigator.clipboard?.writeText(query);
    setCopiedQuery(query);
    setTimeout(() => setCopiedQuery(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">YouTube 추천</h2>
      </div>

      {/* External notice (fixed) */}
      <div className="px-4 py-2 bg-[#FEF2F2] border-b border-[#FCA5A5]/20">
        <div className="flex items-center gap-1.5">
          <ExternalLink size={12} className="text-[#EF4444]" />
          <p className="text-[12px] text-[#DC2626]">{APP_COPY.EXTERNAL_YOUTUBE}</p>
        </div>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* ═══ 오늘 추천 카드 ═══ */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#FF8A3D]" />
            <span className="text-[14px] text-[#111827]">오늘 추천</span>
            <span className="text-[11px] text-white bg-[#FF8A3D] px-2 py-0.5 rounded-full ml-auto">
              {categoryData.find(c => c.key === todayCategory)?.label}
            </span>
          </div>

          <p className="text-[14px] text-[#374151] mb-3" style={{ lineHeight: 1.5 }}>
            {todayCatData.conclusion}
          </p>

          {/* MetricState chips preview */}
          <MetricStateRow states={todayStates} className="mb-3" />

          <button
            onClick={() => setShowWhySheet(true)}
            className="flex items-center gap-1 text-[13px] text-[#1B7A4B]"
          >
            왜 이 추천인가요? <ChevronRight size={14} />
          </button>
        </div>

        {/* ═══ 카테고리 탭 (CMP/Tab/RecoCategory) ═══ */}
        <div className="flex gap-2 mb-4 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          {categoryData.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            const isRecommended = cat.key === todayCategory;
            return (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setSelectedChip(null); }}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] text-[13px] transition-all relative ${
                  isActive
                    ? 'bg-[#1B7A4B] text-white'
                    : 'bg-white text-[#6B7280] border border-[#E5E7EB]'
                }`}
              >
                <Icon size={15} />
                {cat.label}
                {isRecommended && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#FF8A3D] text-white'
                  }`}>
                    추천
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ═══ 검색어 칩 3개 (CMP/Chip/Query) ═══ */}
        <div className="flex flex-col gap-3 mb-5">
          {currentCat.queries.map((query, i) => {
            const isSelected = selectedChip === i;
            return (
              <div key={`${activeCategory}-${i}`}>
                <button
                  onClick={() => setSelectedChip(isSelected ? null : i)}
                  className={`w-full text-left rounded-[16px] p-4 min-h-[56px] transition-all ${
                    isSelected
                      ? 'bg-[#E8F5EE] border-2 border-[#1B7A4B]'
                      : 'bg-white border border-[#E5E7EB] shadow-[0_1px_6px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#1B7A4B]' : 'bg-[#F7F8FA]'
                    }`}>
                      <Search size={14} className={isSelected ? 'text-white' : 'text-[#6B7280]'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[15px] block ${isSelected ? 'text-[#0E4B2E]' : 'text-[#111827]'}`}>
                        "{query}"
                      </span>
                      <span className="text-[11px] text-[#9CA3AF]">{currentCat.queryDescs[i]}</span>
                    </div>
                    {/* Copy on long press hint */}
                    <button
                      onClick={e => { e.stopPropagation(); handleCopyQuery(query); }}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F8FA] shrink-0"
                      title="복사"
                    >
                      {copiedQuery === query ? (
                        <Check size={12} className="text-[#1B7A4B]" />
                      ) : (
                        <Copy size={12} className="text-[#9CA3AF]" />
                      )}
                    </button>
                  </div>

                  {isSelected && (
                    <div className="mt-3 ml-11">
                      <div
                        onClick={e => { e.stopPropagation(); handleQuerySelect(query); }}
                        className="inline-flex items-center gap-1.5 px-4 h-[40px] bg-[#1B7A4B] text-white rounded-[12px] text-[14px] cursor-pointer"
                      >
                        <Play size={14} /> 이 검색어로 보기 <ChevronRight size={14} />
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* ═══ 선택된 칩 CTA (있을 때) ═══ */}
        {selectedChip !== null && (
          <>
            <button
              onClick={() => handleQuerySelect(currentCat.queries[selectedChip])}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(27,122,75,0.3)] mb-2"
            >
              <Play size={18} />
              "{currentCat.queries[selectedChip]}" 검색
            </button>
            <p className="text-[11px] text-[#9CA3AF] text-center mb-5">
              {APP_COPY.EXTERNAL_YOUTUBE}
            </p>
          </>
        )}

        {/* ═══ 하단 옵션 링크들 ═══ */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowSettingsSheet(true)}
            className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
          >
            <Settings2 size={16} className="text-[#6B7280]" />
            <span className="text-[14px] text-[#374151] flex-1 text-left">추천 옵션</span>
            <span className="text-[12px] text-[#9CA3AF]">
              {settings.duration === '5-10' ? '5~10분' : settings.duration === '10-15' ? '10~15분' : '15~20분'}
              {' · '}
              {settings.intensity === 'light' ? '가벼움' : '보통'}
            </span>
            <ChevronRight size={14} className="text-[#D1D5DB]" />
          </button>

          <button
            onClick={() => navigate('/daily/query-templates')}
            className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
          >
            <BookOpen size={16} className="text-[#6B7280]" />
            <span className="text-[14px] text-[#374151] flex-1 text-left">다른 검색어 보기</span>
            <span className="text-[12px] text-[#9CA3AF]">150개 템플릿</span>
            <ChevronRight size={14} className="text-[#D1D5DB]" />
          </button>
        </div>

        {/* Fixed disclaimer */}
        <div className="mt-5 bg-[#F7F8FA] rounded-[14px] p-3">
          <p className="text-[11px] text-[#9CA3AF] text-center" style={{ lineHeight: 1.5 }}>
            이 추천은 의료 진단이 아니라, 생활 리듬을 돕기 위한 안내입니다.
            <br />
            {APP_COPY.EXTERNAL_YOUTUBE}
          </p>
        </div>
      </div>

      {/* ═══ Bottom Sheets ═══ */}
      <WhyRecoSheet
        open={showWhySheet}
        onClose={() => setShowWhySheet(false)}
        states={todayStates}
        conclusion={todayCatData.conclusion}
        category={todayCategory}
        queries={[...todayCatData.queries]}
        onQuerySelect={q => { setShowWhySheet(false); handleQuerySelect(q); }}
      />

      <RecoSettingsSheet
        open={showSettingsSheet}
        onClose={() => setShowSettingsSheet(false)}
        settings={settings}
        onApply={setSettings}
      />
    </div>
  );
}