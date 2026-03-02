/**
 * C8. 참가자(운영용) 리스트/보드
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ChevronRight, TrendingDown, TrendingUp, Minus, CheckCircle, XCircle } from 'lucide-react';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';

interface Participant {
  id: string; name: string; age: string; group: string; room: string;
  status: string; trend: 'up' | 'down' | 'flat'; trendLabel: string;
  checkDone: boolean;
}

const participants: Participant[] = [
  { id: '1', name: '김영숙', age: '51세', group: 'A조', room: '1동 201호', status: 'danger', trend: 'down', trendLabel: '수면↓3일', checkDone: false },
  { id: '2', name: '박순자', age: '63세', group: 'A조', room: '1동 202호', status: 'caution', trend: 'down', trendLabel: '스트레스↑', checkDone: true },
  { id: '3', name: '이정호', age: '58세', group: 'B조', room: '2동 101호', status: 'missed', trend: 'flat', trendLabel: '측정누락', checkDone: false },
  { id: '4', name: '최미경', age: '55세', group: 'A조', room: '1동 203호', status: 'normal', trend: 'up', trendLabel: '수면↑', checkDone: true },
  { id: '5', name: '정상철', age: '60세', group: 'B조', room: '2동 102호', status: 'normal', trend: 'flat', trendLabel: '안정', checkDone: true },
  { id: '6', name: '한순애', age: '67세', group: 'C조', room: '3동 101호', status: 'normal', trend: 'up', trendLabel: '리듬↑', checkDone: true },
  { id: '7', name: '오재석', age: '48세', group: 'C조', room: '3동 102호', status: 'caution', trend: 'down', trendLabel: '피로↑', checkDone: false },
  { id: '8', name: '송미란', age: '52세', group: 'B조', room: '2동 103호', status: 'normal', trend: 'flat', trendLabel: '안정', checkDone: true },
];

const filters = ['전체', '관리필요', '주의', '측정누락', '불참', '체크미완료'] as const;
const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendColors = { up: '#22C55E', down: '#EF4444', flat: '#9CA3AF' };

export function CoordParticipants() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('전체');

  const order: Record<string, number> = { danger: 0, caution: 1, missed: 2, normal: 3 };
  let filtered = participants.filter(p => {
    if (search && !p.name.includes(search)) return false;
    if (activeFilter === '관리필요') return p.status === 'danger';
    if (activeFilter === '주의') return p.status === 'caution';
    if (activeFilter === '측정누락') return p.status === 'missed';
    if (activeFilter === '체크미완료') return !p.checkDone;
    return true;
  }).sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <h2 className="text-[18px] text-[#111827] mb-3">참가자 (운영)</h2>
        <div className="flex items-center gap-2 bg-[#F7F8FA] rounded-[10px] px-3 h-[40px] mb-3">
          <Search size={16} className="text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="이름 검색" className="flex-1 bg-transparent text-[13px] outline-none" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] transition-all ${activeFilter === f ? 'bg-[#0EA5E9] text-white' : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-6 flex flex-col gap-2">
        <span className="text-[11px] text-[#9CA3AF]">{filtered.length}명 · 위험 우선 정렬</span>
        {filtered.map(p => {
          const TIcon = trendIcons[p.trend];
          return (
            <button key={p.id} onClick={() => navigate('/coord/participant-detail')}
              className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7F8FA] flex items-center justify-center shrink-0">
                  <span className="text-[13px] text-[#374151]">{p.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[13px] text-[#111827]">{p.name}</span>
                    <span className="text-[9px] text-[#9CA3AF]">{p.age}</span>
                    <OpsStatusBadge status={p.status} size="sm" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#6B7280]">
                    <span>{p.group} · {p.room}</span>
                    <span className="flex items-center gap-0.5" style={{ color: trendColors[p.trend] }}>
                      <TIcon size={9} /> {p.trendLabel}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {p.checkDone ? <CheckCircle size={14} className="text-[#22C55E]" /> : <XCircle size={14} className="text-[#D1D5DB]" />}
                  <ChevronRight size={14} className="text-[#9CA3AF]" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
