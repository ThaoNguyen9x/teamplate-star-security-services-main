import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import GeneralService from "../../../services/GeneralService";
import EmployeeService from "../../../services/EmployeeService";

const CreateGeneral = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    coefficient: "",
    year: "",
    month: "",
    day: "",
    reportedHours: "",
    minutesIn: "",
    minutesOut: "",
    hoursOut: "",
    employeeId: "",
    workTypeId: "",
  });
  const [workTypes, setWorkTypes] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [workTypeData, attendancesData, employeesData] = await Promise.all([
        GeneralService.getAllWorkTypes(),
        GeneralService.getAllAttendances(),
        EmployeeService.getAllEmployees(),
      ]);

      setWorkTypes(workTypeData.$values || []);
      setAttendances(attendancesData.$values || []);
      setEmployees(employeesData.data || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

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
      year,
      month,
      day,
      reportedHours,
      minutesIn,
      minutesOut,
      hoursOut,
      employeeId,
      workTypeId,
    } = values;
    let newErrors = {};

    if (showModal === "workType") {
      if (!name) newErrors.name = "Name is required.";
      if (!coefficient) newErrors.coefficient = "Coefficient is required.";
    } else if (showModal === "attendance") {
      if (!year) newErrors.year = "Year is required.";
      if (!month) newErrors.month = "month is required.";
      if (!day) newErrors.day = "Day is required.";
      if (!reportedHours)
        newErrors.reportedHours = "Reported hours is required.";
      if (!minutesIn) newErrors.minutesIn = "Minutes in is required.";
      if (!minutesOut) newErrors.minutesOut = "Minutes out is required.";
      if (!hoursOut) newErrors.hoursOut = "Hours out is required.";
      if (!employeeId) newErrors.employeeId = "Employee is required.";
      if (!employeeId) newErrors.employeeId = "Employee is required.";
    } else if (showModal === "district") {
      if (!nameDistrict) newErrors.nameDistrict = "District name is required.";
      if (!attendanceId) newErrors.attendanceId = "Attendance is required.";
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
        toast.success("WorkType created successfully.");
      } else if (showModal === "attendance") {
        await GeneralService.createAttendance(
          year,
          month,
          day,
          reportedHours,
          minutesIn,
          minutesOut,
          hoursOut,
          employeeId,
          workTypeId
        );
        toast.success("Attendance created successfully.");
      } else if (showModal === "district") {
        await GeneralService.createDistrict(nameDistrict, type);
        toast.success("District created successfully.");
      }
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
          <Link to="/dashboard/geo">
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
              onClick={() => setShowModal("attendance")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Attendance
            </button>
            <button
              onClick={() => setShowModal("district")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create District
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
                  {showModal === "attendance" && (
                    <>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Year:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="year"
                          value={values.year}
                          onChange={handleChangeInput}
                        />
                        {errors.year && (
                          <span className="text-red-700">{errors.year}</span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Month:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="month"
                          value={values.month}
                          onChange={handleChangeInput}
                        />
                        {errors.month && (
                          <span className="text-red-700">{errors.month}</span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Day:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="day"
                          value={values.day}
                          onChange={handleChangeInput}
                        />
                        {errors.day && (
                          <span className="text-red-700">{errors.day}</span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Reported Hours:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="reportedHours"
                          value={values.reportedHours}
                          onChange={handleChangeInput}
                        />
                        {errors.reportedHours && (
                          <span className="text-red-700">
                            {errors.reportedHours}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Minutes In:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="minutesIn"
                          value={values.minutesIn}
                          onChange={handleChangeInput}
                        />
                        {errors.minutesIn && (
                          <span className="text-red-700">
                            {errors.minutesIn}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Minutes Out:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="minutesOut"
                          value={values.minutesOut}
                          onChange={handleChangeInput}
                        />
                        {errors.minutesOut && (
                          <span className="text-red-700">
                            {errors.minutesOut}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2 xl:col-span-1">
                        <span className="block font-medium text-primary mb-1">
                          Hours Out:
                        </span>
                        <input
                          type="number"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="hoursOut"
                          value={values.hoursOut}
                          onChange={handleChangeInput}
                        />
                        {errors.hoursOut && (
                          <span className="text-red-700">
                            {errors.hoursOut}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Employee:
                        </span>
                        <select
                          name="employeeId"
                          value={values.employeeId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select Employee</option>
                          {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.name}
                            </option>
                          ))}
                        </select>
                        {errors.employeeId && (
                          <span className="text-red-700">
                            {errors.employeeId}
                          </span>
                        )}
                      </label>
                      <label className="col-span-2">
                        <span className="block font-medium text-primary mb-1">
                          Work Type:
                        </span>
                        <select
                          name="workTypeId"
                          value={values.workTypeId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select WorkType</option>
                          {workTypes.map((workType) => (
                            <option key={workType.Id} value={workType.Id}>
                              {workType.Name}
                            </option>
                          ))}
                        </select>
                        {errors.workTypeId && (
                          <span className="text-red-700">
                            {errors.workTypeId}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "district" && (
                    <>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance name"
                          name="nameDistrict"
                          value={values.nameDistrict}
                          onChange={handleChangeInput}
                        />
                        {errors.nameDistrict && (
                          <span className="text-red-700">
                            {errors.nameDistrict}
                          </span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          District Type:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter attendance type"
                          name="type"
                          value={values.type}
                          onChange={handleChangeInput}
                        />
                        {errors.type && (
                          <span className="text-red-700">{errors.type}</span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Attendance:
                        </span>
                        <select
                          name="attendanceId"
                          value={values.attendanceId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select Attendance</option>
                          {attendances.map((attendance) => (
                            <option key={attendance.Id} value={attendance.Id}>
                              {attendance.NameCity}
                            </option>
                          ))}
                        </select>
                        {errors.attendanceId && (
                          <span className="text-red-700">
                            {errors.attendanceId}
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
