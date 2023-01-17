import {
  Container,
  createStyles,
  Header as MantineHeader,
  Text,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { Button } from "./button";

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

export function Header({ user }: Props) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { classes } = useStyles();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <MantineHeader height={60}>
      <Container className={classes.inner}>
        <Text>{`${user.email ?? ""}'s notes`}</Text>

        <Button onClick={handleSignOut}>Sign out</Button>
      </Container>
    </MantineHeader>
  );
}
