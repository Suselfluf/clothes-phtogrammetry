import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoots from "../components/Home/ProtectedRoute";
import React from "react";
import SignIn from "../admin/login";
import HomeLayout from "../components/Home/HomeLayout";
import ClientLayout from "../client";
import AdminLayout from "../admin";
import CenteredTabs from "../components/ClothManagement";
const RouteSystem = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />}></Route>
      <Route path="/*" element={<Navigate to="/login" replace />} />
      <Route element={<ProtectedRoots />}>
        <Route path="/welcome" element={<HomeLayout />} />
        <Route path="/client" element={<ClientLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        {/* <Route path="/login" element={<SignIn />} /> */}
        <Route path="/admin/manage/:clothId" element={<CenteredTabs />} />
      </Route>
    </Routes>

    // <Routes>
    //   <Route path="/login" element={<SignIn />}></Route>
    //   <Route path="/*" element={<Navigate to="/client" />} />
    //   {/* <Route path="/welcome" element={<HomeLayout />} /> */}
    //   <Route path="/client" element={<ClientLayout />} />
    //   <Route element={<ProtectedRoots />}>
    //     <Route path="/admin" element={<AdminLayout />} />
    //     {/* <Route path="/login" element={<SignIn />} /> */}
    //     <Route path="/admin/manage/:clothId" element={<CenteredTabs />} />
    //   </Route>
    // </Routes>
  );
};
export default RouteSystem;
