import { ReactNode } from 'react';

export interface TimingProps {
  title: string;
  time: number;
  setMinutes: (minutes: number) => void;
}

export interface TimerProps {
  focusSubject: string;
  onTimerEnd: (focusSubject: string) => void;
  clearSubject: () => void;
}

export interface CountdownProps {
  minutes: number;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onEnd: (reset: () => void) => void;
}

export interface FocusProps {
  addSubject: (subject: string) => void;
}

export interface FocusHistoryProps {}

export type GlobalContextType = [
  number,
  React.Dispatch<React.SetStateAction<number>>
];

export interface ChildrenType {
  children: ReactNode;
}
