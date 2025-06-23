"use client";
import { Box, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";
import { useEffect, useState } from "react";
import getMatrix, { getUnsolvedMatrix } from "./getMatrix";
import Time from "./Time";
import WinnerDialog from "./WinnerDialog";

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

  const getNewMatrix = () => {
    const newMatrix = getMatrix();
    setMatrix(newMatrix);

    const newUnsolvedMatrix = getUnsolvedMatrix(newMatrix);
    setUnsolvedMatrix(newUnsolvedMatrix);

    setBoard(newUnsolvedMatrix);

    setIsRunning(true);
    setTimeReset(true);
  };

  const resetBoard = () => {
    setBoard(unsolvedMatrix);

    setIsRunning(true);
    setTimeReset(true);
  };

  useEffect(() => {
    if (
      !board.includes(null) &&
      JSON.stringify(board) === JSON.stringify(matrix)
    ) {
      setIsRunning(false);
    }
  }, [board, matrix]);

  return (
    <Grid className="place-items-center p-10">
      <Time
        isRunning={isRunning}
        getTime={(time) => setFormatedTime(time)}
        reset={timeReset}
        setReset={(rest) => setTimeReset(rest)}
      />
      <WinnerDialog
        gameRunning={isRunning}
        time={formatedTime}
        redoGame={() => resetBoard()}
        newGame={() => getNewMatrix()}
      />
      <Box className="alig">
        <SudokuGrid
          board={board}
          activeCell={activeCell}
          unsolvedMatrix={unsolvedMatrix}
          setActiveCell={(cellId) => {
            setActiveCell(cellId);
          }}
        />
        <Box className="p-3">
          <InputPad
            activeCell={activeCell}
            board={board}
            setBoard={(board) => {
              setBoard(board);
            }}
            unsolvedMatrix={unsolvedMatrix}
          />
        </Box>
      </Box>
    </Grid>
  );
}
