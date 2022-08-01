import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";

import { Head } from "@/components/head";

import type { AppProps } from "next/app";

type MantineProvidersProps = {
  children: React.ReactNode;
};

const MantineProviders = ({ children }: MantineProvidersProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <NotificationsProvider>{children}</NotificationsProvider>
    </MantineProvider>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProviders>
      <UserProvider supabaseClient={supabaseClient}>
        <Head title="Notes" />

        <Component {...pageProps} />
      </UserProvider>
    </MantineProviders>
  );
};

export default App;
