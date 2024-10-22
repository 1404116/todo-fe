import React from "react";
import { Navigate } from "react-router-dom";
import TodoPage from "../pages/TodoPage";

const PrivateRoute = ({ user, children }) => {
    return user ? children : <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;
