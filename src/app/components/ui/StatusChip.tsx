import { Check, AlertTriangle, ArrowRight, AlertCircle } from 'lucide-react';

type StatusLevel = 'green' | 'yellow' | 'orange' | 'red';

const config: Record<StatusLevel, { bg: string; text: string; label: string; Icon: any }> = {
  green: { bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]', label: '정상 범위', Icon: Check },
  yellow: { bg: 'bg-[#FEF9C3]', text: 'text-[#A16207]', label: '주의 필요', Icon: AlertTriangle },
  orange: { bg: 'bg-[#FFF1E8]', text: 'text-[#EA580C]', label: '연계 권장', Icon: ArrowRight },
  red: { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: '즉시 도움 권장', Icon: AlertCircle },
};

export function StatusChip({ status, label }: { status: StatusLevel; label?: string }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${c.bg} ${c.text}`}>
      <c.Icon size={14} />
      <span className="text-[12px]">{label ?? c.label}</span>
    </span>
  );
}
