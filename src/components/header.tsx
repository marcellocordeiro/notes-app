import {
  Button,
  Container,
  createStyles,
  Group,
  Header as BaseHeader,
  Text,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import type { User } from "@supabase/supabase-js";

type Props = {
  user: User;
};

const useStyles = createStyles({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
});

export const Header = ({ user }: Props) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { classes } = useStyles();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <BaseHeader height={60}>
      <Container className={classes.inner}>
        <Text>{`${user.email ?? ""}'s notes`}</Text>

        <Group>
          <Button onClick={handleSignOut}>Sign out</Button>
        </Group>
      </Container>
    </BaseHeader>
  );
};
