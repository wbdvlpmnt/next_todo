import { useContext } from "react";
import Button from "./button";
import AppContext from "@/context/appContext";

export default function TodoForm() {
  const context = useContext(AppContext);
  const value = context?.value;
  return (
    <div className="m-2 p-2">
      <h1>Context value is {value}</h1>
      <div>
        <label className="block text-sm font-medium">Input Title</label>
        <input className="block border-2 border-amber-50 rounded-xs p-2 w-full" />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium">Input Description</label>
        <textarea className="block border-2 border-amber-50 rounded-xs p-2 w-full"></textarea>
      </div>
      <Button text="Add Todo" buttonType="button" />
    </div>
  );
}
