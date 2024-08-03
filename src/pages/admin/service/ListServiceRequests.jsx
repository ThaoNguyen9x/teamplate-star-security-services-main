import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import ServicesService from "../../../services/ServicesService";
import CustomerService from "../../../services/CustomerService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListServiceRequestRequests = () => {
  const [values, setValues] = useState({
    name: "",
    customerID: "",
    serviceType: "",
    requestDetails: "",
    status: "",
  });
  const [serviceRequests, setServiceRequests] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    customerID: "",
    serviceType: "",
    requestDetails: "",
    status: "",
    model: "serviceRequest",
  });
  const [searchQuery, setSearchQuery] = useState({ serviceRequest: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [serviceRequestsData, customersData, serviceTypesData] =
        await Promise.all([
          ServicesService.getAllServiceRequests(),
          CustomerService.getAllCustomers(),
          ServicesService.getAllServices(),
        ]);

      setServiceRequests(serviceRequestsData || []);
      setCustomers(customersData || []);
      setServiceTypes(serviceTypesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, name, customerID, serviceType, requestDetails, status) => {
      setEditItem({
        id,
        name,
        customerID,
        serviceType,
        requestDetails,
        status,
        model: "serviceRequest",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);

    try {
      const { id, name, customerID, serviceType, requestDetails, status } =
        editItem;
      await ServicesService.updateServiceRequest(
        id,
        name,
        customerID,
        serviceType,
        requestDetails,
        status
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

  const handleDeleteClick = useCallback((id, model) => {
    setRemove(true);
    setCurrentId(id);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await ServicesService.deleteServiceRequest(currentId);
      setServiceRequests((prevServiceRequestRequests) =>
        prevServiceRequestRequests.filter(
          (c) => c.serviceRequestID !== currentId
        )
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

  const getCustomersOptions = () => {
    return customers.map((c) => (
      <option key={c.customerID} value={c.customerID}>
        {c.customerName}
      </option>
    ));
  };

  const getCustomerName = (row) => {
    return customers.find((c) => c.id === row.customerId)?.customerName || "N/A";
  };

  const getServiceTypesOptions = () => {
    return serviceTypes.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ));
  };

  const getServiceTypeName = (row) => {
    return serviceTypes.find((c) => c.serviceType === row.id)?.name || "N/A";
  };

  const renderColumns = useCallback(
    (model) => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
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
            row.name || ""
          ),
        sortable: true,
      },
      {
        name: "Service",
        selector: (row) => getServiceTypeName(row),
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <select
              value={editItem.serviceType}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  serviceType: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getServiceTypesOptions()}
            </select>
          ) : (
            getServiceTypeName(row)
          ),
        sortable: true,
      },
      {
        name: "Details",
        selector: (row) => row.requestDetails || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.requestDetails}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  requestDetails: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.requestDetails || ""
          ),
        sortable: true,
      },
      {
        name: "Customer",
        selector: (row) => getCustomerName(row),
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <select
              value={editItem.customerID}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  customerID: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getCustomersOptions()}
            </select>
          ) : (
            getCustomerName(row)
          ),
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
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
              <option value="">Select Status</option>
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
                      name: "",
                      serviceType: "",
                      requestDetails: "",
                      customerID: "",
                      status: "",
                      model: "serviceRequest",
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
                      row.name,
                      row.customerID,
                      row.serviceType,
                      row.requestDetails,
                      row.status
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.serviceRequestID, model)}
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

    const { name, customerID, serviceType, requestDetails, status } = values;
    let newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!serviceType) newErrors.serviceType = "Service type is required.";
    if (!customerID) newErrors.customerID = "Customer is required.";
    if (!requestDetails)
      newErrors.requestDetails = "Request details is required.";
    if (!status) newErrors.status = "Status is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await ServicesService.createServiceRequest(
        name,
        customerID,
        serviceType,
        requestDetails,
        status
      );
      handleCloseModal();
      toast.success("ServiceRequest created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error("Failed to create serviceRequest.");
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
          <div className="font-semibold text-xl capitalize">ServiceRequest</div>
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
                placeholder="Search serviceRequest"
                value={searchQuery.serviceRequest}
                onChange={handleSearchChange("serviceRequest")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("serviceRequest")}
              data={serviceRequests.filter((c) =>
                c.name
                  ?.toLowerCase()
                  .includes(searchQuery.serviceRequest.toLowerCase())
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
            <h2 className="text-xl font-semibold mb-5">
              Create ServiceRequest
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
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Service Type:
                </span>
                <select
                  name="serviceType"
                  value={values.serviceType}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {serviceTypes.map((serviceType) => (
                    <option key={serviceType.id} value={serviceType.id}>
                      {serviceType.name}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <span className="text-red-700">{errors.serviceType}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Description:
                </span>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChangeInput}
                  placeholder="Enter description"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.description && (
                  <span className="text-red-700">{errors.description}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Request Details:
                </span>
                <textarea
                  name="requestDetails"
                  value={values.requestDetails}
                  onChange={handleChangeInput}
                  placeholder="Enter requestDetails"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.requestDetails && (
                  <span className="text-red-700">{errors.requestDetails}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Customer:
                </span>
                <select
                  name="customerID"
                  value={values.customerID}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {customers.map((customer) => (
                    <option
                      key={customer.customerID}
                      value={customer.customerID}
                    >
                      {customer.customerName}
                    </option>
                  ))}
                </select>
                {errors.customerID && (
                  <span className="text-red-700">{errors.customerID}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Status:
                </span>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <span className="text-red-700">{errors.status}</span>
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

export default ListServiceRequestRequests;
