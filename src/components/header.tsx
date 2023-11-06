import { Container, Text } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { Button } from "./button";

import type { User } from "@supabase/supabase-js";

type Props = {
  user: User;
};

export function Header({ user }: Props) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <header>
      <Container h="100%" display="flex">
        <Text>{`${user.email ?? ""}'s notes`}</Text>

        <Button onClick={handleSignOut}>Sign out</Button>
      </Container>
    </header>
  );
}
