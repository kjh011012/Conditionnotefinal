/**
 * G4. 주간/월간 리포트
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Download, Share2, TrendingUp, TrendingDown, Minus, Moon, Heart, Activity, Zap, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { d: '월', sleep: 72, stress: 38 },
  { d: '화', sleep: 68, stress: 42 },
  { d: '수', sleep: 60, stress: 55 },
  { d: '목', sleep: 65, stress: 50 },
  { d: '금', sleep: 70, stress: 45 },
  { d: '토', sleep: 75, stress: 40 },
  { d: '일', sleep: 62, stress: 52 },
];

const summaryItems = [
  { icon: Moon, label: '수면 회복', avg: 67, change: -5, trend: 'down' as const },
  { icon: Heart, label: '스트레스', avg: 46, change: +4, trend: 'up' as const },
  { icon: Clock, label: '리듬 안정도', avg: 71, change: -2, trend: 'down' as const },
  { icon: Zap, label: '피로도', avg: 39, change: +3, trend: 'up' as const },
  { icon: Activity, label: '활동량', avg: '양호', change: 0, trend: 'flat' as const },
];

const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendColors = { up: '#EF4444', down: '#EF4444', flat: '#9CA3AF' };

export function GuardianReport() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center justify-between px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
            <ArrowLeft size={22} className="text-[#374151]" />
          </button>
          <h2 className="text-[18px] text-[#111827]">리포트</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center"><Share2 size={18} className="text-[#374151]" /></button>
          <button className="w-9 h-9 flex items-center justify-center"><Download size={18} className="text-[#374151]" /></button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Period toggle */}
        <div className="flex gap-2 bg-white rounded-[12px] p-1 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {(['weekly', 'monthly'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 h-[36px] rounded-[10px] text-[13px] transition-all ${tab === t ? 'bg-[#1B7A4B] text-white' : 'text-[#6B7280]'}`}>
              {t === 'weekly' ? '주간' : '월간'}
            </button>
          ))}
        </div>

        {/* Period label */}
        <div className="text-center">
          <span className="text-[14px] text-[#111827]">2026년 3월 1주차</span>
          <span className="text-[11px] text-[#9CA3AF] block mt-0.5">3/4 (월) ~ 3/10 (일)</span>
        </div>

        {/* Summary cards */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">핵심 지표 요약</span>
          {summaryItems.map(item => {
            const TrendIcon = trendIcons[item.trend];
            return (
              <div key={item.label} className="flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0">
                <item.icon size={16} className="text-[#6B7280]" />
                <span className="text-[12px] text-[#374151] flex-1">{item.label}</span>
                <span className="text-[14px] text-[#111827] w-10 text-right">{item.avg}</span>
                {item.change !== 0 && (
                  <div className="flex items-center gap-0.5 w-12">
                    <TrendIcon size={10} style={{ color: trendColors[item.trend] }} />
                    <span className="text-[10px]" style={{ color: trendColors[item.trend] }}>
                      {item.change > 0 ? '+' : ''}{item.change}
                    </span>
                  </div>
                )}
                {item.change === 0 && <div className="w-12" />}
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] text-[#111827] block mb-3">수면 / 스트레스 일별</span>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={2}>
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Bar dataKey="sleep" fill="#0EA5E9" radius={[3, 3, 0, 0]} barSize={14} />
                <Bar dataKey="stress" fill="#F59E0B" radius={[3, 3, 0, 0]} barSize={14} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next week recommendations */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">다음 주 권장</span>
          {[
            { label: '수면', desc: '취침 시간을 일정하게 유지하는 것이 도움이 될 수 있어요' },
            { label: '활동', desc: '가벼운 아침 산책을 포함하면 리듬 안정에 도움이 될 수 있어요' },
            { label: '사회활동', desc: '그룹 프로그램 참여를 유지하시면 좋아요' },
          ].map(item => (
            <div key={item.label} className="py-2 border-t border-[#F3F4F6] first:border-0">
              <span className="text-[12px] text-[#1B7A4B] block mb-0.5">{item.label}</span>
              <span className="text-[11px] text-[#6B7280]" style={{ lineHeight: 1.5 }}>{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Share */}
        <button className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
          <Share2 size={16} /> 가족에게 공유
        </button>
        <p className="text-[10px] text-[#9CA3AF] text-center">이 리포트는 의료 진단이 아닌 생활 건강 참고 자료입니다.</p>
      </div>
    </div>
  );
}
