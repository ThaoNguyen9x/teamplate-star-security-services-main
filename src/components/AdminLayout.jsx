import React from "react";
import Sidebar from "./admin/Sidebar";
import Navbar from "./admin/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./admin/Footer";

const AdminLayout = () => {
  return (
    <div className="flex overflow-x-hidden">
      <Sidebar />
      <div className="flex-[4] p-5">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
