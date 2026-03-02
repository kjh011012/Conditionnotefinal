import { useLocation, useNavigate } from 'react-router';
import {
  Home,
  Search,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  MoreHorizontal,
} from 'lucide-react';

const tabs = [
  { path: '/', label: '홈', Icon: Home },
  { path: '/explore', label: '캠프찾기', Icon: Search },
  { path: '/check', label: '체크', Icon: ClipboardCheck },
  { path: '/report', label: '리포트', Icon: BarChart3 },
  { path: '/more', label: '더보기', Icon: MoreHorizontal },
];

export function BottomTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-[72px] pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ path, label, Icon }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                active ? 'text-[#1B7A4B]' : 'text-[#6B7280]'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={active ? 2.5 : 2}
                fill={active ? '#E8F5EE' : 'none'}
              />
              <span className="text-[12px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
