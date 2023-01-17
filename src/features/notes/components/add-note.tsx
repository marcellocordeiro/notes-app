import { TextInput, Space } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { z } from "zod";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";

type Props = {
  userId: string;
};

const schema = z.object({
  content: z.string().min(1),
});

type AddNoteFormData = z.infer<typeof schema>;

export function AddNote({ userId }: Props) {
  const supabaseClient = useSupabaseClient();

  const { mutate } = useSWRConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
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
      <Button onClick={() => setIsOpen(true)}>Add note</Button>

      <Modal title="Add note" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form schema={schema} onSubmit={handleSubmit}>
          {({ register, formState: { errors } }) => (
            <>
              <TextInput
                label="New note"
                autoComplete="off"
                error={errors.content?.message}
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
