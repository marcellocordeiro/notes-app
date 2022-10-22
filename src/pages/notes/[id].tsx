import { Container, Text } from "@mantine/core";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

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

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(context, supabase) {
    const id = context.query.id as string;

    const { data: note } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id)
      .single();

    if (note == null) {
      return { notFound: true };
    }

    return { props: { note } };
  },
});

export default NoteById;
