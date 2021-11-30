import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Container from "../container/Container";
import Cars from "../cars/Cars";
import ContactUs from "../contactUs/ContactUs";
import AboutUs from "../aboutUs/AboutUs";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="aboutUs" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
