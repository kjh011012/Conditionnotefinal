import { Outlet, useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { BottomTabs } from './BottomTabs';
import { useAppContext } from '../../context/AppContext';

export function MobileLayout() {
  const { elderMode } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (elderMode && !location.pathname.startsWith('/elder')) {
      navigate('/elder', { replace: true });
    }
  }, [elderMode, location.pathname, navigate]);

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F7F8FA] relative">
      <div className="pb-[80px]">
        <Outlet />
      </div>
      <BottomTabs />
    </div>
  );
}
