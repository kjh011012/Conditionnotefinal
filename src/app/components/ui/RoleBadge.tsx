import type { UserMode } from '../../context/AppContext';

const meta: Record<UserMode, { bg: string; text: string; label: string }> = {
  participant:  { bg: '#E8F5EE', text: '#1B7A4B', label: '참가자' },
  guardian:     { bg: '#FFF1E8', text: '#EA580C', label: '보호자' },
  coordinator:  { bg: '#E0F2FE', text: '#0EA5E9', label: '코디네이터' },
  admin:        { bg: '#F3E8FF', text: '#7C3AED', label: '관리자' },
};

export function RoleBadge({ role }: { role: UserMode }) {
  const m = meta[role];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px]"
      style={{ backgroundColor: m.bg, color: m.text }}>
      {m.label}
    </span>
  );
}
