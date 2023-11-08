import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilialContextType {
  filialId: number | null;
  setFilial: (id: number | null) => void;
}

const FilialContext = createContext<FilialContextType | undefined>(undefined);

export const useFilialContext = (): FilialContextType => {
  const context = useContext(FilialContext);
  if (context === undefined) {
    throw new Error('хук используется вне контекста');
  }
  return context;
};

interface FilialProviderProps {
  children: ReactNode;
}

export const FilialProvider = ({ children }: FilialProviderProps) => {
  const [filialId, setFilialId] = useState<number | null>(null);

  const setFilial = (id: number | null) => {
    setFilialId(id);
  };

  return (
    <FilialContext.Provider value={{ filialId, setFilial }}>
      {children}
    </FilialContext.Provider>
  );
};
