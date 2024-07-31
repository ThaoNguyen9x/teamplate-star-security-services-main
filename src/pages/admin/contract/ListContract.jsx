import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import ContractService from "../../../services/ContractService";
import EmployeeService from "../../../services/EmployeeService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListContract = () => {
  const [values, setValues] = useState({
    contractNumber: "",
    startDate: "",
    endDate: "",
    signDate: "",
    content: "",
    employeeId: "",
    renewalCount: "",
    duration: "",
  });
  const [contractServices, setContractServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    contractNumber: "",
    startDate: "",
    endDate: "",
    signDate: "",
    content: "",
    employeeId: "",
    renewalCount: "",
    duration: "",
    model: "contractService",
  });
  const [searchQuery, setSearchQuery] = useState({ contractService: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [contractServicesData, employeesData] = await Promise.all([
        ContractService.getAllContracts(),
        EmployeeService.getAllEmployees(),
      ]);

      setContractServices(contractServicesData.$values || []);
      setEmployees(employeesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      Id,
      contractNumber,
      startDate,
      endDate,
      signDate,
      content,
      employeeId,
      renewalCount,
      duration
    ) => {
      setEditItem({
        id: Id,
        contractNumber,
        startDate,
        endDate,
        signDate,
        content,
        employeeId,
        renewalCount,
        duration,
        model: "contractService",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const {
        id,
        contractNumber,
        startDate,
        endDate,
        signDate,
        content,
        employeeId,
        renewalCount,
        duration,
      } = editItem;
      await ContractService.updateContract(
        id,
        contractNumber,
        startDate,
        endDate,
        signDate,
        content,
        employeeId,
        renewalCount,
        duration
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update data. Please try again.");
    } finally {
      setLoading(false);
      setEditItem({
        contractNumber: "",
        startDate: "",
        endDate: "",
        signDate: "",
        content: "",
        employeeId: "",
        renewalCount: "",
        duration: "",
        model: "contractService",
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
      await ContractService.deleteContract(currentId);
      setContractServices((prev) => prev.filter((c) => c.id !== currentId));
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
    return employees.find((c) => c.employeeID === id)?.name || "N/A";
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
        name: "Contract Number",
        selector: (row) => row.ContractNumber || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.contractNumber}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  contractNumber: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.ContractNumber || ""
          ),
        sortable: true,
      },
      {
        name: "Employee",
        selector: (row) => getEmployeeName(row.employeeId),
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
            getEmployeeName(row.employeeId)
          ),
        sortable: true,
      },
      {
        name: "Content",
        selector: (row) => row.Content,
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.content}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  content: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.Content
          ),
        sortable: true,
      },
      {
        name: "Renewal Count",
        selector: (row) => row.RenewalCount,
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="number"
              value={editItem.renewalCount}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  renewalCount: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.RenewalCount
          ),
        sortable: true,
      },
      {
        name: "Duration",
        selector: (row) => row.Duration,
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="number"
              value={editItem.duration}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  duration: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.Duration
          ),
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
        name: "Sign Date",
        selector: (row) => formatDate(row.SignDate) || "",
        cell: (row) =>
          editItem.id === row.Id && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.signDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  signDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.SignDate) || ""
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
                      contractNumber: "",
                      employeeID: "",
                      content: "",
                      renewalCount: "",
                      duration: "",
                      startDate: "",
                      endDate: "",
                      signDate: "",
                      model: "contractService",
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
                      row.ContractNumber,
                      row.StartDate,
                      row.EndDate,
                      row.SignDate,
                      row.Content,
                      row.EmployeeId,
                      row.RenewalCount,
                      row.Duration
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
      contractNumber,
      startDate,
      endDate,
      signDate,
      content,
      employeeId,
      renewalCount,
      duration,
    } = values;

    let newErrors = {};

    if (!contractNumber) newErrors.contractNumber = "Not empty.";
    if (!startDate) newErrors.startDate = "Not empty.";
    if (!endDate) newErrors.endDate = "Not empty.";
    if (!signDate) newErrors.signDate = "Not empty.";
    if (!content) newErrors.content = "Not empty.";
    if (!renewalCount) newErrors.renewalCount = "Not empty.";
    if (!employeeId) newErrors.employeeId = "Not empty.";
    if (!duration) newErrors.duration = "Not empty.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      await ContractService.createContract(
        contractNumber,
        startDate,
        endDate,
        signDate,
        content,
        employeeId,
        renewalCount,
        duration
      );
      handleCloseModal();
      toast.success("ServiceSchedule created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error("Failed to create contractService.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">
            ServiceSchedule
          </div>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 bg-blue-950 text-white rounded-md"
          >
            Create New
          </button>
        </div>
        <div className="grid p-5 bg-gray-100 rounded-md">
          <div className="container overflow-y-auto">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search contractService"
                value={searchQuery.contractService}
                onChange={handleSearchChange("contractService")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("contractService")}
              data={contractServices}
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
            <h2 className="text-xl font-semibold mb-5">Create Contract</h2>
            <form
              onSubmit={handleSubmit}
              className="grid xl:grid-cols-2 grid-cols-1 gap-2"
            >
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Contract Number:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="contractNumber"
                  value={values.contractNumber}
                  onChange={handleChangeInput}
                />
                {errors.contractNumber && (
                  <span className="text-red-700">{errors.contractNumber}</span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Content:
                </span>
                <textarea
                  name="content"
                  value={values.content}
                  onChange={handleChangeInput}
                  placeholder="Enter content"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.content && (
                  <span className="text-red-700">{errors.content}</span>
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
                  Renewal Count:
                </span>
                <input
                  type="number"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="renewalCount"
                  value={values.renewalCount}
                  onChange={handleChangeInput}
                />
                {errors.renewalCount && (
                  <span className="text-red-700">{errors.renewalCount}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Duration:
                </span>
                <input
                  type="number"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="duration"
                  value={values.duration}
                  onChange={handleChangeInput}
                />
                {errors.duration && (
                  <span className="text-red-700">{errors.duration}</span>
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
                  Sign Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="signDate"
                  value={values.signDate}
                  onChange={handleChangeInput}
                />
                {errors.signDate && (
                  <span className="text-red-700">{errors.signDate}</span>
                )}
              </label>
              <div className="col-span-2 flex items-center gap-2 mt-4">
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

export default ListContract;
