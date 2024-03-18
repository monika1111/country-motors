import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

const PrivateRoute: FC<{children: ReactNode}> = ({ children }) => {

  const isAuthenticated = !!auth.currentUser;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
