/**
 * A12. 데이터 수집 통계
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Activity, Watch, AlertTriangle, RefreshCcw, Share2, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const collectionData = [
  { name: '스트레스', rate: 91, total: 32, done: 29 },
  { name: '수면', rate: 88, total: 32, done: 28 },
  { name: '자율신경', rate: 84, total: 32, done: 27 },
  { name: '인지', rate: 78, total: 32, done: 25 },
  { name: '워치', rate: 72, total: 32, done: 23 },
];

const dailyTrend = [
  { d: '월', rate: 85 }, { d: '화', rate: 92 }, { d: '수', rate: 88 },
  { d: '목', rate: 78 }, { d: '금', rate: 91 }, { d: '토', rate: 65 }, { d: '일', rate: 40 },
];

const missingList = [
  { name: '정수진', missing: ['워치 동기화', '인지 측정'], lastSync: '어제 14:30', group: 'A조' },
  { name: '한옥순', missing: ['스트레스 측정', '워치 동기화'], lastSync: '어제 09:00', group: 'B조' },
  { name: '윤말순', missing: ['워치 동기화'], lastSync: '2일 전', group: 'B조' },
  { name: '최미영', missing: ['전체 미측정'], lastSync: '3일 전', group: 'C조' },
];

export function AdminDataStats() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'overview' | 'missing'>('overview');

  const todayRate = Math.round(collectionData.reduce((a, b) => a + b.rate, 0) / collectionData.length);
  const missCount = missingList.length;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/admin/more')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">데이터 수집 통계</h2>
      </div>

      {/* KPI */}
      <div className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white rounded-[12px] p-3 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="text-[10px] text-[#6B7280] block">오늘 수집률</span>
            <span className={`text-[18px] ${todayRate >= 80 ? 'text-[#1B7A4B]' : 'text-[#F59E0B]'}`}>{todayRate}%</span>
          </div>
          <div className="bg-white rounded-[12px] p-3 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="text-[10px] text-[#6B7280] block">누락자</span>
            <span className="text-[18px] text-[#DC2626]">{missCount}명</span>
          </div>
          <div className="bg-white rounded-[12px] p-3 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="text-[10px] text-[#6B7280] block">참가자</span>
            <span className="text-[18px] text-[#7C3AED]">32명</span>
          </div>
        </div>

        <div className="flex bg-[#F3F4F6] rounded-[10px] p-0.5 mb-4">
          <button onClick={() => setTab('overview')}
            className={`flex-1 py-2 rounded-[8px] text-[12px] ${tab === 'overview' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'}`}>
            수집 현황
          </button>
          <button onClick={() => setTab('missing')}
            className={`flex-1 py-2 rounded-[8px] text-[12px] ${tab === 'missing' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'}`}>
            누락자 ({missCount})
          </button>
        </div>
      </div>

      {tab === 'overview' ? (
        <div className="px-4 pb-8 flex flex-col gap-4">
          {/* Category rates */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="text-[13px] text-[#111827] block mb-3">측정 항목별 수집률</span>
            {collectionData.map(c => (
              <div key={c.name} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[#374151]">{c.name}</span>
                  <span className={c.rate >= 80 ? 'text-[#1B7A4B]' : 'text-[#F59E0B]'}>
                    {c.done}/{c.total} ({c.rate}%)
                  </span>
                </div>
                <div className="w-full h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${c.rate}%`, backgroundColor: c.rate >= 80 ? '#1B7A4B' : c.rate >= 60 ? '#F59E0B' : '#DC2626' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Weekly trend */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="text-[13px] text-[#111827] block mb-3">이번 주 수집률 추이</span>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrend} barCategoryGap="30%">
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} hide />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {dailyTrend.map((entry, i) => (
                      <Cell key={i} fill={entry.rate >= 80 ? '#7C3AED' : entry.rate >= 60 ? '#F59E0B' : '#DC2626'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sync status */}
          <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-2">
              <Watch size={14} className="text-[#6B7280]" />
              <span className="text-[13px] text-[#111827]">워치 동기화 현황</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">연결: 28/32 · 오늘 동기화: 23/28</span>
              <span className="text-[#9CA3AF]">마지막 갱신: 14:30</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-8 flex flex-col gap-2">
          {/* Share button */}
          <button className="w-full h-[40px] bg-[#7C3AED] text-white rounded-[10px] text-[12px] flex items-center justify-center gap-2 mb-2">
            <Share2 size={14} /> 누락자 목록 코디에게 공유
          </button>

          {missingList.map(p => (
            <div key={p.name} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                  <AlertTriangle size={15} className="text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <span className="text-[13px] text-[#111827] block">{p.name}</span>
                  <span className="text-[10px] text-[#9CA3AF]">{p.group} · 마지막 동기화: {p.lastSync}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.missing.map(m => (
                  <span key={m} className="text-[9px] px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626]">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
