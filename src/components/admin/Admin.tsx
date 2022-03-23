import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import "./Admin.scss";

import Header from "./header/Header";
import Cars from "./cars/Cars";
import Car from "../admin/car/Car";

const Admin = () => {

    return (
        <div className="admin-container">
            <Header/>
            <div className="admin-content">
                <Routes>
                    <Route path="/" element={<Navigate to="cars" />} />
                    <Route path={`/cars/:carId`} element={<Car/>}/>
                    <Route path={`/cars`} element={<Cars/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Admin;