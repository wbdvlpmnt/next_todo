import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full m-2 p-2 max-h-fit rounded-2xl border-2 border-amber-500">
      {children}
    </div>
  );
}
