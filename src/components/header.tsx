import { Button, Group, Header as BaseHeader, Text } from "@mantine/core";
import NextLink from "next/link";

import type { User } from "@supabase/supabase-js";

type Props = {
  user: User;
};

export const Header = ({ user }: Props) => {
  return (
    <BaseHeader height={60} p="md">
      <Group position="apart">
        <Text>{`${user.email ?? ""}'s notes`}</Text>

        <Button component={NextLink} href="/api/auth/logout">
          Sign out
        </Button>
      </Group>
    </BaseHeader>
  );
};
