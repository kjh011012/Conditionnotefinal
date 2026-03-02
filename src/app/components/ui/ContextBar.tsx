/**
 * Context Bar — VILLAGE_MODE 상단 고정 컨텍스트 표시
 * 마을명 · 프로그램명 · 기간 · 남은 일수 + 전환 버튼
 */
import { useVillage } from '../../context/VillageContext';
import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function ContextBar() {
  const { activeVillage, activeProgram, activeParticipation, getDaysRemaining, exitVillage, appMode } = useVillage();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  if (appMode !== 'VILLAGE_MODE' || !activeVillage || !activeProgram || !activeParticipation) return null;

  const daysLeft = getDaysRemaining();
  const startStr = activeParticipation.startDate.slice(5).replace('-', '.');
  const endStr = activeParticipation.endDate.slice(5).replace('-', '.');

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ backgroundColor: activeVillage.secondaryColor, borderColor: activeVillage.primaryColor + '30' }}
      >
        <span className="text-[18px]">{activeVillage.logo}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] truncate" style={{ color: activeVillage.primaryColor }}>
              {activeVillage.name}
            </span>
            <span className="text-[10px] text-[#6B7280]">·</span>
            <span className="text-[11px] text-[#374151] truncate">{activeProgram.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#6B7280]">{startStr}~{endStr}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: activeVillage.primaryColor }}>
              D-{daysLeft}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 rounded-full flex items-center justify-center active:bg-black/5"
        >
          <ChevronDown size={16} className="text-[#6B7280]" />
        </button>
      </div>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] rounded-b-[16px] border-t border-[#F3F4F6]">
            <div className="px-4 py-3">
              <button
                onClick={() => { setShowMenu(false); navigate('/village/history'); }}
                className="w-full text-left py-2.5 text-[13px] text-[#374151] active:bg-[#F7F8FA] rounded-[8px] px-2"
              >
                내 참여 일정 보기
              </button>
              <button
                onClick={() => { setShowMenu(false); exitVillage(); navigate('/'); }}
                className="w-full text-left py-2.5 text-[13px] text-[#DC2626] active:bg-[#FEF2F2] rounded-[8px] px-2 flex items-center gap-2"
              >
                <LogOut size={14} /> 일반 모드로 돌아가기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
