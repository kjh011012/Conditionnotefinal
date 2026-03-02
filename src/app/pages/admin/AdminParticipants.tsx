/**
 * A2. 참가자 전체 현황 (필터/그룹)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Users, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

type StatusLevel = 'normal' | 'caution' | 'danger';

const participants = [
  { id: '1', name: '김영숙', group: 'A조', status: 'danger' as StatusLevel, measured: true },
  { id: '2', name: '박순자', group: 'A조', status: 'caution' as StatusLevel, measured: true },
  { id: '3', name: '이정호', group: 'B조', status: 'caution' as StatusLevel, measured: false },
  { id: '4', name: '최미경', group: 'A조', status: 'normal' as StatusLevel, measured: true },
  { id: '5', name: '정상철', group: 'B조', status: 'normal' as StatusLevel, measured: true },
  { id: '6', name: '한순애', group: 'C조', status: 'normal' as StatusLevel, measured: true },
  { id: '7', name: '오재석', group: 'C조', status: 'caution' as StatusLevel, measured: true },
  { id: '8', name: '송미란', group: 'B조', status: 'normal' as StatusLevel, measured: false },
];

const groups = ['전체', 'A조', 'B조', 'C조'] as const;
const statusFilters = ['전체', '관리필요', '주의', '정상'] as const;

export function AdminParticipants() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState<string>('전체');
  const [statusFilter, setStatusFilter] = useState<string>('전체');

  const filtered = participants.filter(p => {
    if (search && !p.name.includes(search)) return false;
    if (group !== '전체' && p.group !== group) return false;
    if (statusFilter === '관리필요' && p.status !== 'danger') return false;
    if (statusFilter === '주의' && p.status !== 'caution') return false;
    if (statusFilter === '정상' && p.status !== 'normal') return false;
    return true;
  });

  const counts = { danger: participants.filter(p => p.status === 'danger').length, caution: participants.filter(p => p.status === 'caution').length, normal: participants.filter(p => p.status === 'normal').length };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <h2 className="text-[18px] text-[#111827] mb-3">참가자 현황</h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: '관리필요', value: counts.danger, color: '#DC2626', bg: '#FEF2F2' },
            { label: '주의', value: counts.caution, color: '#EA580C', bg: '#FFF1E8' },
            { label: '정상', value: counts.normal, color: '#1B7A4B', bg: '#E8F5EE' },
          ].map(s => (
            <div key={s.label} className="rounded-[10px] p-2.5 text-center" style={{ backgroundColor: s.bg }}>
              <span className="text-[18px] block" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[10px]" style={{ color: s.color }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#F7F8FA] rounded-[10px] px-3 h-[40px] mb-3">
          <Search size={16} className="text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="이름 검색" className="flex-1 bg-transparent text-[13px] outline-none" />
        </div>

        {/* Group filter */}
        <div className="flex gap-1.5 mb-2">
          {groups.map(g => (
            <button key={g} onClick={() => setGroup(g)}
              className={`px-3 py-1.5 rounded-full text-[11px] ${group === g ? 'bg-[#7C3AED] text-white' : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'}`}>
              {g}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {statusFilters.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-[11px] ${statusFilter === s ? 'bg-[#7C3AED] text-white' : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-6">
        <span className="text-[12px] text-[#9CA3AF] block mb-2">{filtered.length}명</span>
        <div className="flex flex-col gap-2">
          {filtered.map(p => (
            <button key={p.id}
              className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
                <span className="text-[14px] text-[#7C3AED]">{p.name[0]}</span>
              </div>
              <div className="flex-1">
                <span className="text-[14px] text-[#111827] block">{p.name}</span>
                <span className="text-[10px] text-[#9CA3AF]">{p.group} {!p.measured && '· 측정 누락'}</span>
              </div>
              <StatusBadge status={p.status} size="sm" />
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
