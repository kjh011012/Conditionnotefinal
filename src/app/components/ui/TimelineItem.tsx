import { ReactNode } from 'react';

interface TimelineItemProps {
  time: string;
  title: string;
  desc?: string;
  icon?: ReactNode;
  color?: string;
  isLast?: boolean;
  tag?: string;
  tagColor?: string;
}

export function TimelineItem({ time, title, desc, icon, color = '#1B7A4B', isLast, tag, tagColor }: TimelineItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: color + '18' }}>
          {icon || <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />}
        </div>
        {!isLast && <div className="w-px flex-1 bg-[#E5E7EB] mt-1" />}
      </div>
      <div className="pb-4 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] text-[#111827]">{title}</span>
          {tag && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: (tagColor || '#6B7280') + '18', color: tagColor || '#6B7280' }}>{tag}</span>}
        </div>
        {desc && <p className="text-[11px] text-[#6B7280]" style={{ lineHeight: 1.5 }}>{desc}</p>}
        <span className="text-[10px] text-[#9CA3AF]">{time}</span>
      </div>
    </div>
  );
}
