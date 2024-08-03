import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./App.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import PublicRouter from "./routes/PublicRouter";
import PrivateRouter from "./routes/PrivateRouter";
import { privateRouter, publicRouter } from "./routes/router";

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
        {/* Private Routes */}
        <Route element={<PrivateRouter />}>
          {privateRouter.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRouter />}>
          {publicRouter.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
