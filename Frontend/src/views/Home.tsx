import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import CreateTask from "../features/task/components/CreateTask";
import { useEffect } from "react";
import useTask from "../features/task/hooks/useTask";

const Home = () => {
  const { state, getTasks } = useTask();
  useEffect(() => {
    Promise.all([getTasks()]);
  }, []);

  return (
    <>
      <CreateTask />
      <TableContainer margin={50}>
        <Table size="md" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Author</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.tasks.map((tasks, j) => (
              <Tr>
                <Td key={j}>{tasks.id}</Td>
                <Td key={j}>{tasks.title}</Td>
                <Td key={j}>{tasks.author}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
