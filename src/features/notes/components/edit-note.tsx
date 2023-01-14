import { TextInput, Space, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useSWRConfig } from "swr";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";

import type { Note } from "../types";

type Props = {
  note: Note;
};

type EditNoteFormData = {
  content: string;
};

export function EditNote({ note }: Props) {
  const supabaseClient = useSupabaseClient();

  const { mutate } = useSWRConfig();

  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setOpened(false);
    setIsLoading(false);
  };

  const handleSubmit = async (formData: EditNoteFormData) => {
    setIsLoading(true);

    const { error } = await supabaseClient
      .from("notes")
      .update({ content: formData.content })
      .eq("id", note.id)
      .single();

    if (error != null) {
      showNotification({
        title: "Error editting note",
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
      <ActionIcon onClick={() => setOpened(true)}>
        <HiOutlinePencil size={16} />
      </ActionIcon>

      <Modal title="Edit note" isOpen={opened} onClose={() => setOpened(false)}>
        <Form
          onSubmit={handleSubmit}
          options={{ defaultValues: { content: note.content } }}
        >
          {({ register }) => (
            <>
              <TextInput
                label="Note"
                autoComplete="off"
                {...register("content", { required: true })}
              />

              <Space h="md" />

              <Button type="submit" isLoading={isLoading}>
                Save
              </Button>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
