import { createContext, useState, useContext, useMemo } from "react";
import type { FC, PropsWithChildren } from "react";

type ContextType = {
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SelectedIndexContext = createContext<ContextType>({
  selectedIndex: 0,
  setSelectedIndex: () => {},
});

export const SelectedIndexProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const value = useMemo(
    () => ({ selectedIndex, setSelectedIndex }),
    [selectedIndex, setSelectedIndex],
  );

  return (
    <SelectedIndexContext.Provider value={value}>
      {children}
    </SelectedIndexContext.Provider>
  );
};

export const useSelectedIndexContext = () => useContext(SelectedIndexContext);
