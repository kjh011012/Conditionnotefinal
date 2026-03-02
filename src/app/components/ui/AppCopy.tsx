/**
 * AppCopy — 마이크로카피 재사용 컴포넌트 시스템
 *
 * 3가지 스타일:
 *   CopyTitle   — 타이틀용 (16px, #111827, semibold-느낌)
 *   CopyBody    — 본문/설명용 (14px, #374151)
 *   CopyCaption — 캡션/디스클레이머용 (12px, #6B7280)
 *
 * + 특수 용도:
 *   CopyDisclaimer — 방패 아이콘 + 캡션 스타일 고정 문구 박스
 *   CopyTone       — 톤 가이드 패턴 표시 (왼쪽 보더)
 *   CopyBadge      — ID 배지 + 카테고리 태그
 *
 * 모든 컴포넌트는 className 확장 가능.
 */
import { Shield } from 'lucide-react';
import { type ReactNode } from 'react';

/* ─── 기본 텍스트 스타일 ─── */

interface CopyTextProps {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
}

export function CopyTitle({ children, className = '', as: Tag = 'h3' }: CopyTextProps) {
  return (
    <Tag className={`text-[16px] text-[#111827] ${className}`}>
      {children}
    </Tag>
  );
}

export function CopyBody({ children, className = '', as: Tag = 'p' }: CopyTextProps) {
  return (
    <Tag className={`text-[14px] text-[#374151] ${className}`} style={{ lineHeight: 1.6 }}>
      {children}
    </Tag>
  );
}

export function CopyCaption({ children, className = '', as: Tag = 'p' }: CopyTextProps) {
  return (
    <Tag className={`text-[12px] text-[#6B7280] ${className}`} style={{ lineHeight: 1.5 }}>
      {children}
    </Tag>
  );
}

/* ─── 디스클레이머 박스 ─── */

interface CopyDisclaimerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'warning' | 'info';
}

const disclaimerStyles = {
  default: {
    bg: 'bg-[#F7F8FA]',
    iconColor: 'text-[#9CA3AF]',
    textColor: 'text-[#6B7280]',
  },
  warning: {
    bg: 'bg-[#FFF1E8]',
    iconColor: 'text-[#FF8A3D]',
    textColor: 'text-[#374151]',
  },
  info: {
    bg: 'bg-[#E8F5EE]',
    iconColor: 'text-[#1B7A4B]',
    textColor: 'text-[#374151]',
  },
};

export function CopyDisclaimer({ children, className = '', variant = 'default' }: CopyDisclaimerProps) {
  const style = disclaimerStyles[variant];
  return (
    <div className={`${style.bg} rounded-[14px] p-3 ${className}`}>
      <div className="flex items-start gap-2">
        <Shield size={14} className={`${style.iconColor} mt-0.5 shrink-0`} />
        <p className={`text-[12px] ${style.textColor}`} style={{ lineHeight: 1.5 }}>
          {children}
        </p>
      </div>
    </div>
  );
}

/* ─── 톤 가이드 패턴 ─── */

interface CopyToneProps {
  pattern: string;
  example: string;
  className?: string;
}

export function CopyTone({ pattern, example, className = '' }: CopyToneProps) {
  return (
    <div className={`border-l-2 border-[#1B7A4B] pl-3 ${className}`}>
      <span className="text-[14px] text-[#1B7A4B] block">{pattern}</span>
      <span className="text-[13px] text-[#6B7280]">예: {example}</span>
    </div>
  );
}

/* ─── ID 배지 ─── */

interface CopyBadgeProps {
  id: string;
  category?: string;
  className?: string;
}

export function CopyBadge({ id, category, className = '' }: CopyBadgeProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="bg-[#EEF1F4] text-[#6B7280] px-2 py-0.5 rounded text-[11px]">{id}</span>
      {category && (
        <span className="text-[11px] text-[#9CA3AF] bg-[#F7F8FA] px-2 py-0.5 rounded-full">
          {category}
        </span>
      )}
    </div>
  );
}

/* ─── 카피 카드 (라이브러리 전용) ─── */

interface CopyCardProps {
  id: string;
  category?: string;
  where: string;
  copy: string;
  note?: string;
  variant?: 'default' | 'highlight' | 'warning';
}

const cardAccentColors = {
  default: 'border-l-[#1B7A4B]',
  highlight: 'border-l-[#0EA5E9]',
  warning: 'border-l-[#FF8A3D]',
};

export function CopyCard({ id, category, where, copy, note, variant = 'default' }: CopyCardProps) {
  return (
    <div className={`bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] border-l-[3px] ${cardAccentColors[variant]}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <CopyBadge id={id} category={category} />
      </div>
      <CopyCaption className="mb-2 text-[#9CA3AF]">{where}</CopyCaption>
      <div className="bg-[#F7F8FA] rounded-[10px] px-3 py-2.5 mb-2">
        <CopyBody className="text-[#111827]">"{copy}"</CopyBody>
      </div>
      {note && <CopyCaption className="text-[#9CA3AF]">{note}</CopyCaption>}
    </div>
  );
}

/* ─── 금지 표현 행 ─── */

interface CopyForbiddenRowProps {
  forbidden: string;
  replace: string;
}

export function CopyForbiddenRow({ forbidden, replace }: CopyForbiddenRowProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-[10px] p-3">
      <span className="text-[13px] text-[#DC2626] line-through shrink-0">{forbidden}</span>
      <span className="text-[12px] text-[#6B7280]">→</span>
      <span className="text-[13px] text-[#15803D]">{replace}</span>
    </div>
  );
}

/* ─── 전체 카피 데이터 (앱 전역에서 import 가능) ─── */

export const APP_COPY = {
  // 앱 고정 문구
  IDENTITY_TAGLINE: '진단이 아닌, 생활 속 상태 점검과 회복 기록',
  IDENTITY_REPORT: '이 리포트는 의료 진단이 아니라, 캠프 기간 동안의 생활 지표 변화��� 권장 루틴을 안내합니다.',
  IDENTITY_REFERRAL: '필요 시 가까운 공공기관/상담기관으로 연결을 도와드립니다.',

  // 외부 링크
  EXTERNAL_YOUTUBE: '외부(YouTube)로 이동합니다.',

  // 데이터/동의
  DATA_ANONYMOUS: '이 데이터는 이름/전화번호 없이 \'전후 변화\' 같은 통계로만 사용될 수 있어요.',
  DATA_OPT_OUT: '언제든지 끌 수 있어요.',
  DATA_CONSENT_SCOPE: '동의 범위 내에서만 공유돼요.',

  // 측정 품질 안내
  MEASURE_CONDITION: '오늘 컨디션(피로/수면/감기/통증)에 따라 측정값이 달라질 수 있어요.',
  MEASURE_TREND: '한 번의 점수보다 \'변화 추세\'가 더 중요해요.',

  // 연계 안내
  REFERRAL_SAFE: '지금은 전문 기관과 연결하면 더 안전해요.',
  REFERRAL_GUIDE: '이 앱은 진단이 아니라, 다음 경로 안내를 돕습니다.',

  // 톤 가이드 패턴
  TONE_PATTERNS: [
    { pattern: '~일 수 있어요', example: '수면이 부족하면 피로감이 높아질 수 있어요.' },
    { pattern: '~해보세요', example: '가벼운 산책을 해보세요.' },
    { pattern: '~하면 도움이 될 수 있어요', example: '규칙적인 취침이 수면의 질에 도움이 될 수 있어요.' },
    { pattern: '~를 확인해 보시는 것도 좋아요', example: '가까운 보건소에 방문해 보시는 것도 좋아요.' },
  ],

  // 금지 표현
  FORBIDDEN: [
    { forbidden: '치매 진단', replace: '인지 건강 증진 / 두뇌 컨디션 관리' },
    { forbidden: '우울증 진단', replace: '정서 건강 관리 / 마음 활력 회복' },
    { forbidden: '진단/검사', replace: '선별/점검/체크' },
    { forbidden: '치료/처방', replace: '권장 루틴/추천 활동/연계 안내' },
    { forbidden: '확정', replace: '~일 수 있어요' },
    { forbidden: '의사가 필요 없다', replace: '(사용 금지)' },
    { forbidden: '병원 대체', replace: '(사용 금지)' },
    { forbidden: '의료 검사', replace: '생활 점검/선별' },
  ],
} as const;
