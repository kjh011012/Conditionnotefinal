/**
 * CMP/Card/YouTubeResult
 * Variants: normal / loading / noResult
 * 썸네일 + 제목(2줄) + 채널명 + 재생시간
 * 하단 문구: "외부(YouTube)로 이동합니다."
 */
import { Play, ExternalLink, Clock, Search, RefreshCw, VideoOff } from 'lucide-react';

type YouTubeVariant = 'normal' | 'loading' | 'noResult';

interface VideoItem {
  title: string;
  channel: string;
  duration: string;
  thumbnail?: string;
}

interface YouTubeSearchCardProps {
  variant?: YouTubeVariant;
  searchQuery: string;
  videos?: VideoItem[];
  suggestedChips?: string[];
  onChipSelect?: (chip: string) => void;
  onRefresh?: () => void;
}

export function YouTubeSearchCard({
  variant = 'normal',
  searchQuery,
  videos = [],
  suggestedChips,
  onChipSelect,
  onRefresh,
}: YouTubeSearchCardProps) {
  // ── Loading ──
  if (variant === 'loading') {
    return (
      <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 mb-3">
          <Play size={16} className="text-[#EF4444]" />
          <span className="text-[14px] text-[#111827]">YouTube 추천</span>
        </div>
        <div className="bg-[#F7F8FA] rounded-[10px] px-3 py-2 mb-4">
          <span className="text-[13px] text-[#6B7280]">검색 중: &quot;{searchQuery}&quot;</span>
        </div>
        <div className="flex flex-col gap-3 animate-pulse">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-[80px] h-[50px] bg-[#EEF1F4] rounded-[8px]" />
              <div className="flex-1">
                <div className="h-3 w-full bg-[#EEF1F4] rounded mb-2" />
                <div className="h-2.5 w-24 bg-[#EEF1F4] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── No Result ──
  if (variant === 'noResult') {
    return (
      <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 mb-3">
          <Play size={16} className="text-[#EF4444]" />
          <span className="text-[14px] text-[#111827]">YouTube 추천</span>
        </div>
        <div className="flex flex-col items-center py-6">
          <VideoOff size={32} className="text-[#D1D5DB] mb-3" />
          <p className="text-[14px] text-[#374151] mb-1">검색 결과가 없어요</p>
          <p className="text-[13px] text-[#6B7280] text-center mb-4">
            &quot;{searchQuery}&quot;에 대한 결과를 찾지 못했어요.
            <br />다른 검색어를 시도해 보세요.
          </p>
          {suggestedChips && suggestedChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 justify-center">
              {suggestedChips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => onChipSelect?.(chip)}
                  className="px-3 py-1.5 bg-[#F7F8FA] text-[#374151] rounded-full text-[12px] border border-[#E5E7EB]"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-4 h-[36px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[10px] text-[13px]"
          >
            <RefreshCw size={13} /> 다시 검색
          </button>
        </div>
        <p className="text-[10px] text-[#9CA3AF] text-center">외부(YouTube)로 이동합니다</p>
      </div>
    );
  }

  // ── Normal ──
  return (
    <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <Play size={16} className="text-[#EF4444]" />
        <span className="text-[14px] text-[#111827]">YouTube 추천</span>
      </div>
      <div className="flex items-center gap-2 bg-[#F7F8FA] rounded-[10px] px-3 py-2 mb-3">
        <Search size={13} className="text-[#9CA3AF]" />
        <span className="text-[13px] text-[#6B7280]">&quot;{searchQuery}&quot;</span>
      </div>

      {/* Suggested chips */}
      {suggestedChips && suggestedChips.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mb-3 scrollbar-hide">
          {suggestedChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => onChipSelect?.(chip)}
              className="shrink-0 px-3 py-1 bg-[#E8F5EE] text-[#1B7A4B] rounded-full text-[12px]"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Video list */}
      <div className="flex flex-col gap-3">
        {videos.map((v, i) => (
          <button key={i} className="flex items-center gap-3 text-left min-h-[48px]">
            <div className="w-[80px] h-[50px] bg-[#EEF1F4] rounded-[8px] flex items-center justify-center shrink-0">
              <Play size={18} className="text-[#6B7280]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#111827] line-clamp-2">{v.title}</p>
              <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF]">
                <span>{v.channel}</span>
                <span className="flex items-center gap-0.5">
                  <Clock size={10} /> {v.duration}
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-[#D1D5DB] shrink-0" />
          </button>
        ))}
      </div>

      {/* Refresh */}
      <div className="flex items-center justify-center gap-2 mt-3 mb-1">
        {onChipSelect && (
          <button className="px-3 h-[32px] text-[12px] text-[#6B7280] border border-[#E5E7EB] rounded-full">
            검색어 바꾸기
          </button>
        )}
        <button
          onClick={onRefresh}
          className="px-3 h-[32px] text-[12px] text-[#1B7A4B] border border-[#1B7A4B] rounded-full flex items-center gap-1"
        >
          <RefreshCw size={11} /> 다시 검색
        </button>
      </div>

      <p className="text-[10px] text-[#9CA3AF] text-center mt-2">외부(YouTube)로 이동합니다</p>
    </div>
  );
}
