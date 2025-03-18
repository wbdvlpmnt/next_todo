import React, { useContext, useEffect, useState } from "react";
import Button from "./button";
import { Todo } from "@/types/types";
import AppContext from "@/context/appContext";

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

function ListCard({
  todo,
  index,
}: {
  todo: Todo;
  index: number;
}): React.JSX.Element {
  return (
    <li
      className="flex flex-row justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      key={index}
    >
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {todo.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {todo.description}
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          text="Edit"
          buttonType="button"
          color="bg-orange-400"
          handleClick={() => {}}
        />
        <Button
          text="Delete"
          buttonType="button"
          handleClick={() => {}}
          color="bg-red-400"
        />
      </div>
    </li>
  );
}
