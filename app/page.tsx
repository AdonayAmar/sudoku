import { Box, Grid } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";
import InputPad from "./InputPad";

export default function Home() {
  return (
    <Grid className="place-items-center p-10">
      <Box className="alig">
        <SudokuGrid />
        <Box className="p-3">
          <InputPad />
        </Box>
      </Box>
    </Grid>
  );
}
