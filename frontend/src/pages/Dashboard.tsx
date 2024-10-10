import { useEffect, useState } from "react";
import { Grid, Skeleton, Text } from "@chakra-ui/react";
import ModuleCard from "../components/ModuleCard";
import Layout from "../layouts/Main";
import { getAllModules } from "../services/moduleService";
// import { getUserProgress } from "../services/userService";
import useUserStore from "../store";
import HeroSection from "../components/dashboard/Hero";

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
                        ] = await Promise.all([
                              getAllModules(),
                              // getUserProgress(user?._id || ""),
                        ]);
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

      const getModuleCompletionStatus = (moduleId: string) => {
            if (user && user.progress) {
                  const { completedModules, currentModule } = user.progress;

                  if (completedModules && completedModules.includes(moduleId)) {
                        return "completed";
                  }
                  if (currentModule === moduleId) {
                        return "progress";
                  }
            }
            return "incomplete";
            return "completed";
      };

      return (
            <Layout>
                  {/* Hero */}
                  <HeroSection />
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
                                          _id={module._id}
                                          key={module._id}
                                          title={module.title}
                                          img={module.imgUrl}
                                          completion="completed"
                                          timeRemaining="12min"
                                          chapters={10}
                                          completionPercentage={30}
                                          dueDate="2022-12-31"
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
