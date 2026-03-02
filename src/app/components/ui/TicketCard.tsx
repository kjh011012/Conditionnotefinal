/**
 * 티켓 리스트 카드 — 이슈/문의 공용
 */
import { ChevronRight } from 'lucide-react';
import { OpsStatusBadge } from './OpsStatusBadge';

interface TicketCardProps {
  id: string;
  title: string;
  category?: string;
  status: string;
  priority?: 'high' | 'medium' | 'low';
  assignee?: string;
  time: string;
  onClick?: () => void;
}

const prioMeta = {
  high: { bg: '#FEF2F2', text: '#DC2626', label: '긴급' },
  medium: { bg: '#FFF1E8', text: '#EA580C', label: '보통' },
  low: { bg: '#F3F4F6', text: '#6B7280', label: '낮음' },
};

export function TicketCard({ title, category, status, priority, assignee, time, onClick }: TicketCardProps) {
  return (
    <button onClick={onClick} className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-[13px] text-[#111827] block mb-1 truncate">{title}</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {category && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280]">{category}</span>}
            <OpsStatusBadge status={status} size="sm" />
            {priority && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: prioMeta[priority].bg, color: prioMeta[priority].text }}>
                {prioMeta[priority].label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            {assignee && <span className="text-[10px] text-[#6B7280]">담당: {assignee}</span>}
            <span className="text-[10px] text-[#9CA3AF]">{time}</span>
          </div>
        </div>
        <ChevronRight size={14} className="text-[#9CA3AF] mt-1 shrink-0" />
      </div>
    </button>
  );
}
