import React from "react";
import { Outlet } from "react-router-dom";
import ClientLayout from "../components/ClientLayout";

const PublicRouter = () => {
  return (
    <>
      <ClientLayout>
        <Outlet />
      </ClientLayout>
    </>
  );
};

export default PublicRouter;
