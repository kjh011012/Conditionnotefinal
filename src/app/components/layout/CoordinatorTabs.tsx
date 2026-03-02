import { useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, FileText, Play, Users, AlertCircle } from 'lucide-react';

const tabs = [
  { path: '/coord', label: '캠프보드', Icon: LayoutDashboard, exact: true },
  { path: '/coord/check-report', label: '체크리포트', Icon: FileText },
  { path: '/coord/sessions', label: '세션진행', Icon: Play },
  { path: '/coord/participants', label: '참가자', Icon: Users },
  { path: '/coord/issues', label: '이슈·문의', Icon: AlertCircle },
];

export function CoordinatorTabs() {
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
              className={`flex flex-col items-center gap-1 px-2 py-1 transition-colors min-w-0 ${active ? 'text-[#0EA5E9]' : 'text-[#6B7280]'}`}>
              <Icon size={22} strokeWidth={active ? 2.5 : 2} fill={active ? '#E0F2FE' : 'none'} />
              <span className="text-[10px] truncate max-w-[56px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
