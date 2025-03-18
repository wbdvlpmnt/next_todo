import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

type Todo = {
  id: number;
  title: string;
  description: string;
};

type Data = {
  todos?: Todo[];
  error?: string;
  message?: string;
};

export default async function deleteTodos(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;
  console.log("id", id);
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
    return;
  }

  res.status(200).json({ message: "Todo deleted successfully" });
}
