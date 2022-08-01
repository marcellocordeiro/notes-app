import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

import type { Note } from "../types";

export const notesTableClient = supabaseClient.from<Note>("notes");

export const notesTableServer = (
  ...args: Parameters<typeof supabaseServerClient>
) => supabaseServerClient(...args).from<Note>("notes");
