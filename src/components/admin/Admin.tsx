import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./Admin.scss";

import Header from "./header/Header";
import Cars from "./cars/Cars";
import Car from "../admin/car/Car";
import Login from "./login/Login";
import PrivateRoute from "../router/PrivateRoute";
import { useAuth } from "../../contexts/authContext";

const LoginRout = "/admin/login";

const Admin = () => {
  const location = useLocation();

  const { isLoginInprogress } = useAuth();

  return (
    <div className="admin-container">
      <Header />
      <div
        className={`admin-content ${
          location.pathname === LoginRout ? "admin-content-login" : ""
        }`}
      >
        {!isLoginInprogress && (
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Cars />
                </PrivateRoute>
              }
            />
            <Route
              path="/cars/:carId"
              element={
                <PrivateRoute>
                  <Car />
                </PrivateRoute>
              }
            />
            <Route
              path="/cars"
              element={
                <PrivateRoute>
                  <Cars />
                </PrivateRoute>
              }
            />
            <Route path={`/login`} element={<Login />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default Admin;
