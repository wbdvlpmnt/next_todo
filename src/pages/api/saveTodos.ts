import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

type Data = {
  todos: any[];
};

export default async function saveTodos(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { title, description } = req.body;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: title, description: description }])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({ todos: [] });
  } catch (error) {
    console.error("there was an error:", error);
    res.status(500).json({ todos: [] });
  }
}
