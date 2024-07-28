import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { logo } from "../../../assets/index";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import Dropdown from "./Dropdown";
import LoginModal from "../LoginModal";

const links = [
  { title: "home", path: "/" },
  {
    title: "overview",
    dropdown: [
      { title: "about us", path: "/about-us" },
      { title: "our history", path: "/our-history" },
      { title: "our network", path: "/our-network" },
      { title: "faq", path: "/faq" },
    ],
  },
  {
    title: "our business",
    dropdown: [
      { title: "Manned Guarding", path: "/our-business/manned-guarding" },
      { title: "Cash Services", path: "/our-business/cash-services" },
      { title: "Recruitment and Training", path: "/our-business/recruitment-and-training" },
      { title: "Electronic Security Systems", path: "/our-business/electronic-security-systems" },
    ],
  },
  { title: "careers", path: "/careers" },
  { title: "clients", path: "/clients" },
  { title: "contact us", path: "/contact-us" },
];

const Header = () => {
  const Logined = false;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef();
  const menuRef = useRef();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const toggleDropdown = (index) => {
    setDropdownOpenIndex(prev => (prev === index ? null : index));
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(prev => !prev);
    setDropdownOpenIndex(null);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setProfileDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 200);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoginModalOpen(false);
    }, 2000); 
  };

  return (
    <header className="max-w-screen-2xl mx-auto bg-white fixed top-0 left-0 right-0 z-[50]">
      <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 bg-white shadow-sm duration-300" : ""}`}>
        <div className="flex items-center justify-between text-base font-medium gap-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 h-full object-cover" />
          </Link>

          <Dropdown
            links={links}
            dropdownOpenIndex={dropdownOpenIndex}
            toggleDropdown={toggleDropdown}
            setDropdownOpenIndex={setDropdownOpenIndex}
          />

          <div className="flex items-center space-x-5">
            {Logined ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                token={token}
                handleLogout={handleLogout}
                toggleDropdown={toggleProfileDropdown}
                onClose={() => setProfileDropdownOpen(false)}
              />
            ) : (
              <button
                className="bg-[#1a191d] text-white py-2 px-4 transition-all duration-300 rounded hover:bg-red-700"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </button>
            )}

            <div
              className="xl:hidden text-[#1a191d] hover:text-red-700 focus:text-red-700 cursor-pointer transition-all duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <IoClose className="w-7 h-7" />
              ) : (
                <IoMenu className="w-7 h-7" />
              )}
            </div>
          </div>
        </div>

        <MobileMenu
          links={links}
          isMenuOpen={isMenuOpen}
          toggleDropdown={toggleDropdown}
          dropdownOpenIndex={dropdownOpenIndex}
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        loading={loading} 
        onLogin={handleLogin}
      />
    </header>
  );
};

export default Header;
