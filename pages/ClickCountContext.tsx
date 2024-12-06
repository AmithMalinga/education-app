import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface ClickCountContextType {
  clickCount: number;
  incrementCount: () => void;
}

// Create the context
const ClickCountContext = createContext<ClickCountContextType | undefined>(undefined);

// Create a Provider component
interface ClickCountProviderProps {
  children: ReactNode;
}

export const ClickCountProvider: React.FC<ClickCountProviderProps> = ({ children }) => {
  const [clickCount, setClickCount] = useState<number>(0);

  const incrementCount = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <ClickCountContext.Provider value={{ clickCount, incrementCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

// Custom hook to use the context
export const useClickCount = (): ClickCountContextType => {
  const context = useContext(ClickCountContext);
  if (!context) {
    throw new Error('useClickCount must be used within a ClickCountProvider');
  }
  return context;
};
