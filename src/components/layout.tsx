import { AppShell } from "@mantine/core";

import { Header } from "@/components/header";

import type { User } from "@/features/user";

interface Props {
  user: User;
  children: React.ReactNode;
}

export function Layout({ user, children }: Props) {
  return (
    <AppShell
      padding="md"
      header={<Header user={user} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
