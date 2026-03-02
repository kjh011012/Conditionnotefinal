import { ArrowLeft, Moon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusChip } from '../../components/ui/StatusChip';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

const sleepData = [
  { day: 'Day1', hours: 7.2 },
  { day: 'Day2', hours: 6.5 },
  { day: 'Day3', hours: 5.2 },
];

const stages = [
  { label: '깊은 수면', duration: '48분', ratio: 15, color: '#0E4B2E' },
  { label: '렘 수면', duration: '62분', ratio: 20, color: '#1B7A4B' },
  { label: '얕은 수면', duration: '142분', ratio: 45, color: '#86EFAC' },
  { label: '각성', duration: '60분', ratio: 20, color: '#FDE68A' },
];

export function SleepDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate('/')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">수면 상세</h2>
      </div>

      <div className="px-4 pt-5">
        {/* Summary */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Moon size={20} className="text-[#1B7A4B]" />
            <span className="text-[16px] text-[#111827]">어젯밤 수면</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-[36px] text-[#111827]" style={{ lineHeight: 1 }}>5.2</span>
            <span className="text-[14px] text-[#6B7280] mb-1">시간</span>
          </div>
          <StatusChip status="yellow" label="주의 필요" />
          <div className="flex items-center gap-4 mt-3 text-[13px] text-[#6B7280]">
            <span>취침 23:40</span>
            <span>기상 05:52</span>
            <span>각성 3회</span>
          </div>
        </div>

        {/* Sleep stages */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <h3 className="text-[15px] text-[#111827] mb-3">수면 단계</h3>
          <div className="flex h-3 rounded-full overflow-hidden mb-3">
            {stages.map(s => (
              <div
                key={s.label}
                style={{ width: `${s.ratio}%`, backgroundColor: s.color }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stages.map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[12px] text-[#374151]">{s.label}</span>
                <span className="text-[12px] text-[#6B7280] ml-auto">{s.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <h3 className="text-[15px] text-[#111827] mb-3">최근 3일 총 수면시간</h3>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} />
                <YAxis domain={[4, 8]} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} />
                <Line type="monotone" dataKey="hours" stroke="#1B7A4B" strokeWidth={2} dot={{ fill: '#1B7A4B', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-[#E8F5EE] rounded-[16px] p-4 mb-4">
          <p className="text-[13px] text-[#0E4B2E]">
            깊은 수면이 48분으로 짧은 편이에요. 충전이 60%에서 멈춘 것과 비슷할 수 있어요. 취침 전 스트레칭이 도움이 될 수 있어요.
          </p>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <h3 className="text-[15px] text-[#111827] mb-3">오늘 추천</h3>
          <div className="flex flex-col gap-2">
            {['카페인 오후 2시 이후 자제', '저녁 스트레칭 10분', '취침 전 명상 가이드'].map((r, i) => (
              <button
                key={i}
                className="w-full h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[14px] text-[14px]"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
