import { Group, TextInput, Space } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";

import type { User } from "@/features/user";

type Props = {
  userId: User["id"];
};

type AddNoteFormData = {
  content: string;
};

export const AddNote = ({ userId }: Props) => {
  const supabaseClient = useSupabaseClient();

  const { mutate } = useSWRConfig();

  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setOpened(false);
    setIsLoading(false);
  };

  const handleSubmit = async (formData: AddNoteFormData) => {
    setIsLoading(true);

    const { error } = await supabaseClient
      .from("notes")
      .insert({ content: formData.content, user_id: userId })
      .single();

    if (error != null) {
      showNotification({
        title: "Error adding note",
        message: error.message,
        color: "red",
      });

      setIsLoading(false);
    } else {
      await mutate("/api/notes");
      handleComplete();
    }
  };

  return (
    <>
      <Modal title="Add note" opened={opened} onClose={() => setOpened(false)}>
        <Form onSubmit={handleSubmit}>
          {({ register }) => (
            <>
              <TextInput
                label="New note"
                autoComplete="off"
                {...register("content", { required: true })}
              />

              <Space h="md" />

              <Button type="submit" loading={isLoading}>
                Add
              </Button>
            </>
          )}
        </Form>
      </Modal>

      <Group>
        <Button onClick={() => setOpened(true)}>Add note</Button>
      </Group>
    </>
  );
};
