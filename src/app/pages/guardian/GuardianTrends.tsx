/**
 * G2. 변화 추이 (7/30/90일)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Moon, Heart, Activity, Zap, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

const data7 = [
  { d: '3/4', sleep: 72, stress: 38, rhythm: 78, fatigue: 30 },
  { d: '3/5', sleep: 68, stress: 42, rhythm: 75, fatigue: 35 },
  { d: '3/6', sleep: 60, stress: 55, rhythm: 65, fatigue: 48 },
  { d: '3/7', sleep: 65, stress: 50, rhythm: 68, fatigue: 42 },
  { d: '3/8', sleep: 70, stress: 45, rhythm: 70, fatigue: 38 },
  { d: '3/9', sleep: 75, stress: 40, rhythm: 76, fatigue: 32 },
  { d: '3/10', sleep: 62, stress: 52, rhythm: 64, fatigue: 45 },
];

const metrics = [
  { key: 'sleep', label: '수면', Icon: Moon, color: '#0EA5E9', avg: 67 },
  { key: 'stress', label: '스트레스', Icon: Heart, color: '#F59E0B', avg: 46 },
  { key: 'rhythm', label: '생체리듬', Icon: Clock, color: '#1B7A4B', avg: 71 },
  { key: 'fatigue', label: '피로도', Icon: Zap, color: '#7C3AED', avg: 39 },
];

const periods = ['7일', '30일', '90일'] as const;

export function GuardianTrends() {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<typeof periods[number]>('7일');
  const [activeMetric, setActiveMetric] = useState('sleep');

  const metric = metrics.find(m => m.key === activeMetric)!;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">변화 추이</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Period filter */}
        <div className="flex gap-2">
          {periods.map(p => (
            <button key={p} onClick={() => setActivePeriod(p)}
              className={`flex-1 h-[36px] rounded-[10px] text-[13px] transition-all ${activePeriod === p ? 'bg-[#1B7A4B] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>
              {p}
            </button>
          ))}
        </div>

        {/* Metric tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {metrics.map(m => (
            <button key={m.key} onClick={() => setActiveMetric(m.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full shrink-0 text-[12px] transition-all ${activeMetric === m.key ? 'text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}
              style={activeMetric === m.key ? { backgroundColor: m.color } : {}}>
              <m.Icon size={14} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data7}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28} />
                <ReferenceLine y={metric.avg} stroke={metric.color} strokeDasharray="6 3" strokeOpacity={0.4} />
                <Line type="monotone" dataKey={activeMetric} stroke={metric.color} strokeWidth={2.5} dot={{ r: 3, fill: metric.color }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 border-t border-dashed" style={{ borderColor: metric.color + '66' }} />
            <span className="text-[10px] text-[#9CA3AF]">개인 평균: {metric.avg}</span>
          </div>
        </div>

        {/* AI 해석 */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] text-[#111827] block mb-2">AI 해석</span>
          <p className="text-[12px] text-[#374151]" style={{ lineHeight: 1.7 }}>
            최근 7일간 수면 회복 점수가 점진적으로 하락하고 있어요. 캠프 3일차부터 스트레스 지수도 함께 올라가는 패턴이 보여요.
            생체리듬은 비교적 유지되고 있어 긍정적이에요.
          </p>
          <p className="text-[10px] text-[#9CA3AF] mt-2">이 해석은 참고용이며 의료 진단이 아닙니다.</p>
        </div>

        {/* 이번 주 특징 */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] text-[#111827] block mb-3">이번 주 특징</span>
          {[
            { label: '수면 규칙성', desc: '취침/기상 시간이 불규칙해지는 추세', status: 'caution' as const },
            { label: '스트레스 분절', desc: '낮 시간에 급등 후 저녁에 회복', status: 'caution' as const },
            { label: '회복 패턴', desc: '프로그램 참여 후 지표가 일시 개선됨', status: 'normal' as const },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3 py-2 border-t border-[#F3F4F6] first:border-0">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.status === 'caution' ? '#F59E0B' : '#22C55E' }} />
              <div>
                <span className="text-[12px] text-[#111827] block">{item.label}</span>
                <span className="text-[11px] text-[#6B7280]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
