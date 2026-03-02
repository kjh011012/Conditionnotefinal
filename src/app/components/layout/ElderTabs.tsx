/**
 * ElderTabs — 어르신 모드 하단 탭 (4개만, 초대형)
 */
import { useLocation, useNavigate } from 'react-router';
import { Home, ClipboardCheck, BarChart3, MoreHorizontal } from 'lucide-react';

const tabs = [
  { path: '/elder', label: '홈', Icon: Home, exact: true },
  { path: '/elder/check', label: '체크', Icon: ClipboardCheck },
  { path: '/elder/report', label: '리포트', Icon: BarChart3 },
  { path: '/elder/more', label: '더보기', Icon: MoreHorizontal },
];

export function ElderTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E5E7EB] z-50">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-[84px] pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ path, label, Icon, exact }) => {
          const active = isActive(path, exact);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1.5 px-4 py-2 transition-colors min-w-[70px] ${
                active ? 'text-[#1B7A4B]' : 'text-[#9CA3AF]'
              }`}
            >
              <Icon
                size={30}
                strokeWidth={active ? 2.5 : 2}
                fill={active ? '#E8F5EE' : 'none'}
              />
              <span className="text-[15px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
