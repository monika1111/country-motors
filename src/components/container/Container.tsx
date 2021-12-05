import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../header/Header";

const Container = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
