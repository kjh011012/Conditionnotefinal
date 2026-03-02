/**
 * C10. 이슈/인시던트 관리 + C11. 문의 관리 + C12. 공지 전파
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, MessageSquare, Megaphone, Plus, ChevronRight, CheckCircle, Send, X } from 'lucide-react';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';
import { TicketCard } from '../../components/ui/TicketCard';

const issues = [
  { id: '1', title: '김영숙 수면 3일 연속 하락', category: '건강', status: 'processing', priority: 'high' as const, assignee: '이코디', time: '2시간 전', inReport: true },
  { id: '2', title: '오후 요가 장소 변경 필요', category: '운영', status: 'pending', priority: 'medium' as const, assignee: '미지정', time: '오전', inReport: false },
  { id: '3', title: '2동 온수 불량 신고', category: '숙소', status: 'pending', priority: 'medium' as const, assignee: '관리팀', time: '어제', inReport: false },
  { id: '4', title: '참가자 간 마찰 (가벼운)', category: '안전', status: 'closed', priority: 'low' as const, assignee: '이코디', time: '3/10', inReport: true },
];

const inquiries = [
  { id: '1', title: '딸(이OO): 어머니 수면 상태 문의', status: 'pending', priority: 'high' as const, time: '오전 10:30', from: '보호자' },
  { id: '2', title: '박순자님: 프로그램 변경 요청', status: 'processing', priority: 'medium' as const, time: '어제', from: '참가자' },
  { id: '3', title: '아들(박OO): 식단 알레르기 문의', status: 'closed', priority: 'low' as const, time: '3/10', from: '보호자' },
];

type Tab = 'issues' | 'inquiries' | 'notice';
type IssueCategory = '건강' | '안전' | '운영' | '숙소' | '식단' | '기타';

export function CoordIssues() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('issues');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<IssueCategory>('건강');
  const [newDesc, setNewDesc] = useState('');
  const [noticeText, setNoticeText] = useState('');
  const [noticeTarget, setNoticeTarget] = useState('전체');
  const [replyText, setReplyText] = useState('');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <h2 className="text-[18px] text-[#111827] mb-3">이슈 · 문의</h2>
        <div className="flex gap-1.5">
          {([
            { key: 'issues' as Tab, label: '이슈', icon: AlertTriangle, count: issues.filter(i => i.status !== 'closed').length },
            { key: 'inquiries' as Tab, label: '문의', icon: MessageSquare, count: inquiries.filter(i => i.status === 'pending').length },
            { key: 'notice' as Tab, label: '공지', icon: Megaphone, count: 0 },
          ]).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-[10px] text-[12px] transition-all ${tab === t.key ? 'bg-[#0EA5E9] text-white' : 'bg-[#F7F8FA] text-[#6B7280]'}`}>
              <t.icon size={13} />
              {t.label}
              {t.count > 0 && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-white/20' : 'bg-[#FEF2F2] text-[#DC2626]'}`}>{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        {/* === ISSUES TAB === */}
        {tab === 'issues' && (
          <>
            <button onClick={() => setShowCreate(true)}
              className="w-full h-[44px] bg-white border-2 border-dashed border-[#0EA5E9] rounded-[12px] text-[12px] text-[#0EA5E9] flex items-center justify-center gap-1.5">
              <Plus size={14} /> 이슈 등록
            </button>

            {showCreate && (
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] text-[#111827]">새 이슈</span>
                  <button onClick={() => setShowCreate(false)}><X size={16} className="text-[#9CA3AF]" /></button>
                </div>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  placeholder="이슈 제목" className="w-full bg-[#F7F8FA] rounded-[10px] px-3 py-2.5 text-[13px] outline-none mb-2" />
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {(['건강', '안전', '운영', '숙소', '식단', '기타'] as IssueCategory[]).map(cat => (
                    <button key={cat} onClick={() => setNewCategory(cat)}
                      className={`px-2.5 py-1 rounded-full text-[10px] ${newCategory === cat ? 'bg-[#0EA5E9] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)}
                  placeholder="상세 설명..." className="w-full h-[60px] bg-[#F7F8FA] rounded-[10px] p-3 text-[12px] resize-none outline-none mb-2" />
                <div className="flex items-center gap-2 mb-3">
                  <label className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                    <input type="checkbox" className="rounded" /> 리포트에 포함
                  </label>
                </div>
                <button className="w-full h-[40px] bg-[#0EA5E9] text-white rounded-[10px] text-[12px]">등록</button>
              </div>
            )}

            {issues.map(issue => (
              <TicketCard key={issue.id} id={issue.id} title={issue.title} category={issue.category}
                status={issue.status} priority={issue.priority} assignee={issue.assignee} time={issue.time} />
            ))}
          </>
        )}

        {/* === INQUIRIES TAB === */}
        {tab === 'inquiries' && (
          <>
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] text-[#111827] block mb-0.5">{inq.title}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280]">{inq.from}</span>
                      <OpsStatusBadge status={inq.status} size="sm" />
                      <span className="text-[9px] text-[#9CA3AF]">{inq.time}</span>
                    </div>
                  </div>
                </div>
                {inq.status !== 'closed' && (
                  <div className="flex gap-2 mt-2">
                    <input value={replyText} onChange={e => setReplyText(e.target.value)}
                      placeholder="답변 작성 (의료 확정 표현 금지)" className="flex-1 bg-[#F7F8FA] rounded-[8px] px-3 py-2 text-[11px] outline-none" />
                    <button className="px-3 py-2 bg-[#0EA5E9] text-white rounded-[8px] text-[11px]">답변</button>
                  </div>
                )}
              </div>
            ))}
            <p className="text-[9px] text-[#9CA3AF] text-center">참가자 동의 범위 안내가 답변에 자동 삽입됩니다.</p>
          </>
        )}

        {/* === NOTICE TAB === */}
        {tab === 'notice' && (
          <>
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-3">공지 작성</span>
              <textarea value={noticeText} onChange={e => setNoticeText(e.target.value)}
                placeholder="세션 변경, 준비물 안내 등..." className="w-full h-[80px] bg-[#F7F8FA] rounded-[10px] p-3 text-[12px] resize-none outline-none mb-3" />
              <div className="flex gap-1.5 mb-3">
                <span className="text-[11px] text-[#6B7280] self-center mr-1">대상:</span>
                {['전체', '참가자', '보호자'].map(t => (
                  <button key={t} onClick={() => setNoticeTarget(t)}
                    className={`px-3 py-1.5 rounded-full text-[11px] ${noticeTarget === t ? 'bg-[#0EA5E9] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 h-[40px] border border-[#E5E7EB] rounded-[10px] text-[12px] text-[#374151]">예약 발송</button>
                <button className="flex-1 h-[40px] bg-[#0EA5E9] text-white rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                  <Send size={12} /> 즉시 전송
                </button>
              </div>
            </div>

            {/* Sent notices */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[13px] text-[#111827] block mb-2">발송 내역</span>
              {[
                { text: '내일 숲길 걷기 장소 변경 안내', target: '전체', time: '오늘 10:00' },
                { text: '오후 요가 준비물: 개인 매트', target: '참가자', time: '어제' },
              ].map((n, i) => (
                <div key={i} className="py-2 border-t border-[#F3F4F6] first:border-0">
                  <span className="text-[12px] text-[#374151] block">{n.text}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-[#0EA5E9] bg-[#E0F2FE] px-1.5 py-0.5 rounded-full">{n.target}</span>
                    <span className="text-[9px] text-[#9CA3AF]">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
