import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import WelfareService from "../../../services/WelfareService";
import EmployeeService from "../../../services/EmployeeService";
import GeneralSanctionType from "../../../services/GeneralService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListTrainingHistories = () => {
  const [values, setValues] = useState({
    name: "",
    programID: "",
    employeeID: "",
    completionStatus: "",
    completionDate: "",
  });
  const [trainingHistories, setTrainingHistories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    programID: "",
    employeeID: "",
    completionStatus: "",
    completionDate: "",
    model: "trainingHistory",
  });
  const [searchQuery, setSearchQuery] = useState({ trainingHistory: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [trainingHistoriesData, employeesData, trainingProgramsData] =
        await Promise.all([
          WelfareService.getAllTrainingHistories(),
          EmployeeService.getAllEmployees(),
          GeneralSanctionType.getAllTrainingPrograms(),
        ]);

      setTrainingHistories(trainingHistoriesData || []);
      setEmployees(employeesData || []);
      setTrainingPrograms(trainingProgramsData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      trainingID,
      name,
      programID,
      employeeID,
      completionStatus,
      completionDate
    ) => {
      setEditItem({
        id: trainingID,
        name,
        programID,
        employeeID,
        completionStatus,
        completionDate,
        model: "trainingHistory",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.name ||
      !editItem.programID ||
      !editItem.employeeID ||
      !editItem.completionStatus ||
      !editItem.completionDate
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const {
        id,
        name,
        programID,
        employeeID,
        completionStatus,
        completionDate,
      } = editItem;
      await WelfareService.updateTrainingHistorie(
        id,
        name,
        programID,
        employeeID,
        completionStatus,
        completionDate
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        name: "",
        programID: "",
        employeeID: "",
        completionStatus: "",
        completionDate: "",
        model: "trainingHistory",
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
      await WelfareService.deleteTrainingHistorie(currentId);
      setTrainingHistories((prev) =>
        prev.filter((c) => c.trainingID !== currentId)
      );
      toast.success("Deleted successfully.");
      await fetchAllData();
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to delete data.");
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
    return employees.find((c) => c.id === id)?.name || "N/A";
  };

  const getTrainingProgramsOptions = () => {
    return trainingPrograms.map((c) => (
      <option key={c.programID} value={c.programID}>
        {c.programName}
      </option>
    ));
  };

  const getTrainingProgramName = (id) => {
    return (
      trainingPrograms.find((c) => c.programID === id)?.programName || "N/A"
    );
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
        selector: (row) => row.name || "",
        cell: (row) =>
          editItem.id === row.trainingID && editItem.model === model ? (
            <input
              type="text"
              value={editItem.name}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.name || ""
          ),
        sortable: true,
      },
      {
        name: "Employee",
        selector: (row) => getEmployeeName(row.employeeID),
        cell: (row) =>
          editItem.id === row.trainingID && editItem.model === model ? (
            <select
              value={editItem.employeeID}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  employeeID: e.target.value,
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
        name: "Training Program",
        selector: (row) => getTrainingProgramName(row.programID),
        cell: (row) =>
          editItem.id === row.trainingID && editItem.model === model ? (
            <select
              value={editItem.programID}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  programID: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getTrainingProgramsOptions()}
            </select>
          ) : (
            getTrainingProgramName(row.programID)
          ),
        sortable: true,
      },
      {
        name: "Completion Date",
        selector: (row) => formatDate(row.completionDate) || "",
        cell: (row) =>
          editItem.id === row.trainingID && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.completionDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  completionDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.completionDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Completion Status",
        selector: (row) => row.completionStatus || "",
        cell: (row) =>
          editItem.id === row.trainingID && editItem.model === model ? (
            <select
              value={editItem.completionStatus}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  completionStatus: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          ) : (
            row.completionStatus || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {editItem.id === row.trainingID && editItem.model === model ? (
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
                      name: "",
                      programID: "",
                      employeeID: "",
                      completionStatus: "",
                      completionDate: "",
                      model: "trainingHistory",
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
                      row.trainingID,
                      row.name,
                      row.programID,
                      row.employeeID,
                      row.completionStatus,
                      row.completionDate
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.trainingID, model)}
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

    const { name, programID, employeeID, completionStatus, completionDate } =
      values;

    let newErrors = {};

    if (!name) newErrors.name = "Not Empty.";
    if (!programID) newErrors.programID = "Not Empty.";
    if (!employeeID) newErrors.employeeID = "Not Empty.";
    if (!completionStatus)
      newErrors.completionStatus = "Not Empty.";
    if (!completionDate)
      newErrors.completionDate = "Not Empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await WelfareService.createTrainingHistorie(
        name,
        programID,
        employeeID,
        completionStatus,
        completionDate
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
          <div className="font-semibold text-xl capitalize">
            Training Histories
          </div>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 bg-blue-950 text-white rounded-md"
          >
            Create New
          </button>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
        <div className="w-full overflow-x-scroll">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search trainingHistory"
                value={searchQuery.trainingHistory}
                onChange={handleSearchChange("trainingHistory")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("trainingHistory")}
              data={trainingHistories}
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
            <h2 className="text-xl font-semibold mb-5">
              Create Training History
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1">
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
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Employee:
                </span>
                <select
                  name="employeeID"
                  value={values.employeeID}
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
                {errors.employeeID && (
                  <span className="text-red-700">{errors.employeeID}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Program:
                </span>
                <select
                  name="programID"
                  value={values.programID}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {trainingPrograms.map((trainingProgram) => (
                    <option
                      key={trainingProgram.programID}
                      value={trainingProgram.programID}
                    >
                      {trainingProgram.programName}
                    </option>
                  ))}
                </select>
                {errors.programID && (
                  <span className="text-red-700">{errors.programID}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Completion Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="completionDate"
                  value={values.completionDate}
                  onChange={handleChangeInput}
                />
                {errors.completionDate && (
                  <span className="text-red-700">{errors.completionDate}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Completion Status:
                </span>
                <select
                  name="completionStatus"
                  value={values.completionStatus}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.completionStatus && (
                  <span className="text-red-700">
                    {errors.completionStatus}
                  </span>
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

export default ListTrainingHistories;
