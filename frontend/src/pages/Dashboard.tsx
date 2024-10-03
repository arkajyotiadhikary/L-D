import { useEffect, useState } from "react";
import { Grid, Skeleton, Text } from "@chakra-ui/react";
import ModuleCard from "../components/ModuleCard";
import Layout from "../layouts/Main";

import { getAllModules } from "../services/moduleService";
import useUserStore from "../store";

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

      const { user } = useUserStore();

      useEffect(() => {
            const fetchModules = async () => {
                  setIsLoading(true);
                  const _modules = await getAllModules();
                  setModules(_modules);
                  setIsLoading(false);
            };
            fetchModules();
      }, []);

      const getModuleCompletionStatus = (moduleId: string) => {
            if (user) {
                  const { completedModules, currentModule } = user.progress;

                  if (completedModules.includes(moduleId)) {
                        return "completed";
                  }
                  if (currentModule === moduleId) {
                        return "progress";
                  }
            }
            return "incomplete";
      };

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
                                          title={module.title}
                                          description={module.description}
                                          order={module.order}
                                          img={module.imgUrl}
                                          completion={getModuleCompletionStatus(module._id)}
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
