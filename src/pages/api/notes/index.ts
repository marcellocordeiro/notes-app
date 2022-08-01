import {
  supabaseServerClient,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";

import type { Note } from "@/features/notes";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<Note[]>) => {
  const { data: notes } = await supabaseServerClient({ req, res })
    .from<Note>("notes")
    .select()
    .order("created_at");

  if (notes == null) {
    return res.status(404);
  }

  return res.status(200).json(notes);
};

export default withApiAuth(handler);
