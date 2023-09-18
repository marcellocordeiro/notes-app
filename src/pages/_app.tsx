import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";
import { useState } from "react";

import { Head } from "@/components/head";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";

import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <MantineProvider>
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
