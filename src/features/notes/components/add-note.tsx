import { TextInput } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { z } from "zod";
import { toast } from "react-hot-toast";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";

import type { Database } from "@/types/supabase";

type Props = {
  userId: string;
};

const schema = z.object({
  content: z.string().min(1),
});

type AddNoteFormData = z.infer<typeof schema>;

export function AddNote({ userId }: Props) {
  const supabaseClient = useSupabaseClient<Database>();

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
      toast.error(`Error adding note: ${error.message}`);

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
