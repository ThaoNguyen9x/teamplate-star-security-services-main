import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

const MobileMenu = ({
  links,
  isMenuOpen,
  toggleDropdown,
  dropdownOpenIndex,
  setIsMenuOpen,
}) => {
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location, setIsMenuOpen]);

  return (
    <div
      className={`bg-[#1a191d] min-h-screen text-white space-y-10 mt-[5.2rem] p-10 ${
        isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
      } xl:hidden`}
    >
      {links.map((link, index) => (
        <div key={index} className="relative">
          {link.dropdown ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(index);
              }}
              className="flex items-center gap-2 text-base uppercase font-medium hover:text-red-700"
            >
              {link.title}
              {link.dropdown && (
                <IoChevronDown
                  className={`transition-transform duration-300 text-sm ${
                    dropdownOpenIndex === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            <Link
              to={link.path}
              className="flex items-center gap-2 text-base uppercase font-medium hover:text-red-700"
            >
              {link.title}
            </Link>
          )}
          {link.dropdown && dropdownOpenIndex === index && (
            <ul className="mt-5 px-5 space-y-5">
              {link.dropdown.map((sublink, subIndex) => (
                <li key={subIndex}>
                  <Link
                    to={sublink.path}
                    className={`block text-base ${
                      sublink.title === "faq" ? "uppercase" : "capitalize"
                    } font-medium hover:text-red-700`}
                  >
                    {sublink.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileMenu;
