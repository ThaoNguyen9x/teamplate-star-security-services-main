import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import WelfareService from "../../../services/WelfareService";
import EmployeeService from "../../../services/EmployeeService";
import GeneralManager from "../../../services/GeneralService";
import DepartmentService from "../../../services/DepartmentService";
import GeneralSanctionType from "../../../services/GeneralService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListOvertime = () => {
  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    overtimTypeId: "",
    employeeId: "",
    approvedById: "",
    approvalDate: "",
    remarks: "",
  });
  const [overtimes, setOvertimes] = useState([]);
  const [overtimeTypes, setOvertimeTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    startDate: "",
    endDate: "",
    overtimTypeId: "",
    employeeId: "",
    approvedById: "",
    approvalDate: "",
    remarks: "",
    model: "overtime",
  });
  const [searchQuery, setSearchQuery] = useState({ overtime: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [overtimesData, employeesData, managersData, overtimeTypesData] =
        await Promise.all([
          WelfareService.getAllOvertimes(),
          EmployeeService.getAllEmployees(),
          DepartmentService.getAllManages(),
          GeneralSanctionType.getAllOvertimeTypes(),
        ]);

      setOvertimes(overtimesData.$values || []);
      setEmployees(employeesData || []);
      setManagers(managersData.$values || []);
      setOvertimeTypes(overtimeTypesData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      id,
      startDate,
      endDate,
      overtimTypeId,
      employeeId,
      approvedById,
      approvalDate,
      remarks
    ) => {
      setEditItem({
        id,
        startDate,
        endDate,
        overtimTypeId,
        employeeId,
        approvedById,
        approvalDate,
        remarks,
        model: "overtime",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const {
        id,
        startDate,
        endDate,
        overtimTypeId,
        employeeId,
        approvedById,
        approvalDate,
        remarks,
      } = editItem;
      await WelfareService.updateOvertime(
        id,
        startDate,
        endDate,
        overtimTypeId,
        employeeId,
        approvedById,
        approvalDate,
        remarks
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update data. Please try again.");
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        startDate: "",
        endDate: "",
        overtimTypeId: "",
        employeeId: "",
        approvedById: "",
        approvalDate: "",
        remarks: "",
        model: "overtime",
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
      await WelfareService.deleteOvertime(currentId);
      setOvertimes((prev) => prev.filter((c) => c.Id !== currentId));
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

  const getManagersOptions = () => {
    return managers.map((c) => (
      <option key={c.Id} value={c.Id}>
        {c.Name}
      </option>
    ));
  };

  const getManagerName = (id) => {
    return managers.find((c) => c.Id === id)?.Name || "N/A";
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
        name: "Overtime Type",
        selector: (row) => getManagerName(row.ManagerId),
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <select
              value={editItem.managerId}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  managerId: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getManagersOptions()}
            </select>
          ) : (
            getManagerName(row.ManagerId)
          ),
        sortable: true,
      },
      {
        name: "Punishment",
        selector: (row) => row.Punishment || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.punishment}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  punishment: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.Punishment || ""
          ),
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => formatDate(row.Date) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.date)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  date: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.Date) || ""
          ),
        sortable: true,
      },
      {
        name: "Punishment Date",
        selector: (row) => formatDate(row.PunishmentDate) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.punishmentDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  punishmentDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.PunishmentDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2">
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
                      date: "",
                      punishment: "",
                      punishmentDate: "",
                      employeeId: "",
                      managerId: "",
                      model: "sanction",
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
                      row.Date,
                      row.Punishment,
                      row.PunishmentDate,
                      row.EmployeeId,
                      row.ManagerId
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
    [editItem, handleEditClick, handleUpdate, handleDeleteClick]
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
      employeeId,
      approvedById,
      overtimTypeId,
      remarks,
      startDate,
      endDate,
      approvalDate,
    } = values;

    let newErrors = {};

    if (!employeeId) newErrors.employeeId = "Name is required.";
    if (!approvedById) newErrors.approvedById = "Issue date is required.";
    if (!startDate) newErrors.startDate = "Employee is required.";
    if (!remarks) newErrors.remarks = "Employee is required.";
    if (!overtimTypeId) newErrors.overtimTypeId = "Issue place is required.";
    if (!endDate) newErrors.endDate = "Health check place is required.";
    if (!approvalDate)
      newErrors.approvalDate = "Health check place is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await WelfareService.createOvertime(
        employeeId,
        approvedById,
        overtimTypeId,
        remarks,
        startDate,
        endDate,
        approvalDate
      );

      handleCloseModal();
      toast.success("Overtime created successfully.");
      await fetchAllData();
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create sanction.");
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
          <div className="font-semibold text-xl capitalize">Overtime</div>
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
                placeholder="Search sanction"
                value={searchQuery.overtime}
                onChange={handleSearchChange("sanction")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("overtime")}
              data={overtimes}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              customStyles={{
                headCells: {
                  style: {
                    fontSize: "16px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    background: "#f3f4f6",
                    padding: "12px 24px",
                  },
                },
                cells: {
                  style: {
                    fontSize: "14px",
                    background: "#f3f4f6",
                    padding: "12px 24px",
                  },
                },
                pagination: {
                  style: {
                    fontSize: "14px",
                    background: "#f3f4f6",
                    padding: "12px 24px",
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
            <h2 className="text-xl font-semibold mb-5">Create Overtime</h2>
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
                  Approved By:
                </span>
                <select
                  name="approvedById"
                  value={values.approvedById}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {managers.map((manage) => (
                    <option key={manage.Id} value={manage.Id}>
                      {manage.EmployeeId}
                    </option>
                  ))}
                </select>
                {errors.approvedById && (
                  <span className="text-red-700">{errors.approvedById}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Overtime Type:
                </span>
                <select
                  name="overtimTypeId"
                  value={values.overtimTypeId}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {overtimeTypes.map((overtimeType) => (
                    <option key={overtimeType.Id} value={overtimeType.Id}>
                      {overtimeType.Name}
                    </option>
                  ))}
                </select>
                {errors.overtimTypeId && (
                  <span className="text-red-700">{errors.overtimTypeId}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Remarks:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="remarks"
                  value={values.remarks}
                  onChange={handleChangeInput}
                />
                {errors.remarks && (
                  <span className="text-red-700">{errors.remarks}</span>
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
                  name="startDate"
                  value={values.startDate}
                  onChange={handleChangeInput}
                />
                {errors.startDate && (
                  <span className="text-red-700">{errors.startDate}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  End Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="endDate"
                  value={values.endDate}
                  onChange={handleChangeInput}
                />
                {errors.endDate && (
                  <span className="text-red-700">{errors.endDate}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Approval Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="approvalDate"
                  value={values.approvalDate}
                  onChange={handleChangeInput}
                />
                {errors.approvalDate && (
                  <span className="text-red-700">{errors.approvalDate}</span>
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

export default ListOvertime;
