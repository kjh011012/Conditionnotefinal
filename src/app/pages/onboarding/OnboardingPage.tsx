import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, User, Shield, ClipboardList, ChevronRight, Moon, Wind, Dumbbell, Heart, Utensils, Watch, Bell, Footprints, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

type Step = 'splash' | 'onboarding' | 'role' | 'goal' | 'preference' | 'consent';

const onboardingSlides = [
  {
    image: 'https://images.unsplash.com/photo-1762539683985-de22c1e2358f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBwYXRoJTIwbW9ybmluZyUyMHdhbGslMjBuYXR1cmV8ZW58MXx8fHwxNzcyMjU0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '내 상태를 숫자로 확인해요',
  },
  {
    image: 'https://images.unsplash.com/photo-1600738980154-ed57c58234b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmUlMjBzdW5saWdodHxlbnwxfHx8fDE3NzIyNTQ3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '2~7일 동안 회복 과정을 기록해요',
  },
  {
    image: 'https://images.unsplash.com/photo-1759485186252-335429d617f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBvdXRkb29yJTIwd2FybXxlbnwxfHx8fDE3NzIyNTQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '필요하면 가까운 기관으로 연결해요',
  },
];

const roles = [
  { key: 'participant', icon: User, label: '참가자', desc: '기록, 추천, 리포트, 캠프 예약' },
  { key: 'guardian', icon: Shield, label: '보호자', desc: '오늘 요약 + 리포트만 확인 (읽기 전용)' },
  { key: 'coordinator', icon: ClipboardList, label: '코디네이터', desc: '기기 입력, 출석, 놀이체크 진행' },
];

const goals = [
  { key: 'daily', icon: Watch, label: '일상 리듬 관리 시작', desc: '워치로 수면/활동을 기록하고 추천을 받아요' },
  { key: 'camp_active', icon: Calendar, label: '캠프 참여 중', desc: '진행 중인 캠프 일정을 불러와요' },
  { key: 'camp_explore', icon: Footprints, label: '캠프 찾고 예약하기', desc: '나에게 맞는 캠프를 찾아보세요' },
];

const goalTopics = [
  { key: 'sleep', icon: Moon, label: '수면 리듬' },
  { key: 'stress', icon: Wind, label: '스트레스 완화' },
  { key: 'exercise', icon: Dumbbell, label: '가벼운 운동' },
  { key: 'mind', icon: Heart, label: '마음 안정' },
  { key: 'food', icon: Utensils, label: '식단' },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('splash');
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState('participant');
  const [selectedGoal, setSelectedGoal] = useState('daily');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['sleep', 'stress']);
  const [intensity, setIntensity] = useState<'light' | 'moderate'>('light');
  const [notifications, setNotifications] = useState({ bedtime: true, walk: false, evening: true, weekly: true });
  const [consents, setConsents] = useState({ required: false, share: false, stats: false, youtube: false });

  if (step === 'splash') {
    setTimeout(() => setStep('onboarding'), 2000);
  }

  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-[#E8F5EE] rounded-[20px] flex items-center justify-center mb-4">
          <Leaf size={40} className="text-[#1B7A4B]" />
        </div>
        <h1 className="text-[24px] text-[#111827] mb-1">컨디션노트</h1>
        <p className="text-[13px] text-[#6B7280]">Condition Note</p>
        <div className="flex gap-1 mt-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#1B7A4B] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (step === 'onboarding') {
    const slide = onboardingSlides[slideIndex];
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 relative">
          <ImageWithFallback src={slide.image} alt={slide.title} className="w-full h-[360px] object-cover" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white" />
        </div>
        <div className="px-6 pb-8">
          <h2 className="text-[22px] text-[#111827] mb-2">{slide.title}</h2>
          <p className="text-[14px] text-[#6B7280] mb-6">진단이 아닌 생활 상태 점검입니다.</p>
          <div className="flex gap-2 mb-6">
            {onboardingSlides.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === slideIndex ? 'w-6 bg-[#1B7A4B]' : 'w-2 bg-[#E5E7EB]'}`} />
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep('role')} className="flex-1 h-[48px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[14px]">건너뛰기</button>
            <button
              onClick={() => { if (slideIndex < onboardingSlides.length - 1) setSlideIndex(slideIndex + 1); else setStep('role'); }}
              className="flex-1 h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-1"
            >
              다음 <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-white flex flex-col px-4 pt-12 pb-8">
        <h1 className="text-[22px] text-[#111827] mb-2">어떤 역할로 사용하시나요?</h1>
        <p className="text-[14px] text-[#6B7280] mb-6">나중에 더보기에서 변경할 수 있어요.</p>
        <div className="flex flex-col gap-3 flex-1">
          {roles.map(role => (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key)}
              className={`p-5 rounded-[16px] flex items-center gap-4 text-left border-2 transition-all ${selectedRole === role.key ? 'border-[#1B7A4B] bg-[#E8F5EE]' : 'border-[#E5E7EB] bg-white'}`}
            >
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${selectedRole === role.key ? 'bg-[#1B7A4B] text-white' : 'bg-[#F7F8FA] text-[#6B7280]'}`}>
                <role.icon size={24} />
              </div>
              <div>
                <span className="text-[16px] text-[#111827] block">{role.label}</span>
                <span className="text-[13px] text-[#6B7280]">{role.desc}</span>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setStep('goal')} className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mt-4">다음</button>
      </div>
    );
  }

  if (step === 'goal') {
    return (
      <div className="min-h-screen bg-white flex flex-col px-4 pt-12 pb-8">
        <h1 className="text-[22px] text-[#111827] mb-2">어떻게 시작할까요?</h1>
        <p className="text-[14px] text-[#6B7280] mb-6">목적에 따라 홈 화면이 달라져요.</p>
        <div className="flex flex-col gap-3 flex-1">
          {goals.map(goal => (
            <button
              key={goal.key}
              onClick={() => setSelectedGoal(goal.key)}
              className={`p-5 rounded-[16px] flex items-center gap-4 text-left border-2 transition-all ${selectedGoal === goal.key ? 'border-[#1B7A4B] bg-[#E8F5EE]' : 'border-[#E5E7EB] bg-white'}`}
            >
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${selectedGoal === goal.key ? 'bg-[#1B7A4B] text-white' : 'bg-[#F7F8FA] text-[#6B7280]'}`}>
                <goal.icon size={24} />
              </div>
              <div>
                <span className="text-[16px] text-[#111827] block">{goal.label}</span>
                <span className="text-[13px] text-[#6B7280]">{goal.desc}</span>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setStep('preference')} className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mt-4">다음</button>
      </div>
    );
  }

  if (step === 'preference') {
    const toggleTopic = (key: string) => {
      setSelectedTopics(prev => prev.includes(key) ? prev.filter(t => t !== key) : [...prev, key]);
    };

    return (
      <div className="min-h-screen bg-white flex flex-col px-4 pt-12 pb-8">
        <h1 className="text-[22px] text-[#111827] mb-2">추천을 맞춤 설정해요</h1>
        <p className="text-[14px] text-[#6B7280] mb-6">관심 있는 영역을 골라주세요.</p>

        {/* Topics */}
        <div className="mb-6">
          <span className="text-[14px] text-[#374151] block mb-3">관심 분야 (복수 선택)</span>
          <div className="flex flex-wrap gap-2">
            {goalTopics.map(topic => (
              <button
                key={topic.key}
                onClick={() => toggleTopic(topic.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all ${
                  selectedTopics.includes(topic.key)
                    ? 'border-[#1B7A4B] bg-[#E8F5EE] text-[#1B7A4B]'
                    : 'border-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                <topic.icon size={16} />
                <span className="text-[14px]">{topic.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div className="mb-6">
          <span className="text-[14px] text-[#374151] block mb-3">선호 강도</span>
          <div className="flex gap-3">
            {[
              { key: 'light' as const, label: '가벼움', desc: '5~10분 위주' },
              { key: 'moderate' as const, label: '보통', desc: '15~30분 위주' },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => setIntensity(opt.key)}
                className={`flex-1 p-4 rounded-[14px] border-2 text-left transition-all ${
                  intensity === opt.key ? 'border-[#1B7A4B] bg-[#E8F5EE]' : 'border-[#E5E7EB]'
                }`}
              >
                <span className={`text-[15px] block ${intensity === opt.key ? 'text-[#1B7A4B]' : 'text-[#374151]'}`}>{opt.label}</span>
                <span className="text-[12px] text-[#6B7280]">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <span className="text-[14px] text-[#374151] block mb-3">알림 설정 (선택)</span>
          {[
            { key: 'bedtime', label: '취침 루틴 알림', icon: Moon },
            { key: 'walk', label: '아침 산책 리마인드', icon: Footprints },
            { key: 'evening', label: '저녁 마음 체크', icon: Heart },
            { key: 'weekly', label: '주간 리포트 알림', icon: Bell },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#EEF1F4] last:border-0">
              <div className="flex items-center gap-2">
                <item.icon size={16} className="text-[#6B7280]" />
                <span className="text-[14px] text-[#374151]">{item.label}</span>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                className={`w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'} relative`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white shadow absolute top-[3px] transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
              </button>
            </div>
          ))}
        </div>

        <button onClick={() => setStep('consent')} className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]">다음</button>
      </div>
    );
  }

  // Consent step
  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-12 pb-8">
      <h1 className="text-[22px] text-[#111827] mb-2">동의 사항</h1>
      <p className="text-[14px] text-[#6B7280] mb-6">필요한 동의를 확인해주세요.</p>
      <div className="flex flex-col gap-3 flex-1">
        {[
          { key: 'required', label: '서비스 운영 필수', tag: '필수', desc: '앱 이용을 위해 반드시 필요합니다.' },
          { key: 'share', label: '리포트 공유 (보호자 등)', tag: '선택', desc: '보호자에게 요약 리포트를 공유합니다.' },
          { key: 'stats', label: '익명 통계 제공', tag: '선택', desc: '정부/지자체 협력용 익명 통계입니다.' },
          { key: 'youtube', label: '유튜브 추천', tag: '선택', desc: '외부 콘텐츠 추천을 활성화합니다.' },
        ].map(item => (
          <div key={item.key} className="bg-[#F7F8FA] rounded-[16px] p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[15px] text-[#111827]">{item.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${item.tag === '필수' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#EEF1F4] text-[#6B7280]'}`}>{item.tag}</span>
              </div>
              <span className="text-[12px] text-[#6B7280]">{item.desc}</span>
            </div>
            <button
              onClick={() => setConsents(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
              className={`w-12 h-7 rounded-full transition-colors ${consents[item.key as keyof typeof consents] ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'} relative`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${consents[item.key as keyof typeof consents] ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/')}
        disabled={!consents.required}
        className={`w-full h-[52px] rounded-[14px] text-[16px] mt-4 ${consents.required ? 'bg-[#1B7A4B] text-white' : 'bg-[#E5E7EB] text-[#9CA3AF]'}`}
      >
        동의하고 시작
      </button>
    </div>
  );
}
