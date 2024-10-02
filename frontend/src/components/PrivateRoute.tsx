import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
      element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
      const { isAuthenticated } = useAuth();
      console.log("Is Authenticated: ", isAuthenticated);
      return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
