import { Container, Table, ScrollArea, Group, Anchor } from "@mantine/core";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import NextLink from "next/link";
import useSWR from "swr";

import { Layout } from "@/components/layout";
import { Text } from "@/components/text";
import { AddNote, DeleteNote, EditNote } from "@/features/notes";
import { fetcher } from "@/lib/fetcher";

import type { Note } from "@/features/notes";
import type { User } from "@/features/user";
import type { GetServerSideProps } from "next";

type Props = {
  user: User;
};

export default function Notes({ user }: Props) {
  const { data: notes = [] } = useSWR<Note[]>("/api/notes", fetcher);

  const rows = notes.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <Anchor component={NextLink} href={`/notes/${item.id}`}>
            {item.id}
          </Anchor>
        </td>
        <td>
          <Text>{item.user_id}</Text>
        </td>
        <td>
          <Text>{item.content}</Text>
        </td>
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
                <th>
                  <Text>ID</Text>
                </th>
                <th>
                  <Text>User ID</Text>
                </th>
                <th>
                  <Text>Content</Text>
                </th>
                <th>
                  <Text>Actions</Text>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Container>
    </Layout>
  );
}

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
