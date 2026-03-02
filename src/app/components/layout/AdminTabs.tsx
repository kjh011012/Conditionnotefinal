import { useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, CalendarDays, Utensils, Building2, MoreHorizontal } from 'lucide-react';

const tabs = [
  { path: '/admin', label: '대시보드', Icon: LayoutDashboard, exact: true },
  { path: '/admin/programs', label: '프로그램', Icon: CalendarDays },
  { path: '/admin/menu', label: '식단', Icon: Utensils },
  { path: '/admin/rooms', label: '숙소', Icon: Building2 },
  { path: '/admin/more', label: '더보기', Icon: MoreHorizontal },
];

export function AdminTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-[72px] pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ path, label, Icon, exact }) => {
          const active = isActive(path, exact);
          return (
            <button key={path} onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 px-2 py-1 transition-colors min-w-0 ${active ? 'text-[#7C3AED]' : 'text-[#6B7280]'}`}>
              <Icon size={22} strokeWidth={active ? 2.5 : 2} fill={active ? '#F3E8FF' : 'none'} />
              <span className="text-[10px] truncate max-w-[56px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
