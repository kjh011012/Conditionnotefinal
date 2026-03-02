/**
 * P-Action-01_ActivityDetail (추천 활동 상세)
 * - 소요시간/강도/주의(선택)
 * - "왜 추천?" 수면/피로/활동량 기반 쉬운 설명
 * - [YouTube로 보기] 또는 [시작하기]
 * - 하단: "완료하면 체크돼요" 안내
 */
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, Clock, Zap, AlertTriangle, Play, ExternalLink,
  ChevronRight, Footprints, Wind, Dumbbell, Sparkles,
} from 'lucide-react';

// Mock activity data
const activities: Record<string, {
  title: string; category: string; duration: string; intensity: string;
  icon: any; whyRecommend: string; howTo: string[];
  caution?: string; hasYoutube: boolean;
}> = {
  'auto-1': {
    title: '가벼운 산책 20분',
    category: '산책',
    duration: '20분',
    intensity: '가벼움',
    icon: Footprints,
    whyRecommend: '어제 수면이 짧아서(5.2시간) 오늘 몸의 충전이 덜 됐을 수 있어요. 가벼운 걷기는 햇빛과 함께 리듬 회복에 도움이 될 수 있어요. 점심 전에 하면 더 좋아요.',
    howTo: [
      '편한 신발을 신으세요',
      '가까운 공원이나 마을길을 걸어보세요',
      '빠르게 걷지 않아도 괜찮아요',
      '중간에 쉬어도 돼요',
    ],
    caution: '무릎이나 허리가 아프면 멈추고 쉬세요.',
    hasYoutube: false,
  },
  'add-1': {
    title: '호흡 명상 10분',
    category: '명상',
    duration: '10분',
    intensity: '가벼움',
    icon: Wind,
    whyRecommend: '오늘 스트레스 지수가 62점으로 평소보다 높아요. 호흡에 집중하면 마음이 안정될 수 있어요. 조용한 곳에서 편하게 해보세요.',
    howTo: [
      '편한 자세로 앉으세요',
      '눈을 감고 코로 천천히 숨을 쉬세요',
      '4초 들이쉬고, 4초 내쉬어 보세요',
      '생각이 떠올라도 괜찮아요, 다시 숨에 집중하세요',
    ],
    hasYoutube: true,
  },
  'add-2': {
    title: '아침 스트레칭 8분',
    category: '운동',
    duration: '8분',
    intensity: '가벼움',
    icon: Dumbbell,
    whyRecommend: '수면이 짧으면 몸이 뻣뻣할 수 있어요. 가벼운 스트레칭이 혈액 순환과 활력에 도움이 될 수 있어요.',
    howTo: [
      '일어나서 팔을 위로 쭉 뻗으세요',
      '좌우로 천천히 몸을 돌려보세요',
      '다리를 편 채 앞으로 천천히 숙여보세요',
      '아프지 않은 범위까지만 해주세요',
    ],
    hasYoutube: true,
  },
  'add-3': {
    title: '의자 체조 10분',
    category: '체조',
    duration: '10분',
    intensity: '가벼움',
    icon: Dumbbell,
    whyRecommend: '앉아서 할 수 있는 간단한 체조예요. 활동량을 늘리고 싶지만 외출이 어려울 때 도움이 될 수 있어요.',
    howTo: [
      '등받이가 있는 의자에 앉으세요',
      '팔을 위로 올렸다 내리세요',
      '발목을 돌려주세요',
      '무릎을 번갈아 올려보세요',
    ],
    hasYoutube: true,
  },
};

export function ActivityDetailPage() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const activity = activities[activityId || 'auto-1'] || activities['auto-1'];
  const Icon = activity.icon;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">활동 상세</h2>
      </div>

      <div className="px-4 pt-5 pb-6">
        {/* Activity header card */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center">
              <Icon size={24} className="text-[#1B7A4B]" />
            </div>
            <div>
              <h3 className="text-[18px] text-[#111827]">{activity.title}</h3>
              <span className="text-[12px] text-[#6B7280]">{activity.category}</span>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 bg-[#F7F8FA] px-3 py-2 rounded-[10px]">
              <Clock size={14} className="text-[#6B7280]" />
              <span className="text-[14px] text-[#374151]">{activity.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F7F8FA] px-3 py-2 rounded-[10px]">
              <Zap size={14} className="text-[#6B7280]" />
              <span className="text-[14px] text-[#374151]">{activity.intensity}</span>
            </div>
          </div>

          {/* Caution */}
          {activity.caution && (
            <div className="flex items-start gap-2 bg-[#FEF9C3] rounded-[12px] px-3 py-2.5 mb-2">
              <AlertTriangle size={14} className="text-[#A16207] mt-0.5 shrink-0" />
              <p className="text-[13px] text-[#A16207]">{activity.caution}</p>
            </div>
          )}
        </div>

        {/* Why recommended */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#FF8A3D]" />
            <span className="text-[15px] text-[#111827]">왜 추천했나요?</span>
          </div>
          <p className="text-[14px] text-[#374151] leading-[22px]">
            {activity.whyRecommend}
          </p>
          <p className="text-[11px] text-[#9CA3AF] mt-2">
            수면/활동/스트레스 데이터 기반 추천이며, 의학적 처방이 아닙니다.
          </p>
        </div>

        {/* How to */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <h3 className="text-[15px] text-[#111827] mb-3">이렇게 해보세요</h3>
          <div className="flex flex-col gap-3">
            {activity.howTo.map((step, i) => (
              <div key={i} className="flex items-start gap-3 min-h-[36px]">
                <div className="w-6 h-6 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[12px] text-[#1B7A4B]">{i + 1}</span>
                </div>
                <p className="text-[14px] text-[#374151]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Completion notice */}
        <div className="bg-[#E8F5EE] rounded-[14px] px-4 py-3 mb-6">
          <p className="text-[13px] text-[#0E4B2E]">
            완료하면 자동으로 체크되고, 오늘의 리듬 카드에 반영돼요.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          {activity.hasYoutube && (
            <button
              onClick={() => navigate('/daily/youtube-query')}
              className="w-full h-[52px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[16px] flex items-center justify-center gap-2"
            >
              <Play size={18} /> YouTube로 보기
              <ExternalLink size={14} className="ml-1 opacity-60" />
            </button>
          )}
          <button
            onClick={() => navigate(`/daily/progress/${activityId || 'auto-1'}`)}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(27,122,75,0.3)]"
          >
            시작하기 <ChevronRight size={18} />
          </button>
        </div>
        {activity.hasYoutube && (
          <p className="text-[10px] text-[#9CA3AF] text-center mt-2">YouTube로 보기는 외부 앱으로 이동합니다</p>
        )}
      </div>
    </div>
  );
}
