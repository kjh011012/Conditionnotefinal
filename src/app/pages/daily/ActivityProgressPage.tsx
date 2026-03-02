/**
 * P-Action-02_InProgress (진행 중)
 * - 타이머(선택), "일시정지/종료"
 * - 인터넷 약하면 오프라인 저장 배너
 * - 종료 시 자동으로 완료 흐름으로 이동
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Pause, Play, Square, WifiOff, Footprints, Wind, Dumbbell,
  ChevronRight, AlertCircle,
} from 'lucide-react';

const activityData: Record<string, { title: string; durationSec: number; icon: any }> = {
  'auto-1': { title: '가벼운 산책 20분', durationSec: 20 * 60, icon: Footprints },
  'add-1': { title: '호흡 명상 10분', durationSec: 10 * 60, icon: Wind },
  'add-2': { title: '아침 스트레칭 8분', durationSec: 8 * 60, icon: Dumbbell },
  'add-3': { title: '의자 체조 10분', durationSec: 10 * 60, icon: Dumbbell },
};

export function ActivityProgressPage() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const activity = activityData[activityId || 'auto-1'] || activityData['auto-1'];
  const Icon = activity.icon;

  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Simulated timer
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // Auto-complete when time is up
  useEffect(() => {
    if (elapsed >= activity.durationSec) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      navigate(`/daily/complete/${activityId || 'auto-1'}`, { replace: true });
    }
  }, [elapsed, activity.durationSec, activityId, navigate]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const remaining = Math.max(0, activity.durationSec - elapsed);
  const progress = Math.min((elapsed / activity.durationSec) * 100, 100);

  const handleEnd = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    navigate(`/daily/complete/${activityId || 'auto-1'}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* Offline banner */}
      {isOffline && (
        <div className="bg-[#374151] px-4 py-3 flex items-center gap-3">
          <WifiOff size={16} className="text-white/70 shrink-0" />
          <div className="flex-1">
            <p className="text-[13px] text-white">오프라인이에요</p>
            <p className="text-[11px] text-white/60">기록은 저장 중이에요. 연결되면 자동 전송해요.</p>
          </div>
        </div>
      )}

      {/* Header minimal */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center">
            <Icon size={16} className="text-[#1B7A4B]" />
          </div>
          <span className="text-[14px] text-[#6B7280]">{activity.title}</span>
        </div>
      </div>

      {/* Timer area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Circular progress */}
        <div className="relative w-[220px] h-[220px] mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
            <circle
              cx="110" cy="110" r="100"
              fill="none"
              stroke="#EEF1F4"
              strokeWidth="8"
            />
            <circle
              cx="110" cy="110" r="100"
              fill="none"
              stroke="#1B7A4B"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[42px] text-[#111827]" style={{ lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {formatTime(remaining)}
            </span>
            <span className="text-[13px] text-[#9CA3AF] mt-2">남은 시간</span>
          </div>
        </div>

        {/* Status text */}
        <div className="text-center mb-8">
          {isPaused ? (
            <p className="text-[16px] text-[#F59E0B]">일시정지 중이에요</p>
          ) : (
            <p className="text-[16px] text-[#1B7A4B]">진행 중이에요, 잘 하고 계세요!</p>
          )}
          <p className="text-[13px] text-[#9CA3AF] mt-1">
            {formatTime(elapsed)} 경과
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Pause / Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`w-[64px] h-[64px] rounded-full flex items-center justify-center shadow-lg ${
              isPaused
                ? 'bg-[#1B7A4B] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#374151]'
            }`}
            aria-label={isPaused ? '다시 시작' : '일시정지'}
          >
            {isPaused ? <Play size={28} /> : <Pause size={28} />}
          </button>

          {/* End */}
          <button
            onClick={() => setShowEndConfirm(true)}
            className="w-[64px] h-[64px] rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]"
            aria-label="종료"
          >
            <Square size={24} />
          </button>
        </div>

        {/* Offline toggle for demo */}
        <button
          onClick={() => setIsOffline(!isOffline)}
          className="mt-6 text-[11px] text-[#D1D5DB]"
        >
          (데모: 오프라인 토글)
        </button>
      </div>

      {/* Early finish info */}
      <div className="px-4 pb-6">
        <p className="text-[12px] text-[#9CA3AF] text-center">
          중간에 멈춰도 기록은 저장돼요. 무리하지 마세요.
        </p>
      </div>

      {/* End confirmation modal */}
      {showEndConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-6"
          onClick={() => setShowEndConfirm(false)}
        >
          <div
            className="w-full max-w-[340px] bg-white rounded-[20px] p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={20} className="text-[#F59E0B]" />
              <span className="text-[18px] text-[#111827]">지금 끝낼까요?</span>
            </div>
            <p className="text-[14px] text-[#6B7280] mb-1">
              {formatTime(elapsed)} 진행했어요.
            </p>
            <p className="text-[13px] text-[#9CA3AF] mb-5">
              지금까지 한 만큼 기록이 저장돼요. 완료 체크도 할 수 있어요.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 h-[48px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[15px]"
              >
                계속하기
              </button>
              <button
                onClick={handleEnd}
                className="flex-1 h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[15px]"
              >
                완료하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
