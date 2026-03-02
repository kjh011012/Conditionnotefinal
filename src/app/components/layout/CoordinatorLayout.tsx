/**
 * CoordinatorLayout — 코디네이터 레이아웃 (내 마을 고정)
 */
import { Outlet } from 'react-router';
import { CoordinatorTabs } from './CoordinatorTabs';

export function CoordinatorLayout() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F7F8FA] relative">
      {/* Fixed village header */}
      <div className="bg-[#0EA5E9] px-4 py-2 flex items-center gap-2">
        <span className="text-[16px]">🏔️</span>
        <div className="flex-1">
          <span className="text-[12px] text-white/90">고라데이 치유마을</span>
          <span className="text-[9px] text-white/60 block">코디네이터 운영 OS</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/20 text-white/80">코디네이터</span>
      </div>
      <div className="pb-[80px]"><Outlet /></div>
      <CoordinatorTabs />
    </div>
  );
}
