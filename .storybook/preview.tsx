import type { Preview } from "@storybook/react";

import { withThemeByClassName } from "@storybook/addon-styling";

import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

import { MantineProvider } from "@mantine/core";

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
    >
      {props.children}
    </MantineProvider>
  );
}

// enhance your stories with decorator that uses ThemeWrapper
export const decorators = [
  (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
  // Adds theme switching support.
  // NOTE: requires setting "darkMode" to "class" in your tailwind config
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
  }),
];
