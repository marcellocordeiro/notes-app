import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import { z } from "zod";

import { Form } from "@/components/form";
import { Modal } from "@/components/modal";
import { TextInput } from "@/components/text-input";
import { Button } from "@/components/ui/button";

import type { Database, DatabaseError } from "@/types/supabase";

interface Props {
  userId: string;
}

const schema = z.object({
  content: z.string().min(1),
});

type AddNoteFormData = z.infer<typeof schema>;

export function AddNote({ userId }: Props) {
  const supabaseClient = useSupabaseClient<Database>();

  const { mutate } = useSWRConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: AddNoteFormData) => {
    setIsLoading(true);

    const { error } = await supabaseClient
      .from("notes")
      .insert({ content: formData.content, user_id: userId })
      .single();

    if (error != null) {
      handleError(error);
      return;
    }

    await mutate("/api/notes");
    handleComplete();
  };

  const handleError = (error: DatabaseError) => {
    toast.error(`Error adding note: ${error.message}`);
    setIsLoading(false);
  };

  const handleComplete = () => {
    setIsOpen(false);
    setIsLoading(false);
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

              <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                Add
              </Button>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
