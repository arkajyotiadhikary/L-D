import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import Layout from "../layouts/Main";
import ClientSummaryCard from "../components/ClientSummaryCard";
import ClientTable from "../components/ClientTable";

const Dashboard = () => {
      return (
            <Layout>
                  <Box p={6} bg={"white"}>
                        {/* Client Summary Section */}
                        <SimpleGrid columns={[1, 3]} spacing={6}>
                              <ClientSummaryCard
                                    title="Total Onboarded Clients"
                                    value={128}
                                    description="Companies actively using the tool."
                              />
                              <ClientSummaryCard
                                    title="Pending approval of credits"
                                    value={12}
                                    description="Currently in pending list."
                                    progress={53}
                              />
                              <ClientSummaryCard
                                    title="Clients Completed Training"
                                    value={94}
                                    description="Fully trained and active."
                                    progress={73}
                              />
                        </SimpleGrid>

                        {/* List of Clients */}
                        <Box mt={10}>
                              <ClientTable />
                              <Button mt={4} colorScheme="purple" size="sm">
                                    View More
                              </Button>
                        </Box>
                  </Box>
            </Layout>
      );
};

export default Dashboard;
