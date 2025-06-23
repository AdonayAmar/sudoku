import React, { useState } from "react";
import { Button, Flex, Text, Dialog } from "@radix-ui/themes";
import { FaPauseCircle, FaRegPauseCircle } from "react-icons/fa";

interface Props {
  timeRunning: (running: boolean) => void;
  time: string;
  redoGame: () => void;
  newGame: () => void;
}

const PauseDialog = ({ timeRunning, time, redoGame, newGame }: Props) => {
  const [open, setOpen] = useState(false);
  timeRunning(!open);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog.Root
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <Dialog.Trigger
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <FaRegPauseCircle size={40} />
        ) : (
          <FaPauseCircle size={40} />
        )}
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>PAUSED</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="9" mb="1" weight="bold">
              Time: {time}
            </Text>
          </label>
        </Flex>
        <Flex gap="3" mt="4" mb="3" justify="between">
          <Dialog.Close>
            <Button variant="soft" onClick={redoGame}>
              REDO
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" onClick={newGame}>
              NEW GAME
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft">RESUME</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PauseDialog;
