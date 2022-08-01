import { Modal, Button, TextInput, Space, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useSWRConfig } from "swr";

import { Form } from "@/components/form";

import { notesTableClient } from "../api/notes-table";

import type { Note } from "../types";

type Props = {
  note: Note;
};

type EditNoteFormData = {
  content: string;
};

export const EditNote = ({ note }: Props) => {
  const { mutate } = useSWRConfig();

  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setOpened(false);
    setIsLoading(false);
  };

  const handleSubmit = async (formData: EditNoteFormData) => {
    setIsLoading(true);

    const { error } = await notesTableClient
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
      <Modal title="Edit note" opened={opened} onClose={() => setOpened(false)}>
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

              <Button type="submit" loading={isLoading}>
                Save
              </Button>
            </>
          )}
        </Form>
      </Modal>

      <ActionIcon onClick={() => setOpened(true)}>
        <HiOutlinePencil size={16} />
      </ActionIcon>
    </>
  );
};
