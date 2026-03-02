/**
 * C9. 참가자 상세 (운영용 케이스 파일)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Moon, Heart, Activity, Zap, Clock, Plus, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';
import { TimelineItem } from '../../components/ui/TimelineItem';

const data14 = Array.from({ length: 14 }, (_, i) => ({
  d: `${i + 1}`, sleep: 55 + Math.round(Math.random() * 25), stress: 30 + Math.round(Math.random() * 30),
  rhythm: 60 + Math.round(Math.random() * 20),
}));

const fieldRecords = [
  { date: '3/12 09:20', type: '관찰', tag: '수면', text: '어젯밤 취침 지연. 아침에 피곤해하심.', action: '오후 개별 상담 예정' },
  { date: '3/11 15:30', type: '상담', tag: '기분', text: '집이 보고 싶다고 하심. 가족 전화 후 안정됨.', action: '' },
  { date: '3/10 10:00', type: '조치', tag: '컨디션', text: '아침 요가 불참. 두통 호소. 휴식 권유.', action: '내일 재확인' },
  { date: '3/9 14:00', type: '연락', tag: '보호자', text: '보호자(이OO) 안부 전화 연결 완료.', action: '' },
];

export function CoordParticipantDetail() {
  const navigate = useNavigate();
  const [newMemo, setNewMemo] = useState('');
  const [memoTag, setMemoTag] = useState('');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">참가자 상세</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Profile + today check */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <span className="text-[16px] text-[#0EA5E9]">김</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[16px] text-[#111827]">김영숙</span>
                <OpsStatusBadge status="danger" size="sm" />
              </div>
              <span className="text-[11px] text-[#9CA3AF]">51세 · 여 · A조 · 1동 201호 · 캠프 3일차</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <OpsStatusBadge status="draft" size="sm" label="오늘 체크: 미완료" />
            <span className="text-[10px] text-[#0EA5E9] bg-[#E0F2FE] px-2 py-0.5 rounded-full">담당: 이코디</span>
          </div>
        </div>

        {/* Core metrics (reusable) */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Moon, label: '수면 회복', value: 55, status: 'danger' },
            { icon: Heart, label: '스트레스', value: 52, status: 'caution' },
            { icon: Clock, label: '리듬 안정도', value: 64, status: 'caution' },
            { icon: Zap, label: '피로도', value: 45, status: 'caution' },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-[14px] p-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-1.5 mb-1">
                <m.icon size={12} className="text-[#6B7280]" />
                <span className="text-[10px] text-[#9CA3AF]">{m.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-[22px] text-[#111827]">{m.value}</span>
                <OpsStatusBadge status={m.status} size="sm" />
              </div>
            </div>
          ))}
        </div>

        {/* 14-day chart */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] text-[#111827] block mb-2">14일 추이</span>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="d" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={24} />
                <Line type="monotone" dataKey="sleep" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="rhythm" stroke="#1B7A4B" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== OPS-SPECIFIC: Field record timeline ===== */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">현장 기록 타임라인</span>
          {fieldRecords.map((r, i) => (
            <TimelineItem key={i} time={r.date} title={`[${r.type}] ${r.tag}`} desc={r.text}
              color={r.type === '조치' ? '#DC2626' : r.type === '상담' ? '#0EA5E9' : r.type === '연락' ? '#7C3AED' : '#6B7280'}
              isLast={i === fieldRecords.length - 1}
              tag={r.action || undefined} tagColor="#0EA5E9" />
          ))}
          {/* Add new record */}
          <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {['수면', '기분', '통증', '컨디션', '보호자', '기타'].map(tag => (
                <button key={tag} onClick={() => setMemoTag(tag)}
                  className={`px-2 py-1 rounded-full text-[9px] ${memoTag === tag ? 'bg-[#0EA5E9] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newMemo} onChange={e => setNewMemo(e.target.value)}
                placeholder="기록 추가..." className="flex-1 bg-[#F7F8FA] rounded-[10px] px-3 py-2 text-[12px] outline-none" />
              <button className="w-10 h-10 bg-[#0EA5E9] rounded-[10px] flex items-center justify-center shrink-0">
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== OPS-SPECIFIC: Action plan & next check ===== */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">조치 계획 / 다음 확인</span>
          <div className="bg-[#E0F2FE] rounded-[10px] p-3 mb-2">
            <span className="text-[11px] text-[#0EA5E9] block mb-0.5">다음 확인 일정</span>
            <span className="text-[12px] text-[#374151]">3/13(목) 오전 — 수면 상태 재확인 & 개별 상담</span>
          </div>
          <div className="bg-[#F7F8FA] rounded-[10px] p-3">
            <span className="text-[11px] text-[#6B7280] block mb-0.5">현재 조치 방향</span>
            <span className="text-[12px] text-[#374151]">취침 시간 규칙성 관리, 저녁 카페인 제한 권고, 걷기 프로그램 우선 참여</span>
          </div>
        </div>

        {/* ===== OPS-SPECIFIC: Quick actions ===== */}
        <div className="flex flex-col gap-2">
          <button onClick={() => navigate('/coord/check-report')}
            className="w-full h-[44px] bg-[#0EA5E9] text-white rounded-[12px] text-[13px] flex items-center justify-center gap-2">
            <FileText size={14} /> 체크리포트 입력 바로가기
          </button>
          <button
            className="w-full h-[44px] bg-[#FEF2F2] text-[#DC2626] rounded-[12px] text-[13px] flex items-center justify-center gap-2">
            <AlertTriangle size={14} /> 관리자에게 에스컬레이션
          </button>
        </div>
      </div>
    </div>
  );
}
