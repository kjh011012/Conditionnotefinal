/**
 * AdminLayout — 관리자 레이아웃 (내 마을 고정 헤더)
 */
import { Outlet } from 'react-router';
import { AdminTabs } from './AdminTabs';

export function AdminLayout() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F7F8FA] relative">
      {/* Fixed village header (관리자는 마을 전환 불가) */}
      <div className="bg-[#7C3AED] px-4 py-2 flex items-center gap-2">
        <span className="text-[16px]">🏔️</span>
        <div className="flex-1">
          <span className="text-[12px] text-white/90">고라데이 치유마을</span>
          <span className="text-[9px] text-white/60 block">관리자 콘솔</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/20 text-white/80">가맹주</span>
      </div>
      <div className="pb-[80px]"><Outlet /></div>
      <AdminTabs />
    </div>
  );
}
