import { Button, type ButtonProps, buttonVariants } from "./button";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Secondary: Story = {
  args: {
    children: "Button",
  },
};

export const BUTTON_VARIANTS: ButtonProps["variant"][] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "link",
];

export const BUTTON_SIZES: ButtonProps["size"][] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

export function Colors() {
  return (
    <div style={{ padding: 40, backgroundColor: "rgba(0,0,0,0.1)" }}>
      {BUTTON_VARIANTS.map((variant) => {
        return (
          <div key={variant} className="flex items-center gap-4">
            {BUTTON_SIZES.map((size) => {
              return (
                <Button key={size} variant={variant} size={size}>
                  {`${variant} ${size}`}
                </Button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function States() {
  const theme = useMantineTheme();

  const sharedStyles: CSSProperties = {
    padding: "10px 20px",
    border: `1px solid ${
      theme.colorScheme === "light"
        ? theme.colors.gray[1]
        : theme.colors.dark[6]
    }`,
  };

  const states = [
    {
      name: "enabled",
      props: undefined,
    },
    {
      name: "disabled",
      props: {
        disabled: true,
      },
    },
    {
      name: "loading",
      props: {
        loading: true,
      },
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <table
        style={{
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                ...sharedStyles,
              }}
            >
              &nbsp;
            </th>

            {BUTTON_VARIANTS.map((variant) => (
              <th
                key={variant}
                style={{
                  ...sharedStyles,
                }}
              >
                {variant}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state.name}>
              <td
                style={{
                  ...sharedStyles,
                }}
              >
                {state.name}
              </td>

              {BUTTON_VARIANTS.map((variant) => (
                <td
                  key={variant}
                  style={{
                    ...sharedStyles,
                  }}
                >
                  <Center>
                    <Button variant={variant} {...state.props}>
                      {state.name}
                    </Button>
                  </Center>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * All buttons should be disabled
 */
export function StatesInFieldsetDisabled() {
  return (
    <fieldset disabled>
      <States />
    </fieldset>
  );
}
export function CustomComponent() {
  return (
    <div style={{ padding: 40 }}>
      <Button component="a" href="https://mantine.dev">
        Anchor
      </Button>
    </div>
  );
}

export function WithIcon() {
  return (
    <Group style={{ padding: 40 }}>
      <Button rightIcon={<IconExternalLink />}>Right icon</Button>
      <Button leftIcon={<IconExternalLink />}>LeftIcon</Button>
      <Button leftIcon={<IconExternalLink />} rightIcon={<IconExternalLink />}>
        Both icons
      </Button>
    </Group>
  );
}

export function Groups() {
  return (
    <div style={{ padding: 40 }}>
      <Button.Group>
        <Button variant="default">First</Button>
        <Button variant="default">Second</Button>
        <Button variant="default">Third</Button>
        <Button variant="default">Forth</Button>
        <Button variant="default">Last</Button>
      </Button.Group>
      <Button.Group mt="xl" orientation="vertical">
        <Button variant="default">First</Button>
        <Button variant="default">Second</Button>
        <Button variant="default">Third</Button>
        <Button variant="default">Forth</Button>
        <Button variant="default">Last</Button>
      </Button.Group>
    </div>
  );
}

export function ColorsIndex() {
  return (
    <Group m={50}>
      <Button color="green.6">Filled</Button>
      <Button color="green.6" variant="default">
        Default
      </Button>
      <Button color="green.6" variant="white">
        White
      </Button>
      <Button color="green.6" variant="light">
        Light
      </Button>
      <Button color="green.6" variant="outline">
        Outline
      </Button>
      <Button color="green.6" variant="gradient">
        Gradient
      </Button>
    </Group>
  );
}

export function HoverStyles() {
  return (
    <div style={{ padding: 40 }}>
      <Button
        sx={{
          "&:hover": { background: "red" },
        }}
      >
        Button
      </Button>
      <Button loading>Button</Button>
      <Button disabled>Button</Button>
    </div>
  );
}
