import { MantineProvider } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </MantineProvider>
  );
};

export default App;
