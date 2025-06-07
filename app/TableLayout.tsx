"use client";
import { Box, Table, Flex } from "@radix-ui/themes";
import React, { useState } from "react";

const TableLayout = () => {
  const [activeCell, setActiveCell] = useState("");
  console.log(activeCell);

  const cellId = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box className="p-10">
      <Table.Root>
        <Table.Body>
          {cellId.map((row) => (
            <>
              <Flex>
                <Table.Row>
                  {cellId.map((col) => (
                    <Table.Cell
                      key={`${row}${col}`}
                      className="border w-10 p-0"
                      style={
                        activeCell === `${row}${col}`
                          ? { backgroundColor: "green" }
                          : { backgroundColor: "white" }
                      }
                      onClick={() => setActiveCell(`${row}${col}`)}
                    ></Table.Cell>
                  ))}
                </Table.Row>
              </Flex>
            </>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default TableLayout;
