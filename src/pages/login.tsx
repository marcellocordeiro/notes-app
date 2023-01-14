import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/button";
import { Form } from "@/components/form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const supabaseClient = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: LoginFormData) => {
    const { email, password } = formData;

    setIsLoading(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

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

              <Button type="submit" fullWidth mt="xl" isLoading={isLoading}>
                Sign in
              </Button>
            </>
          )}
        </Form>
      </Paper>
    </Container>
  );
}
