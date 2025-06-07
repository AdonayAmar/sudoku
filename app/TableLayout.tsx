import { Box, Flex, Table } from "@radix-ui/themes";

const TableLayout = () => {
  function Cell() {
    return (
      <Table.ColumnHeaderCell className="border w-10 p-0"></Table.ColumnHeaderCell>
    );
  }

  function Block() {
    return (
      <Box className="border-2 fit-content">
        <Table.Row>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Table.Row>
        <Table.Row>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Table.Row>
        <Table.Row>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Table.Row>
      </Box>
    );
  }

  return (
    <Box className="p-10">
      <Table.Root>
        <Table.Body>
          <Flex>
            <Block />
            <Block />
            <Block />
          </Flex>
          <Flex>
            <Block />
            <Block />
            <Block />
          </Flex>
          <Flex>
            <Block />
            <Block />
            <Block />
          </Flex>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default TableLayout;
