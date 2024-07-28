import Home from "../pages/client/Home";

import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/client/Profile";

import ListEmployees from "../pages/admin/employee/ListEmployees";
import CreateEmployee from "../pages/admin/employee/CreateEmployee";
import EditEmployee from "../pages/admin/employee/EditEmployee";

import ListClients from "../pages/admin/client/ListClients";
import CreateClient from "../pages/admin/client/CreateClient";
import EditClient from "../pages/admin/client/EditClient";
import Feedback from "../pages/client/Feedback";

const publicRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/testimonials",
    element: <Feedback />,
  },
];

const privateRouter = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/employees",
    element: <ListEmployees />,
  },
  {
    path: "/dashboard/employees/create",
    element: <CreateEmployee />,
  },
  {
    path: "/dashboard/employees/edit/:id",
    element: <EditEmployee />,
  },
  {
    path: "/dashboard/clients",
    element: <ListClients />,
  },
  {
    path: "/dashboard/clients/create",
    element: <CreateClient />,
  },
  {
    path: "/dashboard/clients/edit/:id",
    element: <EditClient />,
  },
];

export { publicRouter, privateRouter };
