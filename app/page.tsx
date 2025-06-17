"use client";
import { Box, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";
import { useState } from "react";
import { unsolvedMatrix } from "./getMatrix";

export default function Home() {
  const [board, setBoard] = useState(unsolvedMatrix);
  const [activeCell, setActiveCell] = useState<number | undefined>();

  return (
    <Grid className="place-items-center p-10">
      <Box className="alig">
        <SudokuGrid
          board={board}
          activeCell={activeCell}
          setActiveCell={(cellId) => setActiveCell(cellId)}
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
