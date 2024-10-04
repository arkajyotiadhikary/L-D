import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Module from "../pages/Module.tsx";
import Chapter from "../pages/Chapter.tsx";
import Assignment from "../pages/Assignment.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";

// ADMIN
import AdminHome from "../admin/pages/Home.tsx";
import AdminDashboard from "../admin/pages/Dashboard.tsx";
import AdminEditCourse from "../admin/pages/EditCoursePage.tsx";
import AdminEditChapter from "../admin/pages/EditChapterPage.tsx";
import AdminEditAssignment from "../admin/pages/EditAssignmentPage.tsx";
import AdminManageModules from "../admin/pages/ManageModules.tsx";

const Router = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        {/* EMPLOYEE */}
                        <Route path="/" element={<Home />} />
                        <Route
                              path="/dashboard"
                              element={<PrivateRoute element={<Dashboard />} role="EMPLOYEE" />}
                        />
                        <Route path="/module/:id" element={<Module />} />
                        <Route path="/module/:module/content/:content" element={<Chapter />} />
                        <Route
                              path="/module/:module/assignment/:assignment"
                              element={<Assignment />}
                        />

                        {/* SUPER ADMIN */}
                        <Route path="/admin" element={<AdminHome />} />
                        <Route
                              path="/admin/dashboard"
                              element={
                                    <PrivateRoute element={<AdminDashboard />} role="SUPER_ADMIN" />
                              }
                        />
                        <Route
                              path="/admin/course/edit/:id"
                              element={
                                    <PrivateRoute
                                          element={<AdminEditCourse />}
                                          role="SUPER_ADMIN"
                                    />
                              }
                        />
                        <Route
                              path="/admin/chapter/edit/:id"
                              element={
                                    <PrivateRoute
                                          element={<AdminEditChapter />}
                                          role="SUPER_ADMIN"
                                    />
                              }
                        />
                        <Route
                              path="/admin/assignment/edit/:id"
                              element={
                                    <PrivateRoute
                                          element={<AdminEditAssignment />}
                                          role="SUPER_ADMIN"
                                    />
                              }
                        />
                        <Route path="/admin/modules/manage" element={<AdminManageModules />} />
                  </Routes>
            </BrowserRouter>
      );
};

export default Router;
