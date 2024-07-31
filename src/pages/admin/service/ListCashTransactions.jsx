import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import ServicesService from "../../../services/ServicesService";
import EmployeeService from "../../../services/EmployeeService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListCashTransactions = () => {
  const [values, setValues] = useState({
    amount: "",
    transactionDate: "",
    status: "",
    employeeID: "",
    cashServiceID: "",
  });
  const [cashTransaction, setCashTransactions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [cashServices, setCashServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    amount: "",
    transactionDate: "",
    status: "",
    employeeID: "",
    cashServiceID: "",
    model: "cashTransaction",
  });
  const [searchQuery, setSearchQuery] = useState({ cashTransaction: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [cashTransactionsData, cashServicesData, employeesData] =
        await Promise.all([
          ServicesService.getAllCashTransactions(),
          ServicesService.getAllCashServicess(),
          EmployeeService.getAllEmployees(),
        ]);

      setCashTransactions(cashTransactionsData || []);
      setCashServices(cashServicesData || []);
      setEmployees(employeesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      transactionID,
      cashServiceID,
      employeeID,
      amount,
      transactionDate,
      status
    ) => {
      setEditItem({
        id: transactionID,
        cashServiceID,
        amount,
        transactionDate,
        status,
        employeeID,
        model: "cashTransaction",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { id, amount, transactionDate, status, employeeID, cashServiceID } =
        editItem;
      await ServicesService.updateCashTransaction(
        id,
        amount,
        transactionDate,
        status,
        employeeID,
        cashServiceID
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
        amount: "",
        transactionDate: "",
        status: "",
        employeeID: "",
        cashServiceID: "",
        model: "cashTransaction",
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
      await ServicesService.deleteCashTransaction(currentId);
      setCashTransactions((prev) =>
        prev.filter((c) => c.transactionID !== currentId)
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

  const getCashServicesOptions = () => {
    return cashServices.map((c) => (
      <option key={c.cashServiceID} value={c.cashServiceID}>
        {c.name}
      </option>
    ));
  };

  const getCashServiceName = (row) => {
    return cashServices.find((c) => c.id === row.CashServiceID)?.name || "N/A";
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
        name: "Cash Service",
        selector: (row) => getCashServiceName(row.cashServiceID),
        cell: (row) =>
          editItem.id === row.transactionID && editItem.model === model ? (
            <select
              value={editItem.cashServiceID}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  cashServiceID: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getCashServicesOptions()}
            </select>
          ) : (
            getCashServiceName(row.cashServiceID)
          ),
        sortable: true,
      },
      {
        name: "Employee",
        selector: (row) => getEmployeeName(row.employeeID),
        cell: (row) =>
          editItem.id === row.transactionID && editItem.model === model ? (
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
        name: "Amount",
        selector: (row) => row.amount || "",
        cell: (row) =>
          editItem.id === row.transactionID && editItem.model === model ? (
            <input
              type="number"
              value={editItem.amount}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  amount: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.amount || ""
          ),
        sortable: true,
      },
      {
        name: "Transaction Date",
        selector: (row) => formatDate(row.transactionDate) || "",
        cell: (row) =>
          editItem.id === row.transactionID && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.transactionDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  transactionDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.transactionDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status || "",
        cell: (row) =>
          editItem.id === row.transactionID && editItem.model === model ? (
            <select
              value={editItem.status}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  status: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          ) : (
            row.status || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2">
            {editItem.id === row.transactionID && editItem.model === model ? (
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
                      cashServiceID: "",
                      employeeID: "",
                      amount: "",
                      transactionDate: "",
                      status: "",
                      model: "cashTransaction",
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
                      row.transactionID,
                      row.cashServiceID,
                      row.employeeID,
                      row.amount,
                      row.transactionDate,
                      row.status
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.transactionID, model)}
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

    const { name, serviceRequestID, employeeID, scheduledDate, location } =
      values;
    let newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!serviceRequestID)
      newErrors.serviceRequestID = "Service request is required.";
    if (!employeeID) newErrors.employeeID = "Employee is required.";
    if (!scheduledDate) newErrors.scheduledDate = "Scheduled date is required.";
    if (!location) newErrors.location = "Location is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      await ServicesService.createCashTransaction(
        name,
        serviceRequestID,
        employeeID,
        scheduledDate,
        location
      );
      handleCloseModal();
      toast.success("CashTransaction created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error("Failed to create cashTransaction.");
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
            CashTransaction
          </div>
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
                placeholder="Search cashTransaction"
                value={searchQuery.cashTransaction}
                onChange={handleSearchChange("cashTransaction")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("cashTransaction")}
              data={cashTransaction}
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
            <h2 className="text-xl font-semibold mb-5">
              Create Service Schedule
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
              {/* <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Service Request:
                </span>
                <select
                  name="serviceRequestID"
                  value={values.serviceRequestID}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {serviceRequests.map((serviceRequest) => (
                    <option
                      key={serviceRequest.serviceRequestID}
                      value={serviceRequest.serviceRequestID}
                    >
                      {serviceRequest.name}
                    </option>
                  ))}
                </select>
                {errors.serviceRequestID && (
                  <span className="text-red-700">
                    {errors.serviceRequestID}
                  </span>
                )}
              </label> */}
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
                  Location:
                </span>
                <textarea
                  name="location"
                  value={values.location}
                  onChange={handleChangeInput}
                  placeholder="Enter location"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.location && (
                  <span className="text-red-700">{errors.location}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Scheduled Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="scheduledDate"
                  value={values.scheduledDate}
                  onChange={handleChangeInput}
                />
                {errors.scheduledDate && (
                  <span className="text-red-700">{errors.scheduledDate}</span>
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

export default ListCashTransactions;
