import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContent";
import AdminLayout from "../components/AdminLayout";

const PrivateRouter = () => {
  const { token } = useContext(AuthContext);

  // if (token && (token.position === "Supper Admin" || token.position === "Admin")) {
  //   return (
  //     <AdminLayout>
  //       <Outlet />
  //     </AdminLayout>
  //   );
  // } else {
  //   return <Navigate to="/" replace />;
  // }
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default PrivateRouter;
