/**
 * P-Action-03_Complete (완료)
 * - 축하/안정 톤 (과한 게임화 금지)
 * - "어땠나요?" 1문항(이모지 5점)
 * - "오늘 몸 느낌" (좋음/보통/피곤) 3택1 (선택)
 * - [저장] → 홈 리듬 카드에 반영("오늘 계획 1개 완료")
 */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Check, Footprints, Wind, Dumbbell, ArrowLeft } from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

const activityData: Record<string, { title: string; icon: any }> = {
  'auto-1': { title: '가벼운 산책 20분', icon: Footprints },
  'add-1': { title: '호흡 명상 10분', icon: Wind },
  'add-2': { title: '아침 스트레칭 8분', icon: Dumbbell },
  'add-3': { title: '의자 체조 10분', icon: Dumbbell },
};

const moodEmojis = [
  { value: 1, emoji: '😣', label: '힘들었어요' },
  { value: 2, emoji: '😐', label: '그저 그래요' },
  { value: 3, emoji: '🙂', label: '보통이에요' },
  { value: 4, emoji: '😊', label: '좋았어요' },
  { value: 5, emoji: '😄', label: '아주 좋았어요' },
];

const bodyFeelings = [
  { key: 'good', label: '좋음', emoji: '💪' },
  { key: 'normal', label: '보통', emoji: '🤚' },
  { key: 'tired', label: '피곤', emoji: '😴' },
];

export function ActivityCompletePage() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const { showToast } = useToast();
  const activity = activityData[activityId || 'auto-1'] || activityData['auto-1'];
  const Icon = activity.icon;

  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [bodyFeeling, setBodyFeeling] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    showToast('success', '저장했어요! 오늘 계획 1개 완료');
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">활동 완료</h2>
      </div>

      <div className="px-4 pt-6 pb-8">
        {/* Completion card */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1B7A4B] flex items-center justify-center">
              <Check size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-[20px] text-[#111827] mb-1">잘 하셨어요!</h3>
          <div className="flex items-center justify-center gap-2 text-[14px] text-[#6B7280]">
            <Icon size={16} className="text-[#1B7A4B]" />
            <span>{activity.title} 완료</span>
          </div>
          <p className="text-[13px] text-[#9CA3AF] mt-2">
            꾸준함이 가장 중요해요. 오늘 한 걸음이 내일의 리듬을 만들어 가요.
          </p>
        </div>

        {/* Mood rating - 이모지 5점 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <h3 className="text-[15px] text-[#111827] mb-1">어땠나요?</h3>
          <p className="text-[12px] text-[#9CA3AF] mb-4">하나만 골라주세요</p>

          <div className="flex justify-between">
            {moodEmojis.map(mood => (
              <button
                key={mood.value}
                onClick={() => setMoodRating(mood.value)}
                className={`flex flex-col items-center gap-1 py-2 px-2 rounded-[12px] transition-all min-w-[56px] ${
                  moodRating === mood.value
                    ? 'bg-[#E8F5EE] scale-110'
                    : 'hover:bg-[#F7F8FA]'
                }`}
              >
                <span className="text-[28px]">{mood.emoji}</span>
                <span className={`text-[11px] ${
                  moodRating === mood.value ? 'text-[#1B7A4B]' : 'text-[#9CA3AF]'
                }`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Body feeling - 3택1 (선택) */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] text-[#111827]">오늘 몸 느낌</h3>
            <span className="text-[11px] text-[#9CA3AF] bg-[#F7F8FA] px-2 py-0.5 rounded-full">선택</span>
          </div>
          <p className="text-[12px] text-[#9CA3AF] mb-4">활동 후 몸 상태를 골라주세요</p>

          <div className="flex gap-3">
            {bodyFeelings.map(feeling => (
              <button
                key={feeling.key}
                onClick={() => setBodyFeeling(
                  bodyFeeling === feeling.key ? null : feeling.key
                )}
                className={`flex-1 h-[56px] rounded-[14px] flex items-center justify-center gap-2 transition-all text-[14px] ${
                  bodyFeeling === feeling.key
                    ? 'bg-[#E8F5EE] border-2 border-[#1B7A4B] text-[#0E4B2E]'
                    : 'bg-[#F7F8FA] border border-[#E5E7EB] text-[#374151]'
                }`}
              >
                <span className="text-[18px]">{feeling.emoji}</span>
                {feeling.label}
              </button>
            ))}
          </div>
        </div>

        {/* Home reflection badge */}
        <div className="bg-[#E8F5EE] rounded-[14px] px-4 py-3 mb-6">
          <p className="text-[13px] text-[#0E4B2E]">
            저장하면 홈 화면의 리듬 카드에 "오늘 계획 1개 완료"가 표시돼요.
          </p>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saved}
          className={`w-full h-[52px] rounded-[14px] text-[16px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(27,122,75,0.3)] transition-all ${
            saved
              ? 'bg-[#D1D5DB] text-white cursor-not-allowed'
              : 'bg-[#1B7A4B] text-white'
          }`}
        >
          {saved ? (
            <>
              <Check size={18} /> 저장 완료
            </>
          ) : (
            '저장하기'
          )}
        </button>

        {/* Skip */}
        {!saved && (
          <button
            onClick={() => navigate('/', { replace: true })}
            className="w-full h-[40px] text-[#9CA3AF] text-[14px] mt-2"
          >
            건너뛰기
          </button>
        )}
      </div>
    </div>
  );
}
