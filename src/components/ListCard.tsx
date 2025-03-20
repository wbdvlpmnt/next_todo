import { Todo } from "@/types/types";
import Button from "./button";
import AppContext from "@/context/appContext";
import { useContext } from "react";

export function ListCard({
  todo,
  index,
}: {
  todo: Todo;
  index: number;
}): React.JSX.Element {
  const context = useContext(AppContext);

  async function handleEdit(id: number | undefined) {
    if (id === undefined) {
      console.error("No id provided to edit");
      return;
    }
    if (id) {
      console.log("Edit todo", id);
      context?.setIdToEdit(id);
    }
  }

  async function handleDelete(id: number | undefined) {
    if (id === undefined) {
      console.error("No id provided to delete todo");
      return;
    }
    try {
      const response = await fetch("/api/deleteTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      console.log("Todo deleted successfully");
      context?.setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <li
      className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
          handleClick={() => handleEdit(todo.id)}
        />
        <Button
          text="Delete"
          buttonType="button"
          handleClick={() => handleDelete(todo.id)}
          color="bg-red-400"
        />
      </div>
    </li>
  );
}
