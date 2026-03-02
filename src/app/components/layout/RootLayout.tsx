import { Outlet } from 'react-router';
import { AppProvider } from '../../context/AppContext';
import { VillageProvider } from '../../context/VillageContext';
import { ToastProvider } from '../ui/AppToast';

export function RootLayout() {
  return (
    <AppProvider>
      <VillageProvider>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </VillageProvider>
    </AppProvider>
  );
}
