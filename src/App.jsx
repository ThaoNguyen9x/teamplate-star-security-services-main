import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ClientLayout from "./components/ClientLayout";
import Home from "./pages/client/Home";
import About from "./pages/client/About";
import FAQ from "./pages/client/FAQ";
import Histroy from "./pages/client/Histroy";
import Network from "./pages/client/Network";
import Contact from "./pages/client/Contact";
import Services from "./pages/client/Services";
import Detail from "./pages/client/Detail";
import Clients from "./pages/client/Clients";
import Careers from "./pages/client/Careers";
import JobDetail from "./pages/client/JobDetail";
import Profile from "./pages/client/Profile";
import Loading from "./components/Loading";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import ListEmployee from "./pages/admin/employee/ListEmployee";
import CreateEmployee from "./pages/admin/employee/CreateEmployee";
import EditEmployee from "./pages/admin/employee/EditEmployee";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./App.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import ListGeo from "./pages/admin/geo/ListGeo";
import CreateGeo from "./pages/admin/geo/CreateGeo";
import ListDepartment from "./pages/admin/department/ListDepartment";
import CreateDepartment from "./pages/admin/department/CreateDepartment";
import ListEducation from "./pages/admin/education/ListEducation";
import ListAccount from "./pages/admin/account/ListAccount";
import ListCustomer from "./pages/admin/customer/ListCustomer";
import ListGeneral from "./pages/admin/general/ListGeneral";
import CreateGeneral from "./pages/admin/general/CreateGeneral";
import ListService from "./pages/admin/service/ListService";
import ListServiceRequests from "./pages/admin/service/ListServiceRequests";
import ListServiceSchedules from "./pages/admin/service/ListServiceSchedules";
import ListJob from "./pages/admin/job/ListJob";
import ListCashService from "./pages/admin/service/ListCashService";
import ListCashTransactions from "./pages/admin/service/ListCashTransactions";
import ListContract from "./pages/admin/contract/ListContract";
import ListCandidate from "./pages/admin/job/ListCandidate";
import ListInsurance from "./pages/admin/welfare/ListInsurance";
import ListInterview from "./pages/admin/job/ListInterview";
import ListVacation from "./pages/admin/welfare/ListVacation";
import ListSanction from "./pages/admin/welfare/ListSanction";
import ListTrainingHistories from "./pages/admin/welfare/ListTrainingHistories";
import ListOvertime from "./pages/admin/welfare/ListOvertime";
import ScheduleInterview from "./pages/client/ScheduleInterview";
import ListTestimonial from "./pages/admin/testimonial/ListTestimonial";

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  // Example of fetching jobsData or initializing it
  const [jobsData] = useState([
    {
      jobTitle: "Security Officer",
      slug: "security-officer",
      jobLocation: "North",
      employmentType: "Full-time",
      minPrice: "$30,000",
      maxPrice: "$40,000",
      postingDate: "2024-07-15",
      description:
        "Responsible for ensuring the safety and security of the premises.",
      requirements: [
        "Experience in security operations preferred.",
        "Ability to work in a team environment.",
        "Good communication skills.",
      ],
      benefits: [
        "Competitive salary.",
        "Health insurance coverage.",
        "Paid time off.",
      ],
    },
    {
      jobTitle: "Cash Services Manager",
      slug: "cash-services-manager",
      jobLocation: "West",
      employmentType: "Part-time",
      minPrice: "$35,000",
      maxPrice: "$45,000",
      postingDate: "2024-07-10",
      description:
        "Manage cash services operations and ensure compliance with regulations.",
      requirements: [
        "Experience in cash management or banking preferred.",
        "Strong organizational and leadership skills.",
      ],
      benefits: ["Flexible work hours.", "Career growth opportunities."],
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ScrollToTop />

      <ToastContainer />

      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="schedule-interview" element={<ScheduleInterview />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="our-history" element={<Histroy />} />
          <Route path="our-network" element={<Network />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="clients" element={<Clients />} />
          <Route path="careers" element={<Careers jobsData={jobsData} />} />
          <Route
            path="careers/:slug"
            element={<JobDetail jobsData={jobsData} />}
          />
          <Route path="our-business" element={<Services />} />
          <Route path="profile" element={<Profile />} />
          <Route path="our-business/:slug" element={<Detail />} />
        </Route>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<ListEmployee />} />
          <Route path="employees/create" element={<CreateEmployee />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />

          <Route path="geo" element={<ListGeo />} />
          <Route path="geo/create" element={<CreateGeo />} />

          <Route path="departments" element={<ListDepartment />} />
          <Route path="departments/create" element={<CreateDepartment />} />

          <Route path="educations" element={<ListEducation />} />
          <Route path="accounts" element={<ListAccount />} />
          <Route path="customers" element={<ListCustomer />} />

          <Route path="general" element={<ListGeneral />} />
          <Route path="general/create" element={<CreateGeneral />} />
          <Route path="contract" element={<ListContract />} />

          <Route path="services" element={<ListService />} />
          <Route path="service-requests" element={<ListServiceRequests />} />
          <Route path="service-schedules" element={<ListServiceSchedules />} />
          <Route path="cash-services" element={<ListCashService />} />
          <Route path="cash-transactions" element={<ListCashTransactions />} />
          <Route path="job-positions" element={<ListJob />} />
          <Route path="candidates" element={<ListCandidate />} />
          <Route path="insurance" element={<ListInsurance />} />
          <Route path="interview" element={<ListInterview />} />
          <Route path="vacation" element={<ListVacation />} />
          <Route path="sanction" element={<ListSanction />} />
          <Route path="training-histories" element={<ListTrainingHistories />} />
          <Route path="over-time" element={<ListOvertime />} />
          <Route path="testimonial" element={<ListTestimonial />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
