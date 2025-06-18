// sudoku.ts

const SIZE = 9;
const BOX = 3;

// Fisher–Yates shuffle
const shuffle = <T>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function getMatrix(): number[] {
  // 9×9 grid of zeros
  const grid: number[][] = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(0)
  );

  // track used numbers
  const rowsUsed = Array.from({ length: SIZE }, () => new Set<number>());
  const colsUsed = Array.from({ length: SIZE }, () => new Set<number>());
  const boxesUsed = Array.from({ length: SIZE }, () => new Set<number>());

  const boxIndex = (r: number, c: number) =>
    Math.floor(r / BOX) * BOX + Math.floor(c / BOX);

  // backtracking fill of grid
  const backtrack = (cell = 0): boolean => {
    if (cell === SIZE * SIZE) return true;

    const r = Math.floor(cell / SIZE);
    const c = cell % SIZE;
    const b = boxIndex(r, c);

    for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (
        !rowsUsed[r].has(num) &&
        !colsUsed[c].has(num) &&
        !boxesUsed[b].has(num)
      ) {
        grid[r][c] = num;
        rowsUsed[r].add(num);
        colsUsed[c].add(num);
        boxesUsed[b].add(num);

        if (backtrack(cell + 1)) return true;

        // undo
        grid[r][c] = 0;
        rowsUsed[r].delete(num);
        colsUsed[c].delete(num);
        boxesUsed[b].delete(num);
      }
    }
    return false;
  };

  if (!backtrack()) {
    throw new Error("Failed to generate a valid Sudoku");
  }

  // flatten to a single 1D array of length 81
  return grid.flat();
}

export function getUnsolvedMatrix(matrix: number[]): (number | null)[] {
  const newMatrix: (number | null)[] = copyToNumberOrNullArray(matrix);
  for (let i = 0; i < 40; i++) {
    const cell = Math.floor(Math.random() * (80 - 0 + 1) + 0);
    if (newMatrix[cell] === null) {
      i--;
    } else {
      newMatrix[cell] = null;
    }
  }
  return newMatrix;
}

function copyToNumberOrNullArray(arr: number[]): (number | null)[] {
  return arr.map((num) => num);
}
