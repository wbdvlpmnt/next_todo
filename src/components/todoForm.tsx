import React from "react";
import Button from "./button";

export default function TodoForm() {
  return (
    <div className="m-2 p-2">
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
