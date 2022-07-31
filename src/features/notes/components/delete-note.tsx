import { Modal, Button, Space, ActionIcon, Text, Group } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useSWRConfig } from "swr";

import type { Note } from "../types";

type Props = {
  note: Note;
};

export const DeleteNote = ({ note }: Props) => {
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
      .from<Note>("notes")
      .delete()
      .eq("id", note.id);

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
      <Modal
        title="Delete note"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Text>Are you sure do you want to remove this note?</Text>

        <Space h={20} />

        <Group position="right">
          <Button onClick={() => setOpened(false)}>No</Button>
          <Button color="red" loading={isLoading} onClick={handleSubmit}>
            Yes
          </Button>
        </Group>
      </Modal>

      <ActionIcon color="red" onClick={() => setOpened(true)}>
        <HiOutlineTrash size={16} />
      </ActionIcon>
    </>
  );
};
