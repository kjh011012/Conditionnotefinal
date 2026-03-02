/**
 * VillageContext — 멀티 테넌트 마을/참여/모드 관리
 * NORMAL_MODE ↔ VILLAGE_MODE 자동 전환
 */
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

/* ── Types ── */
export interface Village {
  id: string;
  name: string;
  logo: string; // emoji or URL
  primaryColor: string;
  secondaryColor: string;
  region: string;
  description: string;
}

export interface Program {
  id: string;
  villageId: string;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  enrolled: number;
  status: 'upcoming' | 'active' | 'completed';
  includes: string[];
  purpose: string[];
}

export type ParticipationStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
export type ReservationStatus = 'temp' | 'payment_pending' | 'paid' | 'cancelled' | 'refunded';

export interface Participation {
  id: string;
  userId: string;
  villageId: string;
  programId: string;
  startDate: string;
  endDate: string;
  status: ParticipationStatus;
  reservationStatus: ReservationStatus;
}

export type AppMode = 'NORMAL_MODE' | 'VILLAGE_MODE';

export interface CoordinatorInfo {
  name: string;
  photo: string;
  phone: string;
  workHours: string;
}

interface VillageContextType {
  /* Data */
  villages: Village[];
  programs: Program[];
  participations: Participation[];
  /* Current state */
  appMode: AppMode;
  activeParticipation: Participation | null;
  activeVillage: Village | null;
  activeProgram: Program | null;
  coordinator: CoordinatorInfo;
  /* Actions */
  enterVillage: (participationId: string) => void;
  exitVillage: () => void;
  getDaysRemaining: () => number;
  getProgressPercent: () => number;
  /* Helpers */
  getVillage: (id: string) => Village | undefined;
  getProgram: (id: string) => Program | undefined;
  getActiveParticipations: () => Participation[];
  getPastParticipations: () => Participation[];
  getUpcomingParticipations: () => Participation[];
}

const VillageContext = createContext<VillageContextType | undefined>(undefined);

/* ── Mock Data ── */
const VILLAGES: Village[] = [
  { id: 'v1', name: '고라데이 치유마을', logo: '🏔️', primaryColor: '#1B7A4B', secondaryColor: '#E8F5EE', region: '강원도 횡성', description: '자연 속에서 몸과 마음의 균형을 찾는 힐링 공간' },
  { id: 'v2', name: '해솔 치유마을', logo: '🌊', primaryColor: '#0EA5E9', secondaryColor: '#E0F2FE', region: '전남 완도', description: '바다와 숲이 만나는 해양 치유 프로그램' },
  { id: 'v3', name: '들꽃 치유마을', logo: '🌸', primaryColor: '#EC4899', secondaryColor: '#FCE7F3', region: '경북 예천', description: '사계절 꽃과 함께하는 정서 안정 프로그램' },
  { id: 'v4', name: '솔바람 치유마을', logo: '🌲', primaryColor: '#059669', secondaryColor: '#D1FAE5', region: '충북 제천', description: '편백숲 치유와 명상 중심 프로그램' },
  { id: 'v5', name: '달빛 치유마을', logo: '🌙', primaryColor: '#7C3AED', secondaryColor: '#F3E8FF', region: '전북 무주', description: '밤하늘 아래 수면 개선과 스트레스 관리' },
];

const PROGRAMS: Program[] = [
  { id: 'p1', villageId: 'v1', name: '3월 치유캠프', startDate: '2026-03-10', endDate: '2026-03-17', price: 890000, capacity: 25, enrolled: 18, status: 'active', includes: ['식단', '숙소', '프로그램'], purpose: ['수면', '스트레스'] },
  { id: 'p2', villageId: 'v1', name: '4월 봄맞이 캠프', startDate: '2026-04-07', endDate: '2026-04-14', price: 950000, capacity: 25, enrolled: 8, status: 'upcoming', includes: ['식단', '숙소', '프로그램'], purpose: ['리듬', '인지'] },
  { id: 'p3', villageId: 'v2', name: '해양 치유 3기', startDate: '2026-03-20', endDate: '2026-03-27', price: 1100000, capacity: 20, enrolled: 14, status: 'upcoming', includes: ['식단', '숙소', '프로그램', '해양 체험'], purpose: ['스트레스', '사회활동'] },
  { id: 'p4', villageId: 'v3', name: '꽃길 힐링 프로그램', startDate: '2026-04-15', endDate: '2026-04-22', price: 780000, capacity: 15, enrolled: 5, status: 'upcoming', includes: ['식단', '숙소', '프로그램'], purpose: ['정서', '사회활동'] },
  { id: 'p5', villageId: 'v4', name: '편백숲 명상캠프', startDate: '2026-05-01', endDate: '2026-05-08', price: 820000, capacity: 20, enrolled: 3, status: 'upcoming', includes: ['식단', '숙소', '프로그램'], purpose: ['수면', '스트레스'] },
  { id: 'p6', villageId: 'v1', name: '2월 동계 힐링', startDate: '2026-02-10', endDate: '2026-02-17', price: 850000, capacity: 25, enrolled: 22, status: 'completed', includes: ['식단', '숙소', '프로그램'], purpose: ['수면', '리듬'] },
  { id: 'p7', villageId: 'v5', name: '달빛 수면캠프', startDate: '2026-03-25', endDate: '2026-04-01', price: 920000, capacity: 18, enrolled: 10, status: 'upcoming', includes: ['식단', '숙소', '프로그램', '수면 측정'], purpose: ['수면'] },
];

const PARTICIPATIONS: Participation[] = [
  { id: 'pt1', userId: 'u1', villageId: 'v1', programId: 'p1', startDate: '2026-03-10', endDate: '2026-03-17', status: 'active', reservationStatus: 'paid' },
  { id: 'pt2', userId: 'u1', villageId: 'v2', programId: 'p3', startDate: '2026-03-20', endDate: '2026-03-27', status: 'confirmed', reservationStatus: 'paid' },
  { id: 'pt3', userId: 'u1', villageId: 'v1', programId: 'p6', startDate: '2026-02-10', endDate: '2026-02-17', status: 'completed', reservationStatus: 'paid' },
];

const COORDINATOR: CoordinatorInfo = {
  name: '이수진 코디네이터',
  photo: '👩‍⚕️',
  phone: '010-1234-5678',
  workHours: '08:00~20:00',
};

export function VillageProvider({ children }: { children: ReactNode }) {
  const [currentParticipationId, setCurrentParticipationId] = useState<string | null>('pt1');

  const activeParticipation = useMemo(
    () => PARTICIPATIONS.find(p => p.id === currentParticipationId && p.status === 'active') || null,
    [currentParticipationId]
  );

  const appMode: AppMode = activeParticipation ? 'VILLAGE_MODE' : 'NORMAL_MODE';

  const activeVillage = useMemo(
    () => (activeParticipation ? VILLAGES.find(v => v.id === activeParticipation.villageId) || null : null),
    [activeParticipation]
  );

  const activeProgram = useMemo(
    () => (activeParticipation ? PROGRAMS.find(p => p.id === activeParticipation.programId) || null : null),
    [activeParticipation]
  );

  function enterVillage(participationId: string) {
    setCurrentParticipationId(participationId);
  }

  function exitVillage() {
    setCurrentParticipationId(null);
  }

  function getDaysRemaining() {
    if (!activeParticipation) return 0;
    const end = new Date(activeParticipation.endDate);
    const now = new Date('2026-03-02'); // simulated today
    return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }

  function getProgressPercent() {
    if (!activeParticipation) return 0;
    const start = new Date(activeParticipation.startDate).getTime();
    const end = new Date(activeParticipation.endDate).getTime();
    const now = new Date('2026-03-02').getTime();
    if (now < start) return 0;
    if (now > end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
  }

  function getActiveParticipations() {
    return PARTICIPATIONS.filter(p => p.status === 'active');
  }

  function getPastParticipations() {
    return PARTICIPATIONS.filter(p => p.status === 'completed');
  }

  function getUpcomingParticipations() {
    return PARTICIPATIONS.filter(p => p.status === 'confirmed');
  }

  return (
    <VillageContext.Provider value={{
      villages: VILLAGES,
      programs: PROGRAMS,
      participations: PARTICIPATIONS,
      appMode,
      activeParticipation,
      activeVillage,
      activeProgram,
      coordinator: COORDINATOR,
      enterVillage,
      exitVillage,
      getDaysRemaining,
      getProgressPercent,
      getVillage: (id) => VILLAGES.find(v => v.id === id),
      getProgram: (id) => PROGRAMS.find(p => p.id === id),
      getActiveParticipations,
      getPastParticipations,
      getUpcomingParticipations,
    }}>
      {children}
    </VillageContext.Provider>
  );
}

export function useVillage() {
  const ctx = useContext(VillageContext);
  if (!ctx) throw new Error('useVillage must be used within VillageProvider');
  return ctx;
}
