/**
 * P-Check-Brain (두뇌 놀이 / 자가)
 * - 결과: "두뇌 컨디션: 워밍업 필요/보통/좋음"
 * - "최근 7일 평균 대비"만 표시 (과한 임상 점수 주장 금지)
 * - 지속 하락 시 "치매안심센터 조기검진 안내 카드" (확정 표현 금지)
 * - 빈 상태, 비유 해석 포함
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Brain, Gamepad2, Phone, Sparkles,
  TrendingDown, TrendingUp, Minus, Info,
  ChevronRight, ExternalLink, Shield, Building2,
} from 'lucide-react';
import { StatusChip } from '../../components/ui/StatusChip';
import { SafetyConfirmDialog } from '../../components/ui/SafetyConfirmDialog';

const games = [
  { id: 'memory', name: '같은 그림 찾기', area: '기억', emoji: '🃏', color: '#22C55E' },
  { id: 'attention', name: '색-단어 반응', area: '집중', emoji: '🎨', color: '#0EA5E9' },
  { id: 'reaction', name: '순서 맞추기', area: '반응', emoji: '🔢', color: '#F59E0B' },
  { id: 'planning', name: '길 찾기', area: '순서·계획', emoji: '🗺️', color: '#7C3AED' },
];

const areaScores = [
  { label: '기억', score: 72, avg7d: 75, color: '#22C55E' },
  { label: '집중', score: 58, avg7d: 62, color: '#0EA5E9' },
  { label: '반응', score: 78, avg7d: 74, color: '#F59E0B' },
  { label: '순서·계획', score: 60, avg7d: 68, color: '#7C3AED' },
];

type Step = 'empty' | 'hub' | 'result';
type ConditionLevel = 'good' | 'normal' | 'warmup';

export function BrainCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('hub');
  const [showReferralDialog, setShowReferralDialog] = useState(false);

  // Simulated: whether there's a declining trend
  const showDeclineTrend = true; // demo: show the card

  const totalScore = Math.round(areaScores.reduce((s, a) => s + a.score, 0) / areaScores.length);
  const avgScore7d = Math.round(areaScores.reduce((s, a) => s + a.avg7d, 0) / areaScores.length);

  const getCondition = (score: number): { level: ConditionLevel; label: string; status: 'green' | 'yellow' | 'orange' } => {
    if (score >= 75) return { level: 'good', label: '좋음', status: 'green' };
    if (score >= 55) return { level: 'normal', label: '보통', status: 'yellow' };
    return { level: 'warmup', label: '워밍업 필요', status: 'orange' };
  };

  const condition = getCondition(totalScore);
  const diff = totalScore - avgScore7d;

  const getMetaphor = () => {
    if (condition.level === 'good') return '두뇌 엔진이 잘 돌아가고 있어요. 오늘은 새로운 것을 배우기 좋은 날이에요.';
    if (condition.level === 'normal') return '두뇌 엔진이 보통 속도로 돌아가고 있어요. 가벼운 워밍업이 도움이 될 수 있어요.';
    return '두뇌 엔진이 아직 시동 걸기 전이에요. 가벼운 놀이나 산책으로 워밍업해 보세요.';
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate('/check')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">두뇌 놀이</h2>
      </div>

      {/* ───── EMPTY STATE ───── */}
      {step === 'empty' && (
        <div className="px-4 pt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#F3E8FF] flex items-center justify-center mb-4">
            <Brain size={32} className="text-[#7C3AED]" />
          </div>
          <h3 className="text-[18px] text-[#111827] mb-2">아직 놀이 기록이 없어요</h3>
          <p className="text-[14px] text-[#6B7280] text-center mb-1">
            간단한 게임으로 두뇌 컨디션을 확인해 보세요.
          </p>
          <p className="text-[12px] text-[#9CA3AF] text-center mb-6">
            진단이 아닌, 오늘의 두뇌 상태를 놀이로 점검해요.
          </p>
          <button
            onClick={() => setStep('hub')}
            className="w-full h-[52px] bg-[#7C3AED] text-white rounded-[14px] text-[16px]"
          >
            두뇌 놀이 시작하기
          </button>
        </div>
      )}

      {/* ───── HUB ───── */}
      {step === 'hub' && (
        <div className="px-4 pt-5 pb-8">
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={20} className="text-[#7C3AED]" />
              <span className="text-[16px] text-[#111827]">오늘의 두뇌 놀이</span>
            </div>
            <p className="text-[13px] text-[#6B7280] mb-1">약 5분 소요 · 4가지 미니 게임</p>
            <p className="text-[12px] text-[#9CA3AF]">진단이 아닌, 두뇌 컨디션을 놀이로 확인해요</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {games.map(g => (
              <button
                key={g.id}
                onClick={() => setStep('result')}
                className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left min-h-[100px]"
              >
                <span className="text-[28px] block mb-2">{g.emoji}</span>
                <span className="text-[14px] text-[#111827] block">{g.name}</span>
                <span className="text-[12px] text-[#6B7280]">{g.area}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep('result')}
            className="w-full h-[52px] bg-[#7C3AED] text-white rounded-[14px] text-[16px]"
          >
            전체 놀이 시작
          </button>
        </div>
      )}

      {/* ───── RESULT ───── */}
      {step === 'result' && (
        <div className="px-4 pt-5 pb-8">
          {/* Main score */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Brain size={16} className="text-[#7C3AED]" />
              <span className="text-[14px] text-[#6B7280]">두뇌 컨디션</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[36px] text-[#111827]" style={{ lineHeight: 1 }}>
                {condition.label}
              </span>
              <StatusChip status={condition.status} label={condition.label} />
            </div>

            {/* 7일 평균 대비 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px] text-[#6B7280]">최근 7일 평균 대비</span>
              <div className="flex items-center gap-1">
                {diff > 0 ? (
                  <TrendingUp size={12} className="text-[#22C55E]" />
                ) : diff < 0 ? (
                  <TrendingDown size={12} className="text-[#F59E0B]" />
                ) : (
                  <Minus size={12} className="text-[#9CA3AF]" />
                )}
                <span className={`text-[13px] ${diff > 0 ? 'text-[#22C55E]' : diff < 0 ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'}`}>
                  {diff > 0 ? `+${diff}점` : diff < 0 ? `${diff}점` : '유지'}
                </span>
              </div>
            </div>

            {/* Gauge */}
            <div className="h-3 bg-[#EEF1F4] rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-[#7C3AED] rounded-full transition-all duration-700"
                style={{ width: `${totalScore}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#9CA3AF]">
              <span>0</span>
              <span>오늘 {totalScore}점 / 7일 평균 {avgScore7d}점</span>
              <span>100</span>
            </div>
          </div>

          {/* Metaphor */}
          <div className="bg-[#FFF1E8] rounded-[14px] p-4 mb-4">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-[#FF8A3D] mt-0.5 shrink-0" />
              <p className="text-[13px] text-[#374151]">{getMetaphor()}</p>
            </div>
          </div>

          {/* Area breakdown */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h4 className="text-[14px] text-[#111827] mb-3">영역별 컨디션</h4>
            {areaScores.map(area => {
              const areaDiff = area.score - area.avg7d;
              return (
                <div key={area.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="text-[#374151]">{area.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#111827]">{area.score}</span>
                      <span className="text-[10px] text-[#9CA3AF]">(7일 평균 {area.avg7d})</span>
                      <div className="flex items-center gap-0.5">
                        {areaDiff > 0 ? (
                          <TrendingUp size={10} className="text-[#22C55E]" />
                        ) : areaDiff < 0 ? (
                          <TrendingDown size={10} className="text-[#F59E0B]" />
                        ) : (
                          <Minus size={10} className="text-[#9CA3AF]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="h-2.5 bg-[#EEF1F4] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${area.score}%`, backgroundColor: area.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decline alert card — 치매안심센터 안내 */}
          {showDeclineTrend && (
            <div className="bg-[#F3E8FF] rounded-[16px] p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={16} className="text-[#7C3AED]" />
                <span className="text-[14px] text-[#5B21B6]">참고 안내</span>
              </div>
              <p className="text-[13px] text-[#374151] mb-2">
                두뇌 컨디션이 지속적으로 하락하는 경우,
                <strong> 치매안심센터</strong>에서 조기 선별검사를 받아볼 수 있어요.
              </p>
              <p className="text-[12px] text-[#6B7280] mb-3">
                선별 → 진단 → 감별 순으로 진행되며, 이 놀이 결과가 치매를 의미하지는 않아요.
                추가 상담이나 안내가 필요할 때 도움이 될 수 있어요.
              </p>

              <div className="bg-white rounded-[12px] p-3 mb-2">
                <div className="flex items-start gap-2">
                  <Info size={12} className="text-[#9CA3AF] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-[#6B7280]">
                    이 놀이 점수는 임상 진단 도구가 아닙니다. 변화 추세를 확인하기 위한 생활 점검이에요.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowReferralDialog(true)}
                  className="flex items-center gap-1.5 bg-white rounded-[12px] px-3 py-2.5 text-[13px] text-[#7C3AED] min-h-[44px]"
                >
                  <Phone size={14} /> 1899-9988
                </button>
                <button
                  onClick={() => setShowReferralDialog(true)}
                  className="flex items-center gap-1.5 bg-white rounded-[12px] px-3 py-2.5 text-[13px] text-[#7C3AED] min-h-[44px]"
                >
                  <Building2 size={14} /> 가까운 센터 안내
                </button>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h3 className="text-[15px] text-[#111827] mb-3">오늘 추천</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: '두뇌 워밍업 1회 더', onClick: () => setStep('hub') },
                { label: '숲길 산책 20분', onClick: () => navigate('/daily/plan') },
                { label: '10분 명상 (YouTube)', onClick: () => navigate('/daily/youtube-query') },
              ].map((r, i) => (
                <button
                  key={i}
                  onClick={r.onClick}
                  className={`w-full h-[48px] rounded-[14px] text-[14px] flex items-center justify-center gap-1.5 ${
                    i === 0 ? 'bg-[#F3E8FF] text-[#7C3AED]' : 'bg-[#E8F5EE] text-[#1B7A4B]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep('hub')}
            className="w-full h-[44px] border border-[#7C3AED] text-[#7C3AED] rounded-[14px] text-[14px] mb-3"
          >
            다시 놀이하기
          </button>

          <p className="text-[11px] text-[#9CA3AF] text-center">
            이 결과는 의료 진단이 아닙니다. 변화 추세를 보기 위한 생활 점검이에요.
          </p>
        </div>
      )}

      {/* Referral confirm dialog */}
      <SafetyConfirmDialog
        open={showReferralDialog}
        onClose={() => setShowReferralDialog(false)}
        onConfirm={() => {
          window.location.href = 'tel:18999988';
          setShowReferralDialog(false);
        }}
        title="치매안심센터 연결"
        description="가까운 치매안심센터로 전화를 연결해 드릴게요. 조기 선별검사에 대해 상담받을 수 있어요."
        confirmLabel="전화하기"
        cancelLabel="나중에"
        phoneNumber="1899-9988"
        variant="referral"
      />
    </div>
  );
}
