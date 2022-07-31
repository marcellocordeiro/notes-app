import {
  Button,
  Container,
  createStyles,
  Group,
  Header as BaseHeader,
  Text,
} from "@mantine/core";
import NextLink from "next/link";

import type { User } from "@supabase/supabase-js";

type Props = {
  user: User;
};

const useStyles = createStyles({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
});

export const Header = ({ user }: Props) => {
  const { classes } = useStyles();

  return (
    <BaseHeader height={60}>
      <Container className={classes.inner}>
        <Text>{`${user.email ?? ""}'s notes`}</Text>

        <Group>
          <Button component={NextLink} href="/api/auth/logout">
            Sign out
          </Button>
        </Group>
      </Container>
    </BaseHeader>
  );
};
