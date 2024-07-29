import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import CustomerService from "../../../services/CustomerService";
import { no_avatar } from "../../../assets";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const email_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const ListCustomer = () => {
  const [values, setValues] = useState({
    customerName: "",
    email: "",
    phone: "",
    file: null,
  });
  const [customers, setCustomers] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    customerName: "",
    email: "",
    phone: "",
    file: null,
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
      const data = await CustomerService.getAllCustomers();
      setCustomers(data || []);
    } catch (error) {
      toast.error(
        "Failed to fetch data. Please check the console for more details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, customerName, email, phone, file) => {
      setEditItem({ id, customerName, email, phone, file, model: "customer" });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { id, customerName, email, phone, file } = editItem;
      await CustomerService.updateCustomer(
        id,
        customerName,
        email,
        phone,
        file
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update data.");
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        customerName: "",
        email: "",
        phone: "",
        file: null,
        model: "customer",
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((id) => {
    setRemove(true);
    setCurrentId(id);
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await CustomerService.deleteCustomer(currentId);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((c) => c.id !== currentId)
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

  const renderColumns = useCallback(
    (model) => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.customerName || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.customerName}
              onChange={(e) =>
                setEditItem({ ...editItem, customerName: e.target.value })
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
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <input
              type="email"
              value={editItem.email}
              onChange={(e) =>
                setEditItem({ ...editItem, email: e.target.value })
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.email || ""
          ),
        sortable: true,
      },
      {
        name: "Phone",
        selector: (row) => row.phone || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.phone}
              onChange={(e) =>
                setEditItem({ ...editItem, phone: e.target.value })
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.phone || ""
          ),
        sortable: true,
      },
      {
        name: "Image",
        selector: (row) => row.image || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <label>
              <img
                className="h-[3rem] w-[3rem] object-cover rounded-full"
                src={
                  editItem.file
                    ? URL.createObjectURL(editItem.file)
                    : editItem.Image
                    ? editItem.Image
                    : no_avatar
                }
                alt="Customer profile photo"
              />
              <input
                type="file"
                onChange={(e) =>
                  setEditItem({ ...editItem, file: e.target.files[0] })
                }
                className="hidden"
              />
            </label>
          ) : (
            <img
              className="h-[3rem] w-[3rem] object-cover rounded-full"
              src={row.image ? row.image : no_avatar}
              alt="Current profile photo"
            />
          ),
        sortable: true,
      },
      {
        customerName: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2">
            {editItem.id === row.id && editItem.model === model ? (
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
                      customerName: "",
                      email: "",
                      phone: "",
                      file: null,
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
                  onClick={() =>
                    handleEditClick(
                      row.id,
                      row.customerName,
                      row.email,
                      row.phone,
                      row.file
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.id)}
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
    setValues({
      value: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customerName, email, phone, file } = values;
    let newErrors = {};

    if (!customerName) newErrors.customerName = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!email_REGEX.test(email))
      newErrors.email = "Invalid email format.";
    if (!phone) newErrors.phone = "Phone is required.";
    if (!file) newErrors.file = "Image is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await CustomerService.createCustomer(customerName, email, phone);
      handleCloseModal();
      await fetchAllData();
      toast.success("Customer created successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setValues({ ...values, [name]: files[0] });
      setPhoto(URL.createObjectURL(files[0]));
    } else {
      setValues({ ...values, [name]: value });
    }
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
              data={customers}
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
                  placeholder="Enter full customerName"
                  customerName="customerName"
                  value={values.customerName}
                  onChange={handleChangeInput}
                />
                {errors.customerName && (
                  <span className="text-red-700">{errors.customerName}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Email:
                </span>
                <input
                  type="email"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter email"
                  customerName="email"
                  value={values.email}
                  onChange={handleChangeInput}
                />
                {errors.email && (
                  <span className="text-red-700">{errors.email}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Phone:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter phone"
                  customerName="phone"
                  value={values.phone}
                  onChange={handleChangeInput}
                />
                {errors.phone && (
                  <span className="text-red-700">{errors.phone}</span>
                )}
              </label>
              <label className="block mb-2">
                <span className="block font-medium text-primary mb-1">
                  Image:
                </span>
                <label className="flex items-center justify-center">
                  <img
                    className="h-[4rem] w-[4rem] object-cover rounded-full"
                    src={image ? URL.createObjectURL(image) : no_avatar}
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
