import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../context/AuthContent";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [values, setValues] = useState({
    file: null,
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    position: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const valuesData = await AuthService.profile(id);
        setValues({
          file: valuesData.image || no_avatar,
          firstName: valuesData.firstName || "",
          lastName: valuesData.lastName || "",
          email: valuesData.email || "",
          address: valuesData.address || "",
          gender: valuesData.gender || "",
          position: valuesData.position || "",
        });
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(false);
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    try {
      await AuthService.changePassword(
        id,
        oldPassword,
        newPassword,
        confirmPassword
      );
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-10">
        <div className="border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Welcome, {values.name}!</h3>
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
                src={values.avatar}
                alt={values.name}
                className="w-32 h-32 rounded-full object-cover"
                effect="blur"
              />
            </div>
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name:
                </label>
                <p className="text-lg font-semibold">{values.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <p className="text-lg font-semibold">{values.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone:
                </label>
                <p className="text-lg font-semibold">{values.phone}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Position:
                </label>
                <p className="text-lg font-semibold">{values.position}</p>
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
