import { useContext, useState } from "react";
import Button from "./button";
import AppContext from "@/context/appContext";

export default function TodoForm() {
  const context = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleAddTodo() {
    try {
      const response = await fetch("/api/saveTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        console.error("Failed to add todo");
        console.error(response);
        return;
      }

      context?.setTodos((prev) => [...prev, { title, description }]);

      setTitle("");
      setDescription("");
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
