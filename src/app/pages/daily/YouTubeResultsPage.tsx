/**
 * P-Reco-YouTube-02_ResultList + P-Reco-YouTube-03_EmptyOrError
 * 
 * - 상단: 선택된 검색어(칩 형태)
 * - 안내: "외부(YouTube)로 이동합니다."
 * - Video Card 8~12개 (loading/skeleton/empty/error 상태 포함)
 * - [다른 검색어로 보기] → QueryBuilder
 * - 오프라인/에러 상태: CMP/State/YouTubeError
 */
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  ArrowLeft, Play, ExternalLink, Clock, Search,
  RefreshCw, VideoOff, Filter, WifiOff, AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { APP_COPY } from '../../components/ui/AppCopy';

interface VideoResult {
  id: string;
  title: string;
  channel: string;
  duration: string;
  tags: string[];
}

const allVideos: VideoResult[] = [
  { id: 'v1', title: '시니어 맞춤 10분 전신 스트레칭', channel: '건강TV', duration: '10:23', tags: ['스트레칭', '가벼움'] },
  { id: 'v2', title: '5분 호흡 명상 가이드 (초보자용)', channel: '마음챙김', duration: '5:45', tags: ['명상', '짧게'] },
  { id: 'v3', title: '잠이 잘 오는 저녁 루틴 가이드', channel: '수면케어', duration: '8:12', tags: ['수면', '가벼움'] },
  { id: 'v4', title: '의자에서 하는 전신 체조', channel: '실버운동', duration: '12:30', tags: ['의자운동', '체조'] },
  { id: 'v5', title: '아침 5분 기지개 스트레칭', channel: '매일스트레칭', duration: '5:10', tags: ['스트레칭', '짧게'] },
  { id: 'v6', title: '10분 걷기 명상 가이드', channel: '마음챙김', duration: '10:05', tags: ['명상', '산책'] },
  { id: 'v7', title: '어르신 맞춤 의자 요가', channel: '실버요가', duration: '15:20', tags: ['의자운동', '가벼움'] },
  { id: 'v8', title: '숙면을 위한 이완 운동 7분', channel: '수면연구소', duration: '7:15', tags: ['수면', '짧게'] },
  { id: 'v9', title: '관절 보호 스트레칭 10분', channel: '건강채널', duration: '10:40', tags: ['스트레칭', '가벼움'] },
  { id: 'v10', title: '서서 하는 간단 체조 8분', channel: '건강TV', duration: '8:30', tags: ['체조', '짧게'] },
];

const filterChips = [
  { key: 'all', label: '전체' },
  { key: 'short', label: '짧게 (5~10분)' },
  { key: 'easy', label: '가벼움' },
  { key: 'chair', label: '의자운동' },
  { key: 'sleep', label: '수면' },
  { key: 'meditation', label: '명상' },
];

type ViewState = 'loading' | 'results' | 'empty' | 'error' | 'offline';

export function YouTubeResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '시니어 스트레칭';
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewState, setViewState] = useState<ViewState>('loading');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setViewState('results'), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredVideos = activeFilter === 'all'
    ? allVideos
    : allVideos.filter(v => {
        if (activeFilter === 'short') return parseInt(v.duration) <= 10;
        if (activeFilter === 'easy') return v.tags.includes('가벼움');
        if (activeFilter === 'chair') return v.tags.includes('의자운동');
        if (activeFilter === 'sleep') return v.tags.includes('수면');
        if (activeFilter === 'meditation') return v.tags.includes('명상');
        return true;
      });

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">검색 결과</h2>
      </div>

      {/* External notice */}
      <div className="px-4 py-2 bg-[#FEF2F2] border-b border-[#FCA5A5]/20">
        <div className="flex items-center gap-1.5">
          <ExternalLink size={12} className="text-[#EF4444]" />
          <p className="text-[12px] text-[#DC2626]">
            {APP_COPY.EXTERNAL_YOUTUBE} 컨디션노트는 영상 내용에 대한 의학적 효능을 보장하지 않습니다.
          </p>
        </div>
      </div>

      {/* Selected query chip */}
      <div className="px-4 pt-3 pb-2 bg-white">
        <div className="flex items-center gap-2 bg-[#E8F5EE] rounded-[12px] px-3 py-2.5">
          <Search size={14} className="text-[#1B7A4B]" />
          <span className="text-[14px] text-[#0E4B2E] flex-1">"{query}"</span>
          <button
            onClick={() => navigate('/daily/youtube-query')}
            className="text-[12px] text-[#1B7A4B] px-2 py-1 bg-white rounded-[8px]"
          >
            검색어 변경
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4] overflow-x-auto">
        <div className="flex gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {filterChips.map(chip => (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                activeFilter === chip.key
                  ? 'bg-[#1B7A4B] text-white'
                  : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* ═══ Loading / Skeleton ═══ */}
        {viewState === 'loading' && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-[14px] p-3 animate-pulse">
                <div className="w-[90px] h-[56px] bg-[#EEF1F4] rounded-[8px] shrink-0" />
                <div className="flex-1">
                  <div className="h-3 bg-[#EEF1F4] rounded w-3/4 mb-2" />
                  <div className="h-2.5 bg-[#EEF1F4] rounded w-1/2 mb-2" />
                  <div className="h-2 bg-[#EEF1F4] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ Results ═══ */}
        {viewState === 'results' && filteredVideos.length > 0 && (
          <>
            <p className="text-[13px] text-[#6B7280] mb-3">
              {filteredVideos.length}개 결과
            </p>

            <div className="flex flex-col gap-3">
              {filteredVideos.map(video => (
                <button
                  key={video.id}
                  className="flex items-center gap-3 bg-white rounded-[14px] p-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left min-h-[72px]"
                >
                  <div className="w-[90px] h-[56px] bg-[#EEF1F4] rounded-[8px] flex items-center justify-center shrink-0 relative">
                    <Play size={20} className="text-[#6B7280]" />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#111827] line-clamp-2 mb-1">{video.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#9CA3AF]">{video.channel}</span>
                      <span className="flex items-center gap-0.5 text-[11px] text-[#9CA3AF]">
                        <Clock size={10} /> {video.duration}
                      </span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {video.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] text-[#6B7280] bg-[#F7F8FA] px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-[#D1D5DB] shrink-0" />
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('/daily/youtube-query')}
              className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] mt-4 flex items-center justify-center gap-1.5"
            >
              다른 검색어로 보기 <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* ═══ Empty (필터 결과 없음) ═══ */}
        {viewState === 'results' && filteredVideos.length === 0 && (
          <EmptyState
            title="검색 결과가 없어요"
            description={`"${query}"에 대한 결과를 찾지 못했어요.`}
            sub="다른 검색어나 필터를 시도해 보세요."
            actions={
              <>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-4 h-[44px] bg-[#F7F8FA] text-[#374151] rounded-[12px] text-[13px] border border-[#E5E7EB]"
                >
                  필터 초기화
                </button>
                <button
                  onClick={() => navigate('/daily/youtube-query')}
                  className="px-4 h-[44px] bg-[#1B7A4B] text-white rounded-[12px] text-[13px] flex items-center gap-1.5"
                >
                  <Search size={13} /> 다른 검색어 선택
                </button>
              </>
            }
          />
        )}

        {/* ═══ Error ═══ */}
        {viewState === 'error' && (
          <EmptyState
            icon={<AlertCircle size={32} className="text-[#DC2626]" />}
            title="추천을 불러오지 못했어요"
            description="잠시 후 다시 시도해 주세요."
            actions={
              <>
                <button
                  onClick={() => { setViewState('loading'); setTimeout(() => setViewState('results'), 1200); }}
                  className="px-4 h-[44px] bg-[#1B7A4B] text-white rounded-[12px] text-[13px] flex items-center gap-1.5"
                >
                  <RefreshCw size={13} /> 다시 시도
                </button>
                <button
                  onClick={() => navigate('/daily/youtube-query')}
                  className="px-4 h-[44px] bg-[#F7F8FA] text-[#374151] rounded-[12px] text-[13px] border border-[#E5E7EB]"
                >
                  다른 검색어 선택
                </button>
              </>
            }
          />
        )}

        {/* ═══ Offline ═══ */}
        {viewState === 'offline' && (
          <EmptyState
            icon={<WifiOff size={32} className="text-[#F59E0B]" />}
            title="인터넷이 약해요"
            description="연결되면 추천을 불러올게요."
            bgColor="bg-[#FEF9C3]"
            actions={
              <button
                onClick={() => { setViewState('loading'); setTimeout(() => setViewState('results'), 1200); }}
                className="px-4 h-[44px] bg-[#F59E0B] text-white rounded-[12px] text-[13px] flex items-center gap-1.5"
              >
                <RefreshCw size={13} /> 다시 시도
              </button>
            }
          />
        )}

        {/* Demo state switcher */}
        {viewState === 'results' && filteredVideos.length > 0 && (
          <div className="mt-6 bg-[#F7F8FA] rounded-[12px] p-3">
            <p className="text-[11px] text-[#D1D5DB] text-center mb-2">데모: 상태 전환</p>
            <div className="flex gap-2 justify-center">
              {(['error', 'offline'] as ViewState[]).map(state => (
                <button
                  key={state}
                  onClick={() => setViewState(state)}
                  className="px-3 py-1.5 text-[11px] text-[#9CA3AF] bg-white rounded-full border border-[#E5E7EB]"
                >
                  {state === 'error' ? '에러 상태' : '오프라인'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 공통 Empty/Error 상태 컴포넌트 ─── */
function EmptyState({
  icon,
  title,
  description,
  sub,
  actions,
  bgColor,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  sub?: string;
  actions: React.ReactNode;
  bgColor?: string;
}) {
  return (
    <div className="flex flex-col items-center py-12">
      <div className={`w-16 h-16 rounded-full ${bgColor || 'bg-[#F7F8FA]'} flex items-center justify-center mb-4`}>
        {icon || <VideoOff size={32} className="text-[#D1D5DB]" />}
      </div>
      <h3 className="text-[16px] text-[#374151] mb-1">{title}</h3>
      <p className="text-[14px] text-[#6B7280] text-center mb-1">{description}</p>
      {sub && <p className="text-[13px] text-[#9CA3AF] mb-5">{sub}</p>}
      {!sub && <div className="mb-5" />}
      <div className="flex gap-2">{actions}</div>
    </div>
  );
}
