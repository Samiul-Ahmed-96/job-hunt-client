import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../layout/main/Navbar";

const Main = () => {
  const { pathname } = useLocation();

  return (
    <div>
    {/*  */}
    <Navbar />
      <div
        className="container mx-auto"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
