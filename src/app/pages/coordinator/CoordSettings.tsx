/**
 * C10. 코디네이터 설정/권한
 */
import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, Users, FileText, ChevronRight, User } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function CoordSettings() {
  const navigate = useNavigate();
  const { setMode } = useAppContext();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">설정</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        {/* Info policy */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-[#0EA5E9]" />
            <span className="text-[14px] text-[#111827]">개인정보/동의 정책</span>
          </div>
          <p className="text-[12px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>
            참가자 데이터는 동의 범위 내���서만 열람 가능합니다. 보호자에게 공유할 때는 참가자의 공유 설정을 반드시 확인해주세요.
          </p>
        </div>

        {/* Role/Permission */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-[#0EA5E9]" />
            <span className="text-[14px] text-[#111827]">역할 및 권한</span>
          </div>
          {[
            { label: '현재 역할', value: '코디네이터' },
            { label: '담당 그룹', value: 'A조, B조' },
            { label: '권한 레벨', value: '케이스 관리 + 보고' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-t border-[#F3F4F6] first:border-0">
              <span className="text-[12px] text-[#6B7280]">{item.label}</span>
              <span className="text-[12px] text-[#111827]">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        {[
          { icon: FileText, label: '운영 매뉴얼', path: '#' },
          { icon: Shield, label: '데이터 보안 안내', path: '#' },
        ].map(item => (
          <button key={item.label}
            className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 w-full text-left">
            <item.icon size={16} className="text-[#374151]" />
            <span className="text-[14px] text-[#111827] flex-1">{item.label}</span>
            <ChevronRight size={16} className="text-[#9CA3AF]" />
          </button>
        ))}

        <button onClick={() => { setMode('participant'); navigate('/'); }}
          className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3 w-full text-left">
          <User size={16} className="text-[#374151]" />
          <span className="text-[14px] text-[#111827] flex-1">역할 변경</span>
          <ChevronRight size={16} className="text-[#9CA3AF]" />
        </button>
      </div>
    </div>
  );
}
