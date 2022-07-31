import { Modal, Button, TextInput, Space, ActionIcon } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useSWRConfig } from "swr";

import { Form } from "@/components/form";

import type { Note } from "../types";

type Props = {
  note: Note;
};

type EditNoteFormData = {
  text: string;
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

    const { error } = await supabaseClient
      .from<Note>("notes")
      .update({ text: formData.text })
      .eq("id", note.id)
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
      <Modal title="Edit note" opened={opened} onClose={() => setOpened(false)}>
        <Form
          onSubmit={handleSubmit}
          options={{ defaultValues: { text: note.text } }}
        >
          {({ register }) => (
            <>
              <TextInput
                label="Note"
                {...register("text", { required: true })}
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
