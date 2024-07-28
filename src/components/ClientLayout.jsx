import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./client/header/Header";
import Footer from "./client/Footer";

const ClientLayout = () => {
  return (
    <div className="overflow-y-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientLayout;
