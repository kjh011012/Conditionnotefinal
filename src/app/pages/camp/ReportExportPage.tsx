/**
 * P-Report-Export-01_PDFOptions
 * PDF 저장/공유 옵션(보호자 공유 포함)
 * - PDF 상단 고정 문구: "이 리포트는 의료 진단이 아니라…"
 * - 공유 시 "동의 범위" 안내 모달(민감정보 숨김 옵션)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Download, Share2, FileText, Check,
  Shield, Eye, EyeOff, ChevronRight, Info,
  ArrowUpRight, X, Lock,
} from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

export function ReportExportPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showShareModal, setShowShareModal] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);

  // Privacy toggles for sharing
  const [privacySettings, setPrivacySettings] = useState({
    stressScore: true,
    mindCheck: true,
    brainScore: false,
    sleepDetail: true,
    referral: false,
  });

  const handleDownload = () => {
    setDownloaded(true);
    showToast('success', 'PDF가 저장되었어요');
  };

  const handleShare = () => {
    setShared(true);
    setShowShareModal(false);
    showToast('success', '보호자에게 공유했어요');
  };

  const togglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">리포트 저장 · 공유</h2>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Report preview card */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-[14px] bg-[#E8F5EE] flex items-center justify-center">
              <FileText size={24} className="text-[#1B7A4B]" />
            </div>
            <div>
              <h3 className="text-[16px] text-[#111827]">최종 리포트</h3>
              <span className="text-[13px] text-[#6B7280]">스트레스 회복 3박4일 캠프</span>
            </div>
          </div>

          {/* PDF disclaimer stamp */}
          <div className="bg-[#FFF1E8] rounded-[12px] p-3 mb-4">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-[#EA580C] mt-0.5 shrink-0" />
              <div>
                <p className="text-[12px] text-[#EA580C]">
                  <strong>PDF 상단 고정 문구:</strong>
                </p>
                <p className="text-[12px] text-[#EA580C] mt-0.5">
                  "이 리포트는 의료 진단이 아니라, 캠프 기간 동안의 생활 지표 변화와 권장 루틴을 안내합니다. 의학적 판단이나 처방의 근거로 사용할 수 없습니다."
                </p>
              </div>
            </div>
          </div>

          {/* Report summary */}
          <div className="border border-[#EEF1F4] rounded-[14px] p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[#F7F8FA] rounded-[10px] p-3">
                <span className="text-[11px] text-[#9CA3AF] block mb-0.5">수면</span>
                <span className="text-[16px] text-[#111827]">5.8 → 6.9h</span>
                <span className="text-[11px] text-[#22C55E] flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> 개선
                </span>
              </div>
              <div className="bg-[#F7F8FA] rounded-[10px] p-3">
                <span className="text-[11px] text-[#9CA3AF] block mb-0.5">스트레스</span>
                <span className="text-[16px] text-[#111827]">72 → 58점</span>
                <span className="text-[11px] text-[#22C55E] flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> 개선
                </span>
              </div>
              <div className="bg-[#F7F8FA] rounded-[10px] p-3">
                <span className="text-[11px] text-[#9CA3AF] block mb-0.5">활동</span>
                <span className="text-[16px] text-[#111827]">3,200 → 5,400</span>
                <span className="text-[11px] text-[#22C55E] flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> 개선
                </span>
              </div>
              <div className="bg-[#F7F8FA] rounded-[10px] p-3">
                <span className="text-[11px] text-[#9CA3AF] block mb-0.5">마음 에너지</span>
                <span className="text-[16px] text-[#111827]">4 → 7/10</span>
                <span className="text-[11px] text-[#22C55E] flex items-center gap-0.5">
                  <ArrowUpRight size={10} /> 개선
                </span>
              </div>
            </div>
            <p className="text-[12px] text-[#6B7280]">
              총 5개 지표, 전후 비교, 권장 루틴, 연계 안내 포함
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Download PDF */}
          <button
            onClick={handleDownload}
            disabled={downloaded}
            className={`w-full h-[52px] rounded-[14px] text-[16px] flex items-center justify-center gap-2 transition-all ${
              downloaded
                ? 'bg-[#E8F5EE] text-[#1B7A4B] border border-[#1B7A4B]/20'
                : 'bg-[#1B7A4B] text-white shadow-[0_4px_16px_rgba(27,122,75,0.3)]'
            }`}
          >
            {downloaded ? (
              <><Check size={18} /> PDF 저장 완료</>
            ) : (
              <><Download size={18} /> PDF로 저장하기</>
            )}
          </button>

          {/* Share to guardian */}
          <button
            onClick={() => setShowShareModal(true)}
            disabled={shared}
            className={`w-full h-[52px] rounded-[14px] text-[16px] flex items-center justify-center gap-2 transition-all ${
              shared
                ? 'bg-[#E8F5EE] text-[#1B7A4B] border border-[#1B7A4B]/20'
                : 'border-2 border-[#1B7A4B] text-[#1B7A4B]'
            }`}
          >
            {shared ? (
              <><Check size={18} /> 보호자 공유 완료</>
            ) : (
              <><Share2 size={18} /> 보호자에게 공유하기</>
            )}
          </button>

          {/* View report */}
          <button
            onClick={() => navigate('/report')}
            className="w-full h-[48px] text-[#6B7280] text-[14px] flex items-center justify-center gap-1"
          >
            리포트 상세 보기 <ChevronRight size={14} />
          </button>
        </div>

        {/* Security notice */}
        <div className="bg-[#F7F8FA] rounded-[14px] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-[#6B7280]" />
            <span className="text-[13px] text-[#374151]">개인정보 보호 안내</span>
          </div>
          <ul className="text-[12px] text-[#6B7280] space-y-1">
            <li>· PDF는 본인 기기에만 저장돼요</li>
            <li>· 공유 시 민감 정보를 선택적으로 숨길 수 있어요</li>
            <li>· 데이터는 캠프 종료 후 90일 뒤 자동 삭제돼요</li>
          </ul>
        </div>

        {/* Home */}
        <button
          onClick={() => navigate('/')}
          className="w-full h-[44px] text-[#9CA3AF] text-[14px] mt-4"
        >
          홈으로 돌아가기
        </button>
      </div>

      {/* ── Share consent modal ── */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-full max-w-[430px] bg-white rounded-t-[20px] px-5 pt-3 pb-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock size={18} className="text-[#1B7A4B]" />
                <span className="text-[18px] text-[#111827]">공유 범위 설정</span>
              </div>
              <button onClick={() => setShowShareModal(false)}>
                <X size={20} className="text-[#9CA3AF]" />
              </button>
            </div>

            <p className="text-[13px] text-[#6B7280] mb-4">
              보호자에게 공유할 정보를 선택해 주세요. 선택하지 않은 항목은 "비공개" 처리됩니다.
            </p>

            {/* Privacy toggles */}
            <div className="flex flex-col gap-2 mb-6">
              {[
                { key: 'stressScore' as const, label: '스트레스 점수', desc: '전후 비교 점수' },
                { key: 'mindCheck' as const, label: '마음 체크 결과', desc: '감정 상태 변화' },
                { key: 'brainScore' as const, label: '두뇌 놀이 점수', desc: '인지 변화 추세' },
                { key: 'sleepDetail' as const, label: '수면 상세', desc: '수면 시간/규칙성' },
                { key: 'referral' as const, label: '연계 기관 안내', desc: '추천된 기관 정보' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => togglePrivacy(item.key)}
                  className={`flex items-center gap-3 p-3 rounded-[12px] transition-all min-h-[52px] ${
                    privacySettings[item.key]
                      ? 'bg-[#E8F5EE] border border-[#1B7A4B]/20'
                      : 'bg-[#F7F8FA] border border-[#E5E7EB]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    privacySettings[item.key] ? 'bg-[#1B7A4B]' : 'bg-[#E5E7EB]'
                  }`}>
                    {privacySettings[item.key] ? (
                      <Eye size={14} className="text-white" />
                    ) : (
                      <EyeOff size={14} className="text-[#9CA3AF]" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <span className={`text-[14px] block ${
                      privacySettings[item.key] ? 'text-[#0E4B2E]' : 'text-[#6B7280]'
                    }`}>
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">{item.desc}</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                    privacySettings[item.key]
                      ? 'bg-[#1B7A4B]/10 text-[#1B7A4B]'
                      : 'bg-[#F7F8FA] text-[#9CA3AF]'
                  }`}>
                    {privacySettings[item.key] ? '공개' : '비공개'}
                  </span>
                </button>
              ))}
            </div>

            {/* Share disclaimer */}
            <div className="bg-[#FFF1E8] rounded-[12px] p-3 mb-5">
              <p className="text-[11px] text-[#EA580C]">
                공유된 리포트에는 "이 리포트는 의료 진단이 아닙니다" 문구가 포함됩니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 h-[48px] border border-[#E5E7EB] text-[#6B7280] rounded-[14px] text-[15px]"
              >
                취소
              </button>
              <button
                onClick={handleShare}
                className="flex-1 h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[15px] flex items-center justify-center gap-1"
              >
                <Share2 size={16} /> 공유하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
