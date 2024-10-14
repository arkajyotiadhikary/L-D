import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../layouts/Main";
const data = [
      {
            training: "POSH",
            dateEnrolled: "8/11/2024",
            status: "Not Started",
            completionDate: "",
            dueDate: "9/10/2024",
            score: 0,
      },
      {
            training: "BCC",
            dateEnrolled: "8/11/2024",
            status: "Not Started",
            completionDate: "",
            dueDate: "9/10/2024",
            score: 0,
      },
      {
            training: "Leadership",
            dateEnrolled: "8/11/2024",
            status: "Completed",
            completionDate: "8/25/2024",
            dueDate: "9/10/2024",
            score: 90,
      },
      {
            training: "PM",
            dateEnrolled: "8/11/2024",
            status: "In Progress",
            completionDate: "",
            dueDate: "12/31/2024",
            score: 0,
      },
];

const rowsPerPage = 4;

const LearningHistory = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(data.length / rowsPerPage);

      const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      return (
            <Layout>
                  <Box p={5}>
                        <Text fontSize="2xl" fontWeight="bold" mb={3}>
                              Learning History
                        </Text>
                        <Text fontSize="md" color="gray.600" mb={5}>
                              Look at your Accomplishment.
                        </Text>

                        <Table variant="simple" size="md">
                              <Thead bg="gray.50">
                                    <Tr>
                                          <Th>Training</Th>
                                          <Th>Date Enrolled</Th>
                                          <Th>Completion Status</Th>
                                          <Th>Completion Date</Th>
                                          <Th>Due Date</Th>
                                          <Th>Score</Th>
                                    </Tr>
                              </Thead>
                              <Tbody>
                                    {currentData.map((item, index) => (
                                          <Tr key={index} bgColor={"white"}>
                                                <Td>{item.training}</Td>
                                                <Td>{item.dateEnrolled}</Td>
                                                <Td>{item.status}</Td>
                                                <Td>{item.completionDate || "-"}</Td>
                                                <Td>{item.dueDate}</Td>
                                                <Td>{item.score}</Td>
                                          </Tr>
                                    ))}
                              </Tbody>
                        </Table>

                        {/* Pagination */}
                        <Flex justifyContent="center" mt={5}>
                              <Button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    mr={2}
                                    size="sm"
                              >
                                    &lt;
                              </Button>
                              {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                          key={i}
                                          onClick={() => setCurrentPage(i + 1)}
                                          isActive={currentPage === i + 1}
                                          size="sm"
                                          mx={1}
                                    >
                                          {i + 1}
                                    </Button>
                              ))}
                              <Button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    ml={2}
                                    size="sm"
                              >
                                    &gt;
                              </Button>
                        </Flex>
                  </Box>
            </Layout>
      );
};

export default LearningHistory;
