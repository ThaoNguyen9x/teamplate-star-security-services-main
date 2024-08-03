import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { AuthContext } from "../../context/AuthContent";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";

const LoginModal = ({ isOpen, onClose }) => {
  const { token, handleSetToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setValues({ ...values, rememberMe: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const token = await AuthService.login(email, password);
      handleSetToken(token);
      setValues({ email: "", password: "" });
      toast.success("Sign In Successfully.");
      navigate("/");
      onClose();
    } catch (error) {
      setErrors({
        apiError: error.message,
      });
      setTimeout(() => setErrors({}), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      setValues({ email: "", password: "" });
      setErrors({});
    }
  };

  const inputFields = [
    {
      name: "email",
      label: "Your email",
      type: "email",
      placeholder: "name@company.com",
    },
    {
      name: "password",
      label: "Your password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

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

            {errors.apiError && (
              <div
                className="mb-4 p-4 text-sm text-red-700 rounded-md bg-red-50"
                role="alert"
              >
                <span className="font-bold">Error: </span>
                {errors.apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {inputFields.map((item) => (
                <div key={item.name}>
                  <label
                    htmlFor={item.name}
                    className="block mb-2 text-base font-medium"
                  >
                    {item.label}
                  </label>
                  <input
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    value={values[item.name]}
                    onChange={handleChangeInput}
                    placeholder={item.placeholder}
                    className="border border-gray-300 rounded-md outline-none block w-full p-2.5"
                  />
                  {errors[item.name] && (
                    <span className="text-red-700">{errors[item.name]}</span>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={values.rememberMe}
                  onChange={handleRememberMeChange}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300"
                />
                <label htmlFor="remember" className="ml-2 text-base">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 hover:opacity-80 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center mt-2"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
