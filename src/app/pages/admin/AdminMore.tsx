/**
 * A9. 공지사항 + A10. 문의관리 + A11. 댓글관리 + A12. 사용자/권한 + A13. 리포트 + A14. 설정
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Megaphone, MessageSquare, MessageCircle, Users, BarChart3, Settings, ChevronRight,
  Plus, Edit3, Trash2, EyeOff, Pin, Send, Shield, Download, Bell, User, CreditCard, Activity, FileText } from 'lucide-react';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';
import { TicketCard } from '../../components/ui/TicketCard';
import { useAppContext } from '../../context/AppContext';

type Section = 'menu' | 'notices' | 'inquiries' | 'comments' | 'users' | 'reports' | 'settings';

const notices = [
  { id: '1', title: '캠프 일정 안내 (3/10~3/20)', status: 'published', target: '전체', pinned: true, date: '3/9' },
  { id: '2', title: '숲길 걷기 장소 변경', status: 'published', target: '참가자', pinned: false, date: '3/12' },
  { id: '3', title: '주말 자유시간 안내', status: 'reserved', target: '전체', pinned: false, date: '3/14 예약' },
  { id: '4', title: '알레르기 식단 관련 안내', status: 'temp', target: '보호자', pinned: false, date: '임시저장' },
];

const inquiries = [
  { id: '1', title: '딸(이OO): 어머니 수면 상태 문의', category: '건강', status: 'pending', priority: 'high' as const, assignee: '이코디', time: '오전' },
  { id: '2', title: '참가자 박순자: 메뉴 변경 요청', category: '식단', status: 'processing', priority: 'medium' as const, assignee: '김코디', time: '어제' },
  { id: '3', title: '보호자(박OO): 방문 일정 문의', category: '운영', status: 'closed', priority: 'low' as const, assignee: '이코디', time: '3/10' },
];

const comments = [
  { id: '1', author: '김영숙', content: '숲길 걷기 정말 좋았어요', post: '캠프 일정 안내', time: '오전', flagged: false },
  { id: '2', author: '익명', content: '식단이 너무 싱거워요', post: '알레르기 식단 안내', time: '어제', flagged: true },
  { id: '3', author: '박순자', content: '감사합니다', post: '숲길 걷기 장소 변경', time: '어제', flagged: false },
];

const coordinators = [
  { name: '이코디', role: '코디네이터', groups: 'A조, B조', status: '활성' },
  { name: '박코디', role: '코디네이터', groups: 'C조', status: '활성' },
  { name: '김코디', role: '보조 코디', groups: '-', status: '활성' },
];

export function AdminMore() {
  const navigate = useNavigate();
  const { setMode } = useAppContext();
  const [section, setSection] = useState<Section>('menu');
  const [noticeText, setNoticeText] = useState('');

  // === MENU ===
  if (section === 'menu') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
          <h2 className="text-[18px] text-[#111827]">더보기</h2>
          <span className="text-[11px] text-[#9CA3AF]">고라데이 치유마을 관리</span>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
          {/* SaaS: 예약/결제/데이터/체크리포트 */}
          {[
            { key: 'bookings' as const, icon: CreditCard, label: '예약 · 결제 관리', count: 1, color: '#059669', route: '/admin/bookings' },
            { key: 'data' as const, icon: Activity, label: '데이터 수집 통계', count: 4, color: '#DC2626', route: '/admin/data-stats' },
            { key: 'check-review' as const, icon: FileText, label: '체크리포트 검토', count: 2, color: '#0EA5E9', route: '/admin/check-review' },
          ].map(item => (
            <button key={item.key} onClick={() => navigate(item.route)}
              className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '15' }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <span className="text-[14px] text-[#111827] flex-1">{item.label}</span>
              {item.count > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626]">{item.count}</span>}
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
          ))}

          <div className="h-px bg-[#E5E7EB] my-1" />

          {[
            { key: 'notices' as Section, icon: Megaphone, label: '공지사항 관리', count: notices.length, color: '#7C3AED' },
            { key: 'inquiries' as Section, icon: MessageSquare, label: '문의사항 관리', count: inquiries.filter(i => i.status === 'pending').length, color: '#F59E0B' },
            { key: 'comments' as Section, icon: MessageCircle, label: '댓글 관리', count: comments.filter(c => c.flagged).length, color: '#0EA5E9' },
            { key: 'users' as Section, icon: Users, label: '사용자/권한', count: 0, color: '#1B7A4B' },
            { key: 'reports' as Section, icon: BarChart3, label: '리포트 센터', count: 0, color: '#DC2626' },
            { key: 'settings' as Section, icon: Settings, label: '설정 (운영 정책)', count: 0, color: '#6B7280' },
          ].map(item => (
            <button key={item.key} onClick={() => setSection(item.key)}
              className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '15' }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <span className="text-[14px] text-[#111827] flex-1">{item.label}</span>
              {item.count > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626]">{item.count}</span>}
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
          ))}
          <button onClick={() => { setMode('participant'); navigate('/select-role'); }}
            className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-3 text-left mt-2">
            <User size={18} className="text-[#6B7280]" />
            <span className="text-[14px] text-[#111827] flex-1">역할 변경</span>
            <ChevronRight size={14} className="text-[#9CA3AF]" />
          </button>
        </div>
      </div>
    );
  }

  const BackButton = () => (
    <button onClick={() => setSection('menu')} className="w-9 h-9 flex items-center justify-center">
      <ChevronRight size={22} className="text-[#374151] rotate-180" />
    </button>
  );

  // === NOTICES ===
  if (section === 'notices') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <BackButton />
          <h2 className="text-[16px] text-[#111827] flex-1">공지사항 관리</h2>
          <button className="h-8 px-3 bg-[#7C3AED] text-white rounded-[8px] text-[11px] flex items-center gap-1">
            <Plus size={12} /> 작성
          </button>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
          {notices.map(n => (
            <div key={n.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-2 mb-1.5">
                {n.pinned && <Pin size={11} className="text-[#7C3AED] mt-0.5 shrink-0" />}
                <span className="text-[13px] text-[#111827] flex-1">{n.title}</span>
                <OpsStatusBadge status={n.status} size="sm" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF]">
                <span className="px-1.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#7C3AED]">{n.target}</span>
                <span>{n.date}</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                <button className="px-2.5 py-1 bg-[#F3F4F6] rounded-[6px] text-[9px] text-[#374151] flex items-center gap-0.5"><Edit3 size={9} /> 수정</button>
                <button className="px-2.5 py-1 bg-[#F3F4F6] rounded-[6px] text-[9px] text-[#374151] flex items-center gap-0.5"><Pin size={9} /> {n.pinned ? '고정 해제' : '고정'}</button>
                <button className="px-2.5 py-1 bg-[#FEF2F2] rounded-[6px] text-[9px] text-[#DC2626] flex items-center gap-0.5"><Trash2 size={9} /> 삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // === INQUIRIES ===
  if (section === 'inquiries') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <BackButton />
          <h2 className="text-[16px] text-[#111827]">문의사항 관리</h2>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
          {inquiries.map(inq => (
            <TicketCard key={inq.id} id={inq.id} title={inq.title} category={inq.category}
              status={inq.status} priority={inq.priority} assignee={inq.assignee} time={inq.time} />
          ))}
        </div>
      </div>
    );
  }

  // === COMMENTS ===
  if (section === 'comments') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <BackButton />
          <h2 className="text-[16px] text-[#111827]">댓글 관리</h2>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
          {comments.map(c => (
            <div key={c.id} className={`bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${c.flagged ? 'border border-[#DC2626]/30' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] text-[#111827]">{c.author}</span>
                {c.flagged && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626]">신고됨</span>}
                <span className="text-[9px] text-[#9CA3AF] ml-auto">{c.time}</span>
              </div>
              <p className="text-[12px] text-[#374151] mb-1">{c.content}</p>
              <span className="text-[9px] text-[#9CA3AF]">게시글: {c.post}</span>
              <div className="flex gap-1.5 mt-2">
                <button className="px-2.5 py-1 bg-[#F3F4F6] rounded-[6px] text-[9px] text-[#374151] flex items-center gap-0.5"><EyeOff size={9} /> 숨김</button>
                <button className="px-2.5 py-1 bg-[#FEF2F2] rounded-[6px] text-[9px] text-[#DC2626] flex items-center gap-0.5"><Trash2 size={9} /> 삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // === USERS ===
  if (section === 'users') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <BackButton />
          <h2 className="text-[16px] text-[#111827]">사용자/권한</h2>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-3">코디네이터 계정</span>
            {coordinators.map(c => (
              <div key={c.name} className="flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0">
                <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center"><span className="text-[11px] text-[#0EA5E9]">{c.name[0]}</span></div>
                <div className="flex-1">
                  <span className="text-[12px] text-[#111827] block">{c.name}</span>
                  <span className="text-[9px] text-[#9CA3AF]">{c.role} · {c.groups}</span>
                </div>
                <OpsStatusBadge status="normal" label={c.status} size="sm" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-[#7C3AED]" />
              <span className="text-[14px] text-[#111827]">데이터 보안 정책</span>
            </div>
            <p className="text-[11px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>
              참가자 데이터는 동의 범위 내에서만 열람 가능합니다. 보호자 연결은 참가자 승인 후 활성화됩니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // === REPORTS ===
  if (section === 'reports') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <BackButton />
          <h2 className="text-[16px] text-[#111827]">리포트 센터</h2>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-3">코디네이터 체크리포트</span>
            {['3/12(수)', '3/11(화)', '3/10(월)'].map(d => (
              <div key={d} className="flex items-center justify-between py-2 border-t border-[#F3F4F6] first:border-0">
                <span className="text-[12px] text-[#374151]">{d}</span>
                <div className="flex gap-1.5">
                  <OpsStatusBadge status="completed" size="sm" />
                  <OpsStatusBadge status="completed" size="sm" />
                  <OpsStatusBadge status="submitted" size="sm" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full h-[48px] bg-[#7C3AED] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
            <Download size={16} /> 주간 리포트 PDF 생성
          </button>
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-3">운영 성과 요약</span>
            {[
              { label: '프로그램 참여율', value: '82%' },
              { label: '이슈 처리율', value: '75%' },
              { label: '측정 완료율', value: '91%' },
              { label: '체크리포트 제출율', value: '89%' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-t border-[#F3F4F6] first:border-0">
                <span className="text-[12px] text-[#6B7280]">{item.label}</span>
                <span className="text-[13px] text-[#111827]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === SETTINGS ===
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <BackButton />
        <h2 className="text-[16px] text-[#111827]">설정 (운영 정책)</h2>
      </div>
      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {[
          { icon: Megaphone, label: '공지 템플릿 관리', desc: '자주 사용하는 공지 문구를 저장합니다' },
          { icon: MessageSquare, label: '문의 카테고리 관리', desc: '건강/식단/운영/숙소/기타' },
          { icon: Bell, label: '자동 알림 규칙', desc: '측정 누락 2일, 프로그램 불참 2회 시 알림' },
          { icon: Shield, label: '데이터 보관 정책', desc: '캠프 종료 후 90일 보관 (안내용)' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-start gap-3">
            <item.icon size={16} className="text-[#6B7280] mt-0.5" />
            <div>
              <span className="text-[13px] text-[#111827] block">{item.label}</span>
              <span className="text-[11px] text-[#6B7280]">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}