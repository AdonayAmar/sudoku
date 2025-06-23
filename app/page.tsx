"use client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";
import { useEffect, useState } from "react";
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
    setIsRunning(true);
    setTimeReset(true);
  };

  const resetBoard = () => {
    setBoard(unsolvedMatrix);

    setWinner(false);
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

  return (
    <Grid className="place-items-center p-10">
      <Flex>
        <Time
          isRunning={isRunning}
          getTime={(time) => setFormatedTime(time)}
          reset={timeReset}
          setReset={(rest) => setTimeReset(rest)}
        />
        <Box className="pl-100">
          <PauseDialog
            timeRunning={(running) => (!winner ? setIsRunning(running) : null)}
            time={formatedTime}
            redoGame={() => resetBoard()}
            newGame={() => getNewMatrix()}
          />
        </Box>
      </Flex>
      <WinnerDialog
        winner={winner}
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
