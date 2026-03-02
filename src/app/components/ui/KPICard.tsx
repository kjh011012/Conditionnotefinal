import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type Trend = 'up' | 'down' | 'flat';

interface KPICardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  trend?: Trend;
  trendLabel?: string;
  status?: 'normal' | 'caution' | 'danger';
  sparkData?: number[];
  onClick?: () => void;
}

const statusColors = {
  normal:  { bg: '#E8F5EE', text: '#1B7A4B', dot: '#22C55E' },
  caution: { bg: '#FFF1E8', text: '#EA580C', dot: '#F59E0B' },
  danger:  { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' },
};

const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendColors = { up: '#22C55E', down: '#EF4444', flat: '#9CA3AF' };

export function KPICard({ icon, label, value, unit, trend, trendLabel, status = 'normal', sparkData, onClick }: KPICardProps) {
  const sc = statusColors[status];
  const TrendIcon = trend ? trendIcons[trend] : null;

  return (
    <button onClick={onClick} className="w-full bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: sc.bg }}>
            {icon}
          </div>
          <span className="text-[13px] text-[#6B7280]">{label}</span>
        </div>
        <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: sc.dot }} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[28px] text-[#111827]" style={{ lineHeight: 1.1 }}>{value}</span>
          {unit && <span className="text-[13px] text-[#9CA3AF] ml-1">{unit}</span>}
          {trend && TrendIcon && (
            <div className="flex items-center gap-1 mt-1">
              <TrendIcon size={12} style={{ color: trendColors[trend] }} />
              <span className="text-[11px]" style={{ color: trendColors[trend] }}>{trendLabel}</span>
            </div>
          )}
        </div>
        {sparkData && (
          <div className="flex items-end gap-[2px] h-[24px]">
            {sparkData.map((v, i) => (
              <div key={i} className="w-[3px] rounded-full bg-[#1B7A4B] opacity-60"
                style={{ height: `${Math.max(4, (v / 100) * 24)}px` }} />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
