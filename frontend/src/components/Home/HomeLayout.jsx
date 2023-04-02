import React from "react";
import "../../style/HomeLayout.css";
import ResponsiveAppBar from "../AppBar/index";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "../../client";
import AdminLayout from "../../admin/index";
import ClothManagementLayout from "../ClothManagement";
import SignIn from "../../admin/login";
import { useState } from "react";

export default function HomeLayout() {
  const [is_authenticated, setis_authenticated] = useState(false);

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <h2>Home page</h2>
      <Routes>
        <Route path="/client" element={<ClientLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        {/* <Route path="/login" element={<SignIn />} /> */}
        <Route
          path="/admin/manage/:clothId"
          element={<ClothManagementLayout />}
        />
      </Routes>
    </>
  );
}
