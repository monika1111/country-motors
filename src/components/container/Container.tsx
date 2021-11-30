import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Container = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
};

export default Container;
