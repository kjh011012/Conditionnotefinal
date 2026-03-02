const levels = {
  normal:  { bg: '#E8F5EE', text: '#1B7A4B', label: '정상' },
  caution: { bg: '#FFF1E8', text: '#EA580C', label: '주의' },
  danger:  { bg: '#FEF2F2', text: '#DC2626', label: '관리필요' },
  unknown: { bg: '#F3F4F6', text: '#6B7280', label: '미측정' },
};

interface StatusBadgeProps {
  status: 'normal' | 'caution' | 'danger' | 'unknown';
  label?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const s = levels[status];
  const px = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-[12px]';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${px}`} style={{ backgroundColor: s.bg, color: s.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.text }} />
      {label ?? s.label}
    </span>
  );
}
