import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { Bell, User, Moon, Activity, Heart, ChevronRight, Check } from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';
import { InsightStoryCard } from '../../components/ui/InsightStoryCard';
import { RhythmScoreCard } from '../../components/ui/RhythmScoreCard';
import { RecommendationCard } from '../../components/ui/RecommendationCard';
import { MealIdeaCard } from '../../components/ui/MealIdeaCard';
import { CampCTABanner } from '../../components/ui/CampCTABanner';
import { ModeSwitch } from '../../components/ui/ModeSwitch';
import { SyncStatusPill } from '../../components/ui/SyncStatusPill';
import { DailyPlanChecklist } from '../../components/ui/DailyPlanChecklist';
import { VillageModeBanner } from '../../components/ui/VillageModeBanner';

export function HomePage() {
  const { currentDay, totalDays, userName } = useAppContext();
  const navigate = useNavigate();
  const [segment, setSegment] = useState<'daily' | 'camp'>('daily');
  const [planItems, setPlanItems] = useState([
    { id: '1', label: '아침 측정(스트레스)', done: false },
    { id: '2', label: '오늘 프로그램 참여 2개', done: false },
    { id: '3', label: '저녁 마음 체크', done: false },
  ]);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Top Bar */}
      <div className="px-4 pt-[env(safe-area-inset-top)] bg-white">
        <div className="flex items-center justify-between h-[56px]">
          <div className="flex items-center gap-2">
            {segment === 'camp' && (
              <span className="bg-[#E8F5EE] text-[#1B7A4B] px-3 py-1 rounded-full text-[13px]">
                Day {currentDay} · {totalDays - 1}박{totalDays}일 캠프
              </span>
            )}
            {segment === 'daily' && (
              <SyncStatusPill status="synced" lastSyncTime="방금" />
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[#F7F8FA]">
              <Bell size={20} className="text-[#374151]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF8A3D] rounded-full" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E8F5EE]">
              <User size={20} className="text-[#1B7A4B]" />
            </button>
          </div>
        </div>

        {/* Segment Switch */}
        <div className="mb-2">
          <ModeSwitch
            segments={[
              { key: 'daily', label: '일상' },
              { key: 'camp', label: '캠프' },
            ]}
            activeKey={segment}
            onChange={(key) => setSegment(key as 'daily' | 'camp')}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4]">
        <p className="text-[11px] text-[#6B7280]">진단이 아닌, 생활 속 상태 점검과 회복 기록</p>
      </div>

      {/* Village mode banner */}
      <VillageModeBanner />

      {/* ========== DAILY MODE ========== */}
      {segment === 'daily' && (
        <>
          {/* Hero */}
          <div className="px-4 pt-5 pb-4 bg-white">
            <h1 className="text-[22px] text-[#111827] mb-1" style={{ lineHeight: 1.4 }}>
              {userName}님, 오늘은<br />리듬을 안정시키는 날이에요
            </h1>
            <p className="text-[14px] text-[#6B7280]">
              어제 잠이 얕아서 배터리가 덜 충전됐을 수 있어요.
            </p>
          </div>

          {/* Rhythm Score */}
          <div className="px-4 py-4">
            <RhythmScoreCard
              score={62}
              description="수면 규칙성과 활동량을 기반으로 한 생활 리듬 점수예요. 의학적 지표가 아닌 생활 습관 점수입니다."
              ctaLabel="가벼운 산책 20분 시작"
              secondaryCta="오늘의 계획 보기"
              onCta={() => navigate('/daily/activity/auto-1')}
              onSecondaryCta={() => navigate('/daily/plan')}
            />
          </div>

          {/* Metric Cards */}
          <div className="px-4 pb-4">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide">
              <MetricCard
                icon={<Moon size={18} />}
                title="수면"
                value="5.2"
                unit="시간"
                change="-18%"
                changePositive={false}
                status="yellow"
                metaphor="배터리 충전이 60%에서 멈춘 것과 비슷해요"
                onDetail={() => navigate('/check/sleep')}
              />
              <MetricCard
                icon={<Heart size={18} />}
                title="스트레스"
                value="62"
                unit="점"
                change="+12%"
                changePositive={false}
                status="yellow"
                metaphor="엔진이 살짝 과열된 상태와 비슷해요"
                onDetail={() => navigate('/check/stress')}
              />
              <MetricCard
                icon={<Activity size={18} />}
                title="활동"
                value="4,280"
                unit="걸음"
                change="+8%"
                changePositive={true}
                status="green"
                metaphor="자동차 핸들이 균형 잡힌 상태예요"
              />
            </div>
          </div>

          {/* AI Insight */}
          <div className="px-4 mb-4">
            <InsightStoryCard
              steps={['깊은 수면 부족', '회복 느림', '스트레스 상승']}
              recommendations={[
                { label: '10분 호흡 명상 보기' },
                { label: '가벼운 산책 20분' },
              ]}
            />
          </div>

          {/* Today Recommendations */}
          <div className="px-4 mb-4">
            <h3 className="text-[16px] text-[#111827] mb-3">오늘의 추천</h3>
            <div className="flex flex-col gap-3">
              <RecommendationCard
                variant="primaryPick"
                category="운동"
                title="아침 스트레칭 가이드"
                reason="수면이 짧았을 때 가벼운 스트레칭이 활력에 도움이 될 수 있어요"
                intensity="가벼움"
                duration="8분"
                ctaLabel="YouTube로 보기"
                isYoutube
                onCta={() => navigate('/daily/youtube-query')}
                onAddToPlan={() => navigate('/daily/plan')}
              />
              <RecommendationCard
                category="명상"
                title="호흡 명상 가이드"
                reason="스트레스가 높을 때 호흡 명상이 마음을 안정시킬 수 있어요"
                intensity="가벼움"
                duration="10분"
                ctaLabel="YouTube로 보기"
                isYoutube
                onCta={() => navigate('/daily/youtube-query')}
                onAddToPlan={() => navigate('/daily/plan')}
              />
              <RecommendationCard
                category="수면루틴"
                title="저녁 수면 준비 루틴"
                reason="수면의 질을 높이는 간단한 루틴이에요"
                intensity="가벼움"
                duration="5분"
                ctaLabel="가이드 보기"
                onCta={() => navigate('/daily/activity/add-1')}
                onAddToPlan={() => navigate('/daily/plan')}
              />
            </div>
          </div>

          {/* Meal Ideas */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] text-[#111827]">오늘의 식단 아이디어</h3>
              <button
                onClick={() => navigate('/daily/food')}
                className="text-[13px] text-[#1B7A4B] flex items-center gap-0.5"
              >
                전체 보기 <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="min-w-[260px] snap-center">
                <MealIdeaCard
                  type="아침"
                  title="따뜻한 오트밀 & 제철 과일"
                  point="따뜻한 식사로 하루를 시작해요"
                  hasYoutubeRecipe
                  ingredients={['오트밀', '바나나', '꿀', '견과류']}
                />
              </div>
              <div className="min-w-[260px] snap-center">
                <MealIdeaCard
                  type="점심"
                  title="현미밥 & 된장찌개 정식"
                  point="소화에 좋은 가벼운 한식이에요"
                  ingredients={['현미', '두부', '된장', '계절 나물']}
                />
              </div>
              <div className="min-w-[260px] snap-center">
                <MealIdeaCard
                  type="저녁"
                  title="수면에 좋은 가벼운 저녁"
                  point="트립토판이 풍부한 식사가 수면에 도움될 수 있어요"
                  hasYoutubeRecipe
                  ingredients={['닭가슴살', '고구마', '브로콜리']}
                />
              </div>
            </div>
          </div>

          {/* Camp CTA Banner */}
          <div className="px-4 mb-4">
            <CampCTABanner />
          </div>

          {/* Sticky CTA */}
          <div className="px-4 pb-4">
            <button
              onClick={() => navigate('/daily/plan')}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(27,122,75,0.3)]"
            >
              오늘의 계획 시작하기 <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}

      {/* ========== CAMP MODE ========== */}
      {segment === 'camp' && (
        <>
          {/* Hero */}
          <div className="px-4 pt-5 pb-4 bg-white">
            <h1 className="text-[22px] text-[#111827] mb-1" style={{ lineHeight: 1.4 }}>
              {userName}님, 오늘은<br />회복을 늘리는 날이에요
            </h1>
            <p className="text-[14px] text-[#6B7280]">
              어제 수면이 짧아서 피로가 남아 있을 수 있어요.
            </p>
          </div>

          {/* Today's Checklist */}
          <div className="px-4 py-4">
            <DailyPlanChecklist
              items={planItems}
              onToggle={(id) =>
                setPlanItems(prev =>
                  prev.map(i => i.id === id ? { ...i, done: !i.done } : i)
                )
              }
            />
          </div>

          {/* Camp Metric Cards */}
          <div className="px-4 pb-4">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide">
              <MetricCard
                icon={<Moon size={18} />}
                title="수면"
                value="5.2"
                unit="시간"
                change="-18%"
                changePositive={false}
                status="yellow"
                metaphor="배터리 충전이 60%에서 멈춘 것과 비슷해요"
                onDetail={() => navigate('/check/sleep')}
              />
              <MetricCard
                icon={<Heart size={18} />}
                title="스트레스"
                value="62"
                unit="점"
                change="+12%"
                changePositive={false}
                status="yellow"
                metaphor="엔진이 살짝 과열된 상태와 비슷해요"
                onDetail={() => navigate('/check/stress')}
              />
              <MetricCard
                icon={<Activity size={18} />}
                title="활동"
                value="4,280"
                unit="걸음"
                change="+8%"
                changePositive={true}
                status="green"
                metaphor="자동차 핸들이 균형 잡힌 상태예요"
              />
            </div>
          </div>

          {/* Camp Quick Actions */}
          <div className="px-4 mb-4 flex gap-3">
            <button
              onClick={() => navigate('/camp')}
              className="flex-1 h-[48px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px]"
            >
              오늘 일정 보기
            </button>
            <button
              onClick={() => navigate('/check')}
              className="flex-1 h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px]"
            >
              체크인 하기
            </button>
          </div>

          {/* AI Insight */}
          <div className="px-4 mb-4">
            <InsightStoryCard
              steps={['깊은 수면 부족', '회복 느림', '스트레스 상승']}
              recommendations={[
                { label: '10분 호흡 명상 보기' },
                { label: '가벼운 산책 20분' },
              ]}
            />
          </div>

          {/* Sticky CTA */}
          <div className="px-4 pb-4">
            <button
              onClick={() => navigate('/check')}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(27,122,75,0.3)]"
            >
              지금 체크하기 <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}