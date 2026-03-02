/**
 * 12_Query_Template_Library
 * 검색어 템플릿 150개 라이브러리
 * 4개 섹션(운동 40 / 명상 40 / 식단 40 / 수면루틴 30)
 * 각 섹션 상단 사용 규칙 3줄 + 번호가 매겨진 검색어 리스트
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Search, Play, Dumbbell, Wind, Utensils,
  Moon, Copy, Check, ExternalLink, ChevronRight, Info,
} from 'lucide-react';
import { APP_COPY } from '../../components/ui/AppCopy';

type TemplateCategory = 'exercise' | 'meditation' | 'diet' | 'sleep';

const categoryMeta: Record<TemplateCategory, { label: string; icon: any; color: string; bg: string; count: number }> = {
  exercise:   { label: '운동',     icon: Dumbbell, color: '#1B7A4B', bg: '#E8F5EE', count: 40 },
  meditation: { label: '명상',     icon: Wind,     color: '#7C3AED', bg: '#F3E8FF', count: 40 },
  diet:       { label: '식단',     icon: Utensils, color: '#EA580C', bg: '#FFF1E8', count: 40 },
  sleep:      { label: '수면루틴', icon: Moon,     color: '#0EA5E9', bg: '#E0F2FE', count: 30 },
};

/* ─── 150개 검색어 템플릿 (원문 그대로) ─── */

const exerciseTemplates = [
  '시니어 전신 스트레칭 10분 따라하기',
  '의자 스트레칭 5분 목 어깨 풀기',
  '관절 부담 적은 전신 체조 15분',
  '아침 기지개 스트레칭 7분',
  '저녁 몸 풀기 스트레칭 10분',
  '시니어 실내 걷기 운동 20분',
  '실내 걷기 15분 초보 따라하기',
  '가벼운 유산소 10분 집에서',
  '의자 근력운동 10분 시니어',
  '밴드 없이 상체 근력운동 12분',
  '가벼운 하체 움직임 10분 루틴',
  '종아리 스트레칭 5분 따라하기',
  '부담 적은 코어 운동 8분 초보',
  '등 펴는 스트레칭 6분 루틴',
  '손목 발목 풀기 5분 루틴',
  '균형감각 운동 8분 초보',
  '의자 요가 10분 초보',
  '서서 하는 전신 스트레칭 10분',
  '앉아서 하는 전신 체조 15분',
  '가벼운 홈트 15분 초보',
  '점프 없는 유산소 12분',
  '하루 10분 걷기 루틴 만들기',
  '아침 햇빛 산책 준비 스트레칭 5분',
  '저녁 산책 전 스트레칭 5분',
  '목 어깨 스트레칭 8분 따라하기',
  '골반 스트레칭 8분 루틴',
  '전신 릴렉스 스트레칭 12분',
  '호흡과 함께하는 스트레칭 10분',
  '가벼운 리듬 체조 10분 초보',
  '시니어 따라하는 스트레칭 10분',
  '굽은 어깨 펴는 스트레칭 6분',
  '발바닥 풀어주는 스트레칭 5분',
  '서서 하는 하체 스트레칭 7분',
  '의자에서 하는 하체 운동 10분',
  '집에서 걷기 대체 운동 10분',
  '전신 가볍게 풀기 체조 10분',
  '아침 관절 깨우기 6분 체조',
  '잠자기 전 가벼운 스트레칭 5분',
  '하루 피로 푸는 전신 스트레칭 15분',
  '초보를 위한 전신 움직임 12분',
];

const meditationTemplates = [
  '5분 호흡 명상 초보 따라하기',
  '10분 호흡 명상 한국어 가이드',
  '3분 마음 진정 호흡',
  '7분 긴장 풀기 명상',
  '바디스캔 명상 10분 누워서',
  '저녁 마음 정리 명상 10분',
  '아침 집중 명상 5분',
  '스트레스 풀어주는 호흡 8분',
  '편안한 음악과 함께 명상 15분',
  '초보를 위한 마음챙김 명상 10분',
  '잠들기 전 이완 명상 10분',
  '잠이 잘 안 올 때 호흡 5분',
  '눈 감고 따라하는 명상 12분',
  '목소리 안내 명상 10분',
  '감사 명상 5분',
  '오늘 하루 정리 명상 7분',
  '몸 긴장 내려놓기 명상 8분',
  '가벼운 요가 니드라 15분',
  '소리 명상 10분',
  '걷기 명상 10분 따라하기',
  '숲 소리 명상 10분',
  '마음 편안해지는 호흡 6분',
  '아침 햇빛과 함께 짧은 명상 5분',
  '식사 전 마음 가라앉히기 3분',
  '걱정될 때 호흡 5분',
  '머리 복잡할 때 호흡 5분',
  '자기 전 바디스캔 12분',
  '초보 명상 15분 따라하기',
  '의자에 앉아서 명상 10분',
  '온몸 이완 호흡 10분',
  '코로 숨쉬는 호흡 연습 5분',
  '4-4-6 호흡 따라하기 5분',
  '하루 리듬 정리 명상 8분',
  '긴장 완화 ASMR 10분',
  '마음챙김 스캔 7분',
  '소리만 듣는 명상 15분',
  '따뜻한 목소리 명상 10분',
  '편안한 낮잠 전 호흡 4분',
  '저녁 스트레칭과 함께 짧은 명상 5분',
  '잠깐 쉬어가는 호흡 3분',
];

const dietTemplates = [
  '자연식 아침 간단 레시피',
  '따뜻한 죽 레시피 간단하게',
  '오트밀 아침 레시피 5분',
  '제철 채소 아침 반찬 만들기',
  '계란과 채소 아침 한그릇',
  '집밥 점심 한그릇 요리',
  '채소 듬뿍 비빔밥 레시피',
  '따뜻한 국물 점심 레시피',
  '두부 요리 간단 레시피',
  '생선구이와 채소 반찬',
  '저녁 가볍게 먹는 한그릇 레시피',
  '속 편한 저녁 국 레시피',
  '야채 수프 레시피 간단',
  '부드러운 단백질 요리 레시피',
  '제철 나물 반찬 만들기',
  '현미밥과 반찬 구성 방법',
  '캠프 스타일 자연식 집밥 레시피',
  '로컬 식재료로 만드는 집밥',
  '저녁 늦게 먹을 때 가벼운 메뉴',
  '카페인 줄이는 하루 루틴',
  '따뜻한 차 만들기 레시피',
  '물 자주 마시는 습관 만들기',
  '아침 따뜻한 차와 간식 아이디어',
  '과일과 요거트 간단 간식',
  '견과류 간식 간단 아이디어',
  '채소 스틱 간식 만들기',
  '담백한 반찬 레시피 모음',
  '싱겁게 맛있게 요리하는 방법',
  '조미료 적게 쓰는 집밥 레시피',
  '된장국 레시피 담백하게',
  '미역국 레시피 담백하게',
  '토마토 달걀볶음 레시피',
  '가지볶음 레시피 간단',
  '버섯볶음 레시피 담백하게',
  '채소 샐러드 드레싱 간단 레시피',
  '저녁 밥 대신 따뜻한 스프',
  '1인분 집밥 레시피 간단',
  '일주일 식단 계획 세우기',
  '장보기 리스트 만들기',
  '캠프 연계 루틴 식단 아이디어',
];

const sleepTemplates = [
  '잠들기 전 10분 수면 루틴',
  '편안한 밤을 위한 저녁 루틴 15분',
  '취침 전 스트레칭 5분 루틴',
  '자기 전 바디스캔 10분',
  '수면 준비 호흡 5분',
  '편안한 수면 음악 30분',
  '백색소음 1시간',
  '저녁 스마트폰 줄이는 루틴',
  '취침 전 따뜻한 차 루틴',
  '일정한 기상시간 만들기 팁',
  '아침 햇빛 루틴 5분',
  '아침 기지개 + 햇빛 루틴 10분',
  '낮잠 가이드 15분',
  '낮잠 타이머 설정 방법',
  '저녁 카페인 끊는 시간 팁',
  '잠들기 전 방 정리 루틴 5분',
  '침실 조명 낮추기 루틴',
  '취침 전 감사 일기 루틴',
  '수면 전 명상 루틴 10분',
  '따뜻한 샤워 후 수면 루틴',
  '취침 전 책 읽기 루틴',
  '잠이 안 올 때 4-4-6 호흡',
  '수면 시간 늘리는 습관 3가지',
  '수면 일정 규칙성 만들기',
  '저녁 스트레칭 + 호흡 루틴 10분',
  '아침에 덜 피곤한 기상 루틴',
  '주말에도 리듬 유지하는 방법',
  '여행 후 리듬 되돌리기 루틴',
  '편안한 밤을 위한 방 온도 팁',
  '편안한 밤 루틴 모음',
];

interface SectionDef {
  key: TemplateCategory;
  templates: string[];
}

const sections: SectionDef[] = [
  { key: 'exercise',   templates: exerciseTemplates },
  { key: 'meditation', templates: meditationTemplates },
  { key: 'diet',       templates: dietTemplates },
  { key: 'sleep',      templates: sleepTemplates },
];

const USAGE_RULES = [
  '검색어는 진단/치료 표현 금지',
  '"시니어/초보/짧게/의자/누워서/저녁" 같은 키워드로 부담을 낮춘다',
  '검색어는 5~20분 중심(고령친화)',
];

export function QueryTemplateLibrary() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchText, setSearchText] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const totalCount = exerciseTemplates.length + meditationTemplates.length + dietTemplates.length + sleepTemplates.length;

  const filteredSections = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return sections
      .filter(s => activeCategory === 'all' || s.key === activeCategory)
      .map(s => ({
        ...s,
        templates: q
          ? s.templates.filter(t => t.toLowerCase().includes(q))
          : s.templates,
      }))
      .filter(s => s.templates.length > 0);
  }, [activeCategory, searchText]);

  const handleSelect = (query: string) => {
    navigate(`/daily/youtube-results?q=${encodeURIComponent(query)}`);
  };

  const handleCopy = (id: string, query: string) => {
    navigator.clipboard?.writeText(query);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">검색어 템플릿</h2>
        <span className="text-[12px] text-[#9CA3AF] ml-auto">{totalCount}개</span>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2 bg-white">
        <div className="flex items-center gap-2 bg-[#F7F8FA] rounded-[12px] px-3 py-2.5">
          <Search size={16} className="text-[#9CA3AF]" />
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="검색어 검색 (예: 스트레칭, 호흡, 죽)"
            className="flex-1 bg-transparent text-[14px] text-[#374151] outline-none placeholder-[#9CA3AF]"
          />
          {searchText && (
            <button onClick={() => setSearchText('')} className="text-[12px] text-[#9CA3AF]">
              지우기
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4] overflow-x-auto">
        <div className="flex gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
              activeCategory === 'all'
                ? 'bg-[#1B7A4B] text-white'
                : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
            }`}
          >
            전체 ({totalCount})
          </button>
          {(Object.entries(categoryMeta) as [TemplateCategory, typeof categoryMeta.exercise][]).map(([key, meta]) => {
            const Icon = meta.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all flex items-center gap-1 ${
                  activeCategory === key
                    ? 'text-white'
                    : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
                }`}
                style={activeCategory === key ? { backgroundColor: meta.color } : undefined}
              >
                <Icon size={12} />
                {meta.label} ({meta.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* External notice */}
      <div className="px-4 py-2 bg-[#FEF2F2]">
        <div className="flex items-center gap-1.5">
          <ExternalLink size={11} className="text-[#EF4444]" />
          <p className="text-[11px] text-[#DC2626]">{APP_COPY.EXTERNAL_YOUTUBE}</p>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Empty search */}
        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center py-12">
            <Search size={32} className="text-[#D1D5DB] mb-3" />
            <p className="text-[14px] text-[#6B7280] mb-1">일치하는 검색어가 없어요</p>
            <p className="text-[12px] text-[#9CA3AF]">다른 키워드로 시도해 보세요.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredSections.map(section => {
              const meta = categoryMeta[section.key];
              const Icon = meta.icon;
              return (
                <div key={section.key}>
                  {/* Section header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                      style={{ backgroundColor: meta.bg }}
                    >
                      <Icon size={16} style={{ color: meta.color }} />
                    </div>
                    <h3 className="text-[16px] text-[#111827]">
                      {meta.label}
                    </h3>
                    <span className="text-[12px] text-[#9CA3AF]">
                      {section.templates.length}개
                    </span>
                  </div>

                  {/* Usage rules (only show when not searching) */}
                  {!searchText && (
                    <div className="bg-[#F7F8FA] rounded-[12px] p-3 mb-3">
                      <div className="flex items-start gap-1.5">
                        <Info size={13} className="text-[#9CA3AF] mt-0.5 shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          {USAGE_RULES.map((rule, i) => (
                            <p key={i} className="text-[11px] text-[#6B7280]">
                              {i + 1}. {rule}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Template list */}
                  <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
                    {section.templates.map((query, i) => {
                      // 원래 번호를 유지하기 위해 전체 배열에서의 인덱스 찾기
                      const allTemplates = section.key === 'exercise' ? exerciseTemplates
                        : section.key === 'meditation' ? meditationTemplates
                        : section.key === 'diet' ? dietTemplates
                        : sleepTemplates;
                      const originalIdx = allTemplates.indexOf(query) + 1;
                      const uniqueId = `${section.key}-${originalIdx}`;
                      const isCopied = copiedIdx === uniqueId;
                      const isLast = i === section.templates.length - 1;

                      return (
                        <div
                          key={uniqueId}
                          className={`flex items-center gap-3 px-4 py-3 min-h-[52px] ${
                            !isLast ? 'border-b border-[#F3F4F6]' : ''
                          }`}
                        >
                          {/* Number */}
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0"
                            style={{ backgroundColor: meta.bg, color: meta.color }}
                          >
                            {originalIdx}
                          </span>

                          {/* Query text — tap to search */}
                          <button
                            onClick={() => handleSelect(query)}
                            className="flex-1 text-left text-[14px] text-[#374151] min-w-0 active:text-[#1B7A4B] transition-colors"
                          >
                            {query}
                          </button>

                          {/* Actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleCopy(uniqueId, query)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F8FA]"
                              title="복사"
                            >
                              {isCopied ? (
                                <Check size={13} className="text-[#1B7A4B]" />
                              ) : (
                                <Copy size={13} className="text-[#9CA3AF]" />
                              )}
                            </button>
                            <button
                              onClick={() => handleSelect(query)}
                              className="w-8 h-8 flex items-center justify-center rounded-full"
                              style={{ backgroundColor: meta.bg }}
                              title="검색"
                            >
                              <Play size={13} style={{ color: meta.color }} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back to QueryBuilder */}
        <button
          onClick={() => navigate('/daily/youtube-query')}
          className="w-full h-[48px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] mt-6 flex items-center justify-center gap-1.5"
        >
          AI 추천 검색어로 돌아가기 <ChevronRight size={14} />
        </button>

        {/* Disclaimer */}
        <div className="mt-4 bg-[#F7F8FA] rounded-[14px] p-3">
          <p className="text-[11px] text-[#9CA3AF] text-center" style={{ lineHeight: 1.5 }}>
            이 검색어는 의료 진단이 아니라, 생활 리듬을 돕기 위한 안내입니다.
            <br />
            {APP_COPY.EXTERNAL_YOUTUBE}
          </p>
        </div>
      </div>
    </div>
  );
}
