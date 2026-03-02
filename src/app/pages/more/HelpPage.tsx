/**
 * P-Settings-Help-01
 * 설정 > "도움 받기" 고정 메뉴
 * - 긴급 도움 (109, 1577-0199)
 * - 가까운 센터 안내
 * - 자주 묻는 질문 (진단 아님 / 데이터 / 유튜브)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Phone, Heart, Building2, HelpCircle,
  ChevronDown, ChevronUp, Shield, FileText,
  Database, Youtube, AlertCircle, Info, ExternalLink,
} from 'lucide-react';
import { SafetyConfirmDialog } from '../../components/ui/SafetyConfirmDialog';

interface FaqItem {
  question: string;
  answer: string;
  icon: any;
  category: 'diagnosis' | 'data' | 'youtube';
}

const faqItems: FaqItem[] = [
  {
    question: '이 앱은 의료 진단 도구인가요?',
    answer: '아니요. 컨디션노트는 의료 진단을 하지 않습니다. 생활 속 상태 변화를 점검하고, 필요할 때 전문 기관으로 연결을 돕는 앱이에요. 모든 결과는 "점검"이며, 확정 진단이 아닙니다.',
    icon: Shield,
    category: 'diagnosis',
  },
  {
    question: '"두뇌 컨디션", "마음 에너지"는 무슨 뜻인가요?',
    answer: '"두뇌 컨디션"은 간단한 놀이형 과제를 통해 오늘의 인지 상태를 가볍게 확인하는 것이고, "마음 에너지"는 기분·불안·의욕을 종합한 정서 활력 수준이에요. 특정 질환명으로 해석하지 마세요.',
    icon: HelpCircle,
    category: 'diagnosis',
  },
  {
    question: '스트레스 측정 결과가 높게 나왔어요. 병원에 가야 하나요?',
    answer: '한 번의 높은 수치가 바로 질환을 의미하지는 않아요. 수면, 피로, 환경 등 여러 요인이 영향을 줄 수 있어요. 지속적으로 높게 나온다면, 가까운 보건소나 전문 기관 상담을 받아보시는 걸 권해요.',
    icon: AlertCircle,
    category: 'diagnosis',
  },
  {
    question: '내 데이터는 어디에 저장되나요?',
    answer: '기본적으로 데이터는 기기(앱) 내에 저장돼요. 보호자 공유나 캠프 리포트를 위해 동의 범위 내에서만 서버에 전송됩니다. 설정 > 내 데이터에서 언제든 확인·내보내기·삭제할 수 있어요.',
    icon: Database,
    category: 'data',
  },
  {
    question: '보호자에게 어떤 정보가 공유되나요?',
    answer: '보호자 모드에서는 "오늘의 요약"과 "위험 알림"만 공유돼요. 상세 점수, 질문 응답 등 민감한 정보는 공유되지 않습니다. 공유 범위는 설정에서 직접 관리할 수 있어요.',
    icon: Shield,
    category: 'data',
  },
  {
    question: '유튜브 영상은 왜 추천해 주나요?',
    answer: '명상, 스트레칭, 호흡법 등 이미 검증된 공개 콘텐츠를 활동 추천으로 연결해 드려요. 별도 계정이나 결제 없이 바로 시청할 수 있어요. 추천 영상은 큐레이션 기준에 따라 선정됩니다.',
    icon: Youtube,
    category: 'youtube',
  },
  {
    question: '유튜브 추천에 개인정보가 사용되나요?',
    answer: '아니요. 유튜브 검색은 활동 키워드 기반으로만 이루어지며, 개인 시청 기록이나 계정 정보는 사용하지 않아요.',
    icon: Youtube,
    category: 'youtube',
  },
];

export function HelpPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [safetyDialog, setSafetyDialog] = useState<{
    open: boolean;
    phone: string;
    title: string;
    variant: 'emergency' | 'referral';
  }>({ open: false, phone: '', title: '', variant: 'emergency' });

  const openCall = (phone: string, title: string, variant: 'emergency' | 'referral' = 'emergency') => {
    setSafetyDialog({ open: true, phone, title, variant });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">도움 받기</h2>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* ═══ 섹션 1: 긴급 도움 ═══ */}
        <div className="bg-[#FEF2F2] rounded-[16px] p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={18} className="text-[#DC2626]" />
            <span className="text-[16px] text-[#991B1B]">긴급 도움</span>
          </div>
          <p className="text-[13px] text-[#7F1D1D] mb-4">
            지금 힘들거나 위험하다고 느끼시면,<br />
            아래 버튼으로 바로 연결할 수 있어요.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => openCall('109', '24시간 도움 연결')}
              className="w-full h-[52px] bg-white rounded-[14px] flex items-center gap-3 px-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              <div className="w-9 h-9 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <Phone size={18} className="text-[#DC2626]" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] text-[#DC2626] block">자살예방상담전화</span>
                <span className="text-[12px] text-[#9CA3AF]">24시간 · 무료</span>
              </div>
              <span className="text-[18px] text-[#DC2626]">109</span>
            </button>

            <button
              onClick={() => openCall('1577-0199', '정신건강 위기상담')}
              className="w-full h-[52px] bg-white rounded-[14px] flex items-center gap-3 px-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              <div className="w-9 h-9 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <Phone size={18} className="text-[#DC2626]" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] text-[#DC2626] block">정신건강 위기상담</span>
                <span className="text-[12px] text-[#9CA3AF]">24시간 · 무료</span>
              </div>
              <span className="text-[18px] text-[#DC2626]">1577-0199</span>
            </button>
          </div>

          <p className="text-[11px] text-[#9CA3AF] mt-3 text-center">
            버튼을 누르면 전화 연결 전 한번 더 확인해요 (실수 방지)
          </p>
        </div>

        {/* ═══ 섹션 2: 가까운 센터 안내 ═══ */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={18} className="text-[#1B7A4B]" />
            <span className="text-[16px] text-[#111827]">가까운 센터 안내</span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-4">
            결과에 따라 적절한 기관으로 안내해 드려요.
          </p>

          <div className="flex flex-col gap-2 mb-3">
            {[
              { label: '보건소', phone: '1339', color: '#1B7A4B', desc: '건강검진 · 만성질환' },
              { label: '정신건강복지센터', phone: '1577-0199', color: '#DC2626', desc: '심리 상담 · 위기 지원' },
              { label: '치매안심센터', phone: '1899-9988', color: '#7C3AED', desc: '조기 선별 · 인지훈련' },
            ].map(item => (
              <button
                key={item.phone}
                onClick={() => openCall(item.phone, `${item.label} 연결`, 'referral')}
                className="w-full h-[52px] bg-[#F7F8FA] rounded-[12px] flex items-center gap-3 px-4"
              >
                <Phone size={16} style={{ color: item.color }} />
                <div className="flex-1 text-left">
                  <span className="text-[14px] text-[#374151]">{item.label}</span>
                  <span className="text-[11px] text-[#9CA3AF] block">{item.desc}</span>
                </div>
                <span className="text-[12px] text-[#9CA3AF]">{item.phone}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/referral/categories')}
            className="w-full h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[12px] text-[14px] flex items-center justify-center gap-1.5"
          >
            기관 상세 안내 보기 <ExternalLink size={13} />
          </button>
        </div>

        {/* ═══ 섹션 3: 자주 묻는 질문 ═══ */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3 px-1">
            <HelpCircle size={18} className="text-[#6B7280]" />
            <span className="text-[16px] text-[#111827]">자주 묻는 질문</span>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-3 overflow-x-auto">
            {[
              { key: 'all', label: '전체' },
              { key: 'diagnosis', label: '진단 아님' },
              { key: 'data', label: '데이터' },
              { key: 'youtube', label: '유튜브' },
            ].map(tab => (
              <button
                key={tab.key}
                className="px-3 py-1.5 rounded-full text-[12px] bg-white border border-[#E5E7EB] text-[#374151] whitespace-nowrap"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const Icon = faq.icon;
              return (
                <div
                  key={idx}
                  className={`${idx < faqItems.length - 1 ? 'border-b border-[#EEF1F4]' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left min-h-[52px]"
                  >
                    <Icon size={16} className="text-[#6B7280] shrink-0" />
                    <span className="text-[14px] text-[#374151] flex-1">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-[#9CA3AF] shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-[#9CA3AF] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pl-[52px]">
                      <p className="text-[13px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col gap-2 mb-4">
          <button
            onClick={() => navigate('/referral/follow-up')}
            className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
          >
            <FileText size={16} className="text-[#1B7A4B]" />
            <span className="text-[14px] text-[#374151] flex-1">연결 확인 (Follow-up)</span>
            <ChevronDown size={16} className="text-[#D1D5DB] -rotate-90" />
          </button>
          <button
            onClick={() => navigate('/referral/pre-visit')}
            className="w-full h-[48px] bg-white rounded-[14px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 px-4"
          >
            <FileText size={16} className="text-[#1B7A4B]" />
            <span className="text-[14px] text-[#374151] flex-1">방문 전 준비물 체크</span>
            <ChevronDown size={16} className="text-[#D1D5DB] -rotate-90" />
          </button>
        </div>

        {/* Fixed disclaimer */}
        <div className="bg-[#F7F8FA] rounded-[14px] p-3">
          <div className="flex items-start gap-2">
            <Shield size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
            <p className="text-[12px] text-[#6B7280]">
              이 앱은 진단·치료를 하지 않습니다. 리포트 제공, 경로 제안, 연결 지원이 핵심이에요.
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
        title={safetyDialog.title}
        confirmLabel="전화 연결"
        cancelLabel="나중에"
        phoneNumber={safetyDialog.phone}
        variant={safetyDialog.variant}
      />
    </div>
  );
}
