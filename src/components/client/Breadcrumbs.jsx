import React from "react";
import { useLocation, Link } from "react-router-dom";
import Wrapper from "./Wrapper";

const Breadcrumbs = ({ title, page }) => {
  const location = useLocation();

  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: `/${page}`, breadcrumb: page },
    { path: `/${page}/:pid/${title}`, breadcrumb: title },
  ];

  const formatBreadcrumb = (breadcrumb) => {
    return breadcrumb.replace(/-/g, " ").toUpperCase();
  };

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbs = [{ path: "/", breadcrumb: "Home" }];

    pathnames.forEach((_, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      const route = routes.find((route) => route.path === path);
      if (route) {
        breadcrumbs.push({ path, breadcrumb: route.breadcrumb });
      } else {
        breadcrumbs.push({ path, breadcrumb: pathnames[index] });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const currentBreadcrumb = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Wrapper className="mt-[5.5rem] bg-[#1a191d] text-white flex flex-col items-center gap-2 p-10 uppercase">
      <div className="text-4xl font-bold">
        {formatBreadcrumb(currentBreadcrumb.breadcrumb)}
      </div>
      <div className="flex">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            <Link to={crumb.path} className="text-white hover:text-red-700">
              {formatBreadcrumb(crumb.breadcrumb)}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-2">-</span>}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Breadcrumbs;
