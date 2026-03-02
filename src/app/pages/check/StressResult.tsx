/**
 * P-Check-Stress Result
 * 스트레스 측정 결과 + WhyExplainSheet + DataQuality
 * - "왜 이렇게 나왔나요?" Bottom Sheet (연결 스토리 + 비유 카드 + 추천)
 * - "측정 신뢰도" 안내 (손 차가움/움직임 체크 → 신뢰도 배지)
 */
import { useState } from 'react';
import { ArrowLeft, HelpCircle, Shield, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusChip } from '../../components/ui/StatusChip';
import { ExplainWhySheet } from '../../components/ui/ExplainWhySheet';

type ReliabilityLevel = 'high' | 'medium' | 'low';

const metrics = [
  { label: '혈압', value: '128/82', unit: 'mmHg', status: 'yellow' as const, metaphor: '살짝 높은 편이에요' },
  { label: '신체 스트레스', value: '58', unit: '점', status: 'yellow' as const, metaphor: '몸이 조금 긴장해 있어요' },
  { label: '정신 스트레스', value: '65', unit: '점', status: 'yellow' as const, metaphor: '마음에 부담이 있을 수 있어요' },
  { label: '피로도', value: '72', unit: '점', status: 'orange' as const, metaphor: '배터리 40% 수준이에요' },
  { label: '자율신경(HRV)', value: '45', unit: 'ms', status: 'yellow' as const, metaphor: '핸들이 살짝 흔들려요' },
];

const explainSteps = [
  { label: '수면 부족', metaphor: '어젯밤 수면이 5시간 미만이면, 회복 시간이 부족해요.' },
  { label: '회복 부족', metaphor: '회복이 적으면 피로가 쌓이기 시작해요.' },
  { label: '피로 누적', metaphor: '피로가 쌓이면 몸이 긴장 상태를 유지하게 돼요.' },
  { label: '스트레스 증가', metaphor: '긴장이 지속되면 스트레스 지표가 올라가요.' },
  { label: '자율신경 영향', metaphor: '자율신경의 균형이 흔들릴 수 있어요.' },
];

const reliabilityConfig: Record<ReliabilityLevel, { label: string; color: string; bg: string }> = {
  high: { label: '높음', color: '#22C55E', bg: '#DCFCE7' },
  medium: { label: '보통', color: '#F59E0B', bg: '#FEF9C3' },
  low: { label: '낮음', color: '#EF4444', bg: '#FEE2E2' },
};

export function StressResult() {
  const navigate = useNavigate();
  const [showExplain, setShowExplain] = useState(false);
  const [showQuality, setShowQuality] = useState(false);

  // Data quality checks
  const [coldHands, setColdHands] = useState(false);
  const [moved, setMoved] = useState(false);
  const [qualitySubmitted, setQualitySubmitted] = useState(false);

  const getReliability = (): ReliabilityLevel => {
    if (coldHands && moved) return 'low';
    if (coldHands || moved) return 'medium';
    return 'high';
  };

  const reliability = getReliability();
  const relConfig = reliabilityConfig[reliability];

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate('/check')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">스트레스 측정 결과</h2>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Summary */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] text-[#111827]">오늘의 스트레스</h3>
            <StatusChip status="yellow" />
          </div>
          <p className="text-[14px] text-[#6B7280] mb-3">기준선 대비 +12% 상승했어요</p>

          {/* Reliability badge */}
          {qualitySubmitted && (
            <div className="flex items-center gap-2">
              <Shield size={14} style={{ color: relConfig.color }} />
              <span
                className="text-[12px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: relConfig.bg, color: relConfig.color }}
              >
                측정 신뢰도: {relConfig.label}
              </span>
            </div>
          )}
        </div>

        {/* Data Quality Check (측정 품질) */}
        {!qualitySubmitted && (
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-[#6B7280]" />
              <span className="text-[14px] text-[#111827]">측정 신뢰도 확인</span>
            </div>
            <p className="text-[12px] text-[#9CA3AF] mb-3">
              정확한 결과를 위해 측정 환경을 확인해 주세요.
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={() => setColdHands(!coldHands)}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] min-h-[48px] transition-all ${
                  coldHands
                    ? 'bg-[#FEF9C3] border border-[#F59E0B]/30'
                    : 'bg-[#F7F8FA] border border-[#E5E7EB]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  coldHands ? 'bg-[#F59E0B]' : 'border-2 border-[#D1D5DB]'
                }`}>
                  {coldHands && <span className="text-white text-[10px]">✓</span>}
                </div>
                <div className="text-left">
                  <span className="text-[14px] text-[#374151] block">손이 차가웠나요?</span>
                  <span className="text-[11px] text-[#9CA3AF]">혈류에 영향을 줄 수 있어요</span>
                </div>
              </button>

              <button
                onClick={() => setMoved(!moved)}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] min-h-[48px] transition-all ${
                  moved
                    ? 'bg-[#FEF9C3] border border-[#F59E0B]/30'
                    : 'bg-[#F7F8FA] border border-[#E5E7EB]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  moved ? 'bg-[#F59E0B]' : 'border-2 border-[#D1D5DB]'
                }`}>
                  {moved && <span className="text-white text-[10px]">✓</span>}
                </div>
                <div className="text-left">
                  <span className="text-[14px] text-[#374151] block">측정 중 움직였나요?</span>
                  <span className="text-[11px] text-[#9CA3AF]">움직임은 센서에 영향을 줄 수 있어요</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setQualitySubmitted(true)}
              className="w-full h-[44px] bg-[#1B7A4B] text-white rounded-[12px] text-[14px]"
            >
              확인 완료
            </button>
          </div>
        )}

        {/* Quality submitted: show badge inline */}
        {qualitySubmitted && (coldHands || moved) && (
          <div className="bg-[#FEF9C3] rounded-[14px] p-3 mb-4">
            <p className="text-[12px] text-[#A16207]">
              {coldHands && moved
                ? '손이 차갑고 움직임이 있어 신뢰도가 낮을 수 있어요. 편안한 상태에서 한 번 더 측정해보는 것도 좋아요.'
                : coldHands
                  ? '손이 차가운 상태에서 측정하여 혈류 수치에 영향이 있을 수 있어요.'
                  : '측정 중 움직임이 있어 일부 수치에 영향이 있을 수 있어요.'
              }
            </p>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.map(m => (
            <div key={m.label} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] text-[#6B7280] block mb-1">{m.label}</span>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-[24px] text-[#111827]" style={{ lineHeight: 1 }}>{m.value}</span>
                <span className="text-[12px] text-[#9CA3AF] mb-0.5">{m.unit}</span>
              </div>
              <StatusChip status={m.status} />
              <p className="text-[11px] text-[#6B7280] mt-2">{m.metaphor}</p>
            </div>
          ))}
        </div>

        {/* Why Explain CTA */}
        <button
          onClick={() => setShowExplain(true)}
          className="w-full bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFF1E8] flex items-center justify-center shrink-0">
            <HelpCircle size={20} className="text-[#FF8A3D]" />
          </div>
          <div className="flex-1 text-left">
            <span className="text-[15px] text-[#111827] block">왜 이렇게 나왔나요?</span>
            <span className="text-[12px] text-[#6B7280]">수면 → 회복 → 스트레스 연결 흐름 보기</span>
          </div>
          <ChevronRight size={16} className="text-[#D1D5DB]" />
        </button>

        {/* Recommendations */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <h3 className="text-[15px] text-[#111827] mb-3">오늘 추천</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: '10분 호흡 명상 (YouTube)', isYt: true },
              { label: '가벼운 스트레칭 (YouTube)', isYt: true },
              { label: '낮잠 가이드 20분', isYt: false },
            ].map((r, i) => (
              <button
                key={i}
                onClick={() => r.isYt && navigate('/daily/youtube-query')}
                className="w-full h-[48px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-2"
              >
                {r.label}
                {r.isYt && <ExternalLink size={13} />}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-[#9CA3AF] text-center">
          이 결과는 현장 기기 측정 값이며, 의료 진단이 아닙니다.<br />
          필요 시 가까운 의료기관과 상담하세요.
        </p>
      </div>

      {/* ExplainWhy Bottom Sheet */}
      <ExplainWhySheet
        open={showExplain}
        onClose={() => setShowExplain(false)}
        steps={explainSteps}
        metaphorCard={{
          title: '비유로 이해하기',
          description:
            '몸은 자동차와 비슷해요. 수면은 "충전", 활동은 "주행"이에요. 충전이 부족하면 배터리(피로)가 빨리 닳고, 엔진(자율신경)이 과열될 수 있어요. 오늘은 잠시 쉬어가는 충전 시간이 필요해요.',
        }}
        recommendations={[
          { label: '10분 호흡 명상 (YouTube)', onClick: () => navigate('/daily/youtube-query') },
          { label: '가벼운 스트레칭 영상 보기', onClick: () => navigate('/daily/youtube-query') },
          { label: '20분 숲길 산책 시작', onClick: () => navigate('/daily/plan') },
        ]}
      />
    </div>
  );
}
