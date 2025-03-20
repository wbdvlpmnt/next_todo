import { Todo } from "@/types/types";
import React, { createContext, useState, ReactNode } from "react";

interface AppContext {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  idToEdit: number | null;
  setIdToEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [idToEdit, setIdToEdit] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ todos, setTodos, idToEdit, setIdToEdit }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
