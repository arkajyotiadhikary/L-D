import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Dashboard.tsx";
// import UploadModule from "../pages/UploadModule.tsx";

const Router = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
            </BrowserRouter>
      );
};

export default Router;
