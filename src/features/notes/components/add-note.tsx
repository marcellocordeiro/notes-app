import { Modal, Button, Group, TextInput, Space } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { Form } from "@/components/form";

import type { Note } from "../types";
import type { User } from "@/features/user";

type Props = {
  user_id: User["id"];
};

type AddNoteFormData = {
  text: string;
};

export const AddNote = ({ user_id }: Props) => {
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
      .from<Note>("notes")
      .insert({ text: formData.text, user_id })
      .single();

    if (error) {
      alert(error.message);
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
                {...register("text", { required: true })}
              />

              <Space h="md" />

              <Button type="submit" loading={isLoading}>
                Add
              </Button>
            </>
          )}
        </Form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add note</Button>
      </Group>
    </>
  );
};
