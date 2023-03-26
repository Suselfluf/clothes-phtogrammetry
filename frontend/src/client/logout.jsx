import React, { useState, useEffect } from "react";
import Auth from "../components/Auth/Auth";
import tokenInstance from "../../api/tokens/axios";

import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      const response = tokenInstance.post("user-auth/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      tokenInstance.defaults.headers["Authorization"] = null;
      Auth.logout();
      navigate("/login");
    };
  }, []);

  return <div>Logout</div>;
}
