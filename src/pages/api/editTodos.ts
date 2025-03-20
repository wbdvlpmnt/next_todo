import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

type Data = {
  todos?: [];
  error?: string;
};

export default async function editTodos(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Validate the HTTP method
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }

    // Destructure and validate the request body
    const { id, title, description } = req.body;
    if (!id || !title || !description) {
      return res
        .status(400)
        .json({ error: "ID, title, and description are required" });
    }

    // Update the todo in the database
    const { data, error } = await supabase
      .from("todos")
      .update({ title, description })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    // Return the updated todo
    res.status(200).json({ todos: data });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
}
