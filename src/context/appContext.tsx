import { Todo } from "@/types/types";
import React, { createContext, useState, ReactNode } from "react";

interface AppContext {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <AppContext.Provider value={{ todos, setTodos }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
