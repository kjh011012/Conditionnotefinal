import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgramCard } from '../../components/ui/ProgramCard';
import { MealCard } from '../../components/ui/MealCard';
import { CampCard } from '../../components/ui/CampCard';
import { MapPin, TreePine, Clock, Search, ChevronRight, Calendar, Star, Check, Utensils, Activity, Brain, Heart, FileText, Building2, Dumbbell } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const segments = ['일정', '프로그램', '식단', '산책'] as const;
const campMode = ['캠프 탐색', '내 캠프'] as const;

const programs = [
  { time: '09:00', name: '아침 명상 & 호흡', intensity: '가벼움' as const, location: '명상원' },
  { time: '10:30', name: '숲길 걷기 프로그램', intensity: '보통' as const, location: '치유숲길 A코스' },
  { time: '14:00', name: '공동체 미술 활동', intensity: '가벼움' as const, location: '공예관' },
  { time: '16:00', name: '스트레칭 & 체조', intensity: '활발' as const, location: '체육관' },
];

const meals = [
  { type: '아침' as const, menu: ['현미잡곡밥', '된장국', '나물 3종', '제철 과일'], healingPoint: '소화를 돕는 따뜻한 식단으로 아침을 시작해요', imageUrl: 'https://images.unsplash.com/photo-1663330269065-6cf931a08e1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwd2FybSUyMGJyZWFrZmFzdCUyMHdvb2RlbiUyMHRhYmxlfGVufDF8fHx8MTc3MjI1NDc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { type: '점심' as const, menu: ['보리밥', '청국장', '두부조림', '계절 채소'], healingPoint: '장 건강에 좋은 발효식품이 포함되어 있어요' },
  { type: '저녁' as const, menu: ['흑미밥', '닭볶음탕', '부추전', '요거트'], healingPoint: '수면에 도움 되는 트립토판이 풍부한 저녁이에요' },
];

const walkRoutes = [
  { name: '가벼운 숲길', duration: '20분', distance: '1.2km', difficulty: '쉬움', restPoints: 3, imageUrl: 'https://images.unsplash.com/photo-1762539683985-de22c1e2358f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBwYXRoJTIwbW9ybmluZyUyMHdhbGslMjBuYXR1cmV8ZW58MXx8fHwxNzcyMjU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { name: '호수 둘레길', duration: '40분', distance: '2.5km', difficulty: '보통', restPoints: 5, imageUrl: 'https://images.unsplash.com/photo-1766547487857-7fea63c615c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdHJhaWwlMjBzY2VuaWMlMjB3YWxraW5nfGVufDF8fHx8MTc3MjI1NDc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
];

const dayTimeline = [
  { day: 1, label: '기준선 측정', goal: '나의 시작점을 확인해요', badge: '기준선' },
  { day: 2, label: '체험 & 기록', goal: '프로그램에 참여하고 기록해요', badge: '일일체크' },
  { day: 3, label: '중간 점검', goal: '변화가 시작되었는지 확인해요', badge: '재측정', active: true },
  { day: 4, label: '마무리 & 리포트', goal: '변화를 정리하고 다음을 안내해요', badge: '최종리포트' },
];

const campList = [
  {
    name: '리듬 리셋 2박3일 캠프',
    duration: '2박 3일',
    location: '강원 평창 치유마을',
    imageUrl: 'https://images.unsplash.com/photo-1762575537664-0f2c7e0c7f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmluJTIwcmV0cmVhdCUyMHBlYWNlZnVsfGVufDF8fHx8MTc3MjI1NjI0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '398,000원',
    rating: 4.8,
    reviewCount: 124,
    includes: ['식단 3식', '숲 산책', '스트레스 측정', '리포트'],
  },
  {
    name: '스트레스 회복 3박4일 캠프',
    duration: '3박 4일',
    location: '전남 장성 편백숲 마을',
    imageUrl: 'https://images.unsplash.com/photo-1766757084313-8d0e199482ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjb3VudHJ5c2lkZSUyMHZpbGxhZ2UlMjBoZWFsaW5nJTIwcmV0cmVhdHxlbnwxfHx8fDE3NzIyNTYyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '548,000원',
    rating: 4.9,
    reviewCount: 89,
    includes: ['식단 3식', '명상', '스트레스 측정', '두뇌 놀이체크', '리포트'],
  },
  {
    name: '두뇌·마음 집중 7일 캠프',
    duration: '6박 7일',
    location: '충남 태안 해변 치유마을',
    imageUrl: 'https://images.unsplash.com/photo-1758798469179-dea5d63257ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2RhJTIwc3RyZXRjaGluZyUyMHNlbmlvciUyMG91dGRvb3IlMjBtb3JuaW5nfGVufDF8fHx8MTc3MjI1NjI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '980,000원',
    rating: 4.7,
    reviewCount: 56,
    includes: ['식단 3식', '숲 산책', '두뇌 놀이체크', '명상', '체조', '리포트', '연계 안내'],
  },
];

const filterChips = ['전체', '2~3일', '3~4일', '7일', '리듬 리셋', '스트레스 회복', '두뇌·마음'];

const includeIcons: Record<string, any> = {
  '식단 3식': Utensils,
  '숲 산책': TreePine,
  '스트레스 측정': Activity,
  '리포트': FileText,
  '명상': Heart,
  '두뇌 놀이체크': Brain,
  '체조': Dumbbell,
  '연계 안내': Building2,
};

export function CampPage() {
  const navigate = useNavigate();
  const [topSegment, setTopSegment] = useState<typeof campMode[number]>('내 캠프');
  const [activeSegment, setActiveSegment] = useState<typeof segments[number]>('일정');
  const [activeFilter, setActiveFilter] = useState('전체');
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  // Camp Detail View
  if (showDetail !== null) {
    const camp = campList[showDetail];
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="relative">
          <ImageWithFallback src={camp.imageUrl} alt={camp.name} className="w-full h-[220px] object-cover" />
          <button
            onClick={() => { setShowDetail(null); setShowBooking(false); }}
            className="absolute top-4 left-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center"
          >
            ←
          </button>
        </div>
        <div className="px-4 pt-4 -mt-6 bg-white rounded-t-[20px] relative">
          <h1 className="text-[22px] text-[#111827] mb-1">{camp.name}</h1>
          <div className="flex items-center gap-2 text-[14px] text-[#6B7280] mb-3">
            <Calendar size={14} /> {camp.duration} · {camp.location}
          </div>
          <div className="flex items-center gap-1 mb-4">
            <Star size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-[14px] text-[#374151]">{camp.rating}</span>
            <span className="text-[12px] text-[#9CA3AF]">({camp.reviewCount}개 후기)</span>
          </div>

          {/* Includes */}
          <div className="mb-4">
            <h3 className="text-[15px] text-[#111827] mb-2">포함 사항</h3>
            <div className="flex flex-wrap gap-2">
              {camp.includes.map((item, i) => {
                const IncIcon = includeIcons[item] || Check;
                return (
                  <div key={i} className="flex items-center gap-1.5 bg-[#E8F5EE] text-[#1B7A4B] px-3 py-1.5 rounded-full text-[13px]">
                    <IncIcon size={14} />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Preview */}
          <div className="mb-4">
            <h3 className="text-[15px] text-[#111827] mb-2">일정 하이라이트</h3>
            <div className="flex flex-col gap-2">
              {['Day 1: 기준선 측정 + 환경 적응', 'Day 2~3: 프로그램 참여 + 기록', '마지막 날: 재측정 + 리포트 + 연계 안내'].map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-[#374151]">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[11px] text-[#1B7A4B]">{i + 1}</div>
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-[#E8F5EE] rounded-[16px] p-4 mb-4">
            <h3 className="text-[14px] text-[#0E4B2E] mb-2">이 캠프가 도움이 될 수 있는 것</h3>
            <ul className="text-[13px] text-[#374151] space-y-1">
              <li>· 일상에서 무너진 리듬을 짧은 기간에 리셋해볼 수 있어요</li>
              <li>· 전문 기기로 스트레스/자율신경 상태를 확인할 수 있어요</li>
              <li>· 필요 시 가까운 기관으로 연계 안내를 받을 수 있어요</li>
            </ul>
          </div>

          {!showBooking ? (
            <div className="flex gap-3 pb-6">
              <button className="flex-1 h-[48px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px]">문의하기</button>
              <button onClick={() => setShowBooking(true)} className="flex-1 h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px]">예약하기</button>
            </div>
          ) : (
            <div className="pb-6">
              <h3 className="text-[16px] text-[#111827] mb-3">예약 정보</h3>
              <div className="bg-[#F7F8FA] rounded-[14px] p-4 mb-4 space-y-3">
                <div>
                  <label className="text-[13px] text-[#6B7280] block mb-1">날짜 선택</label>
                  <div className="h-[44px] bg-white rounded-[10px] border border-[#E5E7EB] flex items-center px-3 text-[14px] text-[#374151]">
                    <Calendar size={16} className="text-[#6B7280] mr-2" /> 2026년 3월 14일 ~ 3월 16일
                  </div>
                </div>
                <div>
                  <label className="text-[13px] text-[#6B7280] block mb-1">인원</label>
                  <div className="h-[44px] bg-white rounded-[10px] border border-[#E5E7EB] flex items-center px-3 text-[14px] text-[#374151]">1명</div>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
                  <Check size={14} className="text-[#1B7A4B]" />
                  워치 있으면 더 정확히 기록 가능 (없어도 참여 가능)
                </div>
              </div>
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 mb-4">
                <div className="flex justify-between text-[14px] mb-1">
                  <span className="text-[#6B7280]">{camp.name}</span>
                  <span className="text-[#111827]">{camp.price}</span>
                </div>
                <div className="border-t border-[#EEF1F4] pt-2 mt-2 flex justify-between text-[16px]">
                  <span className="text-[#111827]">합계</span>
                  <span className="text-[#1B7A4B]">{camp.price}</span>
                </div>
              </div>
              <button className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]">
                예약 완료
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="px-4 pt-3 pb-0 bg-white">
        <h1 className="text-[22px] text-[#111827] mb-3">캠프</h1>

        {/* Top Segment: Explore / My Camp */}
        <div className="flex bg-[#EEF1F4] rounded-[12px] p-1 mb-3">
          {campMode.map(mode => (
            <button
              key={mode}
              onClick={() => setTopSegment(mode)}
              className={`flex-1 py-2 rounded-[10px] text-[14px] transition-all ${
                topSegment === mode ? 'bg-white text-[#1B7A4B] shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Sub Segment for My Camp */}
        {topSegment === '내 캠프' && (
          <div className="flex bg-[#EEF1F4] rounded-[12px] p-1">
            {segments.map(seg => (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg)}
                className={`flex-1 py-2 rounded-[10px] text-[14px] transition-all ${
                  activeSegment === seg ? 'bg-white text-[#1B7A4B] shadow-sm' : 'text-[#6B7280]'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========== EXPLORE MODE ========== */}
      {topSegment === '캠프 탐색' && (
        <div className="px-4 pt-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white rounded-[14px] border border-[#E5E7EB] px-4 h-[44px] mb-3">
            <Search size={18} className="text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="지역/테마로 검색"
              className="flex-1 bg-transparent outline-none text-[14px] text-[#374151] placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {filterChips.map(chip => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[13px] transition-all ${
                  activeFilter === chip
                    ? 'bg-[#1B7A4B] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Recommendation Section */}
          <div className="bg-[#E8F5EE] rounded-[16px] p-4 mb-4">
            <p className="text-[14px] text-[#0E4B2E] mb-2">처음이라면</p>
            <p className="text-[13px] text-[#374151]">2박3일 리듬 리셋 캠프가 좋은 시작이 될 수 있어요</p>
          </div>

          <div className="bg-[#FFF1E8] rounded-[16px] p-4 mb-4">
            <p className="text-[14px] text-[#EA580C] mb-2">재방문 추천</p>
            <p className="text-[13px] text-[#374151]">주말 1박2일 루틴 점검 캠프로 리듬을 유지해보세요</p>
          </div>

          {/* Camp List */}
          <div className="flex flex-col gap-4">
            {campList.map((camp, i) => (
              <CampCard key={i} {...camp} onDetail={() => setShowDetail(i)} />
            ))}
          </div>
        </div>
      )}

      {/* ========== MY CAMP MODE ========== */}
      {topSegment === '내 캠프' && (
        <div className="px-4 pt-5 pb-4">
          {activeSegment === '일정' && (
            <div className="flex flex-col gap-3">
              {dayTimeline.map(d => (
                <button
                  key={d.day}
                  onClick={() => {
                    if (d.day === 1) navigate('/camp/baseline');
                    if (d.day === 4 || d.day === 3) navigate('/camp/measurement-gate');
                  }}
                  className={`bg-white rounded-[16px] p-4 ${d.active ? 'border-2 border-[#1B7A4B]' : ''} shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] ${d.active ? 'bg-[#1B7A4B] text-white' : 'bg-[#EEF1F4] text-[#6B7280]'}`}>{d.day}</div>
                    <div>
                      <span className="text-[15px] text-[#111827]">Day {d.day}</span>
                      <span className="text-[13px] text-[#6B7280] ml-2">{d.label}</span>
                    </div>
                    <span className="ml-auto bg-[#FFF1E8] text-[#FF8A3D] px-2 py-0.5 rounded-full text-[11px]">{d.badge}</span>
                  </div>
                  <p className="text-[13px] text-[#6B7280] pl-11">{d.goal}</p>
                  {(d.day === 1 || d.day === 3 || d.day === 4) && (
                    <div className="flex items-center gap-1 pl-11 mt-1.5 text-[12px] text-[#1B7A4B]">
                      <ChevronRight size={12} /> 자세히 보기
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
          {activeSegment === '프로그램' && (
            <div className="flex flex-col gap-3">
              {programs.map((p, i) => <ProgramCard key={i} {...p} />)}
            </div>
          )}
          {activeSegment === '식단' && (
            <div className="flex flex-col gap-4">
              {meals.map((m, i) => <MealCard key={i} {...m} />)}
            </div>
          )}
          {activeSegment === '산책' && (
            <div className="flex flex-col gap-4">
              {walkRoutes.map((route, i) => (
                <div key={i} className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                  <div className="h-[140px] overflow-hidden">
                    <ImageWithFallback src={route.imageUrl} alt={route.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[16px] text-[#111827] mb-2">{route.name}</h3>
                    <div className="flex items-center gap-4 text-[13px] text-[#6B7280] mb-3">
                      <span className="flex items-center gap-1"><Clock size={14} /> {route.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {route.distance}</span>
                      <span className="flex items-center gap-1"><TreePine size={14} /> 휴식 {route.restPoints}곳</span>
                    </div>
                    <span className="bg-[#E8F5EE] text-[#1B7A4B] px-2 py-0.5 rounded-full text-[12px]">난이도: {route.difficulty}</span>
                    <button className="w-full h-[44px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] mt-3">이 코스 선택</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}