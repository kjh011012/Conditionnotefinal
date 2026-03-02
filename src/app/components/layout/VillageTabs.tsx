/**
 * VillageTabs — VILLAGE_MODE 하단 탭
 */
import { useLocation, useNavigate } from 'react-router';
import { Home, Calendar, UtensilsCrossed, Megaphone, MoreHorizontal } from 'lucide-react';
import { useVillage } from '../../context/VillageContext';

const tabs = [
  { path: '/village', label: '홈', Icon: Home, exact: true },
  { path: '/village/schedule', label: '일정', Icon: Calendar },
  { path: '/village/meal', label: '식단', Icon: UtensilsCrossed },
  { path: '/village/notices', label: '공지', Icon: Megaphone },
  { path: '/village/inquiry', label: '문의', Icon: MoreHorizontal },
];

export function VillageTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeVillage } = useVillage();
  const color = activeVillage?.primaryColor || '#1B7A4B';
  const bgColor = activeVillage?.secondaryColor || '#E8F5EE';

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-[72px] pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ path, label, Icon, exact }) => {
          const active = isActive(path, exact);
          return (
            <button key={path} onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${active ? '' : 'text-[#6B7280]'}`}
              style={active ? { color } : {}}>
              <Icon size={22} strokeWidth={active ? 2.5 : 2}
                fill={active ? bgColor : 'none'} />
              <span className="text-[10px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
