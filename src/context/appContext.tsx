import React, { createContext, useState, ReactNode } from "react";

interface AppContext {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>("test");

  return (
    <AppContext.Provider value={{ value, setValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
