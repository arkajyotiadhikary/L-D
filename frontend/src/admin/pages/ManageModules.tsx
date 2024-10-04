import { useEffect, useState } from "react";
import { Grid, Skeleton, Text } from "@chakra-ui/react";
import ModuleCard from "../components/ModuleCard";
import Layout from "../layouts/Main";
import { getAllModules } from "../services/moduleService";

const Dashboard = () => {
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
                        const modulesData = await getAllModules();
                        setModules(modulesData);
                  } catch (error) {
                        console.error("Error fetching all modules:", error);
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchData();
      }, []);

      return (
            <Layout>
                  <Grid templateColumns="repeat(4, minmax(150px, 1fr))" gap={6} p={5}>
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
                                    <ModuleCard
                                          key={module._id}
                                          _id={module._id}
                                          title={module.title}
                                          description={module.description}
                                          img={module.imgUrl}
                                    />
                              ))
                        ) : (
                              <Text>No modules available</Text>
                        )}
                  </Grid>
            </Layout>
      );
};

export default Dashboard;
