import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOverlayClick}
          ></div>
          <div className="relative bg-white p-8 max-w-md w-full rounded-md shadow-lg z-50">
            <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl mb-4">
              Sign in
            </h1>
            <button
              className="absolute top-0 right-0 m-4 p-2 rounded-full text-red-700 hover:opacity-80"
              onClick={onClose}
            >
              <IoIosClose className="text-3xl" />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="border border-gray-300 rounded-md outline-none block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border border-gray-300 rounded-md outline-none block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300  dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
                <label htmlFor="remember" className="ml-2 text-base">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 hover:opacity-80 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center mt-2"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;