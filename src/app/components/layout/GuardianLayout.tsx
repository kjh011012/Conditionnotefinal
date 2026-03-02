/**
 * GuardianLayout — 보호자 레이아웃 (기간 종속 접근)
 */
import { Outlet } from 'react-router';
import { GuardianTabs } from './GuardianTabs';

export function GuardianLayout() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F7F8FA] relative">
      <div className="pb-[80px]"><Outlet /></div>
      <GuardianTabs />
    </div>
  );
}
