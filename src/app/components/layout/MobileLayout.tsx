import { Outlet } from 'react-router';
import { BottomTabs } from './BottomTabs';

export function MobileLayout() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F7F8FA] relative">
      <div className="pb-[80px]">
        <Outlet />
      </div>
      <BottomTabs />
    </div>
  );
}
