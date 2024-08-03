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
    employeeId: "",
    approvedById: "",
    overtimTypeId: "",
    remarks: "",
    numberOfDay: "",
    startDate: "",
    endDate: "",
    approvalDate: "",
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
      employeeId,
      approvedById,
      overtimTypeId,
      remarks,
      numberOfDay,
      startDate,
      endDate,
      approvalDate
    ) => {
      setEditItem({
        id,
        employeeId,
        approvedById,
        overtimTypeId,
        remarks,
        numberOfDay,
        startDate,
        endDate,
        approvalDate,
        model: "overtime",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.employeeId ||
      !editItem.approvedById ||
      !editItem.overtimTypeId ||
      !editItem.remarks ||
      !editItem.numberOfDay ||
      !editItem.startDate ||
      !editItem.endDate ||
      !editItem.approvalDate
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (new Date(editItem.startDate) > new Date(editItem.endDate)) {
      toast.error("Start date cannot be greater than end date.");
      return;
    }

    setLoading(true);

    try {
      const {
        id,
        employeeId,
        approvedById,
        overtimTypeId,
        remarks,
        numberOfDay,
        startDate,
        endDate,
        approvalDate,
      } = editItem;

      await WelfareService.updateOvertime(
        id,
        employeeId,
        approvedById,
        overtimTypeId,
        remarks,
        numberOfDay,
        startDate,
        endDate,
        approvalDate
      );

      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        employeeId: "",
        approvedById: "",
        overtimTypeId: "",
        remarks: "",
        numberOfDay: "",
        startDate: "",
        endDate: "",
        approvalDate: "",
        model: "overtime",
      });
    }
  }, [editItem, fetchAllData]);

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
      toast.error("Failed to delete.");
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
        {c.Id}
      </option>
    ));
  };

  const getManagerName = (id) => {
    const manager = managers.find((c) => c.id === id)?.Id;
    const employee = employees.find((e) => e.Id === manager.EmployeeId);
    return employee ? employee.name : "N/A";
  };

  const getOverTypesOptions = () => {
    return overtimeTypes.map((c) => (
      <option key={c.Id} value={c.Id}>
        {c.Name}
      </option>
    ));
  };

  const getOverTypeName = (id) => {
    return overtimeTypes.find((c) => c.Id === id)?.Name || "N/A";
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
        name: "Manager",
        selector: (row) => getManagerName(row.ManagerId),
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <select
              value={editItem.approvedById}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  approvedById: e.target.value,
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
        name: "Overtime Type",
        selector: (row) => getOverTypeName(row.OvertimTypeId),
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <select
              value={editItem.overtimTypeId}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  overtimTypeId: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getOverTypesOptions()}
            </select>
          ) : (
            getOverTypeName(row.OvertimTypeId)
          ),
        sortable: true,
      },
      {
        name: "Remarks",
        selector: (row) => row.Remarks || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.remarks}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  remarks: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.Remarks || ""
          ),
        sortable: true,
      },
      {
        name: "Number Of Day",
        selector: (row) => Math.abs(row.NumberOfDay || 0),
        sortable: true,
      },
      {
        name: "Start Date",
        selector: (row) => formatDate(row.StartDate) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.startDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  startDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.StartDate) || ""
          ),
        sortable: true,
      },
      {
        name: "End Date",
        selector: (row) => formatDate(row.EndDate) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.endDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  endDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.EndDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Approval Date",
        selector: (row) => formatDate(row.ApprovalDate) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.approvalDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  approvalDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.ApprovalDate) || ""
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
                      employeeId: "",
                      approvedById: "",
                      overtimTypeId: "",
                      remarks: "",
                      numberOfDay: "",
                      startDate: "",
                      endDate: "",
                      approvalDate: "",
                      model: "overtime",
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
                      row.ApprovedById,
                      row.OvertimTypeId,
                      row.Remarks,
                      row.NumberOfDay,
                      row.StartDate,
                      row.EndDate,
                      row.ApprovalDate
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
      employeeId,
      approvedById,
      overtimTypeId,
      remarks,
      startDate,
      endDate,
      approvalDate,
    } = values;

    let newErrors = {};

    if (!employeeId) newErrors.employeeId = "Not empty.";
    if (!approvedById) newErrors.approvedById = "Not empty.";
    if (!remarks) newErrors.remarks = "Not empty.";
    if (!overtimTypeId) newErrors.overtimTypeId = "Not empty.";
    if (!startDate) newErrors.startDate = "Not empty.";
    if (!endDate) newErrors.endDate = "Not empty.";
    if (!approvalDate) newErrors.approvalDate = "Not empty.";

    if (new Date(startDate) > new Date(endDate)) {
      newErrors.startDate = "Start date cannot be greater than end date.";
    }

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
      toast.success("Created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error("Failed to create.");
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
          <div className="w-full overflow-x-scroll">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search overtime"
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
            <h2 className="text-xl font-semibold mb-5">Create Overtime</h2>
            <form
              onSubmit={handleSubmit}
              className="grid xl:grid-cols-2 grid-cols-1 gap-2"
            >
              <label className="xl:col-span-1 col-span-2">
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
              <label className="xl:col-span-1 col-span-2">
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
                  {managers.map((manage) => {
                    const employee = employees.find(
                      (e) => e.id === manage.EmployeeId
                    );

                    return (
                      <option key={manage.Id} value={manage.Id}>
                        {employee ? employee.name : "N/A"}
                      </option>
                    );
                  })}
                </select>
                {errors.approvedById && (
                  <span className="text-red-700">{errors.approvedById}</span>
                )}
              </label>
              <label className="col-span-2">
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
              <label className="col-span-2">
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
              <label className="col-span-2">
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
              <label className="col-span-2">
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
              <label className="col-span-2">
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
              <div className="flex items-center gap-2 col-span-2">
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
