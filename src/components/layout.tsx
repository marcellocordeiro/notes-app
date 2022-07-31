import { AppShell } from "@mantine/core";
import { User } from "@supabase/supabase-js";

import { Header } from "./header";

type Props = {
  user: User;
  children: React.ReactNode;
};

export const Layout = ({ user, children }: Props) => {
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
};
