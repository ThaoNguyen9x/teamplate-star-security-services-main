import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import WelfareService from "../../../services/WelfareService";
import EmployeeService from "../../../services/EmployeeService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListInsurance = () => {
  const [values, setValues] = useState({
    insuranceNumber: "",
    issueDate: "",
    issuePlace: "",
    healthCheckPlace: "",
    employeeId: "",
  });
  const [insurances, setInsurances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    insuranceNumber: "",
    issueDate: "",
    issuePlace: "",
    healthCheckPlace: "",
    employeeId: "",
    model: "insurance",
  });
  const [searchQuery, setSearchQuery] = useState({ insurance: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [insurancesData, employeesData] = await Promise.all([
        WelfareService.getAllInsurances(),
        EmployeeService.getAllEmployees(),
      ]);

      setInsurances(insurancesData.$values || []);
      setEmployees(employeesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      id,
      insuranceNumber,
      issueDate,
      issuePlace,
      healthCheckPlace,
      employeeId
    ) => {
      setEditItem({
        id,
        insuranceNumber,
        issueDate,
        issuePlace,
        healthCheckPlace,
        employeeId,
        model: "insurance",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.insuranceNumber ||
      !editItem.issueDate ||
      !editItem.issuePlace ||
      !editItem.healthCheckPlace ||
      !editItem.employeeId 
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const {
        id,
        insuranceNumber,
        issueDate,
        issuePlace,
        healthCheckPlace,
        employeeId,
      } = editItem;
      await WelfareService.updateInsurance(
        id,
        insuranceNumber,
        issueDate,
        issuePlace,
        healthCheckPlace,
        employeeId
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        insuranceNumber: "",
        issueDate: "",
        issuePlace: "",
        healthCheckPlace: "",
        employeeId: "",
        model: "insurance",
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((id, model) => {
    setRemove(true);
    setCurrentId(id);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);

    try {
      await WelfareService.deleteInsurance(currentId);
      setInsurances((prev) => prev.filter((c) => c.Id !== currentId));
      toast.success("Deleted successfully.");
      await fetchAllData();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRemove(false);
    }
  }, [currentId]);

  const getEmployeesOptions = () => {
    return employees.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ));
  };

  const getEmployeeName = (id) => {
    return employees.find((c) => c.Id === id)?.name || "N/A";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderColumns = useCallback(
    (model) => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.InsuranceNumber || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.insuranceNumber}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  insuranceNumber: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.InsuranceNumber || ""
          ),
        sortable: true,
      },
      {
        name: "Employee",
        selector: (row) => getEmployeeName(row.employeeID),
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <select
              value={editItem.employeeId}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  employeeId: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getEmployeesOptions()}
            </select>
          ) : (
            getEmployeeName(row.employeeID)
          ),
        sortable: true,
      },
      {
        name: "Issue Place",
        selector: (row) => row.IssuePlace || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.issuePlace}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  issuePlace: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.IssuePlace || ""
          ),
        sortable: true,
      },
      {
        name: "HealthCheck Place",
        selector: (row) => row.HealthCheckPlace || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.healthCheckPlace}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  healthCheckPlace: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.HealthCheckPlace || ""
          ),
        sortable: true,
      },
      {
        name: "Issue Date",
        selector: (row) => formatDate(row.IssueDate) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.issueDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  issueDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.IssueDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {editItem.id === row.Id && editItem.model === model ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    setEditItem({
                      id: "",
                      insuranceNumber: "",
                      issueDate: "",
                      issuePlace: "",
                      healthCheckPlace: "",
                      employeeId: "",
                      model: "insurance",
                    })
                  }
                  className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    handleEditClick(
                      row.Id,
                      row.InsuranceNumber,
                      row.IssueDate,
                      row.IssuePlace,
                      row.HealthCheckPlace,
                      row.EmployeeId
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.Id, model)}
                  className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ),
      },
    ],
    [editItem, handleEditClick, handleUpdate, handleDeleteClick, employees]
  );

  const handleSearchChange = (model) => (event) => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [model]: event.target.value,
    }));
  };

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setValues("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      insuranceNumber,
      issueDate,
      issuePlace,
      healthCheckPlace,
      employeeId,
    } = values;

    let newErrors = {};

    if (!insuranceNumber) newErrors.insuranceNumber = "Not Empty.";
    if (!issueDate) newErrors.issueDate = "Not Empty.";
    if (!employeeId) newErrors.employeeId = "Not Empty.";
    if (!issuePlace) newErrors.issuePlace = "Not Empty.";
    if (!healthCheckPlace)
      newErrors.healthCheckPlace = "Not Empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await WelfareService.createInsurance(
        insuranceNumber,
        issueDate,
        issuePlace,
        healthCheckPlace,
        employeeId
      );

      handleCloseModal();
      toast.success("Created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error(error.message);
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

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Insurance</div>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 bg-blue-950 text-white rounded-md"
          >
            Create New
          </button>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          <div>
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search insurance"
                value={searchQuery.insurance}
                onChange={handleSearchChange("insurance")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("insurance")}
              data={insurances}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              customStyles={{
                headCells: {
                  style: {
                    textTransform: "uppercase",
                    background: "#f3f4f6",
                  },
                },
                cells: {
                  style: {
                    background: "#f3f4f6",
                  },
                },
                pagination: {
                  style: {
                    background: "#f3f4f6",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {remove && (
        <Delete
          id={currentId}
          handleDelete={handleDelete}
          setRemove={setRemove}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-5">Create Insurance</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Name:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="insuranceNumber"
                  value={values.insuranceNumber}
                  onChange={handleChangeInput}
                />
                {errors.insuranceNumber && (
                  <span className="text-red-700">{errors.insuranceNumber}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Issue Place:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="issuePlace"
                  value={values.issuePlace}
                  onChange={handleChangeInput}
                />
                {errors.issuePlace && (
                  <span className="text-red-700">{errors.issuePlace}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Health Check Place:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="healthCheckPlace"
                  value={values.healthCheckPlace}
                  onChange={handleChangeInput}
                />
                {errors.healthCheckPlace && (
                  <span className="text-red-700">
                    {errors.healthCheckPlace}
                  </span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Employee:
                </span>
                <select
                  name="employeeId"
                  value={values.employeeId}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <span className="text-red-700">{errors.employeeId}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Issue Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="issueDate"
                  value={values.issueDate}
                  onChange={handleChangeInput}
                />
                {errors.issueDate && (
                  <span className="text-red-700">{errors.issueDate}</span>
                )}
              </label>
              <div className="flex items-center gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-950 text-white rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
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

export default ListInsurance;
