import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Dumbbell, Wind, Utensils, Sparkles, ChevronRight } from 'lucide-react';
import { RecommendationCard } from '../../components/ui/RecommendationCard';
import { MealIdeaCard } from '../../components/ui/MealIdeaCard';
import { YouTubeSearchCard } from '../../components/ui/YouTubeSearchCard';

const bodyRecs = [
  { title: '시니어 아침 스트레칭', reason: '수면이 짧았을 때 가벼운 스트레칭이 활력에 도움이 될 수 있어요', intensity: '가벼움' as const, duration: '8분', variant: 'primaryPick' as const, category: '운동' as const },
  { title: '의자 체조 가이드', reason: '앉아서 할 수 있는 간단한 체조예요', intensity: '가벼움' as const, duration: '10분', category: '체조' as const },
  { title: '걷기 운동 20분 가이드', reason: '규칙적인 걷기는 리듬 안정에 도움이 될 수 있어요', intensity: '보통' as const, duration: '20분', category: '산책' as const },
];

const mindRecs = [
  { title: '호흡 명상 가이드', reason: '스트레스가 높을 때 호흡에 집중하면 마음이 안정될 수 있어요', intensity: '가벼움' as const, duration: '10분', variant: 'primaryPick' as const, category: '명상' as const },
  { title: '점진적 근육 이완', reason: '몸��� 긴장을 하나씩 풀어주는 이완법이에요', intensity: '가벼움' as const, duration: '15분' },
  { title: '잠자리 명상', reason: '수면 전 마음을 가라앉히는 데 도움이 될 수 있어요', intensity: '가벼움' as const, duration: '8분' },
];

const youtubeVideos = [
  { title: '시니어 맞춤 10분 전신 스트레칭', channel: '건강TV', duration: '10:23' },
  { title: '5분 호흡 명상 가이드 (초보자용)', channel: '마음챙김', duration: '5:45' },
  { title: '잠이 잘 오는 저녁 루틴 ASMR', channel: '수면케어', duration: '8:12' },
  { title: '의자에서 하는 전신 체조', channel: '실버운동', duration: '12:30' },
];

export function TodayRecommend() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'body' | 'mind' | 'food'>('body');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate('/check')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">오늘의 추천</h2>
      </div>

      {/* Section Tabs */}
      <div className="px-4 pt-3 pb-0 bg-white">
        <div className="flex gap-2">
          {[
            { key: 'body' as const, icon: Dumbbell, label: '몸' },
            { key: 'mind' as const, icon: Wind, label: '마음' },
            { key: 'food' as const, icon: Utensils, label: '식단' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] text-[14px] transition-all ${
                activeSection === tab.key
                  ? 'bg-[#E8F5EE] text-[#1B7A4B]'
                  : 'bg-[#F7F8FA] text-[#6B7280]'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 pb-4">
        {activeSection === 'body' && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#6B7280] mb-1">운동 · 체조 · 스트레칭</p>
            {bodyRecs.map((rec, i) => (
              <RecommendationCard
                key={i}
                {...rec}
                ctaLabel="YouTube로 보기"
                isYoutube
              />
            ))}
          </div>
        )}

        {activeSection === 'mind' && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#6B7280] mb-1">명상 · 호흡 · 이완</p>
            {mindRecs.map((rec, i) => (
              <RecommendationCard
                key={i}
                {...rec}
                ctaLabel="YouTube로 보기"
                isYoutube
              />
            ))}
          </div>
        )}

        {activeSection === 'food' && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#6B7280] mb-2">오늘의 식사 아이디어</p>
            <MealIdeaCard
              type="아침"
              title="따뜻한 오트밀 & 제철 과일"
              point="따뜻한 식사로 하루를 시작해요"
              hasYoutubeRecipe
              ingredients={['오트밀', '바나나', '꿀', '견과류']}
            />
            <MealIdeaCard
              type="점심"
              title="현미밥 & 된장찌개 정식"
              point="소화에 좋은 가벼운 한식이에요"
              ingredients={['현미', '두부', '된장', '계절 나물']}
            />
            <MealIdeaCard
              type="저녁"
              title="수면에 좋은 가벼운 저녁"
              point="트립토판이 풍부한 식사가 수면에 도움될 수 있어요"
              hasYoutubeRecipe
              ingredients={['닭가슴살', '고구마', '브로콜리']}
            />

            <div className="mt-2 bg-[#E8F5EE] rounded-[16px] p-4">
              <p className="text-[13px] text-[#0E4B2E]">
                캠프에서 먹던 식단을 집에서도 이어가 보세요. 간단한 재료로 비슷한 효과를 느낄 수 있어요.
              </p>
            </div>
          </div>
        )}

        {/* YouTube Section */}
        <div className="mt-5">
          {/* AI YouTube 추천 카드 */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#FF8A3D]" />
              <span className="text-[14px] text-[#111827]">AI YouTube 추천</span>
              <span className="text-[11px] text-white bg-[#FF8A3D] px-2 py-0.5 rounded-full ml-auto">수면루틴</span>
            </div>
            <p className="text-[13px] text-[#6B7280] mb-3">
              오늘 상태에 맞는 검색어 3개를 추천해 드려요.
            </p>
            <button
              onClick={() => navigate('/daily/youtube-query')}
              className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[12px] text-[14px] flex items-center justify-center gap-2"
            >
              YouTube 추천 보기 <ChevronRight size={14} />
            </button>
          </div>

          <YouTubeSearchCard
            searchQuery={
              activeSection === 'body'
                ? '시니어 스트레칭 5분'
                : activeSection === 'mind'
                ? '10분 호흡 명상'
                : '수면에 좋은 저녁 레시피'
            }
            videos={youtubeVideos}
          />
        </div>

        <button
          onClick={() => navigate('/check')}
          className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] mt-4"
        >
          체크 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
}