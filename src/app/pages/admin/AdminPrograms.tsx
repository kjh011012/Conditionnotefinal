/**
 * A2. 프로그램 관리 – 월간 캘린더 + 프로그램 목록 통합 뷰
 * 날짜를 클릭하면 해당 날짜의 세션 상세(AdminProgramDetail)로 이동
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronLeft, ChevronRight, Plus, Search, Calendar,
  Clock, MapPin, Users, LayoutList, CalendarDays,
} from 'lucide-react';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';

/* ── types ── */
interface Program {
  id: string; name: string; purpose: string; difficulty: string;
  duration: string; place: string; prep: string; capacity: number; coordinator: string; active: boolean;
}

const programs: Program[] = [
  { id: '1', name: '아침 명상', purpose: '스트레스', difficulty: '쉬움', duration: '30분', place: '명상실', prep: '매트, 향초', capacity: 20, coordinator: '이코디', active: true },
  { id: '2', name: '숲길 걷기', purpose: '리듬', difficulty: '쉬움', duration: '60분', place: '치유숲', prep: '편한 신발', capacity: 25, coordinator: '이코디', active: true },
  { id: '3', name: '치유 요가', purpose: '수면', difficulty: '보통', duration: '50분', place: '다목적실', prep: '요가매트', capacity: 15, coordinator: '박코디', active: true },
  { id: '4', name: '자연식 요리', purpose: '사회활동', difficulty: '보통', duration: '90분', place: '쿠킹홀', prep: '앞치마', capacity: 12, coordinator: '김코디', active: true },
  { id: '5', name: '숲속 대화', purpose: '사회활동', difficulty: '쉬움', duration: '60분', place: '쉼터', prep: '-', capacity: 20, coordinator: '이코디', active: true },
  { id: '6', name: '두뇌 활동', purpose: '인지', difficulty: '보통', duration: '40분', place: '교육실', prep: '필기구', capacity: 15, coordinator: '박코디', active: false },
  { id: '7', name: '원예 치유', purpose: '스트레스', difficulty: '쉬움', duration: '60분', place: '정원', prep: '장갑', capacity: 12, coordinator: '김코디', active: true },
  { id: '8', name: '음악 감상', purpose: '수면', difficulty: '쉬움', duration: '45분', place: '문화실', prep: '-', capacity: 20, coordinator: '이코디', active: true },
];

const purposeColors: Record<string, string> = {
  '스트레스': '#7C3AED', '리듬': '#0EA5E9', '수면': '#6366F1', '사회활동': '#F59E0B', '인지': '#EC4899',
};

const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];
const purposeTags = ['전체', '수면', '리듬', '스트레스', '인지', '사회활동'];

/* ── schedule seed for calendar dots ── */
function getScheduleStatus(year: number, month: number): Record<number, { count: number; purposes: string[] }> {
  const result: Record<number, { count: number; purposes: string[] }> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow === 0) continue;
    if (dow === 6) {
      result[d] = { count: 2, purposes: ['리듬', '스트레스'] };
    } else if (dow === 2 || dow === 4) {
      result[d] = { count: 3, purposes: ['스트레스', '수면', '사회활동'] };
    } else {
      result[d] = { count: 3, purposes: ['스트레스', '리듬', '사회활동'] };
    }
  }
  return result;
}

type ViewMode = 'calendar' | 'list';

export function AdminPrograms() {
  const navigate = useNavigate();
  const today = new Date();
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [search, setSearch] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('전체');

  /* ── Calendar data ── */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevDays = new Date(viewYear, viewMonth, 0).getDate();

    const cells: Array<{ date: number; inMonth: boolean; dateStr: string }> = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevDays - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      cells.push({ date: d, inMonth: false, dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: d, inMonth: true, dateStr: `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      cells.push({ date: d, inMonth: false, dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const scheduleStatus = useMemo(() => getScheduleStatus(viewYear, viewMonth), [viewYear, viewMonth]);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }
  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }

  function openDate(dateStr: string) {
    navigate(`/admin/programs/detail?date=${dateStr}`);
  }

  /* ── List filter ── */
  const filtered = programs.filter(p => {
    if (search && !p.name.includes(search)) return false;
    if (purposeFilter !== '전체' && p.purpose !== purposeFilter) return false;
    return true;
  });

  /* ── This week strip ── */
  const thisWeekDates = useMemo(() => {
    const d = new Date(today);
    const dow = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - dow + 1);
    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dd = new Date(start);
      dd.setDate(start.getDate() + i);
      dates.push(`${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(2, '0')}-${String(dd.getDate()).padStart(2, '0')}`);
    }
    return dates;
  }, []);

  const totalSessions = Object.values(scheduleStatus).reduce((a, b) => a + b.count, 0);

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-8">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[18px] text-[#111827]">프로그램 관리</h2>
          <div className="flex gap-2 items-center">
            {/* View toggle */}
            <div className="flex bg-[#F3F4F6] rounded-[8px] p-0.5">
              <button onClick={() => setViewMode('calendar')}
                className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm' : ''}`}>
                <CalendarDays size={15} className={viewMode === 'calendar' ? 'text-[#7C3AED]' : 'text-[#9CA3AF]'} />
              </button>
              <button onClick={() => setViewMode('list')}
                className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}>
                <LayoutList size={15} className={viewMode === 'list' ? 'text-[#7C3AED]' : 'text-[#9CA3AF]'} />
              </button>
            </div>
            {viewMode === 'calendar' && (
              <button onClick={goToday}
                className="h-8 px-3 bg-[#7C3AED]/10 text-[#7C3AED] rounded-[8px] text-[12px] active:bg-[#7C3AED]/20">
                오늘
              </button>
            )}
          </div>
        </div>
        <span className="text-[12px] text-[#9CA3AF]">
          {viewMode === 'calendar' ? '날짜를 선택하여 세션을 등록·관리하세요' : `총 ${programs.length}개 프로그램`}
        </span>
      </div>

      {viewMode === 'calendar' ? (
        /* ════════ CALENDAR VIEW ════════ */
        <>
          {/* Month navigator */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between bg-white rounded-[14px] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
                <ChevronLeft size={20} className="text-[#374151]" />
              </button>
              <div className="text-center">
                <span className="text-[16px] text-[#111827] block">{viewYear}년 {viewMonth + 1}월</span>
                <span className="text-[11px] text-[#9CA3AF]">총 {totalSessions}세션</span>
              </div>
              <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
                <ChevronRight size={20} className="text-[#374151]" />
              </button>
            </div>
          </div>

          {/* Dot legend */}
          <div className="px-4 pb-2 flex items-center gap-3 flex-wrap">
            {Object.entries(purposeColors).map(([label, color]) => (
              <div key={label} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-[#9CA3AF]">{label}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="px-4">
            <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="grid grid-cols-7 border-b border-[#F3F4F6]">
                {dayHeaders.map((d, i) => (
                  <div key={d} className={`py-2.5 text-center text-[11px] ${i === 0 ? 'text-[#DC2626]' : i === 6 ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((cell, idx) => {
                  const isToday = cell.dateStr === todayStr;
                  const info = cell.inMonth ? scheduleStatus[cell.date] : null;
                  const dow = idx % 7;

                  return (
                    <button
                      key={idx}
                      onClick={() => openDate(cell.dateStr)}
                      className={`relative flex flex-col items-center py-2 min-h-[64px] border-b border-r border-[#F9FAFB] transition-colors
                        ${cell.inMonth ? 'active:bg-[#7C3AED]/5' : 'opacity-30'}
                        ${isToday ? 'bg-[#7C3AED]/[0.04]' : ''}
                      `}
                    >
                      <span className={`text-[12px] w-7 h-7 flex items-center justify-center rounded-full mb-1
                        ${isToday ? 'bg-[#7C3AED] text-white' : dow === 0 ? 'text-[#DC2626]' : dow === 6 ? 'text-[#2563EB]' : 'text-[#374151]'}
                      `}>
                        {cell.date}
                      </span>

                      {cell.inMonth && info ? (
                        <div className="flex flex-col items-center gap-[2px]">
                          <div className="flex items-center gap-[2px]">
                            {info.purposes.slice(0, 3).map((p, pi) => (
                              <span key={pi} className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: purposeColors[p] || '#9CA3AF' }} />
                            ))}
                          </div>
                          <span className="text-[8px] text-[#9CA3AF]">{info.count}건</span>
                        </div>
                      ) : cell.inMonth ? (
                        <span className="w-[5px] h-[5px] rounded-full bg-[#E5E7EB]" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* This week strip */}
          <div className="px-4 mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-[#111827]">이번 주 일정</span>
              <span className="text-[11px] text-[#9CA3AF]">{today.getMonth() + 1}월 {getWeekNumber(today)}주차</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {thisWeekDates.map(ds => {
                const d = new Date(ds);
                const dayName = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
                const isT = ds === todayStr;
                const info = d.getMonth() === viewMonth ? scheduleStatus[d.getDate()] : null;

                return (
                  <button
                    key={ds}
                    onClick={() => openDate(ds)}
                    className={`flex-shrink-0 w-[72px] rounded-[14px] p-3 flex flex-col items-center gap-1 transition-all active:scale-[0.96]
                      ${isT ? 'bg-[#7C3AED] text-white shadow-[0_2px_8px_rgba(124,58,237,0.3)]' : 'bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]'}
                    `}
                  >
                    <span className={`text-[10px] ${isT ? 'text-white/70' : 'text-[#9CA3AF]'}`}>{dayName}</span>
                    <span className={`text-[16px] ${isT ? 'text-white' : 'text-[#111827]'}`}>{d.getDate()}</span>
                    {info ? (
                      <div className="flex gap-[2px]">
                        {info.purposes.slice(0, 3).map((p, pi) => (
                          <span key={pi} className="w-[4px] h-[4px] rounded-full"
                            style={{ backgroundColor: isT ? 'rgba(255,255,255,0.7)' : purposeColors[p] || '#9CA3AF' }} />
                        ))}
                      </div>
                    ) : (
                      <span className={`text-[9px] ${isT ? 'text-white/60' : 'text-[#D1D5DB]'}`}>—</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick action */}
          <div className="px-4 mt-4">
            <button
              onClick={() => openDate(todayStr)}
              className="w-full h-[52px] bg-[#7C3AED] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2 active:bg-[#6D28D9] transition-colors shadow-[0_2px_8px_rgba(124,58,237,0.25)]"
            >
              <Calendar size={18} /> 오늘 일정 관리하기
            </button>
          </div>
        </>
      ) : (
        /* ════════ LIST VIEW ════════ */
        <>
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center gap-2 bg-white rounded-[10px] px-3 h-[38px] mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <Search size={14} className="text-[#9CA3AF]" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="프로그램 검색" className="flex-1 bg-transparent text-[12px] outline-none" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {purposeTags.map(t => (
                <button key={t} onClick={() => setPurposeFilter(t)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] transition-all ${purposeFilter === t ? 'bg-[#7C3AED] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pb-6 flex flex-col gap-2">
            {filtered.map(p => (
              <button key={p.id} onClick={() => navigate(`/admin/programs/detail?date=${todayStr}`)}
                className={`w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left active:scale-[0.98] transition-transform ${!p.active ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between mb-1.5">
                  <span className="text-[14px] text-[#111827]">{p.name}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: purposeColors[p.purpose] || '#9CA3AF' }}>{p.purpose}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
                  <span className="flex items-center gap-0.5"><Clock size={9} /> {p.duration}</span>
                  <span className="flex items-center gap-0.5"><MapPin size={9} /> {p.place}</span>
                  <span className="flex items-center gap-0.5"><Users size={9} /> {p.capacity}명</span>
                  <span>담당: {p.coordinator}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <OpsStatusBadge status={p.active ? 'normal' : 'pending'} label={p.active ? '활성' : '비활성'} size="sm" />
                  <span className="text-[9px] text-[#9CA3AF]">난이도: {p.difficulty} · 준비물: {p.prep}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getWeekNumber(d: Date): number {
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.ceil((d.getDate() + first.getDay()) / 7);
}
