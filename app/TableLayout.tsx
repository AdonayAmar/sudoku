"use client";
import { Grid } from "@radix-ui/themes";
import getMatrix from "./getMatrix";
import { useState } from "react";

const matrix = getMatrix();

const TableLayout = () => {
  const [activeCell, setActiveCell] = useState("");
  console.log(activeCell);

  return (
    <Grid columns="3" className="border-3 w-150 h-150">
      {matrix.map((block, blockId) => (
        <>
          <Grid columns="3" rows="3" className="border-3">
            {block.map((item, id) => (
              <Grid
                key={`${blockId} ${id}`}
                className="border place-items-center content-center"
                style={
                  activeCell === `${blockId} ${id}`
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "white" }
                }
                onClick={() => setActiveCell(`${blockId} ${id}`)}
              >
                {item}
              </Grid>
            ))}
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default TableLayout;
