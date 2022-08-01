import {
  supabaseServerClient,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";

import type { Note } from "@/features/notes";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  switch (req.method) {
    case "GET": {
      const { data } = await supabaseServerClient({ req, res })
        .from<Note>("notes")
        .select()
        .eq("id", id)
        .single();

      if (data == null) {
        return res.status(404);
      }

      return res.status(200).json(data);
    }

    case "PUT": {
      return res.send(200);
    }

    case "DELETE": {
      return res.send(200);
    }

    default:
      return res.send(404);
  }
};

export default withApiAuth(handler);
