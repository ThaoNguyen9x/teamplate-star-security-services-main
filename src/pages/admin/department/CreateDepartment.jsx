import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import DepartmentService from "../../../services/DepartmentService";

const CreateDepartment = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    generalDepartmentId: "",
    managerId: "",
    departnentId: "",
  });
  const [generalDepartments, setGeneralDepartments] = useState([]);
  const [manages, setManages] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [generalDepartmentsData, managesData, departmentsData] =
        await Promise.all([
          DepartmentService.getAllGeneralDepartments(),
          DepartmentService.getAllManages(),
          DepartmentService.getAllDepartments(),
        ]);

      setGeneralDepartments(generalDepartmentsData.$values || []);
      setManages(managesData.$values || []);
      setDepartments(departmentsData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, generalDepartmentId, managerId, departnentId } = values;
    let newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (showModal === "department") {
      if (!generalDepartmentId)
        newErrors.generalDepartmentId = "General department is required.";
      if (!managerId) newErrors.managerId = "Manager is required.";
    }
    if (showModal === "branch") {
      if (!departnentId) newErrors.departnentId = "Department is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (showModal === "generalDepartment") {
        await DepartmentService.createGeneralDepartment(name);
        toast.success("General department created successfully.");
      } else if (showModal === "manage") {
        await DepartmentService.createManage(name);
        toast.success("Manager created successfully.");
      } else if (showModal === "department") {
        await DepartmentService.createDepartment(
          name,
          generalDepartmentId,
          managerId
        );
        toast.success("Department created successfully.");
      } else if (showModal === "branch") {
        await DepartmentService.createBranch(name, departnentId);
        toast.success("Branch created successfully.");
      }
      setValues({
        value: "",
      });
      navigate("/dashboard/departments");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setValues({
      values: "",
    });
    setErrors({
      errors: "",
    });
    setShowModal("");
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">
            {pathname.split("/").pop()}
          </div>
          <Link to="/dashboard/departments">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Back to List
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 p-2 sm:p-5 bg-gray-100 rounded-md">
          {errors.apiError && (
            <div
              className="p-4 my-2 text-sm text-red-700 rounded-lg bg-red-100"
              role="alert"
            >
              <span className="font-bold">Error: </span>
              {errors.apiError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 p-3">
            <button
              onClick={() => setShowModal("generalDepartment")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create General Department
            </button>
            <button
              onClick={() => setShowModal("manage")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Manager
            </button>
            <button
              onClick={() => setShowModal("department")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Department
            </button>
            <button
              onClick={() => setShowModal("branch")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Branch
            </button>
          </div>

          {/* Modal Content */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="bg-white p-4 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-center">
                  Create{" "}
                  {showModal.charAt(0).toUpperCase() + showModal.slice(1)}
                </h3>
                <form onSubmit={handleSubmit}>
                  {showModal === "generalDepartment" && (
                    <label className="block">
                      <span className="block font-medium text-primary mb-1">
                        Name:
                      </span>
                      <input
                        type="text"
                        className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        placeholder="Enter general department name"
                        name="name"
                        value={values.name}
                        onChange={handleChangeInput}
                      />
                      {errors.name && (
                        <span className="text-red-700">{errors.name}</span>
                      )}
                    </label>
                  )}
                  {showModal === "manage" && (
                    <label className="block">
                      <span className="block font-medium text-primary mb-1">
                        Name:
                      </span>
                      <input
                        type="text"
                        className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        placeholder="Enter manager name"
                        name="name"
                        value={values.name}
                        onChange={handleChangeInput}
                      />
                      {errors.name && (
                        <span className="text-red-700">{errors.name}</span>
                      )}
                    </label>
                  )}
                  {showModal === "department" && (
                    <>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter department name"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          General Department:
                        </span>
                        <select
                          name="generalDepartmentId"
                          value={values.generalDepartmentId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select a general department</option>
                          {generalDepartments.map((department) => (
                            <option key={department.Id} value={department.Id}>
                              {department.Name}
                            </option>
                          ))}
                        </select>
                        {errors.generalDepartmentId && (
                          <span className="text-red-700">
                            {errors.generalDepartmentId}
                          </span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Manager:
                        </span>
                        <select
                          name="managerId"
                          value={values.managerId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select a manager</option>
                          {manages.map((manager) => (
                            <option key={manager.Id} value={manager.Id}>
                              {manager.Name}
                            </option>
                          ))}
                        </select>
                        {errors.managerId && (
                          <span className="text-red-700">
                            {errors.managerId}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "branch" && (
                    <>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter branch name"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Department:
                        </span>
                        <select
                          name="departnentId"
                          value={values.departnentId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select a department</option>
                          {departments.map((department) => (
                            <option key={department.Id} value={department.Id}>
                              {department.Name}
                            </option>
                          ))}
                        </select>
                        {errors.departnentId && (
                          <span className="text-red-700">
                            {errors.departnentId}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-950 text-white rounded-md"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateDepartment;
