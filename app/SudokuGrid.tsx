"use client";
import { Grid } from "@radix-ui/themes";
import { useState } from "react";
import getMatrix from "./getMatrix";

const matrix = getMatrix();

const blockMatrix: number[][] = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

const cellSearchIndex: [number, number, number][] = [
  // row 0
  [0, 0, 0],
  [0, 1, 0],
  [0, 2, 0],
  [0, 3, 1],
  [0, 4, 1],
  [0, 5, 1],
  [0, 6, 2],
  [0, 7, 2],
  [0, 8, 2],
  // row 1
  [1, 0, 0],
  [1, 1, 0],
  [1, 2, 0],
  [1, 3, 1],
  [1, 4, 1],
  [1, 5, 1],
  [1, 6, 2],
  [1, 7, 2],
  [1, 8, 2],
  // row 2
  [2, 0, 0],
  [2, 1, 0],
  [2, 2, 0],
  [2, 3, 1],
  [2, 4, 1],
  [2, 5, 1],
  [2, 6, 2],
  [2, 7, 2],
  [2, 8, 2],
  // row 3
  [3, 0, 3],
  [3, 1, 3],
  [3, 2, 3],
  [3, 3, 4],
  [3, 4, 4],
  [3, 5, 4],
  [3, 6, 5],
  [3, 7, 5],
  [3, 8, 5],
  // row 4
  [4, 0, 3],
  [4, 1, 3],
  [4, 2, 3],
  [4, 3, 4],
  [4, 4, 4],
  [4, 5, 4],
  [4, 6, 5],
  [4, 7, 5],
  [4, 8, 5],
  // row 5
  [5, 0, 3],
  [5, 1, 3],
  [5, 2, 3],
  [5, 3, 4],
  [5, 4, 4],
  [5, 5, 4],
  [5, 6, 5],
  [5, 7, 5],
  [5, 8, 5],
  // row 6
  [6, 0, 6],
  [6, 1, 6],
  [6, 2, 6],
  [6, 3, 7],
  [6, 4, 7],
  [6, 5, 7],
  [6, 6, 8],
  [6, 7, 8],
  [6, 8, 8],
  // row 7
  [7, 0, 6],
  [7, 1, 6],
  [7, 2, 6],
  [7, 3, 7],
  [7, 4, 7],
  [7, 5, 7],
  [7, 6, 8],
  [7, 7, 8],
  [7, 8, 8],
  // row 8
  [8, 0, 6],
  [8, 1, 6],
  [8, 2, 6],
  [8, 3, 7],
  [8, 4, 7],
  [8, 5, 7],
  [8, 6, 8],
  [8, 7, 8],
  [8, 8, 8],
];

const SudokuGrid = () => {
  const [activeCell, setActiveCell] = useState<number>();
  console.log(activeCell);

  function setHighligh(cellId: number) {
    if (cellId === activeCell) return { backgroundColor: "#ED9F38" };

    if (
      (activeCell || activeCell === 0) &&
      matrix[cellId] === matrix[activeCell]
    )
      return { backgroundColor: "#F4C776" };

    for (let i = 2; i >= 0; i--) {
      if (
        (activeCell || activeCell === 0) &&
        cellSearchIndex[cellId][i] === cellSearchIndex[activeCell][i]
      )
        return { backgroundColor: "#F7EAC6" };
    }
    return { backgroundColor: "white" };
  }

  return (
    // 2D Block Grid Builder
    <Grid columns="3" className="border-3 w-150 h-150">
      {blockMatrix.map((block) => (
        <>
          <Grid columns="3" rows="3" className="border-3">
            {block.map((cellId, id) => (
              <Grid
                key={`${id}`}
                className="border place-items-center content-center"
                style={setHighligh(cellId)}
                onClick={() => setActiveCell(cellId)}
              >
                {matrix[cellId]}
              </Grid>
            ))}
          </Grid>
        </>
      ))}
    </Grid>

    // 1D Grid Builder
    // <Grid rows="9" columns="9" className="border-3 w-150 h-150">
    //   {matrix.map((item, y) => (
    //     <Grid
    //       key={`${y}`}
    //       className="border place-items-center content-center"
    //       style={
    //         activeCell === `${y}`
    //           ? { backgroundColor: "green" }
    //           : { backgroundColor: "white" }
    //       }
    //       onClick={() => setActiveCell(`${y}`)}
    //     >
    //       {y}
    //     </Grid>
    //   ))}
    // </Grid>
  );
};

export default SudokuGrid;
