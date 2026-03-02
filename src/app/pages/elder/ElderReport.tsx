/**
 * 어르신 모드 — 리포트 (심층 + 직관)
 * 오각형 레이더 비교(이번주 vs 지난주), 비유 AI 해설, 이모지 달력, 항목별 물컵 비유
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

/* ── 주간 데이터 (이번주 vs 지난주) ── */
const radarCompare = [
  { subject: '😴 수면', thisWeek: 75, lastWeek: 65, fullMark: 100 },
  { subject: '😌 스트레스', thisWeek: 85, lastWeek: 80, fullMark: 100 },
  { subject: '💓 심장', thisWeek: 90, lastWeek: 88, fullMark: 100 },
  { subject: '🚶 활동', thisWeek: 60, lastWeek: 55, fullMark: 100 },
  { subject: '🧠 두뇌', thisWeek: 80, lastWeek: 72, fullMark: 100 },
];

const thisWeekAvg = Math.round(radarCompare.reduce((a, b) => a + b.thisWeek, 0) / radarCompare.length);
const lastWeekAvg = Math.round(radarCompare.reduce((a, b) => a + b.lastWeek, 0) / radarCompare.length);
const diff = thisWeekAvg - lastWeekAvg;

/* ── 항목별 상세 (물컵 비유 사용) ── */
interface CategoryDetail {
  key: string;
  emoji: string;
  label: string;
  thisWeek: number;
  lastWeek: number;
  color: string;
  bg: string;
  metaphorGood: string;
  metaphorNormal: string;
  metaphorBad: string;
  details: string[];
  tip: string;
}

const categories: CategoryDetail[] = [
  {
    key: 'sleep', emoji: '😴', label: '수면', thisWeek: 75, lastWeek: 65,
    color: '#6366F1', bg: '#F0F4FF',
    metaphorGood: '물컵이 거의 가득 찼어요. 충분히 푹 주무셨네요!',
    metaphorNormal: '물컵이 반 정도 채워져 있어요. 조금 더 자면 좋겠어요.',
    metaphorBad: '물컵이 비어가고 있어요. 수면이 부족해요.',
    details: ['평균 수면: 6시간 30분', '가장 잘 잔 날: 화요일 (7시간)', '가장 못 잔 날: 금요일 (5시간)'],
    tip: '잠자기 1시간 전부터 밝은 빛을 줄여보세요',
  },
  {
    key: 'stress', emoji: '😌', label: '스트레스', thisWeek: 85, lastWeek: 80,
    color: '#1B7A4B', bg: '#E8F5EE',
    metaphorGood: '호수가 잔잔해요. 마음이 아주 편안하시네요!',
    metaphorNormal: '호수에 잔물결이 있어요. 대체로 괜찮지만 가끔 신경 쓰이는 일이 있네요.',
    metaphorBad: '호수에 파도가 치고 있어요. 마음이 많이 힘드시네요.',
    details: ['주간 평균: 낮음~보통', '가장 편안한 날: 토요일', '조금 높았던 날: 수요일'],
    tip: '깊은 호흡을 5번 해보세요. 호수가 잔잔해져요',
  },
  {
    key: 'heart', emoji: '💓', label: '심장 리듬', thisWeek: 90, lastWeek: 88,
    color: '#EC4899', bg: '#FFF1F2',
    metaphorGood: '시계추가 규칙적으로 흔들리고 있어요. 심장이 아주 건강해요!',
    metaphorNormal: '시계추가 가끔 흔들려요. 대체로 괜찮지만 관심을 가져주세요.',
    metaphorBad: '시계추가 불규칙해요. 코디네이터에게 말씀해주세요.',
    details: ['평균 심박: 72회/분', '안정 시 심박: 68회/분', '자율신경 균형: 양호'],
    tip: '규칙적인 산책이 심장 건강에 도움돼요',
  },
  {
    key: 'activity', emoji: '🚶', label: '활동량', thisWeek: 60, lastWeek: 55,
    color: '#F59E0B', bg: '#FEF3C7',
    metaphorGood: '꽃밭을 두 바퀴 산책한 것처럼 충분히 움직이셨어요!',
    metaphorNormal: '꽃밭을 한 바퀴 돌 정도 걸으셨어요. 조금 더 걸어볼까요?',
    metaphorBad: '아직 정원 입구에 계세요. 가볍게 몇 걸음이라도 걸어보세요.',
    details: ['평균 걸음: 3,800보', '가장 많이 걸은 날: 목요일 (5,200보)', '프로그램 참여: 5/7일'],
    tip: '식후 10분 산책만 해도 건강에 아주 좋아요',
  },
  {
    key: 'cognitive', emoji: '🧠', label: '두뇌 활동', thisWeek: 80, lastWeek: 72,
    color: '#7C3AED', bg: '#F3E8FF',
    metaphorGood: '전구에 불이 환하게 켜져 있어요! 머리가 아주 맑으시네요!',
    metaphorNormal: '전구가 깜박이고 있어요. 두뇌 운동을 하면 더 밝아져요.',
    metaphorBad: '전구가 좀 어두워요. 충분히 쉬시고, 간단한 퍼즐을 해보세요.',
    details: ['인지 반응: 양호', '기억 체크: 평균 이상', '집중력: 안정적'],
    tip: '손가락 체조나 숫자 맞추기가 두뇌에 좋아요',
  },
];

/* ── 이모지 달력 데이터 ── */
const dailyChecks = [
  { day: '월', emoji: '😊', score: 82, mood: '😊', sleep: '😴', body: '💪', appetite: '😋', social: '🥰', brain: '✨' },
  { day: '화', emoji: '😊', score: 78, mood: '😊', sleep: '😪', body: '💪', appetite: '😋', social: '🙂', brain: '✨' },
  { day: '수', emoji: '😐', score: 65, mood: '😐', sleep: '😴', body: '🤕', appetite: '🤏', social: '🙂', brain: '🌫️' },
  { day: '목', emoji: '😊', score: 85, mood: '😊', sleep: '😴', body: '💪', appetite: '😋', social: '🥰', brain: '✨' },
  { day: '금', emoji: '😔', score: 52, mood: '😔', sleep: '😵', body: '😫', appetite: '🤏', social: '🏠', brain: '🌫️' },
  { day: '토', emoji: '😊', score: 88, mood: '😊', sleep: '😴', body: '💪', appetite: '😋', social: '🥰', brain: '✨' },
  { day: '일', emoji: '📋', score: 0, mood: '-', sleep: '-', body: '-', appetite: '-', social: '-', brain: '-' },
];

/* ── 물컵 컴포넌트 ── */
function WaterCup({ percent, color }: { percent: number; color: string }) {
  const h = Math.max(4, (percent / 100) * 56);
  return (
    <div className="w-[44px] h-[64px] rounded-b-[10px] rounded-t-[4px] border-2 border-[#E5E7EB] relative overflow-hidden bg-white">
      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-700 rounded-b-[8px]"
        style={{ height: h, backgroundColor: color, opacity: 0.3 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-700 rounded-b-[8px]"
        style={{ height: h * 0.7, backgroundColor: color, opacity: 0.5 }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[11px]" style={{ color }}>
        {percent}
      </span>
    </div>
  );
}

export function ElderReport() {
  const { userName } = useAppContext();
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [showAIDetail, setShowAIDetail] = useState(false);

  const getMetaphor = (cat: CategoryDetail) => {
    if (cat.thisWeek >= 75) return cat.metaphorGood;
    if (cat.thisWeek >= 50) return cat.metaphorNormal;
    return cat.metaphorBad;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ 헤더 ═══ */}
      <div className="px-5 pt-6 pb-4" style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #F3E8FF 100%)' }}>
        <p className="text-[15px] text-[#6B7280] mb-1">이번 주 리포트</p>
        <h1 className="text-[26px] text-[#111827]">{userName}님의 한 주</h1>
        <p className="text-[13px] text-[#9CA3AF] mt-1">2026.02.24 ~ 03.02</p>
      </div>

      <div className="px-5 pt-4 pb-8 flex flex-col gap-6">

        {/* ═══ 전체 요약 점수 + 레이더 비교 ═══ */}
        <div className="bg-white rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* 점수 헤더 */}
          <div className="p-5 text-center">
            <span className="text-[42px] block mb-1">{diff >= 0 ? '📈' : '📉'}</span>
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="text-[32px]" style={{ color: diff >= 0 ? '#1B7A4B' : '#DC2626' }}>
                {thisWeekAvg}점
              </span>
              <span className="text-[15px] text-[#9CA3AF]">/ 100</span>
            </div>
            <p className="text-[18px] text-[#111827]">
              지난주({lastWeekAvg}점)보다{' '}
              <span style={{ color: diff >= 0 ? '#1B7A4B' : '#DC2626' }}>
                {Math.abs(diff)}점 {diff >= 0 ? '좋아졌어요' : '떨어졌어요'}
              </span>
            </p>
          </div>

          {/* 레이더 차트 (이번주 vs 지난주) */}
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarCompare} cx="50%" cy="48%" outerRadius="68%">
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: '#374151' }} />
                <Radar name="지난주" dataKey="lastWeek" stroke="#D1D5DB" fill="#D1D5DB" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                <Radar name="이번주" dataKey="thisWeek" stroke="#1B7A4B" fill="#1B7A4B" fillOpacity={0.15} strokeWidth={2.5}
                  dot={{ r: 5, fill: '#1B7A4B', strokeWidth: 0 }} />
                <Legend
                  wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
                  formatter={(value: string) => <span style={{ color: '#6B7280' }}>{value}</span>}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ═══ AI 비유 요약 ═══ */}
        <div className="bg-[#E8F5EE] rounded-[24px] p-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-[28px] shrink-0">🤖</span>
            <div>
              <span className="text-[16px] text-[#1B7A4B] block mb-2">AI 코디의 주간 해설</span>
              <p className="text-[17px] text-[#111827]" style={{ lineHeight: 1.8 }}>
                "영숙님, 이번 주는 <strong>봄날 꽃밭의 나무</strong>처럼 전반적으로 잘 자라고 계세요.
                뿌리(수면)에 물을 더 주면 좋겠고, 잎사귀(활동)를 조금 더 펼치면 햇빛(두뇌)도 더 잘 받을 수 있어요."
              </p>
            </div>
          </div>

          <button onClick={() => setShowAIDetail(!showAIDetail)}
            className="w-full bg-white/60 rounded-[14px] py-3 text-center text-[15px] text-[#1B7A4B] active:bg-white/80">
            {showAIDetail ? '간단히 보기' : '더 자세히 보기'} {showAIDetail ? '△' : '▽'}
          </button>

          {showAIDetail && (
            <div className="mt-3 bg-white/50 rounded-[16px] p-4">
              <div className="flex flex-col gap-3">
                {[
                  { emoji: '🌊', title: '수면 (뿌리)', text: '이번 주 수면은 지난주보다 나아졌어요. 나무의 뿌리가 더 깊이 내려간 것처럼, 몸이 더 잘 쉬었어요. 특히 화요일에 7시간을 주무셨는데, 이런 날이 더 많아지면 좋겠어요.' },
                  { emoji: '🌿', title: '스트레스 (줄기)', text: '마음이 잔잔한 호수처럼 평온했어요. 나무 줄기가 튼튼한 것처럼 안정적이에요. 수요일에 잠깐 바람이 불었지만, 금방 다시 고요해졌어요.' },
                  { emoji: '❤️', title: '심장 (뿌리)', text: '시계추처럼 규칙적으로 뛰고 있어요. 이번 주 가장 좋은 부분이에요! 꾸준히 잘 유지하고 계세요.' },
                  { emoji: '🌱', title: '활동 (잎)', text: '잎사귀가 아직 작아요. 평균 3,800보로 조금 부족해요. 식후 10분 산책만 추가하면 잎이 무성해질 거예요.' },
                  { emoji: '💡', title: '두뇌 (햇빛)', text: '전구가 밝게 빛나고 있어요! 지난주보다 8점이나 좋아졌어요. 손가락 체조를 꾸준히 하신 덕분인 것 같아요.' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-2">
                    <span className="text-[20px] shrink-0 mt-0.5">{item.emoji}</span>
                    <div>
                      <span className="text-[14px] text-[#1B7A4B] block mb-0.5">{item.title}</span>
                      <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.6 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-3 text-center">
                * AI가 생성한 참고 해설이며, 의료 진단이나 처방이 아닙니다
              </p>
            </div>
          )}
        </div>

        {/* ═══ 항목별 상세 (물컵 비유) ═══ */}
        <div>
          <h2 className="text-[20px] text-[#111827] mb-3">항목별 변화</h2>
          <p className="text-[14px] text-[#9CA3AF] mb-4">물컵이 가득 찰수록 좋은 상태예요</p>

          <div className="flex flex-col gap-3">
            {categories.map(cat => {
              const trendDiff = cat.thisWeek - cat.lastWeek;
              const isExpanded = expandedCat === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => setExpandedCat(isExpanded ? null : cat.key)}
                  className="w-full text-left"
                >
                  <div className="rounded-[20px] p-5 transition-all" style={{ backgroundColor: cat.bg }}>
                    <div className="flex items-center gap-4">
                      {/* 물컵 */}
                      <WaterCup percent={cat.thisWeek} color={cat.color} />

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[22px]">{cat.emoji}</span>
                          <span className="text-[19px] text-[#111827]">{cat.label}</span>
                        </div>
                        <p className="text-[15px] text-[#374151]" style={{ lineHeight: 1.5 }}>
                          {getMetaphor(cat)}
                        </p>
                      </div>

                      {/* 변화 지표 */}
                      <div className="flex flex-col items-center gap-0.5 shrink-0">
                        {trendDiff > 0 ? (
                          <TrendingUp size={20} className="text-[#1B7A4B]" />
                        ) : trendDiff < 0 ? (
                          <TrendingDown size={20} className="text-[#DC2626]" />
                        ) : (
                          <Minus size={20} className="text-[#6B7280]" />
                        )}
                        <span className="text-[13px]" style={{ color: trendDiff >= 0 ? '#1B7A4B' : '#DC2626' }}>
                          {trendDiff > 0 ? '+' : ''}{trendDiff}
                        </span>
                      </div>
                    </div>

                    {/* 확장 상세 */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-white/50">
                        <div className="bg-white/60 rounded-[14px] p-4 mb-3">
                          {cat.details.map((d, i) => (
                            <div key={i} className="flex items-center gap-2 py-1.5 border-t border-white/50 first:border-0">
                              <span className="text-[13px] text-[#6B7280]">•</span>
                              <span className="text-[15px] text-[#374151]">{d}</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-white/80 rounded-[12px] px-4 py-3 flex items-start gap-2">
                          <span className="text-[16px] shrink-0">💡</span>
                          <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.5 }}>
                            {cat.tip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ 이모지 달력 ═══ */}
        <div>
          <h2 className="text-[20px] text-[#111827] mb-3">이번 주 한눈에</h2>
          <div className="bg-[#F7F8FA] rounded-[24px] p-5">
            {/* 요일 + 종합 이모지 */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dailyChecks.map(d => (
                <div key={d.day} className="flex flex-col items-center gap-1">
                  <span className="text-[13px] text-[#6B7280]">{d.day}</span>
                  <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center ${
                    d.score >= 80 ? 'bg-[#E8F5EE]' : d.score >= 60 ? 'bg-[#FEF3C7]' : d.score > 0 ? 'bg-[#FEF2F2]' : 'bg-[#F3F4F6]'
                  }`}>
                    <span className="text-[22px]">{d.emoji}</span>
                  </div>
                  {d.score > 0 && <span className="text-[11px] text-[#9CA3AF]">{d.score}점</span>}
                </div>
              ))}
            </div>

            {/* 세부 이모지 그리드 */}
            <div className="border-t border-[#E5E7EB] pt-3">
              {[
                { label: '기분', key: 'mood' },
                { label: '수면', key: 'sleep' },
                { label: '몸', key: 'body' },
                { label: '식사', key: 'appetite' },
                { label: '교류', key: 'social' },
                { label: '두뇌', key: 'brain' },
              ].map(row => (
                <div key={row.key} className="flex items-center gap-1 mb-1.5 last:mb-0">
                  <span className="text-[12px] text-[#9CA3AF] w-[36px] shrink-0">{row.label}</span>
                  <div className="flex-1 grid grid-cols-7 gap-1">
                    {dailyChecks.map((d, i) => (
                      <span key={i} className="text-[18px] h-[32px] flex items-center justify-center">
                        {(d as any)[row.key]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ 다음 주 목표 ═══ */}
        <div className="bg-[#FFFBEB] rounded-[24px] p-5">
          <h3 className="text-[18px] text-[#111827] mb-3">🎯 다음 주 목표</h3>
          <div className="flex flex-col gap-2.5">
            {[
              { emoji: '🚶', text: '하루 4,000보 이상 걷기', reason: '활동량을 조금만 더 늘려봐요' },
              { emoji: '😴', text: '매일 7시간 이상 자기', reason: '수면이 모든 건강의 시작이에요' },
              { emoji: '🧠', text: '두뇌 체조 매일 1회', reason: '두뇌가 더 밝아질 거예요' },
            ].map((g, i) => (
              <div key={i} className="bg-white/70 rounded-[16px] p-4 flex items-center gap-3">
                <span className="text-[28px]">{g.emoji}</span>
                <div className="flex-1">
                  <span className="text-[17px] text-[#111827] block">{g.text}</span>
                  <span className="text-[13px] text-[#6B7280]">{g.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 */}
        <p className="text-[13px] text-[#9CA3AF] text-center px-4" style={{ lineHeight: 1.6 }}>
          이 리포트는 생활 속 변화를 참고하기 위한 것이며,<br />
          의료 진단이나 처방이 아닙니다.
        </p>
      </div>
    </div>
  );
}
