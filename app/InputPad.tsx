import { Button, Grid } from "@radix-ui/themes";
import React from "react";

const KeyPad = () => {
  return (
    <Grid columns="5" rows="2" gap="2">
      <Button size="3" color="gray">
        1
      </Button>
      <Button size="3" color="gray">
        2
      </Button>
      <Button size="3" color="gray">
        3
      </Button>
      <Button size="3" color="gray">
        4
      </Button>
      <Button size="3" color="gray">
        5
      </Button>
      <Button size="3" color="gray">
        6
      </Button>
      <Button size="3" color="gray">
        7
      </Button>
      <Button size="3" color="gray">
        8
      </Button>
      <Button size="3" color="gray">
        9
      </Button>
      <Button size="3" color="gray">
        X
      </Button>
    </Grid>
  );
};

export default KeyPad;
