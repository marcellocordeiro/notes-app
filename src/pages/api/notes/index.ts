import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import type { Note } from "@/features/notes";
import type { Database } from "@/types/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note[]>
) {
  const supabase = createPagesServerClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session == null) {
    return res.status(401);
  }

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .order("created_at");

  if (notes == null) {
    return res.status(404);
  }

  return res.status(200).json(notes);
}
