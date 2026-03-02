/**
 * P-Report-Daily-Weekly-02_Insight
 * 주간 리듬 리포트 디테일:
 * - 수면 규칙성/활동/스트레스 추세(미니 차트)
 * - "이번 주 가장 도움이 된 것" 1개
 * - "다음 주 한 가지 목표" 1개(선택 저장)
 * - 캠프 유도 배너(부드럽게)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Moon, Activity, Heart, Sparkles, Target,
  Check, ChevronRight, TrendingUp, TrendingDown, Calendar,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import { CampCTABanner } from '../../components/ui/CampCTABanner';
import { useToast } from '../../components/ui/AppToast';

const weeklyData = [
  { day: '월', sleep: 6.8, steps: 4200, stress: 55 },
  { day: '화', sleep: 7.1, steps: 5100, stress: 48 },
  { day: '수', sleep: 5.9, steps: 3800, stress: 62 },
  { day: '목', sleep: 6.5, steps: 4500, stress: 52 },
  { day: '금', sleep: 7.0, steps: 5800, stress: 45 },
  { day: '토', sleep: 7.5, steps: 6200, stress: 40 },
  { day: '일', sleep: 6.2, steps: 3500, stress: 58 },
];

const completedActivities = [
  { label: '가벼운 산책 20분', count: 5, trend: 'up' },
  { label: '호흡 명상 10분', count: 4, trend: 'up' },
  { label: '아침 스트레칭 8분', count: 3, trend: 'same' },
];

const goalOptions = [
  '수면 규칙성 유지 (11시 전 취침)',
  '매일 산책 20분 이상',
  '호흡 명상 주 5회',
  '스트레칭 매일 아침',
];

export function WeeklyInsightPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [goalSaved, setGoalSaved] = useState(false);

  const handleSaveGoal = () => {
    if (!selectedGoal) return;
    setGoalSaved(true);
    showToast('success', '다음 주 목표를 저장했어요');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">주간 리듬 인사이트</h2>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4]">
        <p className="text-[11px] text-[#9CA3AF]">
          이 리포트는 의료 진단이 아니라, 생활 지표 변화와 권장 루틴을 안내합니다.
        </p>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Period header */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-[#6B7280]" />
          <span className="text-[14px] text-[#374151]">2월 22일 ~ 2월 28일</span>
        </div>

        {/* ── Sleep regularity mini chart ── */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Moon size={16} className="text-[#1B7A4B]" />
              <span className="text-[14px] text-[#111827]">수면 규칙성</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-[#22C55E]" />
              <span className="text-[12px] text-[#22C55E]">개선</span>
            </div>
          </div>
          <div className="h-[80px] mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[4, 8]} hide />
                <Line type="monotone" dataKey="sleep" stroke="#1B7A4B" strokeWidth={2} dot={{ fill: '#1B7A4B', r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[12px] text-[#6B7280]">
            평균 6.7시간. 주 후반에 수면이 안정되는 경향이 있어요.
          </p>
        </div>

        {/* ── Activity mini chart ── */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#1B7A4B]" />
              <span className="text-[14px] text-[#111827]">활동량 (걸음)</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-[#22C55E]" />
              <span className="text-[12px] text-[#22C55E]">+12%</span>
            </div>
          </div>
          <div className="h-[80px] mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="steps" fill="#E8F5EE" radius={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[12px] text-[#6B7280]">
            평균 4,757걸음. 금요일과 토요일에 활동량이 가장 많았어요.
          </p>
        </div>

        {/* ── Stress mini chart ── */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[#F59E0B]" />
              <span className="text-[14px] text-[#111827]">스트레스 추세</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown size={14} className="text-[#22C55E]" />
              <span className="text-[12px] text-[#22C55E]">감소</span>
            </div>
          </div>
          <div className="h-[80px] mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[30, 70]} hide />
                <Line type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[12px] text-[#6B7280]">
            평균 51점. 주 후반에 스트레스가 줄어드는 경향이 있어요.
          </p>
        </div>

        {/* ── Best activity this week ── */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#FF8A3D]" />
            <span className="text-[15px] text-[#111827]">이번 주 가장 도움이 된 것</span>
          </div>

          <div className="bg-[#E8F5EE] rounded-[14px] p-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-[#1B7A4B] flex items-center justify-center text-white text-[12px]">1</span>
              <span className="text-[15px] text-[#0E4B2E]">가벼운 산책 20분</span>
            </div>
            <p className="text-[13px] text-[#6B7280] ml-8">
              5회 완료. 산책한 날에 수면의 질이 더 좋았어요.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {completedActivities.slice(1).map((act, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[11px] text-[#6B7280]">{i + 2}</span>
                  <span className="text-[13px] text-[#374151]">{act.label}</span>
                </div>
                <span className="text-[12px] text-[#9CA3AF]">{act.count}회</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Next week goal ── */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Target size={16} className="text-[#1B7A4B]" />
            <span className="text-[15px] text-[#111827]">다음 주 한 가지 목표</span>
          </div>
          <p className="text-[12px] text-[#9CA3AF] mb-4">하나를 골라보세요. (선택)</p>

          {goalSaved ? (
            <div className="bg-[#E8F5EE] rounded-[14px] p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1B7A4B] flex items-center justify-center shrink-0">
                <Check size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[14px] text-[#0E4B2E]">{selectedGoal}</p>
                <p className="text-[12px] text-[#6B7280] mt-0.5">다음 주 홈 화면에서 확인할 수 있어요</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 mb-4">
                {goalOptions.map((goal, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGoal(goal)}
                    className={`w-full text-left px-4 py-3 rounded-[12px] text-[14px] transition-all min-h-[48px] flex items-center gap-2 ${
                      selectedGoal === goal
                        ? 'bg-[#E8F5EE] border-2 border-[#1B7A4B] text-[#0E4B2E]'
                        : 'bg-[#F7F8FA] border border-[#E5E7EB] text-[#374151]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedGoal === goal ? 'border-[#1B7A4B] bg-[#1B7A4B]' : 'border-[#D1D5DB]'
                    }`}>
                      {selectedGoal === goal && <Check size={12} className="text-white" />}
                    </div>
                    {goal}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 h-[48px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[14px]"
                >
                  건너뛰기
                </button>
                <button
                  onClick={handleSaveGoal}
                  disabled={!selectedGoal}
                  className={`flex-1 h-[48px] rounded-[14px] text-[14px] ${
                    selectedGoal
                      ? 'bg-[#1B7A4B] text-white'
                      : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                >
                  목표 저장
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Camp CTA (soft) ── */}
        <div className="mb-4">
          <CampCTABanner />
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/report')}
          className="w-full h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[14px]"
        >
          리포트로 돌아가기
        </button>
      </div>
    </div>
  );
}
