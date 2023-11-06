import { Container, Table, Group, Anchor } from "@mantine/core";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
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

        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text>ID</Text>
                </Table.Th>

                <Table.Th>
                  <Text>User ID</Text>
                </Table.Th>

                <Table.Th>
                  <Text>Content</Text>
                </Table.Th>

                <Table.Th>
                  <Text>Actions</Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const supabase = createPagesServerClient(context);
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
