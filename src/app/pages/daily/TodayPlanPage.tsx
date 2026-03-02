/**
 * P-Home-Daily-02_TodayPlan
 * "오늘의 계획" 전체 화면
 * - 기본 1개 추천, 사용자가 2개까지 추가 가능 (최대 3개)
 * - 각 항목에 "왜 추천?" 1줄
 * - 하단 CTA: [오늘 계획 시작하기]
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Plus, X, Sparkles, Clock, Zap, ChevronRight, Check,
  Footprints, Wind, Dumbbell,
} from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

interface PlanItem {
  id: string;
  title: string;
  reason: string;
  duration: string;
  intensity: string;
  category: string;
  icon: any;
  done: boolean;
}

const defaultPlan: PlanItem = {
  id: 'auto-1',
  title: '가벼운 산책 20분',
  reason: '수면이 짧았을 때 가벼운 걷기가 리듬 회복에 도움이 될 수 있어요',
  duration: '20분',
  intensity: '가벼움',
  category: '산책',
  icon: Footprints,
  done: false,
};

const addablePlans: PlanItem[] = [
  {
    id: 'add-1',
    title: '호흡 명상 10분',
    reason: '스트레스가 높을 때 호흡 명상이 마음을 안정시킬 수 있어요',
    duration: '10분',
    intensity: '가벼움',
    category: '명상',
    icon: Wind,
    done: false,
  },
  {
    id: 'add-2',
    title: '아침 스트레칭 8분',
    reason: '몸이 뻣뻣하면 가벼운 스트레칭이 혈액 순환에 도움이 될 수 있어요',
    duration: '8분',
    intensity: '가벼움',
    category: '운동',
    icon: Dumbbell,
    done: false,
  },
  {
    id: 'add-3',
    title: '의자 체조 10분',
    reason: '앉아서 할 수 있는 간단한 체조예요',
    duration: '10분',
    intensity: '가벼움',
    category: '체조',
    icon: Dumbbell,
    done: false,
  },
];

export function TodayPlanPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [plans, setPlans] = useState<PlanItem[]>([defaultPlan]);
  const [showAddSheet, setShowAddSheet] = useState(false);

  const canAdd = plans.length < 3;

  const addPlan = (plan: PlanItem) => {
    if (plans.length >= 3) return;
    setPlans(prev => [...prev, plan]);
    setShowAddSheet(false);
    showToast('success', '오늘 계획에 추가했어요');
  };

  const removePlan = (id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const availablePlans = addablePlans.filter(
    ap => !plans.some(p => p.id === ap.id)
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">오늘의 계획</h2>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-white">
        <p className="text-[12px] text-[#9CA3AF]">
          오늘 상태를 기반으로 한 가지를 추천해 드렸어요. 최대 3개까지 추가할 수 있어요.
        </p>
      </div>

      <div className="px-4 pt-4 pb-6">
        {/* Plan items */}
        <div className="flex flex-col gap-3 mb-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] ${
                  index === 0 ? 'border border-[#1B7A4B]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#E8F5EE] flex items-center justify-center">
                      <Icon size={18} className="text-[#1B7A4B]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] text-[#111827]">{plan.title}</span>
                        {index === 0 && (
                          <span className="bg-[#1B7A4B] text-white px-2 py-0.5 rounded-full text-[10px]">
                            추천
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5 text-[11px] text-[#9CA3AF]">
                          <Clock size={10} /> {plan.duration}
                        </span>
                        <span className="flex items-center gap-0.5 text-[11px] text-[#9CA3AF]">
                          <Zap size={10} /> {plan.intensity}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => removePlan(plan.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F8FA]"
                    >
                      <X size={14} className="text-[#9CA3AF]" />
                    </button>
                  )}
                </div>

                {/* Why recommended */}
                <div className="bg-[#F7F8FA] rounded-[10px] px-3 py-2 mt-2">
                  <p className="text-[12px] text-[#6B7280]">
                    <span className="text-[#FF8A3D]">왜 추천?</span> {plan.reason}
                  </p>
                </div>

                {/* Detail CTA */}
                <button
                  onClick={() => navigate(`/daily/activity/${plan.id}`)}
                  className="flex items-center gap-1 mt-3 text-[13px] text-[#1B7A4B]"
                >
                  자세히 보기 <ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add more button */}
        {canAdd && (
          <button
            onClick={() => setShowAddSheet(true)}
            className="w-full h-[48px] border-2 border-dashed border-[#E5E7EB] rounded-[16px] text-[#6B7280] text-[14px] flex items-center justify-center gap-1.5 mb-6"
          >
            <Plus size={16} /> 계획 추가하기 ({plans.length}/3)
          </button>
        )}

        {/* Total info */}
        <div className="bg-[#E8F5EE] rounded-[14px] p-4 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-[#1B7A4B]" />
            <span className="text-[14px] text-[#0E4B2E]">
              오늘 예상 소요: 약 {plans.reduce((acc, p) => acc + parseInt(p.duration), 0)}분
            </span>
          </div>
          <p className="text-[12px] text-[#6B7280]">
            완료하면 자동으로 기록되고, 홈 리듬 카드에 반영돼요.
          </p>
        </div>

        {/* Start CTA */}
        <button
          onClick={() => navigate(`/daily/activity/${plans[0].id}`)}
          className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(27,122,75,0.3)]"
        >
          오늘 계획 시작하기 <ChevronRight size={18} />
        </button>
      </div>

      {/* Add Sheet */}
      {showAddSheet && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center"
          onClick={() => setShowAddSheet(false)}
        >
          <div
            className="w-full max-w-[430px] bg-white rounded-t-[20px] px-5 pt-3 pb-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-[18px] text-[#111827]">추가할 활동 선택</span>
              <button onClick={() => setShowAddSheet(false)}>
                <X size={20} className="text-[#9CA3AF]" />
              </button>
            </div>

            {availablePlans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[14px] text-[#6B7280]">추가할 수 있는 활동이 없어요</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {availablePlans.map(plan => {
                  const Icon = plan.icon;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => addPlan(plan)}
                      className="flex items-center gap-3 p-4 bg-[#F7F8FA] rounded-[14px] text-left min-h-[56px]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#1B7A4B]" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[14px] text-[#111827] block">{plan.title}</span>
                        <span className="text-[12px] text-[#6B7280]">{plan.duration} · {plan.intensity}</span>
                      </div>
                      <Plus size={18} className="text-[#1B7A4B] shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
