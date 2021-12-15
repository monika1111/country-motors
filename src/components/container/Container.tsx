import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";

const Container = () => {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Container;
