import {
  withApiAuth,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

import type { Note } from "@/features/notes";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<Note[]>) => {
  const { data } = await supabaseServerClient({ req, res })
    .from<Note>("notes")
    .select("*");

  if (data == null) {
    return res.status(404);
  }

  return res.status(200).json(data);
};

export default withApiAuth(handler);
