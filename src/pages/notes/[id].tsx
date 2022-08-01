import { Container, Text } from "@mantine/core";
import {
  withPageAuth,
  getUser,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

import { Layout } from "@/components/layout";

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

const getServerSidePropsHandler: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.id as string;
  const { user } = await getUser(context);

  const { data: note } = await supabaseServerClient(context)
    .from<Note>("notes")
    .select()
    .eq("id", id)
    .single();

  if (note == null) {
    return { notFound: true };
  }

  return { props: { user, note } };
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  getServerSideProps: getServerSidePropsHandler,
});

export default NoteById;
