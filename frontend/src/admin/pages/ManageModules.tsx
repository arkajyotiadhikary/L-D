import { useEffect, useState } from "react";
import { Grid, Skeleton, Button, Center } from "@chakra-ui/react";
import ModuleCard from "../components/ModuleCard";
import Layout from "../layouts/Main";
import { getAllModules } from "../services/moduleService";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

      const navigate = useNavigate();

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
                              [
                                    ...modules.map((module) => (
                                          <ModuleCard
                                                key={module._id}
                                                _id={module._id}
                                                title={module.title}
                                                description={module.description}
                                                img={module.imgUrl}
                                          />
                                    )),
                                    <Center mt={5}>
                                          <Button
                                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                                colorScheme="purple"
                                                bg="#805ad5"
                                                onClick={() => navigate("/admin/module/new")}
                                          >
                                                Add New Module
                                          </Button>
                                    </Center>,
                              ]
                        ) : (
                              <Center mt={5}>
                                    <Button
                                          leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                          colorScheme="purple"
                                          bg="#805ad5"
                                          onClick={() => navigate("/admin/module/new")}
                                    >
                                          Add New Module
                                    </Button>
                              </Center>
                        )}
                  </Grid>
            </Layout>
      );
};

export default Dashboard;
