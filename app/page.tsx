"use client";
import { Box, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";
import { useState } from "react";
import { matrix, unsolvedMatrix } from "./getMatrix";

import Time from "./Time";
import WinnerDialog from "./WinnerDialog";

export default function Home() {
  const [board, setBoard] = useState(unsolvedMatrix);
  const [activeCell, setActiveCell] = useState<number | undefined>();
  const [start, setStart] = useState(true);

  const handleBoard = (cellId: number) => {
    setActiveCell(cellId);
    if (JSON.stringify(board) === JSON.stringify(matrix)) setStart(false);
  };

  return (
    <Grid className="place-items-center p-10">
      <Time isRunning={start} />
      <WinnerDialog gameEnd={start} />
      <Box className="alig">
        <SudokuGrid
          board={board}
          activeCell={activeCell}
          setActiveCell={(cellId) => handleBoard(cellId)}
        />
        <Box className="p-3">
          <InputPad
            activeCell={activeCell}
            board={board}
            setBoard={(board) => setBoard(board)}
          />
        </Box>
      </Box>
    </Grid>
  );
}
