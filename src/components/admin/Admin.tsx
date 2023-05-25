import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./Admin.scss";

import Header from "./header/Header";
import Cars from "./cars/Cars";
import Car from "../admin/car/Car";
import Login from "./login/Login";

const LoginRout = '/admin/login';

const Admin = () => {
    const location = useLocation();

    return (
        <div className="admin-container">
            <Header/>
            <div className={`admin-content ${location.pathname === LoginRout ? "admin-content-login" : ""}`}>
                <Routes>
                    <Route path="/" element={<Navigate to="cars" />} />
                    <Route path={`/cars/:carId`} element={<Car/>}/>
                    <Route path={`/cars`} element={<Cars/>}/>
                    <Route path={`/login`} element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Admin;