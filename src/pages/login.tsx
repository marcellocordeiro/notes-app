import { Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type LoginFormData = z.infer<typeof schema>;

export default function Login() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: LoginFormData) => {
    const { email, password } = formData;

    setIsLoading(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error != null) {
      toast.error(`Error logging in ${error.message}`);

      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <Container className="my-6 max-w-md">
      <Title align="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form
          className="flex flex-col gap-6"
          schema={schema}
          onSubmit={handleSubmit}
        >
          {({ register, formState: { errors } }) => (
            <>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                error={errors.password?.message}
                {...register("password", { required: true })}
              />

              <Button type="submit" isLoading={isLoading}>
                Sign in
              </Button>
            </>
          )}
        </Form>
      </Paper>
    </Container>
  );
}
