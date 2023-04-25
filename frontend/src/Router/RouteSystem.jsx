import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoots from "../components/Home/ProtectedRoute";
import React from "react";
import SignIn from "../admin/login";
import HomeLayout from "../components/Home/HomeLayout";
import ClientLayout from "../client";
import AdminLayout from "../admin";
import CenteredTabs from "../components/ClothManagement";
import LogOut from "../client/logout";
import SignUp from "../client/register";
import ResponsiveAppBar from "../components/AppBar";
const RouteSystem = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/logout" element={<LogOut />}></Route>
        <Route path="/client" element={<ClientLayout />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/*" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoots />}>
          <Route path="/welcome" element={<HomeLayout />} />
          <Route path="/admin" element={<AdminLayout />} />
          {/* <Route path="/login" element={<SignIn />} /> */}
          <Route path="/admin/manage/:clothId" element={<CenteredTabs />} />
        </Route>
      </Routes>
    </>
  );
};
export default RouteSystem;
