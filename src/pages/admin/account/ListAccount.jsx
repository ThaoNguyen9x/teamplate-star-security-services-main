import React, { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import AccountService from "../../../services/AccountService";
import DataTable from "react-data-table-component";
import EmployeeService from "../../../services/EmployeeService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [nots, setNots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    model: "account",
  });

  const [searchQuery, setSearchQuery] = useState({
    account: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [accountsData, notCreateData, employeesData] = await Promise.all([
        AccountService.getAllAccounts(),
        AccountService.getNotCreate(),
        EmployeeService.getAllEmployees(),
      ]);

      setAccounts(accountsData || []);
      setNots(notCreateData || []);
      setEmployees(employeesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback((id, fullname) => {
    setEditItem({ id, fullname, model: "account" });
  }, []);

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { id, fullname } = editItem;
      await AccountService.updateAccount(id, fullname);
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update data.");
      console.error("Update error:", error.message);
    } finally {
      setLoading(false);
      setEditItem({ id: "", fullname: "", model: "account" });
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
      await AccountService.deleteAccount(currentId); 
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.Id !== currentId) 
      );
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Delete error:", error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setCurrentId(null); 
      setEditItem({ id: "", fullname: "", model: "account" });
    }
  }, [currentId]);

  const getEmployeeName = (row) => {
    return employees.find((c) => c.Id === row.employeeID)?.name;
  };

  const getName = (row) => row.fullName || "";

  const columns = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => getName(row),
        cell: (row) =>
          editItem.id === row.id && editItem.model === "account" ? (
            <input
              type="text"
              value={editItem.fullname}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  fullname: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            getName(row)
          ),
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Employee",
        selector: (row) => getEmployeeName(row),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <>
            {editItem.id === row.Id && editItem.model === "account" ? (
              <div className="flex items-center gap-2 whitespace-nowrap">
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
                      fullname: "",
                      employeeId: "",
                      model: "account",
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
                    handleEditClick(row.Id, getName(row), row.employeeId)
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.Id)}
                  className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                >
                  Delete
                </button>
              </div>
            )}
          </>
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, confirmPassword, fullname, employeeId } = values;

    let newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    if (!fullname) newErrors.fullname = "Full name is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    if (!employeeId) newErrors.employeeId = "Employee is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await AccountService.createAccount(
        email,
        password,
        confirmPassword,
        fullname,
        employeeId
      );
      await fetchAllData();
      toast.success("Account created successfully.");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to create account.");
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
          <div className="font-semibold text-xl capitalize">Account</div>
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
                placeholder="Search account"
                value={searchQuery.account}
                onChange={handleSearchChange("account")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={columns}
              data={accounts.filter((c) =>
                c.fullName
                  ?.toLowerCase()
                  .includes(searchQuery.account.toLowerCase())
              )}
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
            <h3 className="text-xl font-bold mb-4 text-center">
              Create Account
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Full Name:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.fullname}
                  name="fullname"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.fullname && (
                  <span className="text-red-600 text-sm">
                    {errors.fullname}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Email:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.email}
                  name="email"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">{errors.email}</span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Password:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.password}
                  name="password"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    {errors.password}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Confirm Password:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.confirmPassword && (
                  <span className="text-red-600 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </label>
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
                  {nots.map((not) => (
                    <option key={not.id} value={not.id}>
                      {not.name}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <span className="text-red-700">{errors.employeeId}</span>
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

export default ListAccount;
