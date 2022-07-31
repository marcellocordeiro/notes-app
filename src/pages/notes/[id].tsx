import { Container, Text } from "@mantine/core";
import { withPageAuth, getUser } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

import { Layout } from "@/components/layout";
import { fetcher } from "@/lib/fetcher";

import type { Note } from "@/features/notes";
import type { User } from "@/features/user";
import type { GetServerSideProps, NextPage } from "next";

type Props = {
  user: User;
  noteId: Note["id"];
};

const NoteById: NextPage<Props> = ({ user, noteId }) => {
  const { data } = useSWR<Note>(`/api/notes/${noteId}`, fetcher);

  return (
    <Layout user={user}>
      <Container>
        <Text>{data?.text}</Text>
      </Container>
    </Layout>
  );
};

const getServerSidePropsHandler: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.id as string;
  const { user } = await getUser(context);

  return { props: { user, noteId: id } };
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  getServerSideProps: getServerSidePropsHandler,
});

export default NoteById;
