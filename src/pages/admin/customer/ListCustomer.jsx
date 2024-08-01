import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { no_avatar } from "../../../assets/index";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import CustomerService from "../../../services/CustomerService";
import Select from "react-select";
import EmployeeService from "../../../services/EmployeeService";
import axios from "axios";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const Email_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const ListCustomer = () => {
  const [values, setValues] = useState({
    CustomerName: "",
    Email: "",
    Phone: "",
    file: null,
    EmployeeSupports: [],
  });
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    customerID: "",
    CustomerName: "",
    Phone: "",
    file: "",
    model: "customer",
  });
  const [searchQuery, setSearchQuery] = useState({ customer: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [customersData, employeesData] = await Promise.all([
        CustomerService.getAllCustomers(),
        EmployeeService.getAllEmployees(),
      ]);

      setCustomers(customersData || []);
      setEmployees(employeesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (customerID, CustomerName, Phone, file) => {
      setEditItem({ customerID, CustomerName, Phone, file, model: "customer" });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);

    try {
      const { customerID, CustomerName, Phone, file } = editItem;
      await CustomerService.updateCustomer(
        customerID,
        CustomerName,
        Phone,
        file
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update data.");
    } finally {
      setLoading(false);
      setEditItem({
        editItem: null,
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((customerID, model) => {
    setRemove(true);
    setCurrentId(customerID);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await CustomerService.deleteCustomer(currentId);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((c) => c.customerID !== currentId)
      );
      toast.success("Deleted successfully.");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to delete data.");
    } finally {
      setLoading(false);
      setRemove(false);
    }
  }, [currentId]);

  const handleSendMail = async (customerID) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/customers/send-mail/${customerID}`,
      );
      toast.success("Mail sent successfully.");
    } catch (error) {
      toast.error("Failed to send mail.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditItem((prev) => ({
          ...prev,
          file: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderColumns = useCallback(
    (model) => [
      { name: "#", selector: (_, index) => index + 1, sortable: true },
      {
        name: "Image",
        selector: (row) => row.image || "",
        cell: (row) =>
          editItem.customerID === row.customerID && editItem.model === model ? (
            <label>
              <img
                src={editItem.file || row.image || no_avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <img
              src={row.image || no_avatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
          ),
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.CustomerName || "",
        cell: (row) =>
          editItem.customerID === row.customerID && editItem.model === model ? (
            <input
              type="text"
              value={editItem.CustomerName || ""}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  customerName: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.customerName || ""
          ),
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email || "",
        sortable: true,
      },
      {
        name: "Phone",
        selector: (row) => row.phone || "",
        cell: (row) =>
          editItem.customerID === row.customerID && editItem.model === model ? (
            <input
              type="text"
              value={editItem.Phone || ""}
              onChange={(e) =>
                setEditItem((prev) => ({ ...prev, Phone: e.target.value }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.phone || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {editItem.customerID === row.customerID &&
            editItem.model === model ? (
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
                      customerID: "",
                      CustomerName: "",
                      Phone: "",
                      file: "",
                      model: "customer",
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
                  onClick={() => handleSendMail(row.customerID)}
                  className="px-3 py-2 border border-green-700 text-green-700 rounded-md"
                >
                  Feedback
                </button>
                <button
                  onClick={() =>
                    handleEditClick(
                      row.customerID,
                      row.customerName,
                      row.phone,
                      row.file
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.customerID, model)}
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
    setImagePreview(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { CustomerName, Email, Phone, file, EmployeeSupports } = values;

    let newErrors = {};

    if (!CustomerName) newErrors.CustomerName = "Full name is required.";
    if (!Phone) newErrors.Phone = "Phone is required.";
    if (!file) newErrors.file = "Image is required.";
    if (!EmployeeSupports)
      newErrors.EmployeeSupports = "Employee Supports is required.";

    if (!Email) newErrors.Email = "Email is required.";
    else if (!Email_REGEX.test(Email))
      newErrors.Email = "Invalid Email format.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await CustomerService.createCustomer(
        CustomerName,
        Email,
        Phone,
        file,
        EmployeeSupports.map((emp) => emp.value)
      );
      handleCloseModal();
      toast.success("Customer created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error("Failed to create customer.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setValues({ ...values, file: files[0] });
      setImagePreview(files[0]);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const employeeOptions = employees.map((emp) => ({
    value: emp.id,
    label: emp.name,
  }));

  const handleSelectChange = (selectedOptions) => {
    setValues((prevValues) => ({
      ...prevValues,
      EmployeeSupports: selectedOptions,
    }));
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Customer</div>
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
                placeholder="Search customer"
                value={searchQuery.customer}
                onChange={handleSearchChange("customer")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("customer")}
              data={customers.filter((c) =>
                c.customerName
                  ?.toLowerCase()
                  .includes(searchQuery.customer.toLowerCase())
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
            <h2 className="text-xl font-semibold mb-5">Create Customer</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Name:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="CustomerName"
                  value={values.CustomerName}
                  onChange={handleChangeInput}
                />
                {errors.CustomerName && (
                  <span className="text-red-700">{errors.CustomerName}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Email:
                </span>
                <input
                  type="Email"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Email"
                  name="Email"
                  value={values.Email}
                  onChange={handleChangeInput}
                />
                {errors.Email && (
                  <span className="text-red-700">{errors.Email}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Phone:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="Phone"
                  value={values.Phone}
                  onChange={handleChangeInput}
                />
                {errors.Phone && (
                  <span className="text-red-700">{errors.Phone}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Image:
                </span>
                <label className="flex items-center justify-center">
                  <img
                    className="h-[4rem] w-[4rem] object-cover rounded-full"
                    src={
                      imagePreview
                        ? URL.createObjectURL(imagePreview)
                        : no_avatar
                    }
                    alt="Current profile photo"
                  />
                  <input
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleChangeInput}
                  />
                </label>
                {errors.file && (
                  <span className="text-red-700">{errors.file}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Employee Support:
                </span>
                <Select
                  options={employeeOptions}
                  isMulti
                  value={values.EmployeeSupports}
                  onChange={handleSelectChange}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                {errors.EmployeeIds && (
                  <span className="text-red-700">{errors.EmployeeIds}</span>
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

export default ListCustomer;
