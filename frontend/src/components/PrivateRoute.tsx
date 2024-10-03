import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useUserStore from "../store";

interface PrivateRouteProps {
      element: React.ReactElement;
      role?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, role = "EMPLOYEE" }) => {
      const { isAuthenticated } = useAuth();
      const { user } = useUserStore();

      console.log("user: ", user, "isAuthenticated: ", isAuthenticated);

      if (user?.role !== role) {
            return <Navigate to="/" />;
      }
      return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
