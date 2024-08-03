import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import GeneralService from "../../../services/GeneralService";

const CreateGeneral = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    coefficient: "",
    description: "",
    objectives: "",
    startDate: "",
    endDate: "",
    instructor: "",
  });
  const [showModal, setShowModal] = useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      coefficient,
      description,
      objectives,
      startDate,
      endDate,
      instructor,
    } = values;
    let newErrors = {};

    if (showModal === "workType") {
      if (!name) newErrors.name = "Not Empty.";
      if (!coefficient) newErrors.coefficient = "Not Empty.";
    } else if (showModal === "trainingProgram") {
      if (!name) newErrors.name = "Not Empty.";
      if (!description) newErrors.description = "Not Empty.";
      if (!startDate) newErrors.startDate = "Not Empty.";
      if (!endDate) newErrors.endDate = "Not Empty.";
      if (!instructor) newErrors.instructor = "Not Empty.";
    } else if (showModal === "vacationType") {
      if (!name) newErrors.name = "Not Empty.";
    } else if (showModal === "sanctionType") {
      if (!name) newErrors.name = "Not Empty.";
    } else if (showModal === "overtimeType") {
      if (!name) newErrors.name = "Not Empty.";
      if (!description) newErrors.description = "Not Empty.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (showModal === "workType") {
        await GeneralService.createWorkType(name, coefficient);
      } else if (showModal === "trainingProgram") {
        await GeneralService.createTrainingProgram(
          name,
          description,
          objectives,
          startDate,
          endDate,
          instructor
        );
      } else if (showModal === "vacationType") {
        await GeneralService.createVacationType(name);
      } else if (showModal === "sanctionType") {
        await GeneralService.createSanctionType(name);
      } else if (showModal === "overtimeType") {
        await GeneralService.createOvertimeType(name, description);
      }

      toast.success("Created successfully.");
      setValues({
        value: "",
      });
      navigate("/dashboard/general");
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
          <Link to="/dashboard/general">
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
              onClick={() => setShowModal("workType")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Work Type
            </button>
            <button
              onClick={() => setShowModal("trainingProgram")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Training Program
            </button>
            <button
              onClick={() => setShowModal("vacationType")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Vacation Type
            </button>
            <button
              onClick={() => setShowModal("sanctionType")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Sanction Type
            </button>
            <button
              onClick={() => setShowModal("overtimeType")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Overtime Type
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="bg-white p-4 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-center">
                  Create{" "}
                  {showModal.charAt(0).toUpperCase() + showModal.slice(1)}
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="grid xl:grid-cols-2 grid-cols-1 gap-2"
                >
                  {showModal === "workType" && (
                    <>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter work type"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Coefficient:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter coefficient"
                          name="coefficient"
                          value={values.coefficient}
                          onChange={handleChangeInput}
                        />
                        {errors.coefficient && (
                          <span className="text-red-700">
                            {errors.coefficient}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "trainingProgram" && (
                    <>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter name"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Objectives:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter trainingProgram name"
                          name="objectives"
                          value={values.objectives}
                          onChange={handleChangeInput}
                        />
                        {errors.objectives && (
                          <span className="text-red-700">
                            {errors.objectives}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Instructor:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter trainingProgram name"
                          name="instructor"
                          value={values.instructor}
                          onChange={handleChangeInput}
                        />
                        {errors.instructor && (
                          <span className="text-red-700">
                            {errors.instructor}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Description:
                        </span>
                        <textarea
                          name="description"
                          value={values.description}
                          onChange={handleChangeInput}
                          placeholder="Enter description"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        ></textarea>
                        {errors.description && (
                          <span className="text-red-700">
                            {errors.description}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Start Date:
                        </span>
                        <input
                          type="date"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter trainingProgram name"
                          name="startDate"
                          value={values.startDate}
                          onChange={handleChangeInput}
                        />
                        {errors.startDate && (
                          <span className="text-red-700">
                            {errors.startDate}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          End Date:
                        </span>
                        <input
                          type="date"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          name="endDate"
                          value={values.endDate}
                          onChange={handleChangeInput}
                        />
                        {errors.endDate && (
                          <span className="text-red-700">{errors.endDate}</span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "vacationType" && (
                    <>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter trainingProgram name"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "sanctionType" && (
                    <>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter trainingProgram name"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "overtimeType" && (
                    <>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter name"
                          name="name"
                          value={values.name}
                          onChange={handleChangeInput}
                        />
                        {errors.name && (
                          <span className="text-red-700">{errors.name}</span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Description:
                        </span>
                        <textarea
                          name="description"
                          value={values.description}
                          onChange={handleChangeInput}
                          placeholder="Enter description"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        ></textarea>
                        {errors.description && (
                          <span className="text-red-700">
                            {errors.description}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-950 text-white rounded-md"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-300 rounded-md"
                      onClick={handleCloseModal}
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

export default CreateGeneral;
