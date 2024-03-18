import React from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import Dashboard from "../dashboard/Dashboard";
import Container from "../container/Container";
import CarsComponent from "../cars/CarsComponent";
import ContactUs from "../contactUs/ContactUs";
import AboutUs from "../aboutUs/AboutUs";
import Calculator from "../calculator/Calculator";
import Car from "../car/Car";
import Admin from "../admin/Admin";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<CarsComponent />} />
          <Route path="cars/:carId" element={<Car />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="calculator" element={<Calculator />} />
        </Route>
        <Route path="/admin/*" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
