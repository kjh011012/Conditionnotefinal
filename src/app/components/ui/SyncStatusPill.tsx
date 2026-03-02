/**
 * CMP/Sync/StatusPill
 * 동기화 상태 알약 배지
 * States: synced / needsSync / failed / offlineSaving
 * 탭하면 Bottom Sheet로 상세(왜/해결 방법)
 */
import { useState } from 'react';
import { Check, RefreshCw, AlertTriangle, WifiOff, X } from 'lucide-react';

type SyncStatus = 'synced' | 'needsSync' | 'failed' | 'offlineSaving';

interface SyncStatusPillProps {
  status: SyncStatus;
  lastSyncTime?: string;
  onRetry?: () => void;
}

const statusConfig: Record<
  SyncStatus,
  { icon: any; label: string; bg: string; text: string; detail: string; solution: string }
> = {
  synced: {
    icon: Check,
    label: '동기화됨',
    bg: 'bg-[#DCFCE7]',
    text: 'text-[#15803D]',
    detail: '모든 데이터가 최신 상태예요.',
    solution: '자동으로 동기화되고 있어요.',
  },
  needsSync: {
    icon: RefreshCw,
    label: '동기화 필요',
    bg: 'bg-[#FEF9C3]',
    text: 'text-[#A16207]',
    detail: '아직 전송되지 않은 기록이 있어요.',
    solution: 'Wi-Fi가 연결되면 자동으로 보내드려요. 지금 직접 시도하실 수도 있어요.',
  },
  failed: {
    icon: AlertTriangle,
    label: '동기화 실패',
    bg: 'bg-[#FEE2E2]',
    text: 'text-[#DC2626]',
    detail: '서버와 연결이 끊어졌어요.',
    solution: '인터넷 상태를 확인한 뒤 다시 시도해 보세요. 기록은 안전하게 보관되고 있어요.',
  },
  offlineSaving: {
    icon: WifiOff,
    label: '오프라인 저장 중',
    bg: 'bg-[#F3F4F6]',
    text: 'text-[#374151]',
    detail: '인터넷이 없어도 기록은 저장돼요.',
    solution: '연결이 되면 자동으로 동기화할게요. 기록은 기기에 안전하게 보관됩니다.',
  },
};

export function SyncStatusPill({ status, lastSyncTime, onRetry }: SyncStatusPillProps) {
  const [showSheet, setShowSheet] = useState(false);
  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <>
      <button
        onClick={() => setShowSheet(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${cfg.bg} ${cfg.text} min-h-[32px]`}
        aria-label={`동기화 상태: ${cfg.label}`}
      >
        <Icon size={14} className={status === 'needsSync' ? 'animate-spin' : ''} />
        <span className="text-[12px]">{cfg.label}</span>
        {status === 'synced' && lastSyncTime && (
          <span className="text-[11px] opacity-70">({lastSyncTime})</span>
        )}
      </button>

      {/* Bottom Sheet */}
      {showSheet && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center"
          onClick={() => setShowSheet(false)}
        >
          <div
            className="w-full max-w-[430px] bg-white rounded-t-[20px] px-5 pt-3 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${cfg.bg} flex items-center justify-center`}>
                  <Icon size={16} className={cfg.text} />
                </div>
                <span className="text-[18px] text-[#111827]">{cfg.label}</span>
              </div>
              <button onClick={() => setShowSheet(false)} className="text-[#9CA3AF]">
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#F7F8FA] rounded-[14px] p-4 mb-4">
              <p className="text-[14px] text-[#374151] mb-2">왜 이런 상태인가요?</p>
              <p className="text-[13px] text-[#6B7280]">{cfg.detail}</p>
            </div>

            <div className="bg-[#F7F8FA] rounded-[14px] p-4 mb-5">
              <p className="text-[14px] text-[#374151] mb-2">어떻게 하면 되나요?</p>
              <p className="text-[13px] text-[#6B7280]">{cfg.solution}</p>
            </div>

            {(status === 'needsSync' || status === 'failed') && (
              <button
                onClick={() => {
                  onRetry?.();
                  setShowSheet(false);
                }}
                className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
              >
                지금 동기화 시도
              </button>
            )}
            {status === 'synced' && (
              <button
                onClick={() => setShowSheet(false)}
                className="w-full h-[52px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[14px] text-[16px]"
              >
                확인
              </button>
            )}
            {status === 'offlineSaving' && (
              <button
                onClick={() => setShowSheet(false)}
                className="w-full h-[52px] bg-[#F7F8FA] text-[#374151] rounded-[14px] text-[16px]"
              >
                알겠어요
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
