import { Container } from "@mantine/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { Layout } from "@/components/layout";
import { Text } from "@/components/text";

import type { Note } from "@/features/notes";
import type { User } from "@/features/user";
import type { GetServerSideProps, NextPage } from "next";

type Props = {
  user: User;
  note: Note;
};

const NoteById: NextPage<Props> = ({ user, note }) => {
  return (
    <Layout user={user}>
      <Container>
        <Text>{note.content}</Text>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const supabase = createServerSupabaseClient(context);
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

  const id = context.query.id as string;

  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
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

export default NoteById;
