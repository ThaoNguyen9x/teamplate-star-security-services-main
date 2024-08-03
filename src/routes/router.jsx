// Client
import About from "../pages/client/About";
import Careers from "../pages/client/Careers";
import Clients from "../pages/client/Clients";
import Contact from "../pages/client/Contact";
import Detail from "../pages/client/Detail";
import FAQ from "../pages/client/FAQ";
import History from "../pages/client/Histroy";
import Home from "../pages/client/Home";
import JobDetail from "../pages/client/JobDetail";
import Network from "../pages/client/Network";
import Profile from "../pages/client/Profile";
import ScheduleInterview from "../pages/client/ScheduleInterview";
import Services from "../pages/client/Services";

// Admin
import Dashboard from "../pages/admin/Dashboard";
import ListEmployee from "../pages/admin/employee/ListEmployee";
import CreateEmployee from "../pages/admin/employee/CreateEmployee";
import EditEmployee from "../pages/admin/employee/EditEmployee";
import ListGeo from "../pages/admin/geo/ListGeo";
import CreateGeo from "../pages/admin/geo/CreateGeo";
import ListDepartment from "../pages/admin/department/ListDepartment";
import CreateDepartment from "../pages/admin/department/CreateDepartment";
import ListEducation from "../pages/admin/education/ListEducation";
import ListAccount from "../pages/admin/account/ListAccount";
import ListCustomer from "../pages/admin/customer/ListCustomer";
import ListService from "../pages/admin/service/ListService";
import ListContract from "../pages/admin/contract/ListContract";
import CreateGeneral from "../pages/admin/general/CreateGeneral";
import ListGeneral from "../pages/admin/general/ListGeneral";
import ListServiceSchedules from "../pages/admin/service/ListServiceSchedules";
import ListCashService from "../pages/admin/service/ListCashService";
import ListCashTransactions from "../pages/admin/service/ListCashTransactions";
import ListJob from "../pages/admin/job/ListJob";
import ListCandidate from "../pages/admin/job/ListCandidate";
import ListInsurance from "../pages/admin/welfare/ListInsurance";
import ListInterview from "../pages/admin/job/ListInterview";
import ListVacation from "../pages/admin/welfare/ListVacation";
import ListSanction from "../pages/admin/welfare/ListSanction";
import ListTrainingHistories from "../pages/admin/welfare/ListTrainingHistories";
import ListOvertime from "../pages/admin/welfare/ListOvertime";
import ListTestimonial from "../pages/admin/testimonial/ListTestimonial";
import ListServiceRequestRequests from "../pages/admin/service/ListServiceRequests";

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
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/schedule-interview",
    element: <ScheduleInterview />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/our-history",
    element: <History />,
  },
  {
    path: "/our-network",
    element: <Network />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/careers/:id",
    element: <JobDetail />,
  },
  {
    path: "/our-business",
    element: <Services />,
  },
  {
    path: "/our-business/:id",
    element: <Detail />,
  },
];

const privateRouter = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  // Employee
  {
    path: "/dashboard/employees",
    element: <ListEmployee />,
  },
  {
    path: "/dashboard/employees/create",
    element: <CreateEmployee />,
  },
  {
    path: "/dashboard/employees/edit/:id",
    element: <EditEmployee />,
  },
  // Geo
  {
    path: "/dashboard/geo",
    element: <ListGeo />,
  },
  {
    path: "/dashboard/geo/create",
    element: <CreateGeo />,
  },
  // Departments
  {
    path: "/dashboard/departments",
    element: <ListDepartment />,
  },
  {
    path: "/dashboard/departments/create",
    element: <CreateDepartment />,
  },
  // Educations
  {
    path: "/dashboard/educations",
    element: <ListEducation />,
  },
  // Accounts
  {
    path: "/dashboard/accounts",
    element: <ListAccount />,
  },
  // Customers
  {
    path: "/dashboard/customers",
    element: <ListCustomer />,
  },
  // General
  {
    path: "/dashboard/general",
    element: <ListGeneral />,
  },
  {
    path: "/dashboard/general/create",
    element: <CreateGeneral />,
  },
  // Contract
  {
    path: "/dashboard/contract",
    element: <ListContract />,
  },
  // Services
  {
    path: "/dashboard/services",
    element: <ListService />,
  },
  // Service Requests
  {
    path: "/dashboard/service-requests",
    element: <ListServiceRequestRequests />,
  },
  // Service Schedules
  {
    path: "/dashboard/service-schedules",
    element: <ListServiceSchedules />,
  },
  // Cash Services
  {
    path: "/dashboard/cash-services",
    element: <ListCashService />,
  },
  // Cash Transactions
  {
    path: "/dashboard/cash-transactions",
    element: <ListCashTransactions />,
  },
  // Job Positions
  {
    path: "/dashboard/job-positions",
    element: <ListJob />,
  },
  // Candidates
  {
    path: "/dashboard/candidates",
    element: <ListCandidate />,
  },
  // Insurance
  {
    path: "/dashboard/insurance",
    element: <ListInsurance />,
  },
  // Interview
  {
    path: "/dashboard/interview",
    element: <ListInterview />,
  },
  // Vacation
  {
    path: "/dashboard/vacation",
    element: <ListVacation />,
  },
  // Sanction
  {
    path: "/dashboard/sanction",
    element: <ListSanction />,
  },
  // Training Histories
  {
    path: "/dashboard/training-histories",
    element: <ListTrainingHistories />,
  },
  // Overtime
  {
    path: "/dashboard/over-time",
    element: <ListOvertime />,
  },
  // Testimonial
  {
    path: "/dashboard/testimonial",
    element: <ListTestimonial />,
  },
];

export { publicRouter, privateRouter };
