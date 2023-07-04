import { Header as HeaderPrimitive } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { Button } from "./button";
import { Text } from "./text";

import type { User } from "@supabase/supabase-js";

import { Container } from "./ui/container";

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
    <HeaderPrimitive height={60}>
      <Container className="flex h-full items-center justify-between">
        <Text>{`${user.email ?? ""}'s notes`}</Text>

        <Button onClick={handleSignOut}>Sign out</Button>
      </Container>
    </HeaderPrimitive>
  );
}
