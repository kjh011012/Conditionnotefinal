import { TreePine, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function CampCTABanner() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#E8F5EE] to-[#FFF1E8] rounded-[16px] p-4 flex items-center gap-3">
      <div className="w-11 h-11 bg-white/70 rounded-[12px] flex items-center justify-center shrink-0">
        <TreePine size={22} className="text-[#1B7A4B]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-[#111827] mb-0.5">리듬 리셋이 필요하신가요?</p>
        <p className="text-[12px] text-[#6B7280]">2~4일 캠프로 빠르게 리듬을 되돌려요</p>
      </div>
      <button
        onClick={() => navigate('/camp')}
        className="shrink-0 h-[36px] bg-[#1B7A4B] text-white rounded-[10px] px-3 text-[13px] flex items-center gap-1"
      >
        둘러보기 <ChevronRight size={14} />
      </button>
    </div>
  );
}
