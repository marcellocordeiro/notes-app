import { TextInput, Space } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";

type Props = {
  userId: string;
};

type AddNoteFormData = {
  content: string;
};

export function AddNote({ userId }: Props) {
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
      <Button onClick={() => setOpened(true)}>Add note</Button>

      <Modal title="Add note" isOpen={opened} onClose={() => setOpened(false)}>
        <Form onSubmit={handleSubmit}>
          {({ register }) => (
            <>
              <TextInput
                label="New note"
                autoComplete="off"
                {...register("content", { required: true })}
              />

              <Space h="md" />

              <Button type="submit" isLoading={isLoading}>
                Add
              </Button>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
