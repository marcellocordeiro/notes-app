import { Container } from "@mantine/core";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import { Layout } from "@/components/layout";
import { Text } from "@/components/text";
import { Database } from "@/types/supabase";

import type { Note } from "@/features/notes";
import type { User } from "@/features/user";
import type { GetServerSideProps } from "next";

type Props = {
  user: User;
  note: Note;
};

export default function NoteById({ user, note }: Props) {
  return (
    <Layout user={user}>
      <Container>
        <Text>{note.content}</Text>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  if (typeof context.query.id != "string") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const supabase = createPagesServerClient<Database>(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", context.query.id)
    .single();

  if (note == null) {
    return { notFound: true };
  }

  return {
    props: {
      user: session.user,
      note,
    },
  };
};
