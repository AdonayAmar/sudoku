import { cellSearchIndex, unsolvedMatrix } from "./getBoard";

export const setHighligh = (
  cellId: number,
  activeCell: number | undefined,
  board: (number | null)[]
) => {
  if (cellId === activeCell) return { backgroundColor: "#ED9F38" };

  if (
    (activeCell || activeCell === 0) &&
    board[cellId] !== null &&
    board[cellId] === board[activeCell]
  )
    return { backgroundColor: "#F4C776" };

  for (let i = 2; i >= 0; i--) {
    if (
      (activeCell || activeCell === 0) &&
      cellSearchIndex[cellId][i] === cellSearchIndex[activeCell][i]
    )
      return { backgroundColor: "#F7EAC6" };
  }

  if (unsolvedMatrix[cellId] !== null) return { backgroundColor: "#DFDFDF" };

  return { backgroundColor: "white" };
};
