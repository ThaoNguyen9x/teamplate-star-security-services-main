import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContent";

const SidebarData = ({ toggle }) => {
  const data = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <i className="bi bi-grid"></i>,
        },
        {
          title: "Employees",
          path: "/dashboard/employees",
          icon: <i className="bi bi-people"></i>,
        },
        {
          title: "Accounts",
          path: "/dashboard/accounts",
          icon: <i className="bi bi-person"></i>,
        },
        {
          title: "Customers",
          path: "/dashboard/customers",
          icon: <i className="bi bi-person-plus"></i>,
        },
        {
          title: "Services",
          path: "/dashboard/services",
          icon: <i className="bi bi-hdd"></i>,
        },
        {
          title: "Service Requests",
          path: "/dashboard/service-requests",
          icon: <i className="bi bi-arrow-repeat"></i>,
        },
        {
          title: "Service Schedules",
          path: "/dashboard/service-schedules",
          icon: <i className="bi bi-box-seam"></i>,
        },
        {
          title: "Cash Services",
          path: "/dashboard/cash-services",
          icon: <i className="bi bi-wallet"></i>,
        },
        {
          title: "Cash Transactions",
          path: "/dashboard/cash-transactions",
          icon: <i className="bi bi-wallet2"></i>,
        },
        {
          title: "Job Positions",
          path: "/dashboard/job-positions",
          icon: <i className="bi bi-journal"></i>,
        },
        {
          title: "Contract",
          path: "/dashboard/contract",
          icon: <i className="bi bi-chevron-contract"></i>,
        },
        {
          title: "Candidates",
          path: "/dashboard/candidates",
          icon: <i className="bi bi-upc-scan"></i>,
        },
        {
          title: "Interview",
          path: "/dashboard/interview",
          icon: <i className="bi bi-bookmarks"></i>,
        },
        {
          title: "Sanction",
          path: "/dashboard/sanction",
          icon: <i className="bi bi-border-style"></i>,
        },
        {
          title: "Training Histories",
          path: "/dashboard/training-histories",
          icon: <i className="bi bi-cast"></i>,
        },
        {
          title: "Overtime",
          path: "/dashboard/over-time",
          icon: <i className="bi bi-upc-scan"></i>,
        },
        {
          title: "Testimonial",
          path: "/dashboard/testimonial",
          icon: <i className="bi bi-check-all"></i>,
        },
        {
          title: "Vacation",
          path: "/dashboard/vacation",
          icon: <i className="bi bi-clipboard"></i>,
        },
        {
          title: "Insurance",
          path: "/dashboard/insurance",
          icon: <i className="bi bi-command"></i>,
        },
        {
          title: "General",
          path: "/dashboard/general",
          icon: <i className="bi bi-bookmark-heart"></i>,
        },
        {
          title: "Geo",
          path: "/dashboard/geo",
          icon: <i className="bi bi-cursor"></i>,
        },
        {
          title: "Departments",
          path: "/dashboard/departments",
          icon: <i className="bi bi-braces"></i>,
        },
        {
          title: "Educations",
          path: "/dashboard/educations",
          icon: <i className="bi bi-backpack"></i>,
        },
      ],
    },
  ];

  const { handleLogout } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <>
      <ul>
        {data.map((menuItem) => (
          <li key={menuItem.title}>
            <p
              className={`font-medium my-2 text-sm ${
                toggle ? "" : "text-center"
              } `}
            >
              {menuItem.title}
            </p>
            {menuItem.list.map((item) => (
              <Link
                to={item.path}
                key={item.path}
                className={`${
                  pathname === item.path ? "bg-white text-blue-950" : ""
                } flex items-center mx-2 my-2 p-2 gap-5 hover:bg-white hover:text-blue-950 rounded-md`}
              >
                <div className="text-2xl">{item.icon}</div>
                <div
                  className={`${
                    toggle ? "" : "hidden"
                  } text-lg whitespace-nowrap`}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </li>
        ))}
      </ul>
      <button
        className="flex items-center mx-2 p-2 gap-5 hover:bg-white hover:text-blue-950 rounded-md"
        onClick={() => {
          handleLogout();
        }}
      >
        <div className="text-2xl">
          <i className="bi bi-box-arrow-right"></i>
        </div>
        <div className={`${toggle ? "" : "hidden"} text-xl`}>Logout</div>
      </button>
    </>
  );
};

export default SidebarData;
