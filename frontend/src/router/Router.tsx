import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Module from "../pages/Module.tsx";
import Chapter from "../pages/Chapter.tsx";
import Assignment from "../pages/Assignment.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import History from "../pages/History.tsx";

// ADMIN
import AdminHome from "../admin/pages/Home.tsx";
import AdminDashboard from "../admin/pages/Dashboard.tsx";

// Instructor
import InstructorManageModules from "../Instructor/pages/ManageModules.tsx";
import InstructorHome from "../Instructor/pages/Home.tsx";
import InstructorEditModule from "../Instructor/pages/EditModulePage.tsx";
import InstructorEditChapter from "../Instructor/pages/EditChapterPage.tsx";
import InstructorEditAssignment from "../Instructor/pages/EditAssignmentPage.tsx";

const Router = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        {/* EMPLOYEE */}
                        <Route path="/" element={<Home />} />
                        <Route
                              path="/dashboard"
                              element={
                                    <PrivateRoute
                                          element={<Dashboard />}
                                          roles={["EMPLOYEE", "SUPER_ADMIN"]}
                                    />
                              }
                        />
                        <Route path="/learnings/module/:id" element={<Module />} />
                        <Route
                              path="/learnings/module/:module/content/:content"
                              element={<Chapter />}
                        />
                        <Route
                              // path="/learnings/module/:module/assignment/:assignment"
                              path="/assignment"
                              element={<Assignment />}
                        />
                        <Route path="/history" element={<History />} />

                        {/* SUPER ADMIN */}
                        <Route path="/admin" element={<AdminHome />} />
                        <Route
                              path="/admin/dashboard"
                              element={
                                    <PrivateRoute
                                          element={<AdminDashboard />}
                                          roles={["SUPER_ADMIN"]}
                                    />
                              }
                        />

                        {/* INSTRUCTOR */}
                        <Route path="/instructor" element={<InstructorHome />} />
                        <Route
                              path="/instructor/modules/manage"
                              element={
                                    <PrivateRoute
                                          element={<InstructorManageModules />}
                                          roles={["SUPER_ADMIN", "INSTRUCTOR"]}
                                    />
                              }
                        />
                        <Route
                              path="/instructor/module/edit/:id"
                              element={
                                    <PrivateRoute
                                          element={<InstructorEditModule />}
                                          roles={["SUPER_ADMIN", "INSTRUCTOR"]}
                                    />
                              }
                        />
                        <Route
                              path="/instructor/chapter/:moduleId/edit/:id"
                              element={
                                    <PrivateRoute
                                          element={<InstructorEditChapter />}
                                          roles={["SUPER_ADMIN", "INSTRUCTOR"]}
                                    />
                              }
                        />
                        <Route
                              path="/instructor/assignment/edit/:id"
                              element={
                                    <PrivateRoute
                                          element={<InstructorEditAssignment />}
                                          roles={["SUPER_ADMIN", "INSTRUCTOR"]}
                                    />
                              }
                        />

                        <Route
                              path="/instructor/module/new"
                              element={
                                    <PrivateRoute
                                          element={<InstructorEditModule />}
                                          roles={["SUPER_ADMIN", "INSTRUCTOR"]}
                                    />
                              }
                        />
                        <Route
                              path="/instructor/chapter/new/:moduleId"
                              element={
                                    <PrivateRoute
                                          element={<InstructorEditChapter />}
                                          roles={["SUPER_ADMIN", "INSTRUCTOR"]}
                                    />
                              }
                        />
                  </Routes>
            </BrowserRouter>
      );
};

export default Router;
