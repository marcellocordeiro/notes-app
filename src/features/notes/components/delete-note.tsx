import { Space, ActionIcon, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useSWRConfig } from "swr";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { Text } from "@/components/text";

import type { Note } from "../types";

type Props = {
  note: Note;
};

export function DeleteNote({ note }: Props) {
  const supabaseClient = useSupabaseClient();

  const { mutate } = useSWRConfig();

  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setOpened(false);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const { error } = await supabaseClient
      .from("notes")
      .delete()
      .eq("id", note.id);

    if (error != null) {
      showNotification({
        title: "Error deleting note",
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
      <ActionIcon color="red" onClick={() => setOpened(true)}>
        <HiOutlineTrash size={16} />
      </ActionIcon>

      <Modal
        title="Delete note"
        isOpen={opened}
        onClose={() => setOpened(false)}
      >
        <Text>Are you sure do you want to remove this note?</Text>

        <Space h={20} />

        <Group position="right">
          <Button onClick={() => setOpened(false)}>No</Button>
          <Button variant="danger" isLoading={isLoading} onClick={handleSubmit}>
            Yes
          </Button>
        </Group>
      </Modal>
    </>
  );
}
