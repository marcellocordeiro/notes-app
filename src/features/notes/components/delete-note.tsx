import { ActionIcon, Group } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { useSWRConfig } from "swr";

import { Modal } from "@/components/modal";
import { Text } from "@/components/text";
import { Button } from "@/components/ui/button";

import type { Note } from "../types";
import type { Database } from "@/types/supabase";

interface Props {
  note: Note;
}

export function DeleteNote({ note }: Props) {
  const supabaseClient = useSupabaseClient<Database>();

  const { mutate } = useSWRConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const { error } = await supabaseClient
      .from("notes")
      .delete()
      .eq("id", note.id);

    if (error != null) {
      toast.error(`Error deleting note: ${error.message}`);

      setIsLoading(false);
    } else {
      await mutate("/api/notes");
      handleComplete();
    }
  };

  return (
    <>
      <ActionIcon color="red" onClick={() => setIsOpen(true)}>
        <HiOutlineTrash size={16} />
      </ActionIcon>

      <Modal
        title="Delete note"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Text>Are you sure do you want to remove this note?</Text>

        <Group position="right">
          <Button onClick={() => setIsOpen(false)}>No</Button>
          <Button
            variant="secondary"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Yes
          </Button>
        </Group>
      </Modal>
    </>
  );
}
