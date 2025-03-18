import React, { useContext, useEffect, useState } from "react";
import { Todo } from "@/types/types";
import AppContext from "@/context/appContext";
import { ListCard } from "./ListCard";

export default function TodoList() {
  const context = useContext(AppContext);
  const todosContext = context?.todos;

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/getTodos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todosContext]);

  return (
    <div className="m-2 p-2">
      <ul className="flex flex-col gap-4  h-100 overflow-auto">
        {todos.map((todo, index) => (
          <ListCard todo={todo} index={index} />
        ))}
      </ul>
    </div>
  );
}
