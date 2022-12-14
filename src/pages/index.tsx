import { Container, Table, ScrollArea, Group, Anchor } from "@mantine/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import NextLink from "next/link";
import useSWR from "swr";

import { Layout } from "@/components/layout";
import { AddNote, DeleteNote, EditNote } from "@/features/notes";
import { fetcher } from "@/lib/fetcher";

import type { Note } from "@/features/notes";
import type { User } from "@/features/user";
import type { GetServerSideProps, NextPage } from "next";

type Props = {
  user: User;
};

const Notes: NextPage<Props> = ({ user }) => {
  const { data: notes = [] } = useSWR<Note[]>("/api/notes", fetcher);

  const rows = notes.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <Anchor component={NextLink} href={`/notes/${item.id}`}>
            {item.id}
          </Anchor>
        </td>
        <td>{item.user_id}</td>
        <td>{item.content}</td>
        <td>
          <Group>
            <EditNote note={item} />
            <DeleteNote note={item} />
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Layout user={user}>
      <Container>
        <AddNote userId={user.id} />

        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
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

  return {
    props: {
      user: session.user,
    },
  };
};

export default Notes;
