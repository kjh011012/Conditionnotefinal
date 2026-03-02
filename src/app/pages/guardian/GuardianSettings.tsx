/**
 * G8. 보호자 설정
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, FileText, Shield, ChevronRight, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function GuardianSettings() {
  const navigate = useNavigate();
  const { setMode } = useAppContext();
  const [alertLevel, setAlertLevel] = useState<'risk' | 'caution' | 'all'>('caution');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">설정</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Alert settings */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} className="text-[#374151]" />
            <span className="text-[14px] text-[#111827]">알림 수신 조건</span>
          </div>
          {([
            { key: 'risk' as const, label: '위험(관리필요)만', desc: '심각한 변화만 알려드려요' },
            { key: 'caution' as const, label: '주의 이상', desc: '주의, 관리필요 알림을 받아요' },
            { key: 'all' as const, label: '전체 알림', desc: '정보성 알림도 모두 받아요' },
          ]).map(opt => (
            <button key={opt.key} onClick={() => setAlertLevel(opt.key)}
              className="w-full flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0 text-left">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${alertLevel === opt.key ? 'border-[#1B7A4B] bg-[#1B7A4B]' : 'border-[#D1D5DB]'}`}>
                {alertLevel === opt.key && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <span className="text-[13px] text-[#111827] block">{opt.label}</span>
                <span className="text-[10px] text-[#6B7280]">{opt.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Report frequency */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-[#374151]" />
            <span className="text-[14px] text-[#111827]">리포트 수신</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-[#374151]">주간 리포트 수신</span>
            <span className="text-[12px] text-[#1B7A4B] bg-[#E8F5EE] px-2.5 py-1 rounded-full">매주 월요일</span>
          </div>
        </div>

        {/* Privacy */}
        <button onClick={() => navigate('/guardian/consent')}
          className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 w-full text-left">
          <Shield size={16} className="text-[#374151]" />
          <span className="text-[14px] text-[#111827] flex-1">공유 동의 상태 확인</span>
          <ChevronRight size={16} className="text-[#9CA3AF]" />
        </button>

        {/* Role switch */}
        <button onClick={() => { setMode('participant'); navigate('/'); }}
          className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 w-full text-left">
          <User size={16} className="text-[#374151]" />
          <span className="text-[14px] text-[#111827] flex-1">역할 변경 (참가자 모드)</span>
          <ChevronRight size={16} className="text-[#9CA3AF]" />
        </button>

        <p className="text-[10px] text-[#9CA3AF] text-center" style={{ lineHeight: 1.5 }}>
          개인정보 처리 방침 | 이용약관<br />
          이 앱은 의료 진단 도구가 아닙니다.
        </p>
      </div>
    </div>
  );
}
