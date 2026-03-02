/**
 * P-Referral-04_FollowUp (선택적 1회 확인)
 * 리포트 발급 7일 후 또는 사용자 직접 실행:
 * - 질문: "안내받은 기관/상담에 연결해보셨나요?"
 * - 선택: 예 / 아니오 / 아직 고민중
 * - "아니오/고민중" → 전화 버튼 + 절차 안내 + 리포트/준비물 다시보기
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Check, X, HelpCircle, Phone, FileText,
  ClipboardCheck, ChevronRight, Heart, Shield, Sparkles,
} from 'lucide-react';
import { SafetyConfirmDialog } from '../../components/ui/SafetyConfirmDialog';

type Answer = null | 'yes' | 'no' | 'thinking';

export function FollowUpCheck() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<Answer>(null);
  const [safetyDialog, setSafetyDialog] = useState<{
    open: boolean;
    phone: string;
    title: string;
  }>({ open: false, phone: '', title: '' });

  const openCall = (phone: string, title: string) => {
    setSafetyDialog({ open: true, phone, title });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">연결 확인</h2>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Question card */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={20} className="text-[#1B7A4B]" />
            <span className="text-[16px] text-[#111827]">한 가지만 여쭤볼게요</span>
          </div>
          <p className="text-[18px] text-[#111827] mb-5" style={{ lineHeight: 1.5 }}>
            안내받은 기관이나 상담에<br />
            연결해 보셨나요?
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {([
              {
                key: 'yes' as const,
                label: '네, 연결했어요',
                emoji: '😊',
                activeBg: 'bg-[#E8F5EE]',
                activeBorder: 'border-[#1B7A4B]',
                activeText: 'text-[#1B7A4B]',
              },
              {
                key: 'no' as const,
                label: '아니오, 아직이요',
                emoji: '😐',
                activeBg: 'bg-[#FEF9C3]',
                activeBorder: 'border-[#F59E0B]',
                activeText: 'text-[#A16207]',
              },
              {
                key: 'thinking' as const,
                label: '아직 고민 중이에요',
                emoji: '🤔',
                activeBg: 'bg-[#FFF1E8]',
                activeBorder: 'border-[#FF8A3D]',
                activeText: 'text-[#EA580C]',
              },
            ]).map(opt => {
              const isSelected = answer === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setAnswer(opt.key)}
                  className={`w-full min-h-[56px] rounded-[14px] px-4 flex items-center gap-3 text-left transition-all border ${
                    isSelected
                      ? `${opt.activeBg} ${opt.activeBorder}`
                      : 'bg-[#F7F8FA] border-[#E5E7EB]'
                  }`}
                >
                  <span className="text-[20px]">{opt.emoji}</span>
                  <span className={`text-[15px] ${isSelected ? opt.activeText : 'text-[#374151]'}`}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <Check size={18} className={`ml-auto ${opt.activeText}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ YES Response ═══ */}
        {answer === 'yes' && (
          <div className="space-y-4">
            <div className="bg-[#E8F5EE] rounded-[16px] p-5 text-center">
              <span className="text-[36px] block mb-2">🎉</span>
              <h3 className="text-[18px] text-[#1B7A4B] mb-2">잘 하셨어요!</h3>
              <p className="text-[13px] text-[#374151]">
                전문가와의 상담은 건강한 선택이에요.<br />
                앞으로도 컨디션노트가 함께할게요.
              </p>
            </div>

            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-2">앞으로의 경로</span>
              <p className="text-[12px] text-[#6B7280] mb-3">
                분기별로 리포트를 확인하며, 다음 단계를 안내해 드릴게요.
              </p>
              <button
                onClick={() => navigate('/report')}
                className="w-full h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[12px] text-[14px] flex items-center justify-center gap-1.5"
              >
                <FileText size={14} /> 리포트 보기
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}

        {/* ═══ NO / THINKING Response ═══ */}
        {(answer === 'no' || answer === 'thinking') && (
          <div className="space-y-4">
            {/* Reassurance */}
            <div className="bg-[#FFF1E8] rounded-[16px] p-4">
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="text-[#FF8A3D] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[14px] text-[#374151] mb-1">
                    {answer === 'no'
                      ? '괜찮아요, 준비될 때 연락하시면 돼요.'
                      : '천천히 생각하셔도 괜찮아요.'}
                  </p>
                  <p className="text-[12px] text-[#6B7280]">
                    아래에서 바로 전화하거나, 방문 준비물을 다시 확인하실 수 있어요.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick call buttons */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-3">전화로 바로 연결</span>
              <div className="flex flex-col gap-2">
                {[
                  { label: '보건소 상담', phone: '1339', color: '#1B7A4B' },
                  { label: '정신건강 상담', phone: '1577-0199', color: '#DC2626' },
                  { label: '치매안심센터', phone: '1899-9988', color: '#7C3AED' },
                ].map(item => (
                  <button
                    key={item.phone}
                    onClick={() => openCall(item.phone, item.label)}
                    className="w-full h-[48px] bg-[#F7F8FA] rounded-[12px] flex items-center gap-3 px-4 text-left"
                  >
                    <Phone size={16} style={{ color: item.color }} />
                    <span className="text-[14px] text-[#374151] flex-1">{item.label}</span>
                    <span className="text-[13px] text-[#9CA3AF]">{item.phone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Steps guide */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-3">이렇게 하시면 돼요</span>
              <div className="space-y-3">
                {[
                  { step: '1', text: '위 전화번호로 연락하기', sub: '"건강 상담 받고 싶어요" 라고 말씀하세요' },
                  { step: '2', text: '예약 날짜 잡기', sub: '당일 방문도 가능한 곳이 많아요' },
                  { step: '3', text: '준비물 챙겨서 방문', sub: '리포트 PDF + 신분증' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                      <span className="text-[13px] text-[#1B7A4B]">{item.step}</span>
                    </div>
                    <div>
                      <span className="text-[14px] text-[#374151] block">{item.text}</span>
                      <span className="text-[11px] text-[#9CA3AF]">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/referral/categories')}
                className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
              >
                <Heart size={16} className="text-[#1B7A4B]" />
                <span className="text-[14px] text-[#374151] flex-1">기관 안내 다시 보기</span>
                <ChevronRight size={16} className="text-[#D1D5DB]" />
              </button>
              <button
                onClick={() => navigate('/referral/pre-visit')}
                className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
              >
                <ClipboardCheck size={16} className="text-[#1B7A4B]" />
                <span className="text-[14px] text-[#374151] flex-1">방문 준비물 다시 보기</span>
                <ChevronRight size={16} className="text-[#D1D5DB]" />
              </button>
              <button
                onClick={() => navigate('/report')}
                className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
              >
                <FileText size={16} className="text-[#1B7A4B]" />
                <span className="text-[14px] text-[#374151] flex-1">리포트 다시 보기</span>
                <ChevronRight size={16} className="text-[#D1D5DB]" />
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px]"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}

        {/* Fixed disclaimer */}
        <div className="mt-5 bg-[#F7F8FA] rounded-[14px] p-3">
          <div className="flex items-start gap-2">
            <Shield size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
            <p className="text-[12px] text-[#6B7280]">
              이 앱은 치료나 관리를 하지 않습니다. 리포트 제공, 경로 제안, 기관 연결 지원만 합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 2단계 확인 모달 */}
      <SafetyConfirmDialog
        open={safetyDialog.open}
        onClose={() => setSafetyDialog(prev => ({ ...prev, open: false }))}
        onConfirm={() => {
          window.location.href = `tel:${safetyDialog.phone.replace(/-/g, '')}`;
          setSafetyDialog(prev => ({ ...prev, open: false }));
        }}
        title={`${safetyDialog.title} 연결`}
        confirmLabel="전화 연결"
        cancelLabel="나중에"
        phoneNumber={safetyDialog.phone}
        variant={safetyDialog.phone === '109' || safetyDialog.phone === '1577-0199' ? 'emergency' : 'referral'}
      />
    </div>
  );
}
