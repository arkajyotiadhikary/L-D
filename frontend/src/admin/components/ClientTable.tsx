import { Table, Thead, Tbody, Tr, Th, Box, HStack, Text } from "@chakra-ui/react";
import ClientTableRow from "./ClientTableRow";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const clients = [
      {
            id: 1,
            name: "John Smith",
            manager: "Alice Brown",
            email: "john.smith@example.com",
            trainingStatus: "Completed",
            creditStatus: "Approved",
      },
      {
            id: 2,
            name: "Jane Doe",
            manager: "Bob Johnson",
            email: "jane.doe@example.com",
            trainingStatus: "In Progress",
            creditStatus: "Pending",
      },
      {
            id: 3,
            name: "David Lee",
            manager: "Carol Davis",
            email: "david.lee@example.com",
            trainingStatus: "Not Started",
            creditStatus: "Denied",
      },
      {
            id: 4,
            name: "Emily Chen",
            manager: "Frank Taylor",
            email: "emily.chen@example.com",
            trainingStatus: "Completed",
            creditStatus: "Approved",
      },
      {
            id: 5,
            name: "Michael Brown",
            manager: "Sarah Lee",
            email: "michael.brown@example.com",
            trainingStatus: "In Progress",
            creditStatus: "Pending",
      },
      {
            id: 6,
            name: "Jessica White",
            manager: "James Martin",
            email: "jessica.white@example.com",
            trainingStatus: "Not Started",
            creditStatus: "Denied",
      },
      {
            id: 7,
            name: "Olivia Jackson",
            manager: "Linda Thompson",
            email: "olivia.jackson@example.com",
            trainingStatus: "Completed",
            creditStatus: "Approved",
      },
      {
            id: 8,
            name: "Sophia Rodriguez",
            manager: "Kevin Davis",
            email: "sophia.rodriguez@example.com",
            trainingStatus: "In Progress",
            creditStatus: "Pending",
      },
      {
            id: 9,
            name: "Mia Garcia",
            manager: "Rachel Hall",
            email: "mia.garcia@example.com",
            trainingStatus: "Not Started",
            creditStatus: "Denied",
      },
      {
            id: 10,
            name: "Isabella Lewis",
            manager: "Christine Martin",
            email: "isabella.lewis@example.com",
            trainingStatus: "Completed",
            creditStatus: "Approved",
      },
];

const itemsPerPage = 5; // Define how many items to show per page

const ClientTable: React.FC = () => {
      const [currentPage, setCurrentPage] = useState(0);

      // Calculate the current items for the current page
      const startOffset = currentPage * itemsPerPage;
      const currentItems = clients.slice(startOffset, startOffset + itemsPerPage);

      // Handle page change
      const handlePageClick = (data: { selected: number }) => {
            setCurrentPage(data.selected);
      };

      return (
            <Box
                  w="100%"
                  overflow="auto"
                  maxH="600px"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
            >
                  <Table variant="simple" size="md">
                        <Thead bgColor="gray.200">
                              <Tr>
                                    <Th>Name</Th>
                                    <Th>Manager</Th>
                                    <Th>Email</Th>
                                    <Th>Training Status</Th>
                                    <Th>Credit Status</Th>
                                    <Th>Action</Th>
                              </Tr>
                        </Thead>
                        <Tbody>
                              {currentItems.map((client, index) => (
                                    <ClientTableRow
                                          key={index}
                                          name={client.name}
                                          manager={client.manager}
                                          email={client.email}
                                          trainingStatus={client.trainingStatus}
                                          creditStatus={client.creditStatus}
                                    />
                              ))}
                        </Tbody>
                  </Table>
                  <HStack justifyContent="flex-end" mt={2} mb={4} mr={4} spacing={2}>
                        <Text fontSize="sm" color="gray.600">
                              Showing {startOffset + 1} to {startOffset + currentItems.length} of{" "}
                              {clients.length} results
                        </Text>
                  </HStack>

                  {/* Pagination Controls */}
                  <HStack alignItems={"center"} justifyContent={"center"} my={4}>
                        <ReactPaginate
                              pageCount={Math.ceil(clients.length / itemsPerPage)}
                              onPageChange={({ selected }) => handlePageClick({ selected })}
                              breakLabel="..."
                              nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={2}
                              previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                              renderOnZeroPageCount={null}
                              containerClassName="flex items-center justify-center"
                              pageClassName="border border-gray-300 px-4 py-2 m-1 bg-white rounded-md"
                              previousClassName="border border-gray-300 px-4 py-2 m-1 bg-white rounded-md"
                              nextClassName="border border-gray-300 px-4 py-2 m-1 bg-white rounded-md"
                              breakClassName="border border-gray-300 px-4 py-2 m-1 bg-white rounded-md"
                              activeClassName="bg-white border border-gray-300 px-4 py-2 m-1 rounded-md"
                        />
                  </HStack>
            </Box>
      );
};

export default ClientTable;
