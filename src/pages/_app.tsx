import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

import { Head } from "@/components/head";

import type { Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <Notifications />

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Head title="Notes" />

        <Component {...pageProps} />
      </SessionContextProvider>
    </MantineProvider>
  );
}
