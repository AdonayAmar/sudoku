"use client";
import { Button, Grid } from "@radix-ui/themes";
import React, { useCallback, useEffect } from "react";

interface Props {
  activeCell: number | undefined;
  board: (number | null)[];
  setBoard: (board: (number | null)[]) => void;
  unsolvedMatrix: (number | null)[];
}

const btnMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, null];

const KeyPad = ({ activeCell, board, setBoard, unsolvedMatrix }: Props) => {
  const inputHandler = useCallback(
    (id: number | null) => {
      console.log(id);
      if (
        (activeCell || activeCell === 0) &&
        unsolvedMatrix[activeCell] === null
      ) {
        const newBoard = [...board];
        newBoard[activeCell] = id;
        setBoard([...newBoard]);
      }
    },
    [activeCell, board, setBoard, unsolvedMatrix]
  );

  const disableCheck = (id: number) => {
    let count = 0;
    board.forEach((cell) => (cell === id ? count++ : null));
    if (count > 8) return true;
    return false;
  };

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log("Global key pressed:", event.key);
      const key =
        event.key === "Backspace" || event.key === "Delete"
          ? null
          : parseInt(event.key);
      if (btnMap.includes(key)) {
        console.log(key);
        setBoard([...board]);
        inputHandler(key);
      }
    },
    [board, inputHandler, setBoard]
  ); // Empty dependency array ensures the callback is stable

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]); // Dependency array ensures effect re-runs if callback changes

  return (
    <Grid columns="5" gap="2">
      {btnMap.map((id) => (
        <Button
          key={id ? id : "X"}
          size="3"
          color="gray"
          variant={id && disableCheck(id) ? "soft" : "solid"}
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
