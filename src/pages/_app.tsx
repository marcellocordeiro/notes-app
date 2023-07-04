import "@/styles/globals.css";

import { MantineProvider } from "@mantine/core";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

import { Head } from "@/components/head";

import type { Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Head title="Notes" />

        <Toaster />
        <Component {...pageProps} />
        <TailwindIndicator />
      </SessionContextProvider>
    </MantineProvider>
  );
}
