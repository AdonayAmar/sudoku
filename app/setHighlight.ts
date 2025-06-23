import {
  blockMatrix,
  cellSearchIndex,
  colMatrix,
  rowMatrix,
} from "./matrixMap";

export const setHighligh = (
  cellId: number,
  activeCell: number | undefined,
  board: (number | null)[],
  unsolvedMatrix: (number | null)[]
) => {
  const cellRow: number[] = rowMatrix[cellSearchIndex[cellId][0]];
  const cellCol: number[] = colMatrix[cellSearchIndex[cellId][1]];
  const cellBlock: number[] = blockMatrix[cellSearchIndex[cellId][2]];

  if (hasDuplicates(cellRow)) return { backgroundColor: "#e94616" };
  if (hasDuplicates(cellCol)) return { backgroundColor: "#e94616" };
  if (hasDuplicates(cellBlock)) return { backgroundColor: "#e94616" };

  function hasDuplicates(arr: number[]) {
    const seen = arr.filter((e) => e !== cellId);
    for (const item of seen) {
      if (board[cellId] === board[item] && board[cellId]) {
        return true; // Duplicate found
      }
    }
    return false; // No duplicates
  }

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
