import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session == null) {
    return res.status(401);
  }

  const id = req.query.id as string;

  switch (req.method) {
    case "GET": {
      const { data } = await supabase
        .from("notes")
        .select("*")
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

export default handler;
