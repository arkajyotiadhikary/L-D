import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Module from "../pages/Module.tsx";
import Content from "../pages/Content.tsx";
// import UploadModule from "../pages/UploadModule.tsx";

const Router = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/module/:id" element={<Module />} />
                        <Route path="/module/:id/content/:id" element={<Content />} />
                  </Routes>
            </BrowserRouter>
      );
};

export default Router;
