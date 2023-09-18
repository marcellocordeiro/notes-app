import { AppShell } from "@mantine/core";

import { Header } from "@/components/header";

import type { User } from "@/features/user";

interface Props {
  user: User;
  children: React.ReactNode;
}

export function Layout({ user, children }: Props) {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Header user={user} />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
