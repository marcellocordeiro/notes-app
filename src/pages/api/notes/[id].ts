import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/types/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (typeof req.query.id != "string") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const supabase = createPagesServerClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session == null) {
    return res.status(401);
  }

  switch (req.method) {
    case "GET": {
      const { data } = await supabase
        .from("notes")
        .select("*")
        .eq("id", req.query.id)
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
}
