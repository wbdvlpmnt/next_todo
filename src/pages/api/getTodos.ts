import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

type Todo = {
  title: string;
  description: string;
};

type Data = {
  todos: Todo[];
};

export default async function readTodos(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ todos: [] });
    return;
  }

  console.log("todos", todos);

  if (todos) {
    res.status(200).json({ todos });
  }
}
