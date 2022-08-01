import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

import { Form } from "@/components/form";

import type { NextPage } from "next";

type LoginFormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: LoginFormData) => {
    const { email, password } = formData;

    setIsLoading(true);

    const { error } = await supabaseClient.auth.signIn({ email, password });

    if (error != null) {
      showNotification({
        title: "Error logging in",
        message: error.message,
        color: "red",
      });

      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form onSubmit={handleSubmit}>
          {({ register }) => (
            <>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...register("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                mt="md"
                {...register("password", { required: true })}
              />

              <Button type="submit" fullWidth mt="xl" loading={isLoading}>
                Sign in
              </Button>
            </>
          )}
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
