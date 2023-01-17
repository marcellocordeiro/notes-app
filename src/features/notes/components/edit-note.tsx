import { TextInput, Space, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useSWRConfig } from "swr";
import { z } from "zod";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";

import type { Note } from "../types";

type Props = {
  note: Note;
};

const schema = z.object({
  content: z.string().min(1),
});

type EditNoteFormData = z.infer<typeof schema>;

export function EditNote({ note }: Props) {
  const supabaseClient = useSupabaseClient();

  const { mutate } = useSWRConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
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
      <ActionIcon onClick={() => setIsOpen(true)}>
        <HiOutlinePencil size={16} />
      </ActionIcon>

      <Modal title="Edit note" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          options={{ defaultValues: { content: note.content } }}
        >
          {({ register, formState: { errors } }) => (
            <>
              <TextInput
                label="Note"
                autoComplete="off"
                error={errors.content?.message}
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
