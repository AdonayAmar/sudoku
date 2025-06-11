import { Grid } from "@radix-ui/themes";
import { blockMatrix } from "./getBoard";
import { setHighligh } from "./setHighlight";

interface Props {
  board: (number | null)[];
  activeCell: number | undefined;
  setActiveCell: (cellId: number) => void;
}

const SudokuGrid = ({ board, activeCell, setActiveCell }: Props) => {
  const getBlock = (block: number[], blockId: number) => {
    return (
      <Grid key={blockId} columns="3" rows="3" className="border-3">
        {block.map((cellId, id) => (
          <Grid
            key={id}
            className="border place-items-center content-center"
            style={setHighligh(cellId, activeCell, board)}
            onClick={() => setActiveCell(cellId)}
          >
            {board[cellId]}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid columns="3" className="border-3 w-150 h-150">
      {blockMatrix.map((block, blockId) => getBlock(block, blockId))}
    </Grid>
  );
};

export default SudokuGrid;
