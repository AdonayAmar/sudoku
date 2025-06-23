"use client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";
import { useCallback, useEffect, useState } from "react";
import getMatrix, { getUnsolvedMatrix } from "./getMatrix";
import Time from "./Time";
import WinnerDialog from "./WinnerDialog";
import PauseDialog from "./PauseDialog";

export default function Home() {
  const [matrix, setMatrix] = useState<number[]>(getMatrix());
  const [unsolvedMatrix, setUnsolvedMatrix] = useState<(number | null)[]>(
    getUnsolvedMatrix(matrix)
  );

  const [board, setBoard] = useState(unsolvedMatrix);
  const [activeCell, setActiveCell] = useState<number | undefined>();
  const [isRunning, setIsRunning] = useState(true);
  const [formatedTime, setFormatedTime] = useState("0:00");
  const [timeReset, setTimeReset] = useState(false);
  const [winner, setWinner] = useState(false);

  const getNewMatrix = () => {
    const newMatrix = getMatrix();
    setMatrix(newMatrix);

    const newUnsolvedMatrix = getUnsolvedMatrix(newMatrix);
    setUnsolvedMatrix(newUnsolvedMatrix);

    setBoard(newUnsolvedMatrix);

    setWinner(false);
    setActiveCell(undefined);
    setIsRunning(true);
    setTimeReset(true);
  };

  const resetBoard = () => {
    setBoard(unsolvedMatrix);

    setWinner(false);
    setActiveCell(undefined);
    setIsRunning(true);
    setTimeReset(true);
  };

  useEffect(() => {
    if (
      !board.includes(null) &&
      JSON.stringify(board) === JSON.stringify(matrix)
    ) {
      setWinner(true);
      setIsRunning(false);
    }
  }, [board, matrix]);

  const handleArrowKeydownn = useCallback(
    (event: KeyboardEvent) => {
      const rowLeftEdge = [0, 9, 18, 27, 36, 45, 54, 63, 72];
      const rowRightEdge = [8, 17, 26, 35, 44, 53, 62, 71, 80];

      console.log("Global key pressed:", event.key);
      if (activeCell || activeCell === 0) {
        switch (event.key) {
          case "ArrowUp":
            if (activeCell - 9 >= 0) setActiveCell(activeCell - 9);
            break;
          case "ArrowDown":
            if (activeCell + 9 <= 80) setActiveCell(activeCell + 9);
            break;
          case "ArrowLeft":
            if (activeCell - 1 >= 0 && !rowRightEdge.includes(activeCell - 1))
              setActiveCell(activeCell - 1);
            break;
          case "ArrowRight":
            if (activeCell + 1 <= 80 && !rowLeftEdge.includes(activeCell + 1))
              setActiveCell(activeCell + 1);
            break;
        }
      }
      console.log(activeCell);
    },
    [activeCell]
  ); // Empty dependency array ensures the callback is stable

  useEffect(() => {
    window.addEventListener("keydown", handleArrowKeydownn);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleArrowKeydownn);
    };
  }, [handleArrowKeydownn]); // Dependency array ensures effect re-runs if callback changes

  return (
    <Grid className="place-items-center">
      <Box className="space-y-3">
        <Flex className="pt-3 " justify="between">
          <Time
            isRunning={isRunning}
            getTime={(time) => setFormatedTime(time)}
            reset={timeReset}
            setReset={(rest) => setTimeReset(rest)}
          />
          <PauseDialog
            timeRunning={(running) => (!winner ? setIsRunning(running) : null)}
            time={formatedTime}
            redoGame={() => resetBoard()}
            newGame={() => getNewMatrix()}
          />
        </Flex>

        <SudokuGrid
          board={board}
          activeCell={activeCell}
          unsolvedMatrix={unsolvedMatrix}
          setActiveCell={(cellId) => {
            setActiveCell(cellId);
          }}
        />

        <InputPad
          activeCell={activeCell}
          board={board}
          setBoard={(board) => {
            setBoard(board);
          }}
          unsolvedMatrix={unsolvedMatrix}
        />
      </Box>
      <WinnerDialog
        winner={winner}
        time={formatedTime}
        redoGame={() => resetBoard()}
        newGame={() => getNewMatrix()}
      />
    </Grid>
  );
}
