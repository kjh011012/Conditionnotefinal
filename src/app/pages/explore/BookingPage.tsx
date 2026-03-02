/**
 * N5. 예약/결제 플로우
 */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import {
  ChevronLeft, CreditCard, CheckCircle2, Calendar, Sparkles,
} from 'lucide-react';

type Step = 'confirm' | 'payment' | 'complete';

export function BookingPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { getProgram, getVillage } = useVillage();
  const p = getProgram(programId || '');
  const v = p ? getVillage(p.villageId) : null;
  const [step, setStep] = useState<Step>('confirm');
  const [payMethod, setPayMethod] = useState('card');

  if (!p || !v) return <div className="p-8 text-center text-[#9CA3AF]">예약 정보를 찾을 수 없습니다</div>;

  const days = Math.ceil((new Date(p.endDate).getTime() - new Date(p.startDate).getTime()) / 86400000);
  const color = v.primaryColor;
  const daysUntil = Math.max(0, Math.ceil((new Date(p.startDate).getTime() - new Date('2026-03-02').getTime()) / 86400000));

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: v.secondaryColor }}>
          <CheckCircle2 size={40} style={{ color }} />
        </div>
        <span className="text-[22px] text-[#111827] mb-2">예약 완료</span>
        <span className="text-[14px] text-[#6B7280] mb-1">{v.name} · {p.name}</span>
        <span className="text-[13px] text-[#9CA3AF] mb-6">참여가 확정되었습니다</span>

        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-full max-w-[360px] mb-6">
          <div className="text-center mb-3">
            <span className="text-[36px] block">{v.logo}</span>
          </div>
          {[
            { label: '프로그램', value: p.name },
            { label: '기간', value: `${p.startDate} ~ ${p.endDate}` },
            { label: '결제금액', value: `₩${p.price.toLocaleString()}` },
            { label: '상태', value: '참여 확정' },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-2 border-t border-[#F3F4F6] first:border-0">
              <span className="text-[12px] text-[#6B7280]">{r.label}</span>
              <span className="text-[12px] text-[#111827]">{r.value}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-[#F3F4F6] text-center">
            <span className="text-[14px] px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: color }}>
              시작까지 D-{daysUntil}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[360px]">
          <button onClick={() => navigate('/village/history')}
            className="w-full h-[48px] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2"
            style={{ backgroundColor: color }}>
            <Calendar size={16} /> 내 참여 일정 보기
          </button>
          <button onClick={() => navigate('/')}
            className="w-full h-[44px] border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#6B7280]">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => step === 'payment' ? setStep('confirm') : navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">{step === 'confirm' ? '예약 확인' : '결제'}</h2>
      </div>

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2">
          {['예약확인', '결제', '완료'].map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-[3px] rounded-full mb-1 ${i <= (['confirm', 'payment', 'complete'].indexOf(step)) ? '' : 'bg-[#E5E7EB]'}`}
                style={i <= (['confirm', 'payment', 'complete'].indexOf(step)) ? { backgroundColor: color } : {}} />
              <span className={`text-[10px] ${i <= (['confirm', 'payment', 'complete'].indexOf(step)) ? '' : 'text-[#9CA3AF]'}`}
                style={i <= (['confirm', 'payment', 'complete'].indexOf(step)) ? { color } : {}}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-32">
        {step === 'confirm' && (
          <>
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[28px]">{v.logo}</span>
                <div>
                  <span className="text-[15px] text-[#111827] block">{p.name}</span>
                  <span className="text-[12px] text-[#6B7280]">{v.name}</span>
                </div>
              </div>
              {[
                { label: '기간', value: `${p.startDate} ~ ${p.endDate} (${days}일)` },
                { label: '포함', value: p.includes.join(' · ') },
                { label: '목적', value: p.purpose.join(' · ') },
              ].map(r => (
                <div key={r.label} className="flex justify-between py-2 border-t border-[#F3F4F6]">
                  <span className="text-[12px] text-[#6B7280]">{r.label}</span>
                  <span className="text-[12px] text-[#111827]">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#111827]">결제 금액</span>
                <span className="text-[18px] text-[#111827]">₩{p.price.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}

        {step === 'payment' && (
          <>
            <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-4">
              <span className="text-[14px] text-[#111827] block mb-3">결제 수단</span>
              {['card', 'transfer', 'kakao'].map(m => (
                <button key={m} onClick={() => setPayMethod(m)}
                  className={`w-full flex items-center gap-3 p-3 rounded-[12px] mb-2 border ${payMethod === m ? '' : 'border-[#E5E7EB]'}`}
                  style={payMethod === m ? { borderColor: color, backgroundColor: v.secondaryColor } : {}}>
                  <CreditCard size={18} style={{ color: payMethod === m ? color : '#9CA3AF' }} />
                  <span className="text-[13px] text-[#111827]">
                    {m === 'card' ? '신용/체크카드' : m === 'transfer' ? '계좌이체' : '카카오페이'}
                  </span>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#6B7280]">총 결제 금액</span>
                <span className="text-[18px] text-[#111827]">₩{p.price.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#EEF1F4] px-4 py-4 z-30">
        <button onClick={() => step === 'confirm' ? setStep('payment') : setStep('complete')}
          className="w-full h-[52px] text-white rounded-[14px] text-[15px] flex items-center justify-center gap-2 active:opacity-90"
          style={{ backgroundColor: color }}>
          {step === 'confirm' ? '결제 진행' : `₩${p.price.toLocaleString()} 결제하기`}
        </button>
      </div>
    </div>
  );
}
