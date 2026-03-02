/**
 * ElderLayout — 어르신 모드 전용 레이아웃
 * 큰 하단 탭 + 넉넉한 패딩
 */
import { Outlet } from 'react-router';
import { ElderTabs } from './ElderTabs';

export function ElderLayout() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white relative">
      <div className="pb-[96px]">
        <Outlet />
      </div>
      <ElderTabs />
    </div>
  );
}
