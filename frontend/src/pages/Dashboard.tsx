import { Grid } from "@chakra-ui/react";
import ModuleCard from "../components/ModuleCard";
import Layout from "../layouts/Main";

const Dashboard = () => {
      return (
            <Layout>
                  <Grid templateColumns="repeat(4, minmax(150px, 1fr))" gap={6} p={5}>
                        <ModuleCard
                              title="Module 1"
                              description="Lorem ipsum dolor sit amet."
                              completion="50%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 2"
                              description="Lorem ipsum dolor sit amet."
                              completion="0%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 3"
                              description="Lorem ipsum dolor sit amet."
                              completion="60%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 4"
                              description="Lorem ipsum dolor sit amet."
                              completion="40%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 5"
                              description="Lorem ipsum dolor sit amet."
                              completion="0%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 6"
                              description="Lorem ipsum dolor sit amet."
                              completion="50%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 7"
                              description="Lorem ipsum dolor sit amet."
                              completion="10%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                        <ModuleCard
                              title="Module 8"
                              description="Lorem ipsum dolor sit amet."
                              completion="100%"
                              img="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                        />
                  </Grid>
            </Layout>
      );
};

export default Dashboard;
