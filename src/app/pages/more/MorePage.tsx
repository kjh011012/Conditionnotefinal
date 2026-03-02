import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAppContext, UserMode } from '../../context/AppContext';
import {
  Watch, Share2, Database, Accessibility, HelpCircle, MessageCircle,
  ChevronRight, User, Shield, ClipboardList, Settings, Bell,
  Calendar, Moon, Heart, Footprints, BarChart3, BookOpen, Phone,
} from 'lucide-react';

const menuItems = [
  { icon: User, label: '내 계정', desc: '프로필, 로그인 정보' },
  { icon: Calendar, label: '내 예약', desc: '캠프 예약 내역 확인' },
  { icon: Watch, label: '기기 연결', desc: '워치, 현장 기기 상태 확인' },
  { icon: Bell, label: '알림 설정', desc: '취침, 산책, 체크 알림 관리', action: 'notify' },
  { icon: Share2, label: '공유 설정', desc: '보호자 공유 범위 관리' },
  { icon: Database, label: '내 데이터', desc: '수집 데이터 확인 · 내보내기 · 삭제' },
  { icon: Accessibility, label: '접근성', desc: '큰 글씨 · 간편 모드 · 음성', action: 'access' },
  { icon: Heart, label: '도움 받기', desc: '긴급 도움 · 센터 안내 · 자주 묻는 질문', action: 'help' },
  { icon: MessageCircle, label: '문의하기', desc: '궁금한 점을 물어보세요' },
];

const modeConfig: Record<UserMode, { label: string; icon: any; desc: string }> = {
  participant: { label: '���가자', icon: User, desc: '기록 · 추천 · 리포트 · 캠프 예약' },
  guardian: { label: '보호자', icon: Shield, desc: '오늘 요약 · 리포트 확인 (읽기 전용)' },
  coordinator: { label: '코디네이터', icon: ClipboardList, desc: '캠프 운영 · 체크리포트 · 세션 진행' },
  admin: { label: '관리자', icon: Settings, desc: '프로그램 · 식단 · 숙소 · 운영 총괄' },
};

export function MorePage() {
  const { mode, setMode, elderMode, setElderMode } = useAppContext();
  const navigate = useNavigate();
  const [showModeSheet, setShowModeSheet] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [notifications, setNotifications] = useState({
    bedtime: true,
    walk: false,
    evening: true,
    weekly: true,
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-3 pb-4 bg-white">
        <h1 className="text-[22px] text-[#111827] mb-3">더보기</h1>
        <button
          onClick={() => setShowModeSheet(!showModeSheet)}
          className="w-full bg-[#E8F5EE] rounded-[14px] p-4 flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 bg-[#1B7A4B] rounded-full flex items-center justify-center text-white">
            {(() => { const I = modeConfig[mode].icon; return <I size={20} />; })()}
          </div>
          <div className="flex-1">
            <span className="text-[15px] text-[#111827] block">현재: {modeConfig[mode].label}</span>
            <span className="text-[12px] text-[#6B7280]">{modeConfig[mode].desc}</span>
          </div>
          <Settings size={18} className="text-[#1B7A4B]" />
        </button>
      </div>

      {showModeSheet && (
        <div className="px-4 pt-3 mb-3">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <h3 className="text-[15px] text-[#111827] mb-3">모드 전환</h3>
            <div className="flex flex-col gap-2">
              {(Object.keys(modeConfig) as UserMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setShowModeSheet(false);
                    if (m === 'guardian') navigate('/guardian');
                    else if (m === 'coordinator') navigate('/coord');
                    else if (m === 'admin') navigate('/admin');
                    else navigate('/');
                  }}
                  className={`flex items-center gap-3 p-3 rounded-[12px] ${mode === m ? 'bg-[#E8F5EE] border border-[#1B7A4B]' : 'bg-[#F7F8FA]'}`}
                >
                  {(() => { const I = modeConfig[m].icon; return <I size={18} className={mode === m ? 'text-[#1B7A4B]' : 'text-[#6B7280]'} />; })()}
                  <div className="text-left">
                    <span className={`text-[14px] block ${mode === m ? 'text-[#1B7A4B]' : 'text-[#374151]'}`}>{modeConfig[m].label}</span>
                    <span className="text-[11px] text-[#6B7280]">{modeConfig[m].desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notification Bottom Sheet */}
      {showNotify && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center" onClick={() => setShowNotify(false)}>
          <div className="w-full max-w-[430px] bg-white rounded-t-[20px] p-5" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-4" />
            <h3 className="text-[18px] text-[#111827] mb-5">알림 설정</h3>
            {[
              { key: 'bedtime', label: '취침 루틴 알림', desc: '잠자기 전 명상/호흡 리마인드', icon: Moon },
              { key: 'walk', label: '아침 산책 리마인드', desc: '가벼운 아침 산책 알림', icon: Footprints },
              { key: 'evening', label: '저녁 마음 체크', desc: '하루 마무리 마음 체크 알림', icon: Heart },
              { key: 'weekly', label: '주간 리포트 알림', desc: '이번 주 리듬 요약 알림', icon: BarChart3 },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#EEF1F4] last:border-0">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-[#6B7280]" />
                  <div>
                    <span className="text-[15px] text-[#111827] block">{item.label}</span>
                    <span className="text-[12px] text-[#6B7280]">{item.desc}</span>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`w-12 h-7 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'} relative`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
            <button onClick={() => setShowNotify(false)} className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mt-5">확인</button>
          </div>
        </div>
      )}

      {/* Accessibility Bottom Sheet */}
      {showAccessibility && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center" onClick={() => setShowAccessibility(false)}>
          <div className="w-full max-w-[430px] bg-white rounded-t-[20px] p-5" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-4" />
            <h3 className="text-[18px] text-[#111827] mb-5">접근성 설정</h3>

            {/* 어르신 모드 (큰글씨 + 간편 모드 통합) */}
            <div className="bg-[#FFFBEB] rounded-[16px] p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[24px]">👴</span>
                  <div>
                    <span className="text-[16px] text-[#111827] block">어르신 모드</span>
                    <span className="text-[12px] text-[#6B7280]">큰 글씨 · 간편 화면 · 직관 체크</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const next = !elderMode;
                    setElderMode(next);
                    if (next) {
                      setShowAccessibility(false);
                      navigate('/elder');
                    }
                  }}
                  className={`w-14 h-8 rounded-full transition-colors ${elderMode ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'} relative`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow absolute top-1 transition-transform ${elderMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              {elderMode && (
                <p className="text-[11px] text-[#92400E] mt-2" style={{ lineHeight: 1.5 }}>
                  어르신 모드가 켜져 있어요. 홈 · 체크 · 리포트가 간편 화면으로 전환됩니다.
                </p>
              )}
            </div>

            <div className="h-px bg-[#E5E7EB] mb-3" />
            <span className="text-[13px] text-[#6B7280] block mb-3">개별 접근성 옵션</span>

            {[
              { label: '큰 글씨 (일반모드)', desc: '본문 18pt, 제목 24pt로 확대', value: false, toggle: () => {} },
              { label: '음성 안내', desc: '주요 화면 음성 가이드 (준비중)', value: false, toggle: () => {} },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#EEF1F4] last:border-0">
                <div>
                  <span className="text-[15px] text-[#111827] block">{item.label}</span>
                  <span className="text-[12px] text-[#6B7280]">{item.desc}</span>
                </div>
                <button
                  onClick={item.toggle}
                  className={`w-12 h-7 rounded-full transition-colors ${item.value ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'} relative`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${item.value ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
            <button onClick={() => setShowAccessibility(false)} className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] mt-5">확인</button>
          </div>
        </div>
      )}

      <div className="px-4 pt-5">
        <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action === 'access' ? () => setShowAccessibility(true) : item.action === 'notify' ? () => setShowNotify(true) : item.action === 'help' ? () => navigate('/help') : undefined}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left ${i < menuItems.length - 1 ? 'border-b border-[#EEF1F4]' : ''}`}
            >
              <item.icon size={20} className="text-[#6B7280]" />
              <div className="flex-1">
                <span className="text-[15px] text-[#111827] block">{item.label}</span>
                <span className="text-[12px] text-[#6B7280]">{item.desc}</span>
              </div>
              <ChevronRight size={18} className="text-[#D1D5DB]" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-6 pb-4 text-center">
        <p className="text-[12px] text-[#9CA3AF]">컨디션노트 v1.0</p>
        <p className="text-[11px] text-[#D1D5DB] mt-1">생활 속 상태 점검과 회복 기록</p>
      </div>

      {/* Dev: Library Links */}
      <div className="px-4 pb-8">
        <p className="text-[11px] text-[#D1D5DB] mb-2 text-center">개발자 도구</p>
        <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          {[
            { label: '08 · 디테일 스펙', path: '/library/detail-spec' },
            { label: '09 · 카피 라이브러리', path: '/library/copy' },
            { label: '10 · 상태 라이브러리', path: '/library/states' },
            { label: '13 · AI 추천 룰 스펙', path: '/library/ai-reco-rules' },
            { label: '14 · AI 추천 시나리오 20세트', path: '/library/ai-reco-scenarios' },
            { label: '15 · Reason→Subtype 매핑', path: '/library/ai-reco-reason-mapping' },
            { label: '16 · 구현용 의사코드', path: '/library/ai-reco-pseudocode' },
            { label: '17 · JSON 룰셋 (복사용)', path: '/library/ai-reco-json' },
          ].map((item, i, arr) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-left ${i < arr.length - 1 ? 'border-b border-[#EEF1F4]' : ''}`}
            >
              <BookOpen size={16} className="text-[#9CA3AF]" />
              <span className="flex-1 text-[13px] text-[#6B7280]">{item.label}</span>
              <ChevronRight size={16} className="text-[#D1D5DB]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}