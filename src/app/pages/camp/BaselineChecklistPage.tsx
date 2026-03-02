/**
 * P-Camp-Pre-01_BaselineChecklist
 * 캠프 시작 전(또는 Day1 오전) 기준선 체크
 * - 워치 동기화 / 마음 체크 / 두뇌 놀이(선택) / 스트레스 측정(현장)
 * - "이건 진단이 아니라 기준선 확인이에요" 문구
 * - 진행률 바 + [지금 시작]
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Watch, Heart, Brain, Activity,
  ChevronRight, Check, Lock, AlertCircle, Info,
} from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

interface CheckItem {
  id: string;
  icon: any;
  label: string;
  description: string;
  required: boolean;
  status: 'pending' | 'in-progress' | 'done' | 'skipped';
  route?: string;
  note?: string;
}

export function BaselineChecklistPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [items, setItems] = useState<CheckItem[]>([
    {
      id: 'watch',
      icon: Watch,
      label: '워치 동기화',
      description: '수면·활동 데이터를 가져와요',
      required: true,
      status: 'done',
      note: '워치 없이도 마음 체크, 두뇌 놀이는 가능해요',
    },
    {
      id: 'mind',
      icon: Heart,
      label: '마음 체크',
      description: '오늘 감정 상태를 기록해요',
      required: true,
      status: 'pending',
      route: '/check/mind',
    },
    {
      id: 'brain',
      icon: Brain,
      label: '두뇌 놀이',
      description: '간단한 인지 게임으로 확인해요',
      required: false,
      status: 'pending',
      route: '/check/brain',
    },
    {
      id: 'stress',
      icon: Activity,
      label: '스트레스 측정',
      description: '현장 기기로 측정해요 (코디네이터 안내)',
      required: true,
      status: 'pending',
      note: '코디네이터에게 QR을 보여주세요',
    },
  ]);

  const doneCount = items.filter(i => i.status === 'done').length;
  const requiredCount = items.filter(i => i.required).length;
  const requiredDone = items.filter(i => i.required && i.status === 'done').length;
  const progress = Math.round((doneCount / items.length) * 100);
  const canProceed = requiredDone >= requiredCount;

  const handleStart = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (item.route) {
      navigate(item.route);
    } else {
      // Simulate completion for non-route items
      setItems(prev =>
        prev.map(i => i.id === id ? { ...i, status: 'done' as const } : i)
      );
      showToast('success', `${item.label} 완료`);
    }
  };

  const handleSkip = (id: string) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, status: 'skipped' as const } : i)
    );
  };

  // Simulate completing items for demo
  const simulateComplete = (id: string) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, status: 'done' as const } : i)
    );
    showToast('success', '완료 처리됨 (데모)');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <div>
          <h2 className="text-[18px] text-[#111827]">기준선 체크</h2>
          <span className="text-[11px] text-[#9CA3AF]">Day 1 · 캠프 시작 전</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-3 bg-[#E8F5EE] border-b border-[#1B7A4B]/10">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-[#1B7A4B] mt-0.5 shrink-0" />
          <p className="text-[13px] text-[#0E4B2E]">
            이건 진단이 아니라 <strong>기준선 확인</strong>이에요. 캠프 전후 변화를 비교하기 위한 시작점을 기록합니다.
          </p>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Progress */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#111827]">진행률</span>
            <span className="text-[14px] text-[#1B7A4B]">{doneCount}/{items.length} 완료</span>
          </div>
          <div className="h-3 bg-[#EEF1F4] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#1B7A4B] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-[#9CA3AF]">
            {canProceed
              ? '필수 항목을 모두 완료했어요! 캠프를 시작할 수 있어요.'
              : `필수 항목 ${requiredDone}/${requiredCount}개 완료. 필수 항목을 모두 마쳐야 캠프를 시작할 수 있어요.`
            }
          </p>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isDone = item.status === 'done';
            const isSkipped = item.status === 'skipped';
            const isLocked = index > 0 && items[index - 1].status === 'pending' && items[index - 1].required;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all ${
                  isDone ? 'border border-[#22C55E]/30' : ''
                } ${isSkipped ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* Status icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-[#22C55E]' : isSkipped ? 'bg-[#E5E7EB]' : 'bg-[#E8F5EE]'
                  }`}>
                    {isDone ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      <Icon size={20} className={isSkipped ? 'text-[#9CA3AF]' : 'text-[#1B7A4B]'} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[15px] ${isDone || isSkipped ? 'text-[#6B7280]' : 'text-[#111827]'}`}>
                        {item.label}
                      </span>
                      {item.required ? (
                        <span className="text-[10px] text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded">필수</span>
                      ) : (
                        <span className="text-[10px] text-[#6B7280] bg-[#F7F8FA] px-1.5 py-0.5 rounded">선택</span>
                      )}
                      {isDone && (
                        <span className="text-[10px] text-[#22C55E]">완료</span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] mb-1">{item.description}</p>
                    {item.note && !isDone && (
                      <p className="text-[11px] text-[#9CA3AF]">{item.note}</p>
                    )}

                    {/* Action buttons */}
                    {!isDone && !isSkipped && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => simulateComplete(item.id)}
                          className={`h-[36px] px-4 rounded-[10px] text-[13px] flex items-center gap-1 ${
                            isLocked
                              ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                              : 'bg-[#1B7A4B] text-white'
                          }`}
                          disabled={isLocked}
                        >
                          {isLocked ? (
                            <><Lock size={12} /> 이전 단계 필요</>
                          ) : (
                            <>시작하기 <ChevronRight size={13} /></>
                          )}
                        </button>
                        {!item.required && (
                          <button
                            onClick={() => handleSkip(item.id)}
                            className="h-[36px] px-3 text-[#6B7280] text-[12px]"
                          >
                            건너뛰기
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proceed button */}
        <button
          onClick={() => {
            if (canProceed) {
              showToast('success', '기준선 체크가 완료되었어요! 캠프를 시작합니다.');
              navigate('/camp');
            }
          }}
          disabled={!canProceed}
          className={`w-full h-[52px] rounded-[14px] text-[16px] flex items-center justify-center gap-2 transition-all ${
            canProceed
              ? 'bg-[#1B7A4B] text-white shadow-[0_4px_16px_rgba(27,122,75,0.3)]'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          {canProceed ? (
            <>캠프 시작하기 <ChevronRight size={18} /></>
          ) : (
            <>필수 항목을 먼저 완료해 주세요</>
          )}
        </button>
      </div>
    </div>
  );
}
