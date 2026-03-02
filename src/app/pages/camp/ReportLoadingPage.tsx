/**
 * P-Report-Generate-01_Loading
 * "리포트 생성 중" (스켈레톤)
 * - 안내: "인터넷이 약해도 저장되며, 연결되면 완료돼요."
 * - 완료되면 자동으로 FinalSummary로
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Wifi, Check, Loader2 } from 'lucide-react';

const steps = [
  '수면·활동 데이터 정리 중…',
  '마음 체크 변화 분석 중…',
  '두뇌 놀이 결과 비교 중…',
  '스트레스 전후 비교 중…',
  '리포트 작성 중…',
];

export function ReportLoadingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        navigate('/camp/report-export', { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isDone, navigate]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center px-6">
      {/* Main content */}
      <div className="w-full max-w-[340px] text-center">
        {/* Animated icon */}
        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-500 ${
          isDone ? 'bg-[#22C55E]' : 'bg-[#E8F5EE]'
        }`}>
          {isDone ? (
            <Check size={40} className="text-white" />
          ) : (
            <div className="relative">
              <FileText size={36} className="text-[#1B7A4B]" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1B7A4B] flex items-center justify-center">
                <Loader2 size={12} className="text-white animate-spin" />
              </div>
            </div>
          )}
        </div>

        <h2 className="text-[22px] text-[#111827] mb-2">
          {isDone ? '리포트 완성!' : '리포트 생성 중이에요'}
        </h2>
        <p className="text-[14px] text-[#6B7280] mb-6">
          {isDone
            ? '캠프 기간의 변화를 정리했어요. 곧 이동합니다.'
            : '캠프 기간 동안의 데이터를 정리하고 있어요.\n잠시만 기다려 주세요.'
          }
        </p>

        {/* Progress steps */}
        {!isDone && (
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-6 text-left">
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 min-h-[28px]">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    i < currentStep ? 'bg-[#22C55E]'
                    : i === currentStep ? 'bg-[#1B7A4B]'
                    : 'bg-[#EEF1F4]'
                  }`}>
                    {i < currentStep ? (
                      <Check size={10} className="text-white" />
                    ) : i === currentStep ? (
                      <Loader2 size={10} className="text-white animate-spin" />
                    ) : null}
                  </div>
                  <span className={`text-[13px] ${
                    i <= currentStep ? 'text-[#374151]' : 'text-[#D1D5DB]'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skeleton preview */}
        {!isDone && (
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-6 animate-pulse">
            <div className="h-4 w-24 bg-[#EEF1F4] rounded mb-3" />
            <div className="flex gap-3 mb-3">
              <div className="flex-1 h-16 bg-[#EEF1F4] rounded-[10px]" />
              <div className="flex-1 h-16 bg-[#EEF1F4] rounded-[10px]" />
            </div>
            <div className="h-3 bg-[#EEF1F4] rounded mb-2" />
            <div className="h-3 bg-[#EEF1F4] rounded w-2/3 mb-3" />
            <div className="h-8 bg-[#EEF1F4] rounded-[10px] w-1/2" />
          </div>
        )}

        {/* Offline notice */}
        <div className="flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF]">
          <Wifi size={12} />
          <span>인터넷이 약해도 저장되며, 연결되면 완료돼요.</span>
        </div>
      </div>
    </div>
  );
}
