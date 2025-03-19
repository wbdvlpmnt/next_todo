import { useContext, useEffect, useState } from "react";
import Button from "./button";
import AppContext from "@/context/appContext";

export default function TodoForm() {
  const context = useContext(AppContext);
  const idToEdit = context?.idToEdit;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("editing", idToEdit);
    if (idToEdit) {
      const todo = context?.todos.find((todo) => todo.id === idToEdit);
      console.log("todo", todo);
      if (todo) {
        console.log("setting title and description", todo);
        setTitle(todo.title);
        setDescription(todo.description);
      }
    }
  }, [idToEdit]);

  async function handleAddTodo() {
    try {
      let response;
      if (idToEdit) {
        console.log("editing todo", idToEdit, title, description);
        response = await fetch("/api/editTodos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: idToEdit, title, description }),
        });
      } else {
        response = await fetch("/api/saveTodos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      }

      if (!response.ok) {
        console.error("Failed to add todo");
        console.error(response);
        return;
      }

      // Fetch the updated list of todos from the database
      const fetchResponse = await fetch("/api/getTodos");
      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await fetchResponse.json();
      context?.setTodos(data.todos);

      setTitle("");
      setDescription("");
      context?.setIdToEdit(null);
    } catch (error) {
      console.error("Error posting todo:", error);
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
