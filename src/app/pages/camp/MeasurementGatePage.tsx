/**
 * P-Camp-Day-03_MeasurementGate
 * Day3~Day4(마지막날) 재측정 게이트
 * - "최종 리포트를 만들기 위해 필요한 3가지"
 * - 재측정 완료 시 "리포트 생성 중" 상태로 이동
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Heart, Brain, Activity, Check,
  ChevronRight, Sparkles, Info, FileText,
} from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

interface GateItem {
  id: string;
  icon: any;
  label: string;
  description: string;
  done: boolean;
  baselineValue?: string;
}

export function MeasurementGatePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [items, setItems] = useState<GateItem[]>([
    {
      id: 'mind',
      icon: Heart,
      label: '마음 체크 (재측정)',
      description: '지금 감정 상태를 기록해요',
      done: false,
      baselineValue: 'Day1: 5/10',
    },
    {
      id: 'brain',
      icon: Brain,
      label: '두뇌 놀이 (재측정)',
      description: '간단한 인지 게임으로 확인해요',
      done: false,
      baselineValue: 'Day1: 55점',
    },
    {
      id: 'stress',
      icon: Activity,
      label: '스트레스 측정 (재측정)',
      description: '현장 기기로 재측정해요',
      done: false,
      baselineValue: 'Day1: 72점',
    },
  ]);

  const allDone = items.every(i => i.done);
  const doneCount = items.filter(i => i.done).length;

  const toggleDone = (id: string) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, done: true } : i
    ));
    const item = items.find(i => i.id === id);
    showToast('success', `${item?.label} 완료`);
  };

  const handleGenerateReport = () => {
    navigate('/camp/report-loading', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <div>
          <h2 className="text-[18px] text-[#111827]">마지막 날 재측정</h2>
          <span className="text-[11px] text-[#9CA3AF]">Day 4 · 최종 측정</span>
        </div>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Hero */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={18} className="text-[#FF8A3D]" />
            <span className="text-[16px] text-[#111827]">최종 리포트를 만들기 위해</span>
          </div>
          <h3 className="text-[20px] text-[#111827] mb-2">3가지 재측정이 필요해요</h3>
          <p className="text-[13px] text-[#6B7280]">
            Day1 기준선과 비교해서 캠프 기간 동안의 변화를 보여드릴게요.
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-[#6B7280]">재측정 진행</span>
              <span className="text-[13px] text-[#1B7A4B]">{doneCount}/3 완료</span>
            </div>
            <div className="h-2.5 bg-[#EEF1F4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1B7A4B] rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 bg-[#FFF1E8] rounded-[12px] px-3 py-2.5 mb-5">
          <Info size={14} className="text-[#EA580C] mt-0.5 shrink-0" />
          <p className="text-[12px] text-[#EA580C]">
            이 측정은 의료 진단이 아니라, 캠프 기간 전후의 생활 지표 변화를 확인하기 위한 것입니다.
          </p>
        </div>

        {/* Gate items */}
        <div className="flex flex-col gap-3 mb-6">
          {items.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all ${
                  item.done ? 'border border-[#22C55E]/30' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    item.done ? 'bg-[#22C55E]' : 'bg-[#E8F5EE]'
                  }`}>
                    {item.done ? (
                      <Check size={22} className="text-white" />
                    ) : (
                      <Icon size={22} className="text-[#1B7A4B]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <span className={`text-[15px] block mb-0.5 ${item.done ? 'text-[#6B7280]' : 'text-[#111827]'}`}>
                      {item.label}
                    </span>
                    <p className="text-[12px] text-[#6B7280] mb-1">{item.description}</p>

                    {/* Baseline comparison */}
                    {item.baselineValue && (
                      <div className="flex items-center gap-1.5 bg-[#F7F8FA] rounded-[8px] px-2 py-1 inline-flex mb-2">
                        <Sparkles size={10} className="text-[#FF8A3D]" />
                        <span className="text-[11px] text-[#6B7280]">기준선 {item.baselineValue}</span>
                      </div>
                    )}

                    {!item.done && (
                      <button
                        onClick={() => toggleDone(item.id)}
                        className="h-[40px] px-5 bg-[#1B7A4B] text-white rounded-[10px] text-[14px] flex items-center gap-1 mt-1"
                      >
                        지금 측정하기 <ChevronRight size={14} />
                      </button>
                    )}

                    {item.done && (
                      <div className="flex items-center gap-1 text-[12px] text-[#22C55E]">
                        <Check size={12} /> 재측정 완료
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Generate report CTA */}
        <button
          onClick={handleGenerateReport}
          disabled={!allDone}
          className={`w-full h-[52px] rounded-[14px] text-[16px] flex items-center justify-center gap-2 transition-all ${
            allDone
              ? 'bg-[#1B7A4B] text-white shadow-[0_4px_16px_rgba(27,122,75,0.3)]'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          {allDone ? (
            <>리포트 생성하기 <ChevronRight size={18} /></>
          ) : (
            <>모든 재측정을 완료해 주세요</>
          )}
        </button>

        {!allDone && (
          <p className="text-[11px] text-[#9CA3AF] text-center mt-2">
            코디네이터에게 도움을 요청할 수 있어요
          </p>
        )}
      </div>
    </div>
  );
}
