"use client";
import { Box, Button, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";
import { useState } from "react";
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
  const [start, setStart] = useState(true);
  const [savedTime, setSavedTime] = useState("0:00");

  const handleMatrix = () => {
    const newMatrix = getMatrix();
    setMatrix(newMatrix);

    const newUnsolvedMatrix = getUnsolvedMatrix(newMatrix);
    setUnsolvedMatrix(newUnsolvedMatrix);

    setBoard(newUnsolvedMatrix);
  };

  const handleBoard = (cellId: number) => {
    setActiveCell(cellId);
    if (
      !board.includes(null) &&
      JSON.stringify(board) === JSON.stringify(matrix)
    )
      setStart(false);
  };

  return (
    <Grid className="place-items-center p-10">
      <Button onClick={() => handleMatrix()}>New Sudoku</Button>
      <Time isRunning={start} getTime={(time) => setSavedTime(time)} />
      <WinnerDialog gameEnd={start} time={savedTime} />
      <Box className="alig">
        <SudokuGrid
          board={board}
          activeCell={activeCell}
          unsolvedMatrix={unsolvedMatrix}
          setActiveCell={(cellId) => handleBoard(cellId)}
        />
        <Box className="p-3">
          <InputPad
            activeCell={activeCell}
            board={board}
            setBoard={(board) => setBoard(board)}
            unsolvedMatrix={unsolvedMatrix}
          />
        </Box>
      </Box>
    </Grid>
  );
}
