import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Profile = () => {
  // Replace with actual user data or fetch from API
  const [user, setUser] = useState({
    id: "001",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://ss-images.saostar.vn/w800/pc/1656777768375/saostar-iudf5oihbo6zh3w5.jpg",
    phone: "123-456-7890",
    position: "Manager",
    // Add more profile details as needed
  });

  const [showModal, setShowModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password change logic here (API call or other logic)
    console.log("Password change data:", passwordData);
    // Close modal after submitting
    setShowModal(false);
    // Clear form fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-10">
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Welcome, {user.name}!</h3>
            <button
              onClick={() => setShowModal(true)}
              className="text-red-700 hover:underline outline-none"
            >
              Change Password
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 flex items-center justify-center">
              <LazyLoadImage
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover"
                effect="blur"
              />
            </div>
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name:
                </label>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone:
                </label>
                <p className="text-lg font-semibold">{user.phone}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Position:
                </label>
                <p className="text-lg font-semibold">{user.position}</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>

      {/* Password Change Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password:
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password:
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-700 text-white px-4 py-2 rounded-md hover:opacity-80 outline-none"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
