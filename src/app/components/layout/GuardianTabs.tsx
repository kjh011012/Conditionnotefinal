import { useLocation, useNavigate } from 'react-router';
import { Home, TrendingUp, AlertTriangle, FileText, Settings } from 'lucide-react';

const tabs = [
  { path: '/guardian', label: '홈', Icon: Home, exact: true },
  { path: '/guardian/trends', label: '추이', Icon: TrendingUp },
  { path: '/guardian/risk', label: '위험신호', Icon: AlertTriangle },
  { path: '/guardian/report', label: '리포트', Icon: FileText },
  { path: '/guardian/settings', label: '설정', Icon: Settings },
];

export function GuardianTabs() {
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
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${active ? 'text-[#1B7A4B]' : 'text-[#6B7280]'}`}>
              <Icon size={24} strokeWidth={active ? 2.5 : 2} fill={active ? '#E8F5EE' : 'none'} />
              <span className="text-[12px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
