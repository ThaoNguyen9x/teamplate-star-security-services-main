import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import GeneralService from "../../../services/GeneralService";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import EmployeeService from "../../../services/EmployeeService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListGeneral = () => {
  const [workTypes, setWorkTypes] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
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
    model: "",
  });

  const [searchQuery, setSearchQuery] = useState({
    workType: "",
    attendance: "",
    department: "",
    branch: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        workTypesData,
        attendancesData,
        departmentsData,
        branchsData,
        employeesData,
      ] = await Promise.all([
        GeneralService.getAllWorkTypes(),
        GeneralService.getAllAttendances(),
        GeneralService.getAllDepartments(),
        GeneralService.getAllBranchs(),
        EmployeeService.getAllEmployees(),
      ]);

      console.log(workTypesData.$values || []);

      setWorkTypes(workTypesData.$values || []);
      setAttendances(attendancesData.$values || []);
      setDepartments(departmentsData.$values || []);
      setBranchs(branchsData.$values || []);
      setEmployees(employeesData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      id,
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
      model
    ) => {
      setEditItem({
        id,
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
        model,
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const {
        id,
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
        model,
      } = editItem;

      if (model === "workType") {
        await GeneralService.updateWorkType(id, name, coefficient);
      } else if (model === "attendance") {
        await GeneralService.updateAttendance(
          id,
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
      } else if (model === "department") {
        await GeneralService.updateDepartment(id, name, workTypeId);
      } else if (model === "branch") {
        await GeneralService.updateBranch(id, name, departnentId);
      }

      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to updated data.");
      console.error(
        "Update error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
      setEditItem({
        value: "",
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
      const { model } = editItem;

      if (model === "workType") {
        await GeneralService.deleteWorkType(currentId);
        setWorkTypes((prevWorkTypes) =>
          prevWorkTypes.filter((c) => c.Id !== currentId)
        );
      } else if (model === "attendance") {
        await GeneralService.deleteAttendance(currentId);
        setAttendances((prevAttendances) =>
          prevAttendances.filter((p) => p.Id !== currentId)
        );
      } else if (model === "department") {
        await GeneralService.deleteDepartment(currentId);
        setDepartments((prevDepartments) =>
          prevDepartments.filter((d) => d.Id !== currentId)
        );
      } else if (model === "branch") {
        await GeneralService.deleteBranch(currentId);
        setBranchs((prevBrachs) =>
          prevBrachs.filter((d) => d.Id !== currentId)
        );
      }
      await fetchAllData();
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error("Failed to deleted data.");
      console.error(
        "Delete error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({
        values: "",
      });
    }
  }, [editItem, currentId]);

  const renderColumns = useCallback(
    (model) => {
      const getName = (row) => {
        switch (model) {
          case "workType":
            return row.Name;
          case "department":
            return row.Name;
          case "branch":
            return row.Name;
          default:
            return "";
        }
      };

      const getWorkTypesOptions = () => {
        return workTypes.map((c) => (
          <option key={c.Id} value={c.Id}>
            {c.Name}
          </option>
        ));
      };

      const getAttendancesOptions = () => {
        return attendances.map((p) => (
          <option key={p.Id} value={p.Id}>
            {p.Name}
          </option>
        ));
      };

      const getDepartmentsOptions = () => {
        return departments.map((p) => (
          <option key={p.Id} value={p.Id}>
            {p.Name}
          </option>
        ));
      };

      const getEmployeesOptions = () => {
        return employees.map((p) => (
          <option key={p.Id} value={p.Id}>
            {p.Name}
          </option>
        ));
      };

      const getWorkTypeName = (row) => {
        return workTypes.find((c) => c.Id === row.workTypeId)?.Name || "N/A";
      };

      const getAttendanceName = (row) => {
        return (
          attendances.find((c) => c.Id === row.AttendancerId)?.Name || "N/A"
        );
      };

      const getDepartmentName = (row) => {
        return (
          departments.find((c) => c.Id === row.DepartnentId)?.Name || "N/A"
        );
      };

      const getEmployeeName = (row) => {
        return employees.find((c) => c.Id === row.employeeId)?.Name || "N/A";
      };

      return [
        {
          name: "#",
          selector: (row, index) => index + 1,
          sortable: true,
        },
        {
          name: "Name",
          selector: (row) => getName(row),
          cell: (row) =>
            editItem.id === row.Id && editItem.model === model ? (
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
              getName(row)
            ),
          sortable: true,
        },
        ...(model === "workType"
          ? [
              {
                name: "Coefficient",
                selector: (row) => row.coefficient,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.coefficient}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          coefficient: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.Coefficient
                  ),
                sortable: true,
              },
            ]
          : []),
        ...(model === "attendance"
          ? [
              {
                name: "Employee",
                selector: (row) => getEmployeeName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.employeeId}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          employeeId: e.target.value,
                        }))
                      }
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="">Select</option>
                      {getEmployeesOptions()}
                    </select>
                  ) : (
                    getEmployeeName(row)
                  ),
                sortable: true,
              },
              {
                name: "Year",
                selector: (row) => row.year,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.year}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          year: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.year
                  ),
                sortable: true,
              },
              {
                name: "Month",
                selector: (row) => row.month,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.month}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          month: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.month
                  ),
                sortable: true,
              },
              {
                name: "Day",
                selector: (row) => row.day,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.day}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          day: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.day
                  ),
                sortable: true,
              },
              {
                name: "Reported Hours",
                selector: (row) => row.reportedHours,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.reportedHours}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          reportedHours: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.reportedHours
                  ),
                sortable: true,
              },
              {
                name: "Minutes In",
                selector: (row) => row.minutesIn,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.minutesIn}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          minutesIn: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.minutesIn
                  ),
                sortable: true,
              },
              {
                name: "Minutes Out",
                selector: (row) => row.minutesOut,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.minutesOut}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          minutesOut: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.minutesOut
                  ),
                sortable: true,
              },
              {
                name: "Hours Out",
                selector: (row) => row.hoursOut,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="number"
                      value={editItem.hoursOut}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          hoursOut: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.hoursOut
                  ),
                sortable: true,
              },
              {
                name: "Work Type",
                selector: (row) => getWorkTypeName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.workTypeId}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          workTypeId: e.target.value,
                        }))
                      }
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="">Select</option>
                      {getWorkTypesOptions()}
                    </select>
                  ) : (
                    getWorkTypeName(row)
                  ),
                sortable: true,
              },
              {
                name: "Attendance",
                selector: (row) => getAttendanceName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.attendancerId}
                      onChange={(e) => {
                        setEditItem((prevState) => ({
                          ...prevState,
                          attendancerId: e.target.value,
                        }));
                      }}
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="">Select</option>
                      {getAttendancesOptions()}
                    </select>
                  ) : (
                    getAttendanceName(row)
                  ),
                sortable: true,
              },
            ]
          : []),
        {
          name: "Actions",
          cell: (row) => (
            <>
              {editItem.id === row.Id && editItem.model === model ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      setEditItem({
                        id: null,
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
                        model: "",
                      })
                    }
                    className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleEditClick(
                        row.Id,
                        getName(row),
                        row.GeneralDepartmentId,
                        row.AttendancerId,
                        row.DepartnentId,
                        model
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
                </div>
              )}
            </>
          ),
        },
      ];
    },
    [
      editItem,
      workTypes,
      attendances,
      departments,
      handleEditClick,
      handleUpdate,
      handleDeleteClick,
    ]
  );

  const handleSearchChange = (model) => (event) => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [model]: event.target.value,
    }));
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">General</div>
          <Link to="/dashboard/general/create">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Create New
            </button>
          </Link>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          {["workType", "attendance"].map((model) => (
            <div key={model}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold my-5">
                  {model.charAt(0).toUpperCase() + model.slice(1)}
                </h3>

                <input
                  type="text"
                  placeholder={`Search ${
                    model === "workType" ? "workTypes" : "attendances"
                  }`}
                  value={searchQuery[model]}
                  onChange={handleSearchChange(model)}
                  className="border border-gray-300 px-3 py-2 rounded-md outline-none"
                />
              </div>
              <DataTable
                columns={renderColumns(model)}
                data={
                  model === "workType"
                    ? workTypes.filter((c) =>
                        c.Name?.toLowerCase().includes(
                          searchQuery.workType.toLowerCase()
                        )
                      )
                    : model === "attendance"
                    ? attendances.filter((p) =>
                        p.Name?.toLowerCase().includes(
                          searchQuery.attendance.toLowerCase()
                        )
                      )
                    : model === "department"
                }
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
          ))}
        </div>
      </div>

      {remove && (
        <Delete
          id={currentId}
          handleDelete={handleDelete}
          setRemove={setRemove}
        />
      )}
    </>
  );
};

export default ListGeneral;
