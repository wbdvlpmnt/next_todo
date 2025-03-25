import { useContext, useEffect, useState } from "react";
import Button from "./button";
import AppContext from "@/context/appContext";
import { networkRequest } from "../utils/utils";

export default function TodoForm() {
  const context = useContext(AppContext);
  const idToEdit = context?.idToEdit;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function updateFormWithItem(idToEdit: number) {
    const todo = context?.todos.find((todo) => todo.id === idToEdit);
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    context?.setIdToEdit(null);
  }

  useEffect(() => {
    if (idToEdit) {
      updateFormWithItem(idToEdit);
    } else {
      resetForm();
    }
  }, [idToEdit]); // Only re-run when idToEdit changes

  async function handleAddTodo() {
    try {
      let response: Response | undefined;
      if (idToEdit) {
        response = await networkRequest("/api/editTodos", "POST", {
          id: idToEdit,
          title,
          description,
        });
      } else {
        response = await networkRequest("/api/saveTodos", "POST", {
          title,
          description,
        });
      }

      const res = await networkRequest("/api/getTodos", "GET");
      const data = await res.json();

      if (data) {
        context?.setTodos(data.todos);
      }

      resetForm();
    } catch (error) {
      console.error("Error Adding todo:", error);
    }
  }

  return (
    <div className="m-2 p-2">
      <div>
        <label className="block text-sm font-medium">Input Title</label>
        <input
          className="block border-2 border-zinc-200 rounded-xs p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium">Input Description</label>
        <textarea
          className="block border-2 border-zinc-200 rounded-xs p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <Button text="Add Todo" buttonType="button" handleClick={handleAddTodo} />
    </div>
  );
}
