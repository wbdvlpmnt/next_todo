import React, { useContext, useEffect } from "react";
import AppContext from "@/context/appContext";
import { ListCard } from "./ListCard";
import { networkRequest } from "@/utils/utils";

export default function TodoList() {
  const context = useContext(AppContext);
  const todosContext = context?.todos;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await networkRequest("/api/getTodos", "GET");
        context?.setTodos(data.todos); // Update the context
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="m-2 p-2">
      <ul className="flex flex-col gap-4  h-100 overflow-auto">
        {todosContext?.map((todo, index) => (
          <ListCard todo={todo} index={index} key={index} />
        ))}
      </ul>
    </div>
  );
}
