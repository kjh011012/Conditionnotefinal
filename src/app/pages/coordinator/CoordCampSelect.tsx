/**
 * C0. 캠프 선택/전환
 */
import { useNavigate } from 'react-router';
import { ChevronRight, Calendar, MapPin } from 'lucide-react';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';

const camps = [
  { id: '1', name: '봄맞이 치유캠프', period: '2026.03.10 ~ 03.20', location: '치유마을 A', status: 'in_progress', participants: 32 },
  { id: '2', name: '힐링 위크 4월', period: '2026.04.01 ~ 04.10', location: '치유마을 B', status: 'scheduled', participants: 28 },
  { id: '3', name: '겨울 힐링캠프', period: '2026.02.01 ~ 02.10', location: '치유마을 A', status: 'completed', participants: 25 },
];

export function CoordCampSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <RoleBadge role="coordinator" />
        <h1 className="text-[20px] text-[#111827] mt-2">캠프 선택</h1>
        <p className="text-[12px] text-[#9CA3AF]">운영할 캠프를 선택하세요</p>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        {camps.map(c => (
          <button key={c.id} onClick={() => navigate('/coord')}
            className="w-full bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left active:scale-[0.98] transition-transform">
            <div className="flex items-start justify-between mb-2">
              <span className="text-[15px] text-[#111827]">{c.name}</span>
              <OpsStatusBadge status={c.status} size="sm" />
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#6B7280] mb-2">
              <span className="flex items-center gap-1"><Calendar size={11} /> {c.period}</span>
              <span className="flex items-center gap-1"><MapPin size={11} /> {c.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#9CA3AF]">참가자 {c.participants}명</span>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
