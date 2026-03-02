/**
 * 어르신 모드 — 더보기
 * 큰 메뉴, 핵심 설정만, 어르신 모드 끄기
 */
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { User, Phone, Watch, Eye, EyeOff, Settings, ChevronRight, Volume2, HelpCircle } from 'lucide-react';

export function ElderMore() {
  const navigate = useNavigate();
  const { userName, elderMode, setElderMode } = useAppContext();

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="px-5 pt-8 pb-5 bg-[#F7F8FA]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center">
            <span className="text-[24px] text-[#1B7A4B]">{userName[0]}</span>
          </div>
          <div>
            <h1 className="text-[24px] text-[#111827]">{userName}님</h1>
            <p className="text-[16px] text-[#6B7280]">참가자</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-8 flex flex-col gap-3">
        {/* 메뉴 */}
        {[
          { icon: User, label: '내 정보', desc: '이름, 연락처 확인', emoji: '👤' },
          { icon: Watch, label: '기기 연결', desc: '워치 상태 확인', emoji: '⌚' },
          { icon: Phone, label: '도움 요청', desc: '코디네이터에게 전화', emoji: '📞' },
          { icon: HelpCircle, label: '사용 방법', desc: '앱 사용법 안내', emoji: '❓' },
        ].map((item, i) => (
          <button key={i}
            className="w-full bg-[#F7F8FA] rounded-[20px] p-5 flex items-center gap-4 active:scale-[0.98] transition-transform min-h-[72px] text-left">
            <span className="text-[28px]">{item.emoji}</span>
            <div className="flex-1">
              <span className="text-[20px] text-[#111827] block">{item.label}</span>
              <span className="text-[14px] text-[#6B7280]">{item.desc}</span>
            </div>
            <ChevronRight size={24} className="text-[#D1D5DB]" />
          </button>
        ))}

        {/* 구분선 */}
        <div className="h-px bg-[#E5E7EB] my-2" />

        {/* 어르신 모드 토글 */}
        <div className="bg-[#FFFBEB] rounded-[20px] p-5">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[28px]">👴</span>
            <div className="flex-1">
              <span className="text-[20px] text-[#111827] block">어르신 모드</span>
              <span className="text-[14px] text-[#6B7280]">큰 글씨 · 간편 화면</span>
            </div>
            <button
              onClick={() => {
                setElderMode(!elderMode);
                if (elderMode) {
                  navigate('/');
                }
              }}
              className={`w-16 h-9 rounded-full transition-colors relative ${elderMode ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'}`}
            >
              <div className={`w-7 h-7 rounded-full bg-white shadow-md absolute top-1 transition-transform ${elderMode ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
          {elderMode && (
            <p className="text-[14px] text-[#92400E]" style={{ lineHeight: 1.5 }}>
              현재 어르신 모드가 켜져 있어요.<br />
              끄면 일반 화면으로 돌아갑니다.
            </p>
          )}
        </div>

        {/* 버전 */}
        <p className="text-[14px] text-[#9CA3AF] text-center mt-4">
          컨디션노트 v1.0
        </p>
      </div>
    </div>
  );
}
