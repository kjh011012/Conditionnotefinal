/**
 * A5. 식단 관리 – 월간 캘린더 뷰
 * 날짜를 클릭하면 해당 날짜의 메뉴 상세(AdminMenuDetail)로 이동
 */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, UtensilsCrossed, Circle, Plus } from 'lucide-react';

const mealDots: Record<string, string> = {
  '아침': '#F59E0B',
  '점심': '#0EA5E9',
  '저녁': '#7C3AED',
};

const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];

/* 해당 월의 식단 등록 여부 시뮬레이션 */
function getMenuStatus(year: number, month: number): Record<number, string[]> {
  const result: Record<number, string[]> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow === 0) continue; // 일요일 비등록
    if (dow === 6) {
      result[d] = ['아침', '점심']; // 토요일 2끼
    } else {
      result[d] = ['아침', '점심', '저녁']; // 평일 3끼
    }
  }
  return result;
}

export function AdminMenu() {
  const navigate = useNavigate();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  /* 달력 데이터 계산 */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevDays = new Date(viewYear, viewMonth, 0).getDate();

    const cells: Array<{ date: number; inMonth: boolean; dateStr: string }> = [];
    // 이전 달
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevDays - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      cells.push({ date: d, inMonth: false, dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    // 현재 달
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: d, inMonth: true, dateStr: `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    // 다음 달 (6줄 채우기)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      cells.push({ date: d, inMonth: false, dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const menuStatus = useMemo(() => getMenuStatus(viewYear, viewMonth), [viewYear, viewMonth]);

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
    navigate(`/admin/menu/detail?date=${dateStr}`);
  }

  /* 이번주 요약 */
  const thisWeekDates = useMemo(() => {
    const d = new Date(today);
    const dow = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - dow + 1); // 월요일
    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dd = new Date(start);
      dd.setDate(start.getDate() + i);
      dates.push(`${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(2, '0')}-${String(dd.getDate()).padStart(2, '0')}`);
    }
    return dates;
  }, []);

  const totalRegistered = Object.values(menuStatus).reduce((a, b) => a + b.length, 0);
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-8">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[18px] text-[#111827]">식단 관리</h2>
          <button onClick={goToday}
            className="h-8 px-3 bg-[#7C3AED]/10 text-[#7C3AED] rounded-[8px] text-[12px] active:bg-[#7C3AED]/20 transition-colors">
            오늘
          </button>
        </div>
        <span className="text-[12px] text-[#9CA3AF]">날짜를 선택하여 메뉴를 등록·관리하세요</span>
      </div>

      {/* Month navigator */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between bg-white rounded-[14px] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6] transition-colors">
            <ChevronLeft size={20} className="text-[#374151]" />
          </button>
          <div className="text-center">
            <span className="text-[16px] text-[#111827] block">{viewYear}년 {viewMonth + 1}월</span>
            <span className="text-[11px] text-[#9CA3AF]">{totalRegistered}끼 등록 / {daysInCurrentMonth}일</span>
          </div>
          <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6] transition-colors">
            <ChevronRight size={20} className="text-[#374151]" />
          </button>
        </div>
      </div>

      {/* Dot legend */}
      <div className="px-4 pb-2 flex items-center gap-4">
        {Object.entries(mealDots).map(([label, color]) => (
          <div key={label} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-[#9CA3AF]">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 ml-auto">
          <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
          <span className="text-[10px] text-[#9CA3AF]">미등록</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="px-4">
        <div className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[#F3F4F6]">
            {dayHeaders.map((d, i) => (
              <div key={d} className={`py-2.5 text-center text-[11px] ${i === 0 ? 'text-[#DC2626]' : i === 6 ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7">
            {calendarDays.map((cell, idx) => {
              const isToday = cell.dateStr === todayStr;
              const meals = cell.inMonth ? (menuStatus[cell.date] || []) : [];
              const isEmpty = meals.length === 0;
              const dow = idx % 7;

              return (
                <button
                  key={idx}
                  onClick={() => openDate(cell.dateStr)}
                  className={`relative flex flex-col items-center py-2 min-h-[60px] border-b border-r border-[#F9FAFB] transition-colors
                    ${cell.inMonth ? 'active:bg-[#7C3AED]/5' : 'opacity-30'}
                    ${isToday ? 'bg-[#7C3AED]/[0.04]' : ''}
                  `}
                >
                  <span className={`text-[12px] w-7 h-7 flex items-center justify-center rounded-full mb-1
                    ${isToday ? 'bg-[#7C3AED] text-white' : dow === 0 ? 'text-[#DC2626]' : dow === 6 ? 'text-[#2563EB]' : 'text-[#374151]'}
                  `}>
                    {cell.date}
                  </span>

                  {cell.inMonth && (
                    <div className="flex items-center gap-[3px]">
                      {isEmpty ? (
                        <span className="w-[5px] h-[5px] rounded-full bg-[#E5E7EB]" />
                      ) : (
                        meals.map(m => (
                          <span key={m} className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: mealDots[m] || '#9CA3AF' }} />
                        ))
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* This week quick strip */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-[#111827]">이번 주 식단 현황</span>
          <span className="text-[11px] text-[#9CA3AF]">{today.getMonth() + 1}월 {getWeekNumber(today)}주차</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {thisWeekDates.map((ds, i) => {
            const d = new Date(ds);
            const dayName = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
            const isT = ds === todayStr;
            const dayMenus = d.getMonth() === viewMonth && menuStatus[d.getDate()] ? menuStatus[d.getDate()] : [];
            const mealCount = dayMenus.length;

            return (
              <button
                key={ds}
                onClick={() => openDate(ds)}
                className={`flex-shrink-0 w-[72px] rounded-[14px] p-3 flex flex-col items-center gap-1 transition-all
                  ${isT ? 'bg-[#7C3AED] text-white shadow-[0_2px_8px_rgba(124,58,237,0.3)]' : 'bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]'}
                  active:scale-[0.96]
                `}
              >
                <span className={`text-[10px] ${isT ? 'text-white/70' : 'text-[#9CA3AF]'}`}>{dayName}</span>
                <span className={`text-[16px] ${isT ? 'text-white' : 'text-[#111827]'}`}>{d.getDate()}</span>
                <div className="flex gap-[2px] mt-0.5">
                  {mealCount > 0 ? (
                    dayMenus.map(m => (
                      <span key={m} className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: isT ? 'rgba(255,255,255,0.7)' : mealDots[m] || '#9CA3AF' }} />
                    ))
                  ) : (
                    <span className={`text-[9px] ${isT ? 'text-white/60' : 'text-[#D1D5DB]'}`}>—</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick action: 오늘 메뉴 */}
      <div className="px-4 mt-4">
        <button
          onClick={() => openDate(todayStr)}
          className="w-full h-[52px] bg-[#7C3AED] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2 active:bg-[#6D28D9] transition-colors shadow-[0_2px_8px_rgba(124,58,237,0.25)]"
        >
          <UtensilsCrossed size={18} /> 오늘 식단 관리하기
        </button>
      </div>
    </div>
  );
}

function getWeekNumber(d: Date): number {
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.ceil((d.getDate() + first.getDay()) / 7);
}
