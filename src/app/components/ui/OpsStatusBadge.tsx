/**
 * 운영 상태 배지: 예정/진행중/완료/지연 + 정상/주의/관리필요 + 측정누락
 */
const meta: Record<string, { bg: string; text: string; label: string }> = {
  scheduled: { bg: '#E0F2FE', text: '#0EA5E9', label: '예정' },
  in_progress: { bg: '#FFF1E8', text: '#EA580C', label: '진행 중' },
  completed: { bg: '#E8F5EE', text: '#1B7A4B', label: '완료' },
  delayed: { bg: '#FEF2F2', text: '#DC2626', label: '지연' },
  normal: { bg: '#E8F5EE', text: '#1B7A4B', label: '정상' },
  caution: { bg: '#FFF1E8', text: '#EA580C', label: '주의' },
  danger: { bg: '#FEF2F2', text: '#DC2626', label: '관리필요' },
  missed: { bg: '#F3F4F6', text: '#6B7280', label: '측정누락' },
  draft: { bg: '#F3F4F6', text: '#6B7280', label: '초안' },
  submitted: { bg: '#E0F2FE', text: '#0EA5E9', label: '제출' },
  rejected: { bg: '#FEF2F2', text: '#DC2626', label: '반려' },
  pending: { bg: '#FFF1E8', text: '#EA580C', label: '대기' },
  processing: { bg: '#E0F2FE', text: '#0EA5E9', label: '처리 중' },
  closed: { bg: '#E8F5EE', text: '#1B7A4B', label: '완료' },
  pinned: { bg: '#F3E8FF', text: '#7C3AED', label: '상단 고정' },
  reserved: { bg: '#E0F2FE', text: '#0EA5E9', label: '예약' },
  temp: { bg: '#F3F4F6', text: '#6B7280', label: '임시저장' },
  published: { bg: '#E8F5EE', text: '#1B7A4B', label: '발행' },
};

interface OpsStatusBadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function OpsStatusBadge({ status, label, size = 'md' }: OpsStatusBadgeProps) {
  const s = meta[status] || { bg: '#F3F4F6', text: '#6B7280', label: status };
  const px = size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full shrink-0 ${px}`} style={{ backgroundColor: s.bg, color: s.text }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.text }} />
      {label ?? s.label}
    </span>
  );
}
