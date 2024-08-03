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

const ListVacation = () => {
  const [values, setValues] = useState({
    employeeId: "",
    numberOfDays: "",
    startDtae: "",
    vacationTypeId: "",
  });
  const [vacations, setVacations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [vacationTypes, setVacationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    employeeId: "",
    numberOfDays: "",
    startDtae: "",
    vacationTypeId: "",
    model: "vacation",
  });
  const [searchQuery, setSearchQuery] = useState({ vacation: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [vacationsData, vacationTypesData, employeesData] =
        await Promise.all([
          WelfareService.getAllVacations(),
          GeneralSanctionType.getAllVacationTypes(),
          EmployeeService.getAllEmployees(),
        ]);

      setVacations(vacationsData.$values || []);
      setVacationTypes(vacationTypesData.$values || []);
      setEmployees(employeesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, employeeId, vacationTypeId, numberOfDays, startDtae, endDate) => {
      setEditItem({
        id,
        employeeId,
        vacationTypeId,
        numberOfDays,
        startDtae,
        endDate,
        model: "vacation",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { id, startDtae, numberOfDays, vacationTypeId, employeeId } =
        editItem;
      await WelfareService.updateVacation(
        id,
        startDtae,
        numberOfDays,
        vacationTypeId,
        employeeId
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update data. Please try again.");
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        startDtae: "",
        numberOfDays: "",
        vacationTypeId: "",
        employeeId: "",
        model: "vacation",
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
      await WelfareService.deleteVacation(currentId);
      setVacations((prev) => prev.filter((c) => c.Id !== currentId));
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

  const getVacationTypesOptions = () => {
    return vacationTypes.map((c) => (
      <option key={c.Id} value={c.Id}>
        {c.Name}
      </option>
    ));
  };

  const getVacationTypeName = (id) => {
    return vacationTypes.find((c) => c.Id === id)?.Name || "N/A";
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
        name: "Employee",
        selector: (row) => getEmployeeName(row.EmployeeId),
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
            getEmployeeName(row.EmployeeId)
          ),
        sortable: true,
      },
      {
        name: "Vacation Type",
        selector: (row) => getVacationTypeName(row.VacationTypeId),
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <select
              value={editItem.vacationTypeId}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  vacationTypeId: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getVacationTypesOptions()}
            </select>
          ) : (
            getVacationTypeName(row.VacationTypeId)
          ),
        sortable: true,
      },
      {
        name: "Number Of Days",
        selector: (row) => row.NumberOfDays || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="number"
              value={editItem.numberOfDays}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  numberOfDays: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.NumberOfDays || ""
          ),
        sortable: true,
      },
      {
        name: "Start Date",
        selector: (row) => formatDate(row.StartDtae) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.startDtae)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  startDtae: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.StartDtae) || ""
          ),
        sortable: true,
      },
      {
        name: "End Date",
        selector: (row) => formatDate(row.EndDate),
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
                      employeeId: "",
                      vacationTypeId: "",
                      numberOfDays: "",
                      startDate: "",
                      endDate: "",
                      model: "vacation",
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
                      row.EmployeeId,
                      row.VacationTypeId,
                      row.NumberOfDays,
                      row.StartDtae,
                      row.EndDate
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

    const { employeeId, numberOfDays, startDtae, vacationTypeId } = values;

    let newErrors = {};

    if (!startDtae) newErrors.startDtae = "Not Empty.";
    if (!numberOfDays) newErrors.numberOfDays = "Not Empty.";
    if (!employeeId) newErrors.employeeId = "Not Empty.";
    if (!vacationTypeId) newErrors.vacationTypeId = "Not Empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await WelfareService.createVacation(
        employeeId,
        numberOfDays,
        startDtae,
        vacationTypeId
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
          <div className="font-semibold text-xl capitalize">Vacation</div>
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
                placeholder="Search vacation"
                value={searchQuery.vacation}
                onChange={handleSearchChange("vacation")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("vacation")}
              data={vacations}
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
            <h2 className="text-xl font-semibold mb-5">Create Vacation</h2>
            <form onSubmit={handleSubmit}>
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
                  Vacation Type:
                </span>
                <select
                  name="vacationTypeId"
                  value={values.vacationTypeId}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {vacationTypes.map((vacationType) => (
                    <option key={vacationType.Id} value={vacationType.Id}>
                      {vacationType.Name}
                    </option>
                  ))}
                </select>
                {errors.vacationTypeId && (
                  <span className="text-red-700">{errors.vacationTypeId}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Number Of Days:
                </span>
                <input
                  type="number"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="numberOfDays"
                  value={values.numberOfDays}
                  onChange={handleChangeInput}
                />
                {errors.numberOfDays && (
                  <span className="text-red-700">{errors.numberOfDays}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Start Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="startDtae"
                  value={values.startDtae}
                  onChange={handleChangeInput}
                />
                {errors.startDtae && (
                  <span className="text-red-700">{errors.startDtae}</span>
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

export default ListVacation;
