import { createContext, useMemo, useState } from 'react';
import { GlobalContextType, ChildrenType } from '@/utils/types';

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export default function ContextProvider({ children }: ChildrenType) {
  const [progress, setProgress] = useState<number>(1);

  const value: GlobalContextType = useMemo(
    () => [progress, setProgress],
    [progress]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
