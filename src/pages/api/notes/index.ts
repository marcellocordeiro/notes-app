import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import type { Note } from "@/features/notes";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<Note[]>) => {
  const supabase = createServerSupabaseClient({ req, res });

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
};

export default handler;
