/**
 * P-Check-Mind (마음 체크 / 정서 건강)
 * - 결과 낮을 때: '우울증' 단정 금지, "마음 에너지/정서 활력" 표현만
 * - 위기 UX: 과잉 경고 대신 '필요 시 도움 연결'
 *   - 버튼: 109 / 1577-0199
 *   - 2단계 확인 모달(SafetyConfirmDialog)
 * - 데이터 없을 때 안내
 * - 값 해석 비유
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Heart, Phone, Sparkles,
  TrendingDown, TrendingUp, Minus, Info,
  HelpCircle, ChevronRight, ExternalLink,
} from 'lucide-react';
import { StatusChip } from '../../components/ui/StatusChip';
import { SafetyConfirmDialog } from '../../components/ui/SafetyConfirmDialog';

type Step = 'empty' | 'slider' | 'result';

export function MindCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('slider');
  const [mood, setMood] = useState(6);
  const [anxiety, setAnxiety] = useState(3);
  const [motivation, setMotivation] = useState(7);

  // Safety confirm dialog
  const [safetyDialog, setSafetyDialog] = useState<{
    open: boolean;
    phone: string;
    title: string;
  }>({ open: false, phone: '', title: '' });

  const getEnergy = () => {
    const avg = (mood + (10 - anxiety) + motivation) / 3;
    if (avg >= 7) return { label: '좋음', score: Math.round(avg * 10), status: 'green' as const, metaphor: '마음 배터리가 넉넉해요. 오늘 하루도 여유 있게 보낼 수 있어요.' };
    if (avg >= 4) return { label: '보통', score: Math.round(avg * 10), status: 'yellow' as const, metaphor: '마음 배터리가 절반 정도예요. 가벼운 활동으로 충전해 보세요.' };
    return { label: '낮음', score: Math.round(avg * 10), status: 'orange' as const, metaphor: '마음 배터리가 낮아요. 쉬어가는 시간이 필요할 수 있어요.' };
  };

  const energy = getEnergy();
  // 위기 판단: 불안 8+ 또는 기분 2 이하
  const showCrisisHelp = anxiety >= 8 || mood <= 2;

  const getTrend = (value: number, baseline: number) => {
    const diff = value - baseline;
    if (diff > 1) return { icon: TrendingUp, color: '#22C55E', text: `+${diff}` };
    if (diff < -1) return { icon: TrendingDown, color: '#F59E0B', text: `${diff}` };
    return { icon: Minus, color: '#9CA3AF', text: '유지' };
  };

  const openSafetyDialog = (phone: string, title: string) => {
    setSafetyDialog({ open: true, phone, title });
  };

  const SliderInput = ({
    label,
    value,
    onChange,
    leftLabel,
    rightLabel,
    emoji,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    leftLabel: string;
    rightLabel: string;
    emoji: string;
  }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">{emoji}</span>
          <span className="text-[15px] text-[#111827]">{label}</span>
        </div>
        <span className="text-[20px] text-[#1B7A4B]">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#EEF1F4] rounded-full appearance-none cursor-pointer accent-[#1B7A4B]"
        style={{
          background: `linear-gradient(to right, #1B7A4B 0%, #1B7A4B ${value * 10}%, #EEF1F4 ${value * 10}%, #EEF1F4 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-[11px] text-[#9CA3AF]">{leftLabel}</span>
        <span className="text-[11px] text-[#9CA3AF]">{rightLabel}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate('/check')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">마음 체크</h2>
      </div>

      {/* ───── EMPTY STATE ───── */}
      {step === 'empty' && (
        <div className="px-4 pt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-4">
            <Heart size={32} className="text-[#1B7A4B]" />
          </div>
          <h3 className="text-[18px] text-[#111827] mb-2">아직 기록이 없어요</h3>
          <p className="text-[14px] text-[#6B7280] text-center mb-1">
            마음 에너지를 기록하면<br />변화를 비교해 볼 수 있어요.
          </p>
          <p className="text-[12px] text-[#9CA3AF] text-center mb-6">
            진단이 아니라, 오늘의 정서 활력을 확인하는 거예요.
          </p>
          <button
            onClick={() => setStep('slider')}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
          >
            마음 체크 시작하기
          </button>
        </div>
      )}

      {/* ───── SLIDER STEP ───── */}
      {step === 'slider' && (
        <div className="px-4 pt-5 pb-8">
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={20} className="text-[#1B7A4B]" />
              <span className="text-[16px] text-[#111827]">오늘의 마음 상태</span>
            </div>
            <p className="text-[12px] text-[#9CA3AF] mb-6">
              느낌 그대로 편하게 골라주세요. 정답은 없어요.
            </p>

            <SliderInput
              label="기분"
              value={mood}
              onChange={setMood}
              leftLabel="매우 안 좋음"
              rightLabel="매우 좋음"
              emoji="😊"
            />
            <SliderInput
              label="불안·걱정"
              value={anxiety}
              onChange={setAnxiety}
              leftLabel="전혀 없음"
              rightLabel="매우 심함"
              emoji="😟"
            />
            <SliderInput
              label="의욕·활력"
              value={motivation}
              onChange={setMotivation}
              leftLabel="전혀 없음"
              rightLabel="매우 높음"
              emoji="💪"
            />
          </div>

          <button
            onClick={() => setStep('result')}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mt-5"
          >
            저장하기
          </button>
        </div>
      )}

      {/* ───── RESULT STEP ───── */}
      {step === 'result' && (
        <div className="px-4 pt-5 pb-8">
          {/* Crisis help — '필요 시 도움 연결' 톤 */}
          {showCrisisHelp && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[16px] p-5 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={18} className="text-[#EF4444]" />
                <span className="text-[15px] text-[#991B1B]">
                  필요하면 도움을 받을 수 있어요
                </span>
              </div>
              <p className="text-[13px] text-[#7F1D1D] mb-4">
                마음이 힘든 시기는 누구에게나 올 수 있어요.
                전문 상담원과 대화하면 마음이 조금 가벼워질 수 있어요.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openSafetyDialog('109', '24시간 도움 연결')}
                  className="flex items-center gap-2 bg-white rounded-[12px] px-4 py-3.5 text-[14px] text-[#DC2626] min-h-[48px]"
                >
                  <Phone size={16} /> 24시간 마음 도움 109
                </button>
                <button
                  onClick={() => openSafetyDialog('1577-0199', '정신건강 상담 연결')}
                  className="flex items-center gap-2 bg-white rounded-[12px] px-4 py-3.5 text-[14px] text-[#DC2626] min-h-[48px]"
                >
                  <Phone size={16} /> 정신건강 상담 1577-0199
                </button>
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-3">
                위 버튼을 누르면 전화 연결 전 한번 더 확인해요.
              </p>
            </div>
          )}

          {/* Energy summary */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-[#1B7A4B]" />
              <span className="text-[14px] text-[#6B7280]">마음 에너지</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[36px] text-[#111827]" style={{ lineHeight: 1 }}>
                {energy.label}
              </span>
              <StatusChip status={energy.status} />
            </div>

            {/* Metaphor card */}
            <div className="bg-[#FFF1E8] rounded-[12px] p-3 mb-4">
              <div className="flex items-start gap-2">
                <Sparkles size={14} className="text-[#FF8A3D] mt-0.5 shrink-0" />
                <p className="text-[13px] text-[#374151]">{energy.metaphor}</p>
              </div>
            </div>

            {/* Score details */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '기분', value: mood, baseline: 5, emoji: '😊' },
                { label: '불안·걱정', value: anxiety, baseline: 4, emoji: '😟' },
                { label: '의욕·활력', value: motivation, baseline: 6, emoji: '💪' },
              ].map(item => {
                const trend = getTrend(
                  item.label === '불안·걱정' ? 10 - item.value : item.value,
                  item.label === '불안·걱정' ? 10 - item.baseline : item.baseline
                );
                const TrendIcon = trend.icon;
                return (
                  <div key={item.label} className="bg-[#F7F8FA] rounded-[12px] p-3 text-center">
                    <span className="text-[16px] block mb-1">{item.emoji}</span>
                    <span className="text-[11px] text-[#6B7280] block mb-1">{item.label}</span>
                    <span className="text-[20px] text-[#111827]">{item.value}</span>
                    <span className="text-[12px] text-[#9CA3AF]">/10</span>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      <TrendIcon size={10} style={{ color: trend.color }} />
                      <span className="text-[10px]" style={{ color: trend.color }}>{trend.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interpretation guide — no 우울증 표현 */}
          {energy.status === 'orange' && (
            <div className="bg-[#F7F8FA] rounded-[16px] p-4 mb-4">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-[#6B7280] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13px] text-[#374151] mb-1">
                    마음 에너지가 낮다고 해서 특정 질환을 뜻하지는 않아요.
                  </p>
                  <p className="text-[12px] text-[#6B7280]">
                    피로·수면·환경 변화 등 다양한 이유가 있을 수 있어요. 
                    며칠 지속된다면, 편하게 상담을 받아보는 것도 좋아요.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h3 className="text-[15px] text-[#111827] mb-3">오늘 추천 활동</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: '가벼운 산책 20분', route: '/daily/plan' },
                { label: '좋아하는 사람과 대화', route: '' },
                { label: '저녁 명상 10분 (YouTube)', route: '/daily/youtube-query' },
              ].map((r, i) => (
                <button
                  key={i}
                  onClick={() => r.route && navigate(r.route)}
                  className="w-full h-[48px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-1.5"
                >
                  {r.label}
                  {r.route.includes('youtube') && <ExternalLink size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Edit / redo */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep('slider')}
              className="flex-1 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[14px]"
            >
              다시 체크하기
            </button>
            <button
              onClick={() => navigate('/check')}
              className="flex-1 h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px]"
            >
              체크 화면으로
            </button>
          </div>

          <p className="text-[11px] text-[#9CA3AF] text-center mt-4">
            이 체크는 의료 진단이 아니라, 정서 활력 변화를 확인하기 위한 생활 점검이에요.
          </p>
        </div>
      )}

      {/* SafetyConfirm 2단계 확인 모달 */}
      <SafetyConfirmDialog
        open={safetyDialog.open}
        onClose={() => setSafetyDialog(prev => ({ ...prev, open: false }))}
        onConfirm={() => {
          window.location.href = `tel:${safetyDialog.phone.replace(/-/g, '')}`;
          setSafetyDialog(prev => ({ ...prev, open: false }));
        }}
        title={safetyDialog.title}
        description="지금 바로 전문 상담원과 연결해 드릴게요. 걱정하지 마세요, 편하게 이야기할 수 있어요."
        confirmLabel="전화 연결"
        cancelLabel="나중에"
        phoneNumber={safetyDialog.phone}
        variant="emergency"
      />
    </div>
  );
}
