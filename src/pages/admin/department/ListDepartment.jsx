import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DepartmentService from "../../../services/DepartmentService";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListDepartment = () => {
  const [generalDepartments, setGeneralDepartments] = useState([]);
  const [manages, setManages] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    generalDepartmentId: "",
    managerId: "",
    departnentId: "",
    model: "",
  });

  const [searchQuery, setSearchQuery] = useState({
    generalDepartment: "",
    manage: "",
    department: "",
    branch: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [generalDepartmentsData, managesData, departmentsData, branchData] =
        await Promise.all([
          DepartmentService.getAllGeneralDepartments(),
          DepartmentService.getAllManages(),
          DepartmentService.getAllDepartments(),
          DepartmentService.getAllBranchs(),
        ]);

      setGeneralDepartments(generalDepartmentsData.$values || []);
      setManages(managesData.$values || []);
      setDepartments(departmentsData.$values || []);
      setBranchs(branchData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, name, generalDepartmentId, managerId, departnentId, model) => {
      setEditItem({
        id,
        name,
        generalDepartmentId,
        managerId,
        departnentId,
        model,
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { id, name, generalDepartmentId, managerId, departnentId, model } =
        editItem;

      if (model === "generalDepartment") {
        await DepartmentService.updateGeneralDepartment(id, name);
      } else if (model === "manage") {
        await DepartmentService.updateManage(id, name);
      } else if (model === "department") {
        await DepartmentService.updateDepartment(
          id,
          name,
          generalDepartmentId,
          managerId
        );
      } else if (model === "branch") {
        await DepartmentService.updateBranch(id, name, departnentId);
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

      if (model === "generalDepartment") {
        await DepartmentService.deleteGeneralDepartment(currentId);
        setGeneralDepartments((prevGeneralDepartments) =>
          prevGeneralDepartments.filter((c) => c.Id !== currentId)
        );
      } else if (model === "manage") {
        await DepartmentService.deleteManage(currentId);
        setManages((prevManages) =>
          prevManages.filter((p) => p.Id !== currentId)
        );
      } else if (model === "department") {
        await DepartmentService.deleteDepartment(currentId);
        setDepartments((prevDepartments) =>
          prevDepartments.filter((d) => d.Id !== currentId)
        );
      } else if (model === "branch") {
        await DepartmentService.deleteBranch(currentId);
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
          case "generalDepartment":
            return row.Name;
          case "manage":
            return row.Name;
          case "department":
            return row.Name;
          case "branch":
            return row.Name;
          default:
            return "";
        }
      };

      const getGeneralDepartmentsOptions = () => {
        return generalDepartments.map((c) => (
          <option key={c.Id} value={c.Id}>
            {c.Name}
          </option>
        ));
      };

      const getManagesOptions = () => {
        return manages.map((p) => (
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

      const getGeneralDepartmentName = (row) => {
        return (
          generalDepartments.find((c) => c.Id === row.GeneralDepartmentId)
            ?.Name || "N/A"
        );
      };

      const getManageName = (row) => {
        return manages.find((c) => c.Id === row.ManagerId)?.Name || "N/A";
      };

      const getDepartmentName = (row) => {
        return (
          departments.find((c) => c.Id === row.DepartnentId)?.Name || "N/A"
        );
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
        ...(model === "department"
          ? [
              {
                name: "General Department",
                selector: (row) => getGeneralDepartmentName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.generalDepartmentId}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          generalDepartmentId: e.target.value,
                        }))
                      }
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="">Select</option>
                      {getGeneralDepartmentsOptions()}
                    </select>
                  ) : (
                    getGeneralDepartmentName(row)
                  ),
                sortable: true,
              },
              {
                name: "Manage",
                selector: (row) => getManageName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.managerId}
                      onChange={(e) => {
                        setEditItem((prevState) => ({
                          ...prevState,
                          managerId: e.target.value,
                        }));
                      }}
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="">Select</option>
                      {getManagesOptions()}
                    </select>
                  ) : (
                    getManageName(row)
                  ),
                sortable: true,
              },
            ]
          : []),
        ...(model === "branch"
          ? [
              {
                name: "Department",
                selector: (row) => getDepartmentName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.departnentId}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          departnentId: e.target.value,
                        }))
                      }
                      className="border px-3 py-1 rounded-md outline-none"
                    >
                      <option value="">Select Department</option>
                      {getDepartmentsOptions()}
                    </select>
                  ) : (
                    getDepartmentName(row)
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
                        generalDepartmentId: "",
                        managerId: "",
                        departnentId: "",
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
                        row.ManagerId,
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
      generalDepartments,
      manages,
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
          <div className="font-semibold text-xl capitalize">Departments</div>
          <Link to="/dashboard/departments/create">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Create New
            </button>
          </Link>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          {["generalDepartment", "manage", "department", "branch"].map(
            (model) => (
              <div key={model}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold my-5">
                    {model.charAt(0).toUpperCase() + model.slice(1)}
                  </h3>

                  <input
                    type="text"
                    placeholder={`Search ${
                      model === "generalDepartment"
                        ? "generalDepartments"
                        : model === "manage"
                        ? "manages"
                        : model === "departments"
                        ? "departments"
                        : "branchs"
                    }`}
                    value={searchQuery[model]}
                    onChange={handleSearchChange(model)}
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none"
                  />
                </div>
                <DataTable
                  columns={renderColumns(model)}
                  data={
                    model === "generalDepartment"
                      ? generalDepartments.filter((c) =>
                          c.Name.toLowerCase().includes(
                            searchQuery.generalDepartment.toLowerCase()
                          )
                        )
                      : model === "manage"
                      ? manages.filter((p) =>
                          p.Name.toLowerCase().includes(
                            searchQuery.manage.toLowerCase()
                          )
                        )
                      : model === "department"
                      ? departments.filter((d) =>
                          d.Name.toLowerCase().includes(
                            searchQuery.department.toLowerCase()
                          )
                        )
                      : branchs.filter((d) =>
                          d.Name.toLowerCase().includes(
                            searchQuery.department.toLowerCase()
                          )
                        )
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
            )
          )}
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

export default ListDepartment;
