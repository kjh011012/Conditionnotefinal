/**
 * P-Referral-02_CategoryList
 * 연계 기관 카테고리 카드 목록
 * - 보건소 / 정신건강복지센터 / 치매안심센터 / 상담기관
 * - 각 카드: "왜 여기로?" 2줄 + [전화하기] [방문 전 체크]
 * - 핵심: 우리는 진단/치료가 아니라 '연결'을 돕는다
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Building2, Heart, Brain, MessageCircle,
  Phone, ClipboardCheck, ChevronRight, Info, Shield,
} from 'lucide-react';
import { SafetyConfirmDialog } from '../../components/ui/SafetyConfirmDialog';

interface ReferralCategory {
  id: string;
  icon: any;
  title: string;
  color: string;
  bg: string;
  phone: string;
  phoneName: string;
  whyLine1: string;
  whyLine2: string;
  services: string[];
}

const categories: ReferralCategory[] = [
  {
    id: 'health-center',
    icon: Building2,
    title: '보건소',
    color: '#1B7A4B',
    bg: '#E8F5EE',
    phone: '1339',
    phoneName: '보건소 상담',
    whyLine1: '혈압·혈당 등 기본 건강 수치가 연속으로 높게 나왔다면,',
    whyLine2: '가까운 보건소에서 무료 건강검진을 받아볼 수 있어요.',
    services: ['무료 건강검진', '만성질환 관리', '건강 상담'],
  },
  {
    id: 'mental-health',
    icon: Heart,
    title: '정신건강복지센터',
    color: '#DC2626',
    bg: '#FEF2F2',
    phone: '1577-0199',
    phoneName: '정신건강 상담',
    whyLine1: '마음 에너지가 지속적으로 낮거나, 불안이 높은 경우',
    whyLine2: '전문 상담원과의 대화가 도움이 될 수 있어요.',
    services: ['심리 상담', '위기 상담', '사례 관리'],
  },
  {
    id: 'dementia-center',
    icon: Brain,
    title: '치매안심센터',
    color: '#7C3AED',
    bg: '#F3E8FF',
    phone: '1899-9988',
    phoneName: '치매안심센터',
    whyLine1: '두뇌 컨디션이 지속 하락하거나, 일상 기억에 어려움이 있다면',
    whyLine2: '조기 선별검사(선별→진단→감별)를 받아볼 수 있어요.',
    services: ['조기 선별검사', '인지훈련 프로그램', '가족 지원'],
  },
  {
    id: 'counseling',
    icon: MessageCircle,
    title: '상담기관',
    color: '#0EA5E9',
    bg: '#E0F2FE',
    phone: '1393',
    phoneName: '상담 안내',
    whyLine1: '일상 스트레스, 관계 고민, 생활 변화 적응 등',
    whyLine2: '전문 상담사와 이야기하면 정리되는 것들이 있어요.',
    services: ['개인 상담', '가족 상담', '스트레스 관리'],
  },
];

export function ReferralCategoryList() {
  const navigate = useNavigate();
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
        <h2 className="text-[18px] text-[#111827]">기관 연결 안내</h2>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Top message */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-start gap-2">
            <Shield size={16} className="text-[#1B7A4B] mt-0.5 shrink-0" />
            <div>
              <p className="text-[14px] text-[#111827] mb-1">
                이 앱은 진단이 아니라, 연결을 돕습니다.
              </p>
              <p className="text-[12px] text-[#6B7280]">
                컨디션노트 결과를 바탕으로 적절한 기관을 안내해 드려요.
                필요할 때, 준비될 때 연락하시면 돼요.
              </p>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="flex flex-col gap-3">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                {/* Header bar */}
                <div className="px-5 pt-4 pb-3 flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <Icon size={22} style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[16px] text-[#111827] block">{cat.title}</span>
                    <span className="text-[12px] text-[#9CA3AF]">{cat.phoneName} {cat.phone}</span>
                  </div>
                </div>

                {/* "왜 여기로?" */}
                <div className="px-5 pb-3">
                  <div className="bg-[#F7F8FA] rounded-[12px] p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Info size={12} className="text-[#9CA3AF]" />
                      <span className="text-[11px] text-[#9CA3AF]">왜 여기로?</span>
                    </div>
                    <p className="text-[13px] text-[#374151]">
                      {cat.whyLine1}
                    </p>
                    <p className="text-[13px] text-[#374151]">
                      {cat.whyLine2}
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div className="px-5 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.services.map(s => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-1 rounded-full"
                        style={{ backgroundColor: cat.bg, color: cat.color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 pb-4 flex gap-2">
                  <button
                    onClick={() => openCall(cat.phone, `${cat.title} 연결`)}
                    className="flex-1 h-[48px] rounded-[12px] text-[14px] text-white flex items-center justify-center gap-2"
                    style={{ backgroundColor: cat.color }}
                  >
                    <Phone size={16} /> 전화하기
                  </button>
                  <button
                    onClick={() => navigate('/referral/pre-visit')}
                    className="flex-1 h-[48px] rounded-[12px] text-[14px] border flex items-center justify-center gap-2"
                    style={{ borderColor: cat.color, color: cat.color }}
                  >
                    <ClipboardCheck size={16} /> 방문 전 체크
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency section */}
        <div className="mt-5 bg-[#FEF2F2] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={16} className="text-[#DC2626]" />
            <span className="text-[14px] text-[#991B1B]">지금 바로 도움이 필요하면</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openCall('109', '24시간 도움 연결')}
              className="flex-1 h-[44px] bg-white rounded-[12px] text-[13px] text-[#DC2626] flex items-center justify-center gap-1.5"
            >
              <Phone size={14} /> 109
            </button>
            <button
              onClick={() => openCall('1577-0199', '정신건강 위기상담')}
              className="flex-1 h-[44px] bg-white rounded-[12px] text-[13px] text-[#DC2626] flex items-center justify-center gap-1.5"
            >
              <Phone size={14} /> 1577-0199
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#9CA3AF] text-center mt-4">
          이 앱의 결과는 의료 진단이 아닙니다.<br />
          필요 시 전문 기관의 도움을 받으시길 권장합니다.
        </p>
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
        variant={safetyDialog.phone === '109' || safetyDialog.phone === '1577-0199' ? 'emergency' : 'referral'}
      />
    </div>
  );
}
