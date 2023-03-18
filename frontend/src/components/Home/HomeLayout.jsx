import React from "react";
import "../../style/HomeLayout.css";
import ResponsiveAppBar from "../AppBar/index";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "../../client";
import AdminLayout from "../../admin/index";
import ClothManagementLayout from "../ClothManagement";

export default function HomeLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/client" element={<ClientLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route
          path="/admin/manage/:clothId"
          element={<ClothManagementLayout />}
        />
      </Routes>
    </>
  );
}
