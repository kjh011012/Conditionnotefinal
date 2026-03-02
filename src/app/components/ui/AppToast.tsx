/**
 * CMP/Toast & CMP/Snackbar
 * 토스트 알림 + 스낵바 (자동 사라짐)
 * 메시지: "저장했어요" "오늘 계획에 추가했어요" "오프라인으로 저장 중이에요"
 */
import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react';
import { Check, Plus, WifiOff, X, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'info' | 'warning' | 'offline';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const icons: Record<ToastType, any> = {
  success: Check,
  info: Info,
  warning: AlertTriangle,
  offline: WifiOff,
};

const styles: Record<ToastType, { bg: string; icon: string; text: string }> = {
  success: { bg: 'bg-[#0E4B2E]', icon: 'text-[#22C55E]', text: 'text-white' },
  info: { bg: 'bg-[#111827]', icon: 'text-[#60A5FA]', text: 'text-white' },
  warning: { bg: 'bg-[#7C2D12]', icon: 'text-[#F59E0B]', text: 'text-white' },
  offline: { bg: 'bg-[#374151]', icon: 'text-[#9CA3AF]', text: 'text-white' },
};

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-[env(safe-area-inset-top)] left-0 right-0 z-[100] flex flex-col items-center gap-2 pt-3 pointer-events-none">
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          const style = styles[toast.type];
          return (
            <div
              key={toast.id}
              className={`${style.bg} rounded-[14px] px-4 py-3 mx-4 max-w-[390px] w-[calc(100%-32px)] flex items-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.15)] pointer-events-auto animate-[slideDown_0.3s_ease-out]`}
            >
              <Icon size={18} className={style.icon} />
              <span className={`flex-1 text-[14px] ${style.text}`}>{toast.message}</span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-white/50 shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
