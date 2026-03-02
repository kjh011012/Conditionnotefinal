/**
 * G4. 접근 제한 / 기간 종료 화면 (보호자)
 */
import { useNavigate } from 'react-router';
import { Clock, Lock, FileText, ChevronRight, Search } from 'lucide-react';

export function GuardianAccessExpired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <div className="max-w-[430px] mx-auto w-full flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 rounded-full bg-[#FFF1E8] flex items-center justify-center mb-5">
          <Lock size={28} className="text-[#EA580C]" />
        </div>

        <h1 className="text-[20px] text-[#111827] mb-2 text-center">접근 기간이 종료되었습니다</h1>
        <p className="text-[13px] text-[#6B7280] text-center mb-2" style={{ lineHeight: 1.6 }}>
          고라데이 치유마을 · 3월 치유캠프
        </p>
        <p className="text-[12px] text-[#9CA3AF] text-center mb-8" style={{ lineHeight: 1.6 }}>
          참여 기간(03.10~03.17)이 종료되어<br />
          해당 캠프 데이터 접근이 제한되었습니다.
        </p>

        {/* Options based on consent */}
        <div className="w-full max-w-[360px] flex flex-col gap-3 mb-8">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={14} className="text-[#1B7A4B]" />
              <span className="text-[13px] text-[#111827]">요약 리포트</span>
            </div>
            <p className="text-[11px] text-[#6B7280] mb-3" style={{ lineHeight: 1.5 }}>
              참가자(김영숙님)가 요약 리포트 열람을 허용했습니다.
            </p>
            <button className="w-full h-[40px] bg-[#1B7A4B] text-white rounded-[10px] text-[12px] flex items-center justify-center gap-2">
              <FileText size={14} /> 요약 리포트 보기
            </button>
          </div>

          <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-[#9CA3AF]" />
              <span className="text-[12px] text-[#6B7280]">일반 데이터</span>
            </div>
            <p className="text-[11px] text-[#9CA3AF]" style={{ lineHeight: 1.5 }}>
              캠프 기간 외 상세 데이터는 참가자 동의에 따라 접근이 제한됩니다.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[360px] flex flex-col gap-2">
          <button onClick={() => navigate('/guardian')}
            className="w-full h-[48px] border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151] flex items-center justify-center gap-2">
            보호자 홈으로 돌아가기
          </button>
          <button onClick={() => navigate('/explore')}
            className="w-full h-[44px] text-[12px] text-[#9CA3AF] flex items-center justify-center gap-1">
            <Search size={14} /> 다음 캠프 찾아보기
          </button>
        </div>

        <p className="text-[10px] text-[#9CA3AF] text-center mt-8 px-4" style={{ lineHeight: 1.5 }}>
          접근 정책은 참가자의 동의 설정에 따라 결정됩니다.<br />
          문의사항은 치유마을 코디네이터에게 연락해주세요.
        </p>
      </div>
    </div>
  );
}
