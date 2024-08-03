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

const phone_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const email_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const ListDepartment = () => {
  const [generalDepartments, setGeneralDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    generalDepartmentId: "",
    departmentId: "",
    model: "",
  });

  const [searchQuery, setSearchQuery] = useState({
    generalDepartment: "",
    department: "",
    branch: "",
    position: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        generalDepartmentsData,
        positionsData,
        departmentsData,
        branchData,
      ] = await Promise.all([
        DepartmentService.getAllGeneralDepartments(),
        DepartmentService.getAllPositions(),
        DepartmentService.getAllDepartments(),
        DepartmentService.getAllBranchs(),
      ]);

      setGeneralDepartments(generalDepartmentsData.$values || []);
      setPositions(positionsData.$values || []);
      setDepartments(departmentsData.$values || []);
      setBranchs(branchData.$values || []);
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
      generalDepartmentId,
      departmentId,
      email,
      address,
      contactNumber,
      model
    ) => {
      setEditItem({
        id,
        name,
        generalDepartmentId,
        departmentId,
        email,
        address,
        contactNumber,
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
        generalDepartmentId,
        email,
        address,
        contactNumber,
        model,
      } = editItem;

      if (model === "generalDepartment") {
        if (!name) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await DepartmentService.updateGeneralDepartment(id, name);
      } else if (model === "position") {
        if (!name) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await DepartmentService.updatePosition(id, name);
      } else if (model === "department") {
        if (!name || !generalDepartmentId) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await DepartmentService.updateDepartment(id, name, generalDepartmentId);
      } else if (model === "branch") {
        if (!name || !email || !address || !contactNumber) {
          toast.error("Please fill out all required fields.");
          return;
        }

        if (!email_REGEX.test(email)) {
          toast.error("Invalid email.");
          return;
        }

        if (!phone_REGEX.test(contactNumber)) {
          toast.error("Invalid contact number.");
          return;
        }

        await DepartmentService.updateBranch(
          id,
          name,
          email,
          address,
          contactNumber
        );
      }

      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        name: "",
        generalDepartmentId: "",
        departmentId: "",
        email: "",
        address: "",
        contactNumber: "",
        model: "",
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
      } else if (model === "position") {
        await DepartmentService.deletePosition(currentId);
        setPositions((prevPositions) =>
          prevPositions.filter((p) => p.Id !== currentId)
        );
      } else if (model === "department") {
        await DepartmentService.deleteDepartment(currentId);
        setDepartments((prevDepartments) =>
          prevDepartments.filter((d) => d.Id !== currentId)
        );
      } else if (model === "branch") {
        await DepartmentService.deleteBranch(currentId);
        setBranchs((prevBranches) =>
          prevBranches.filter((d) => d.Id !== currentId)
        );
      }
      await fetchAllData();
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({
        id: "",
        name: "",
        generalDepartmentId: "",
        departmentId: "",
        email: "",
        address: "",
        contactNumber: "",
        model: "",
      });
    }
  }, [editItem, currentId]);

  const renderColumns = useCallback(
    (model) => {
      const getName = (row) => {
        switch (model) {
          case "generalDepartment":
            return row.Name;
          case "position":
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

      const getGeneralDepartmentName = (row) => {
        return (
          generalDepartments.find((c) => c.Id === row.GeneralDepartmentId)
            ?.Name || "N/A"
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
            ]
          : []),
        ...(model === "branch"
          ? [
              {
                name: "Email",
                selector: (row) => row.Email || "",
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.email}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    row.Email || ""
                  ),
                sortable: true,
              },
              {
                name: "Address",
                selector: (row) => row.Address || "",
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.address}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          address: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    row.Address || ""
                  ),
                sortable: true,
              },
              {
                name: "Contact Number",
                selector: (row) => row.ContactNumber || "",
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.contactNumber}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          contactNumber: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    row.ContactNumber || ""
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
                        id: "",
                        name: "",
                        generalDepartmentId: "",
                        departmentId: "",
                        email: "",
                        address: "",
                        contactNumber: "",
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
                        row.Name,
                        row.GeneralDepartmentId,
                        row.DepartmentId,
                        row.Email,
                        row.Address,
                        row.ContactNumber,
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
      positions,
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
          {["generalDepartment", "position", "department", "branch"].map(
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
                        ? "General Departments"
                        : model === "position"
                        ? "Positions"
                        : model === "department"
                        ? "Departments"
                        : model === "branch"
                        ? "Branchs"
                        : ""
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
                      : model === "position"
                      ? positions.filter((p) =>
                          p.Name.toLowerCase().includes(
                            searchQuery.position.toLowerCase()
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
