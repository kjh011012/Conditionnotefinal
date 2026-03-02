import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserMode = 'participant' | 'guardian' | 'coordinator' | 'admin';

interface AppContextType {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  currentDay: number;
  totalDays: number;
  userName: string;
  /** 보호자가 보는 참가자 */
  participantName: string;
  participantBirth: string;
  campPeriod: string;
  /** 공유 동의 범위 */
  shareScope: 'risk_only' | 'summary' | 'detail';
  setShareScope: (s: 'risk_only' | 'summary' | 'detail') => void;
  /** 어르신 모드 */
  elderMode: boolean;
  setElderMode: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UserMode>('participant');
  const [shareScope, setShareScope] = useState<'risk_only' | 'summary' | 'detail'>('summary');
  const [elderMode, setElderMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        currentDay: 3,
        totalDays: 4,
        userName: '김영숙',
        participantName: '김영숙',
        participantBirth: '1975-08-17',
        campPeriod: '2026.03.10 ~ 2026.03.20',
        shareScope,
        setShareScope,
        elderMode,
        setElderMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
