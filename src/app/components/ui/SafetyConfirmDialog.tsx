/**
 * CMP/Dialog/SafetyConfirm (2단계 확인)
 * 긴급 전화/연계 전: "지금 연결할까요?" 확인
 * 버튼: [전화하기] [취소]
 * 접근성: 모달 포커스 트랩, 큰 버튼
 */
import { Phone, X, AlertCircle, Shield } from 'lucide-react';

interface SafetyConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  phoneNumber?: string;
  variant?: 'emergency' | 'referral';
}

export function SafetyConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = '지금 연결할까요?',
  description,
  confirmLabel = '전화하기',
  cancelLabel = '취소',
  phoneNumber,
  variant = 'referral',
}: SafetyConfirmDialogProps) {
  if (!open) return null;

  const isEmergency = variant === 'emergency';

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-[340px] bg-white rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-5 pt-5 pb-3 ${isEmergency ? 'bg-[#FEF2F2]' : 'bg-[#FFF1E8]'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEmergency ? (
                <AlertCircle size={20} className="text-[#DC2626]" />
              ) : (
                <Shield size={20} className="text-[#FF8A3D]" />
              )}
              <span className={`text-[18px] ${isEmergency ? 'text-[#991B1B]' : 'text-[#111827]'}`}>
                {title}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60"
            >
              <X size={18} className="text-[#6B7280]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-[14px] text-[#374151] mb-3">
            {description ||
              (isEmergency
                ? '지금 바로 도움을 받을 수 있는 곳으로 연결해 드릴게요. 걱정하지 마세요.'
                : '가까운 기관으로 연결을 도와드릴게요. 준비되셨을 때 눌러주세요.')}
          </p>
          {phoneNumber && (
            <div className="bg-[#F7F8FA] rounded-[12px] px-4 py-3 flex items-center gap-2 mb-3">
              <Phone size={16} className="text-[#6B7280]" />
              <span className="text-[16px] text-[#111827]">{phoneNumber}</span>
            </div>
          )}
          <p className="text-[12px] text-[#9CA3AF]">
            통화 버튼을 누르면 전화 앱이 열려요.
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-[52px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[16px]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 h-[52px] rounded-[14px] text-[16px] text-white flex items-center justify-center gap-2 ${
              isEmergency ? 'bg-[#DC2626]' : 'bg-[#1B7A4B]'
            }`}
          >
            <Phone size={18} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
