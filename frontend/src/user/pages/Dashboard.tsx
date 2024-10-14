import { useEffect, useState } from "react";
import { Box, Center, Grid, Skeleton, Text } from "@chakra-ui/react";
import Layout from "../layouts/Main";
import { getAllModules } from "../services/moduleService";
import useUserStore from "../../store";
import HeroSection from "../components/dashboard/Hero";
import AppleCard from "../components/AppleCard";

const Dashboard = () => {
      const user = useUserStore((state) => state.user);
      const [modules, setModules] = useState<
            Array<{
                  _id: string;
                  title: string;
                  description: string;
                  content: { type: "video" | "text"; url: string }[];
                  order: number;
                  imgUrl: string;
            }>
      >([]);

      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const [
                              modulesData,

                              // progress
                        ] = await Promise.all([getAllModules()]);
                        setModules(modulesData);

                        if (user?._id) {
                              useUserStore.setState({
                                    user: {
                                          ...user,
                                          // progress
                                    },
                              });
                        } else {
                              console.error("User ID is undefined");
                        }
                  } catch (error) {
                        console.error("Error fetching data", error);
                  } finally {
                        setIsLoading(false);
                  }
            };
            if (user) {
                  fetchData();
            }
      }, []);

      return (
            <Layout>
                  {/* Hero */}
                  <HeroSection />
                  <Center>
                        <Box mx={20} my={10}>
                              <Grid
                                    w={"100%"}
                                    templateColumns="repeat(3, minmax(150px, 1fr))"
                                    gap={6}
                                    mt={14}
                                    px={20}
                              >
                                    {isLoading ? (
                                          Array.from({ length: 4 }).map((_, i) => (
                                                <Skeleton
                                                      key={i}
                                                      startColor="blue.500"
                                                      endColor="gray.100"
                                                      height="400px"
                                                />
                                          ))
                                    ) : modules?.length > 0 ? (
                                          modules.map((module) => (
                                                <AppleCard
                                                      key={module._id}
                                                      moduleId={module._id}
                                                      heading={module.title}
                                                      desciption={module.description}
                                                      image={module.imgUrl}
                                                      due="Due on 31st October 2024"
                                                />
                                          ))
                                    ) : (
                                          <Text>No modules available</Text>
                                    )}
                              </Grid>
                        </Box>
                  </Center>
            </Layout>
      );
};

export default Dashboard;
