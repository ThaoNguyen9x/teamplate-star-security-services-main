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

const ListSanction = () => {
  const [values, setValues] = useState({
    date: "",
    punishment: "",
    punishmentDate: "",
    employeeId: "",
    sanctionTypeId: "",
  });
  const [sanctions, setSanctions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sanctionTypes, setSanctionTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    date: "",
    punishment: "",
    punishmentDate: "",
    employeeId: "",
    sanctionTypeId: "",
    model: "sanction",
  });
  const [searchQuery, setSearchQuery] = useState({ sanction: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [sanctionsData, employeesData, sanctionTypesData] =
        await Promise.all([
          WelfareService.getAllSanctions(),
          EmployeeService.getAllEmployees(),
          GeneralSanctionType.getAllSanctionTypes(),
        ]);

      setSanctions(sanctionsData.$values || []);
      setEmployees(employeesData || []);
      setSanctionTypes(sanctionTypesData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, date, punishment, punishmentDate, employeeId, sanctionTypeId) => {
      setEditItem({
        id,
        date,
        punishment,
        punishmentDate,
        employeeId,
        sanctionTypeId,
        model: "sanction",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const {
        id,
        date,
        punishment,
        punishmentDate,
        employeeId,
        sanctionTypeId,
      } = editItem;
      await WelfareService.updateSanction(
        id,
        date,
        punishment,
        punishmentDate,
        employeeId,
        sanctionTypeId
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update data. Please try again.");
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        date: "",
        punishment: "",
        punishmentDate: "",
        employeeId: "",
        sanctionTypeId: "",
        model: "sanction",
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
      await WelfareService.deleteSanction(currentId);
      setSanctions((prev) => prev.filter((c) => c.Id !== currentId));
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

  const getSanctionTypesOptions = () => {
    return sanctionTypes.map((c) => (
      <option key={c.Id} value={c.Id}>
        {c.Name}
      </option>
    ));
  };

  const getSanctionTypeName = (id) => {
    return sanctionTypes.find((c) => c.Id === id)?.Name || "N/A";
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
        name: "Sanction Type",
        selector: (row) => getSanctionTypeName(row.SanctionTypeId),
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <select
              value={editItem.sanctionTypeId}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  sanctionTypeId: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getSanctionTypesOptions()}
            </select>
          ) : (
            getSanctionTypeName(row.SanctionTypeId)
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
                      sanctionTypeId: "",
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
                      row.SanctionTypeId
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

    const { date, punishment, punishmentDate, employeeId, sanctionTypeId } =
      values;

    let newErrors = {};

    if (!date) newErrors.date = "Name is required.";
    if (!punishment) newErrors.punishment = "Issue date is required.";
    if (!employeeId) newErrors.employeeId = "Employee is required.";
    if (!punishmentDate) newErrors.punishmentDate = "Issue place is required.";
    if (!sanctionTypeId)
      newErrors.sanctionTypeId = "Health check place is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await WelfareService.createSanction(
        date,
        punishment,
        punishmentDate,
        employeeId,
        sanctionTypeId
      );

      handleCloseModal();
      toast.success("Sanction created successfully.");
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
          <div className="font-semibold text-xl capitalize">Sanction</div>
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
                value={searchQuery.sanction}
                onChange={handleSearchChange("sanction")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("sanction")}
              data={sanctions}
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
            <h2 className="text-xl font-semibold mb-5">Create Sanction</h2>
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
                  Sanction Type:
                </span>
                <select
                  name="sanctionTypeId"
                  value={values.sanctionTypeId}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {sanctionTypes.map((sanctionType) => (
                    <option key={sanctionType.Id} value={sanctionType.Id}>
                      {sanctionType.Name}
                    </option>
                  ))}
                </select>
                {errors.sanctionTypeId && (
                  <span className="text-red-700">{errors.sanctionTypeId}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Punishment:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="punishment"
                  value={values.punishment}
                  onChange={handleChangeInput}
                />
                {errors.punishment && (
                  <span className="text-red-700">{errors.punishment}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Punishment Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="punishmentDate"
                  value={values.punishmentDate}
                  onChange={handleChangeInput}
                />
                {errors.punishmentDate && (
                  <span className="text-red-700">{errors.punishmentDate}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="date"
                  value={values.date}
                  onChange={handleChangeInput}
                />
                {errors.date && (
                  <span className="text-red-700">{errors.date}</span>
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

export default ListSanction;
