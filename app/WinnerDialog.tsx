import { Button, Flex, Text, Dialog } from "@radix-ui/themes";
import React from "react";

interface Props {
  winner: boolean;
  time: string;
  redoGame: () => void;
  newGame: () => void;
}

const WinnerDialog = ({ winner, time, redoGame, newGame }: Props) => {
  return (
    <Dialog.Root open={winner}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>WINNER</Dialog.Title>

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
              RETRY
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" onClick={newGame}>
              NEW GAME
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default WinnerDialog;
