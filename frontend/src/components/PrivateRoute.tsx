import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useUserStore from "../store";

interface PrivateRouteProps {
      element: React.ReactElement;
      roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles = ["EMPLOYEE"] }) => {
      const { isAuthenticated } = useAuth();
      const { user } = useUserStore();

      if (!isAuthenticated) {
            return <Navigate to="/" />;
      }

      if (roles.length > 0 && !roles.includes(user?.role || "")) {
            return <Navigate to="/" />;
      }
      return element;
};

export default PrivateRoute;
