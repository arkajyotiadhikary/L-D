import { useEffect, useState } from "react";
import { Grid, Text } from "@chakra-ui/react";
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
            }>
      >([]);
      useEffect(() => {
            const fetchModules = async () => {
                  const _modules = await getAllModules();
                  setModules(_modules);
            };
            fetchModules();
      }, []);
      return (
            <Layout>
                  <Grid templateColumns="repeat(4, minmax(150px, 1fr))" gap={6} p={5}>
                        {modules?.length > 0 ? (
                              modules.map((module) => (
                                    <ModuleCard
                                          key={module._id}
                                          title={module.title}
                                          description={module.description}
                                          order={module.order}
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
