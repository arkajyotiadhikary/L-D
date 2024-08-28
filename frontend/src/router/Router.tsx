import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import CongratulationPage from "../pages/Congretulation.tsx";

import Home from "../pages/Home.tsx";
import Auth from "../pages/Auth.tsx";
import TrainingModulePage from "../pages/TrainingModulePage.tsx";
import UploadModule from "../pages/UploadModule.tsx";

const Router = () => {
      return (
            <BrowserRouter>
                  <Navbar />
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route
                              path="/training"
                              element={<PrivateRoute element={<TrainingModulePage />} />}
                        />
                        <Route
                              path="/upload"
                              element={<PrivateRoute element={<UploadModule />} />}
                        />
                        <Route
                              path="/congratulations"
                              element={<PrivateRoute element={<CongratulationPage />} />}
                        />
                  </Routes>
                  <Footer />
            </BrowserRouter>
      );
};

export default Router;
