"use client";
import { Button, Grid } from "@radix-ui/themes";
import React from "react";

interface Props {
  activeCell: number | undefined;
  board: (number | null)[];
  setBoard: (board: (number | null)[]) => void;
  unsolvedMatrix: (number | null)[];
}

const btnMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, null];

const KeyPad = ({ activeCell, board, setBoard, unsolvedMatrix }: Props) => {
  const inputHandler = (id: number | null) => {
    if (
      (activeCell || activeCell === 0) &&
      unsolvedMatrix[activeCell] === null
    ) {
      const newBoard = [...board];
      newBoard[activeCell] = id;
      setBoard([...newBoard]);
    }
  };

  return (
    <Grid columns="5" gap="2">
      {btnMap.map((id) => (
        <Button
          key={id ? id : "X"}
          size="3"
          color="gray"
          onClick={() => {
            setBoard([...board]);
            inputHandler(id);
          }}
        >
          {id ? id : "X"}
        </Button>
      ))}
    </Grid>
  );
};

export default KeyPad;
