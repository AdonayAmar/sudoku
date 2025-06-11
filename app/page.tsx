import { Flex } from "@radix-ui/themes";
import SudokuGrid from "./SudokuGrid";

export default function Home() {
  return (
    <Flex className="p-10">
      <SudokuGrid />
    </Flex>
  );
}
