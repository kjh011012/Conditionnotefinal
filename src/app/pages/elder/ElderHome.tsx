/**
 * 어르신 모드 — 홈 (상업용 수준)
 * 오각형 레이더 차트 상태 요약 + 유튜브 추천 + 비유 카드
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Phone, Play, ChevronRight, ExternalLink, RefreshCcw } from 'lucide-react';

/* ── 오늘 상태 데이터 (5각형) ── */
const todayStatus = {
  sleep: { score: 75, label: '수면', emoji: '😴', desc: '6시간 30분', metaphor: '나무가 쉬듯 조금 더 푹 쉬면 좋겠어요' },
  stress: { score: 85, label: '스트레스', emoji: '😌', desc: '낮음', metaphor: '잔잔한 호수처럼 마음이 평온해요' },
  heart: { score: 90, label: '심장', emoji: '💓', desc: '안정', metaphor: '시계추처럼 규칙적으로 뛰고 있어요' },
  activity: { score: 60, label: '활동', emoji: '🚶', desc: '3,200보', metaphor: '꽃밭 산책 한 바퀴 정도 걸으셨어요' },
  cognitive: { score: 80, label: '두뇌', emoji: '🧠', desc: '양호', metaphor: '오늘 머리가 맑고 또렷해요' },
};

const radarData = Object.values(todayStatus).map(s => ({
  subject: `${s.emoji} ${s.label}`,
  value: s.score,
  fullMark: 100,
}));

/* ── 전체 점수 계산 ── */
const avgScore = Math.round(Object.values(todayStatus).reduce((a, b) => a + b.score, 0) / 5);
const overallEmoji = avgScore >= 80 ? '🌟' : avgScore >= 60 ? '☀️' : avgScore >= 40 ? '🌤️' : '🌧️';
const overallText = avgScore >= 80 ? '오늘 컨디션이 아주 좋아요!' : avgScore >= 60 ? '오늘 상태가 괜찮아요' : avgScore >= 40 ? '조금 쉬어가는 것도 좋겠어요' : '오늘은 무리하지 마세요';
const overallColor = avgScore >= 80 ? '#1B7A4B' : avgScore >= 60 ? '#0EA5E9' : avgScore >= 40 ? '#F59E0B' : '#DC2626';

/* ── 유튜브 추천 카테고리 ── */
type VideoCategory = 'exercise' | 'brain' | 'mood' | 'meal';

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  category: VideoCategory;
  reason: string;
}

const videoCategories: { key: VideoCategory; label: string; emoji: string; color: string; bg: string }[] = [
  { key: 'exercise', label: '운동', emoji: '🏃', color: '#1B7A4B', bg: '#E8F5EE' },
  { key: 'brain', label: '두뇌', emoji: '🧠', color: '#7C3AED', bg: '#F3E8FF' },
  { key: 'mood', label: '마음', emoji: '🎵', color: '#EC4899', bg: '#FFF1F2' },
  { key: 'meal', label: '식사', emoji: '🥗', color: '#F59E0B', bg: '#FEF3C7' },
];

const categoryThumbnails: Record<VideoCategory, string> = {
  exercise: 'https://images.unsplash.com/photo-1569950044374-f94a1fc41ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  brain: 'https://images.unsplash.com/photo-1622617760286-e11b543f5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  mood: 'https://images.unsplash.com/photo-1763202370511-c9ca7580adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  meal: 'https://images.unsplash.com/photo-1670698783848-5cf695a1b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
};

const videos: VideoItem[] = [
  // 운동
  { id: 'v1', title: '어르신 아침 스트레칭 15분', channel: '건강한 시니어TV', duration: '15:20', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'exercise', reason: '활동량이 조금 부족해요. 가벼운 스트레칭으로 시작해보세요' },
  { id: 'v2', title: '앉아서 하는 관절 체조', channel: '시니어 건강교실', duration: '12:45', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'exercise', reason: '관절을 부드럽게 풀어주는 운동이에요' },
  { id: 'v3', title: '낙상 예방 균형 운동 10분', channel: '대한노인체육회', duration: '10:30', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'exercise', reason: '균형감각을 키워 넘어지지 않도록 도와줘요' },
  // 두뇌
  { id: 'v4', title: '치매 예방! 손가락 두뇌 체조', channel: '치매예방TV', duration: '8:15', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'brain', reason: '손가락 운동은 두뇌를 깨우는 최고의 방법이에요' },
  { id: 'v5', title: '숫자 맞추기 두뇌 게임', channel: '시니어 브레인', duration: '11:00', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'brain', reason: '재미있는 게임으로 머리를 맑게 해요' },
  { id: 'v6', title: '기억력 높이는 노래 부르기', channel: '건강한 시니어TV', duration: '14:30', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'brain', reason: '익숙한 노래를 따라 부르면 기억력에 좋아요' },
  // 마음
  { id: 'v7', title: '마음이 편안해지는 자연 소리', channel: '힐링사운드', duration: '30:00', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'mood', reason: '스트레스가 낮은 지금, 더 편안해지세요' },
  { id: 'v8', title: '신나는 트로트 메들리 모음', channel: '추억의 가요', duration: '45:00', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'mood', reason: '신나는 노래로 기분을 더 좋게 만들어요' },
  { id: 'v9', title: '5분 호흡 명상 (어르신용)', channel: '마음수련', duration: '5:30', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'mood', reason: '깊은 호흡으로 하루를 가볍게 시작해요' },
  // 식사
  { id: 'v10', title: '어르신 건강 아침 식단 3가지', channel: '시니어 밥상', duration: '9:40', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'meal', reason: '맛있고 영양 가득한 아침 만들기' },
  { id: 'v11', title: '뼈 건강에 좋은 음식 총정리', channel: '건강 밥상', duration: '13:20', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'meal', reason: '튼튼한 뼈를 위한 식단을 알아봐요' },
  { id: 'v12', title: '혈당 관리 간식 만들기', channel: '시니어 요리교실', duration: '11:15', thumbnail: '', youtubeId: 'dQw4w9WgXcQ', category: 'meal', reason: '달달하면서도 건강한 간식이에요' },
];

/* ── 오늘 할 일 ── */
const todos = [
  { emoji: '🌅', label: '아침 스트레스 측정하기', done: true, time: '07:30' },
  { emoji: '🚶', label: '산책 30분 하기', done: false, time: '10:00' },
  { emoji: '🧠', label: '두뇌 체조 하기', done: false, time: '14:00' },
  { emoji: '🌙', label: '저녁 마음 체크하기', done: false, time: '20:00' },
];

/* ── Custom Radar Label ── */
const CustomAngleTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 14, fill: '#374151' }}>
      {payload.value}
    </text>
  );
};

export function ElderHome() {
  const { userName } = useAppContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('exercise');
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);

  const categoryVideos = videos.filter(v => v.category === selectedCategory);

  const openYoutube = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ 인사 헤더 ═══ */}
      <div className="px-5 pt-6 pb-4" style={{ background: `linear-gradient(135deg, #E8F5EE 0%, #F0F4FF 100%)` }}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[15px] text-[#6B7280]">안녕하세요</p>
          <span className="text-[13px] text-[#9CA3AF]">3월 2일 월요일</span>
        </div>
        <h1 className="text-[28px] text-[#111827]">{userName}님 😊</h1>
      </div>

      <div className="px-5 pt-4 pb-8 flex flex-col gap-6">

        {/* ═══ 오늘의 컨디션 점수 + 레이더 차트 ═══ */}
        <div className="bg-white rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* 점수 헤더 */}
          <div className="px-5 pt-5 pb-2">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[36px]">{overallEmoji}</span>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px]" style={{ color: overallColor }}>{avgScore}</span>
                  <span className="text-[16px] text-[#9CA3AF]">/ 100점</span>
                </div>
                <p className="text-[18px] text-[#111827]">{overallText}</p>
              </div>
            </div>
          </div>

          {/* 오각형 레이더 차트 */}
          <div className="mx-auto" style={{ width: '100%', maxWidth: 320, height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={CustomAngleTick} />
                <Radar
                  name="오늘"
                  dataKey="value"
                  stroke={overallColor}
                  fill={overallColor}
                  fillOpacity={0.15}
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: overallColor, strokeWidth: 0 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 항목별 상세 (탭 가능) */}
          <div className="px-4 pb-4">
            {Object.entries(todayStatus).map(([key, s]) => (
              <button
                key={key}
                onClick={() => setExpandedStatus(expandedStatus === key ? null : key)}
                className="w-full text-left"
              >
                <div className={`flex items-center gap-3 py-3 border-t border-[#F3F4F6] ${expandedStatus === key ? '' : ''}`}>
                  <span className="text-[24px] w-10 text-center shrink-0">{s.emoji}</span>
                  <span className="text-[17px] text-[#111827] flex-1">{s.label}</span>
                  <span className="text-[17px] text-[#374151]">{s.desc}</span>
                  {/* 점수 막대 */}
                  <div className="w-[50px] h-[8px] bg-[#F3F4F6] rounded-full overflow-hidden ml-1">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${s.score}%`,
                        backgroundColor: s.score >= 80 ? '#1B7A4B' : s.score >= 60 ? '#F59E0B' : '#DC2626',
                      }}
                    />
                  </div>
                </div>
                {expandedStatus === key && (
                  <div className="ml-[52px] pb-3 pr-2">
                    <div className="bg-[#F7F8FA] rounded-[14px] p-3">
                      <p className="text-[15px] text-[#374151]" style={{ lineHeight: 1.6 }}>
                        💬 {s.metaphor}
                      </p>
                      <p className="text-[12px] text-[#9CA3AF] mt-1">
                        점수: {s.score}점 · 참고 정보이며 의료 진단이 아닙니다
                      </p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ 오늘 할 일 ═══ */}
        <div>
          <h2 className="text-[20px] text-[#111827] mb-3">오늘 할 일</h2>
          <div className="flex flex-col gap-2">
            {todos.map((item, i) => (
              <button key={i} onClick={() => !item.done && navigate('/elder/check')}
                className={`w-full rounded-[18px] p-4 flex items-center gap-4 min-h-[64px] text-left active:scale-[0.98] transition-transform ${item.done ? 'bg-[#F3F4F6]' : 'bg-[#FFFBEB]'}`}>
                <span className="text-[26px]">{item.emoji}</span>
                <div className="flex-1">
                  <span className={`text-[17px] block ${item.done ? 'text-[#9CA3AF] line-through' : 'text-[#111827]'}`}>
                    {item.label}
                  </span>
                  <span className="text-[13px] text-[#9CA3AF]">{item.time}</span>
                </div>
                {item.done ? (
                  <span className="text-[22px]">✅</span>
                ) : (
                  <ChevronRight size={22} className="text-[#D1D5DB]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ 오늘의 추천 영상 ═══ */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] text-[#111827]">📺 오늘의 추천 영상</h2>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {videoCategories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[15px] transition-all min-h-[48px] ${
                  selectedCategory === cat.key
                    ? 'shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                    : 'border border-[#E5E7EB]'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat.key ? cat.bg : 'white',
                  color: selectedCategory === cat.key ? cat.color : '#6B7280',
                }}
              >
                <span className="text-[20px]">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* AI 추천 이유 */}
          <div className="bg-[#F7F8FA] rounded-[16px] p-4 mb-3">
            <div className="flex items-start gap-2">
              <span className="text-[20px] shrink-0">🤖</span>
              <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.6 }}>
                {selectedCategory === 'exercise' && '오늘 활동량이 조금 부족해요. 가벼운 운동으로 몸을 깨워보세요!'}
                {selectedCategory === 'brain' && '두뇌 점수가 양호해요. 꾸준히 두뇌 운동을 하면 더 좋아져요!'}
                {selectedCategory === 'mood' && '마음이 평온한 날이에요. 좋아하는 음악으로 기분을 더 높여보세요!'}
                {selectedCategory === 'meal' && '건강한 식사는 모든 건강의 기초예요. 맛있는 레시피를 추천해요!'}
              </p>
            </div>
          </div>

          {/* 영상 카드 */}
          <div className="flex flex-col gap-3">
            {categoryVideos.map(video => (
              <button
                key={video.id}
                onClick={() => openYoutube(video.youtubeId)}
                className="w-full bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden text-left active:scale-[0.98] transition-transform"
              >
                {/* 썸네일 영역 */}
                <div className="relative h-[56px] flex items-center gap-4 px-5 bg-gradient-to-r from-[#DC2626] to-[#B91C1C]">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-white/80">YouTube</span>
                    <span className="text-[12px] text-white/60 block">{video.duration}</span>
                  </div>
                </div>
                {/* 내용 */}
                <div className="p-4">
                  <h3 className="text-[17px] text-[#111827] mb-1">{video.title}</h3>
                  <span className="text-[13px] text-[#6B7280] block mb-2">{video.channel}</span>
                  <div className="bg-[#F7F8FA] rounded-[10px] px-3 py-2">
                    <p className="text-[13px] text-[#374151]" style={{ lineHeight: 1.5 }}>
                      💡 {video.reason}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ═══ 긴급 도움 ═══ */}
        <button className="w-full bg-[#FEF2F2] rounded-[20px] p-5 flex items-center gap-4 active:scale-[0.98] transition-transform min-h-[72px]">
          <div className="w-14 h-14 rounded-full bg-[#DC2626]/15 flex items-center justify-center shrink-0">
            <Phone size={28} className="text-[#DC2626]" />
          </div>
          <div className="flex-1 text-left">
            <span className="text-[20px] text-[#DC2626] block">도움이 필요하면</span>
            <span className="text-[15px] text-[#6B7280]">코디네이터에게 전화하기</span>
          </div>
          <ChevronRight size={22} className="text-[#DC2626]" />
        </button>

        <p className="text-[13px] text-[#9CA3AF] text-center px-4" style={{ lineHeight: 1.6 }}>
          이 정보는 생활 참고용이며, 의료 진단이 아닙니다.<br />
          불편하신 점은 코디네이터에게 말씀해주세요.
        </p>
      </div>
    </div>
  );
}