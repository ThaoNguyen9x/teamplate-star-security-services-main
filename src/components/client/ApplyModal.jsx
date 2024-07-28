import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const ApplyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
    cv: "",
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
    console.log("Form submitted:", formData);
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
            <button
              className="absolute top-0 right-0 m-4 p-2 rounded-full text-red-700 hover:opacity-80"
              onClick={onClose}
            >
              <IoIosClose className="text-3xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Apply for Job</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-4 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block mb-1">Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block mb-1">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block mb-1">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="w-full px-2 mb-4">
                  <label className="block mb-1">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
                <div className="w-full px-2 mb-4">
                  <label className="block mb-1">CV (PDF):</label>
                  <input
                    type="file"
                    accept=".pdf"
                    name="cv"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 hover:opacity-80 text-white font-semibold py-2 px-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyModal;
