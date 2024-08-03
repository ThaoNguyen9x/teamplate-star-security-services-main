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

const ListServiceSchedules = () => {
  const [values, setValues] = useState({
    name: "",
    employeeID: "",
    serviceRequestID: "",
    location: "",
    scheduledDate: "",
  });
  const [serviceScheduleSchedules, setServiceSchedules] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    employeeID: "",
    serviceRequestID: "",
    location: "",
    scheduledDate: "",
    model: "serviceSchedule",
  });
  const [searchQuery, setSearchQuery] = useState({ serviceSchedule: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [serviceSchedulesData, employeesData, serviceRequestsData] =
        await Promise.all([
          ServicesService.getAllServiceSchedules(),
          EmployeeService.getAllEmployees(),
          ServicesService.getAllServiceRequests(),
        ]);

      setServiceSchedules(serviceSchedulesData || []);
      setEmployees(employeesData || []);
      setServiceRequests(serviceRequestsData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      scheduleID,
      name,
      employeeID,
      serviceRequestID,
      location,
      scheduledDate
    ) => {
      setEditItem({
        id: scheduleID,
        name,
        employeeID,
        serviceRequestID,
        location,
        scheduledDate,
        model: "serviceSchedule",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.name ||
      !editItem.serviceRequestID ||
      !editItem.employeeID ||
      !editItem.scheduledDate ||
      !editItem.location
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setLoading(true);

    try {
      const {
        id,
        name,
        employeeID,
        serviceRequestID,
        location,
        scheduledDate,
      } = editItem;
      await ServicesService.updateServiceSchedule(
        id,
        name,
        employeeID,
        serviceRequestID,
        location,
        scheduledDate,
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        name: "",
        employeeID: "",
        serviceRequestID: "",
        location: "",
        scheduledDate: "",
        model: "serviceSchedule",
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
      await ServicesService.deleteServiceSchedule(currentId);
      setServiceSchedules((prev) =>
        prev.filter((c) => c.scheduleId !== currentId)
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

  const getServiceRequestsOptions = () => {
    return serviceRequests.map((c) => (
      <option key={c.serviceRequestID} value={c.serviceRequestID}>
        {c.name}
      </option>
    ));
  };

  const getServiceRequestName = (row) => {
    return (
      serviceRequests.find((c) => c.id === row.serviceRequestId)?.name || "N/A"
    );
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
        name: "Name",
        selector: (row) => row.name || "",
        cell: (row) =>
          editItem.id === row.scheduleID && editItem.model === model ? (
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
        name: "Employee",
        selector: (row) => getEmployeeName(row.employeeID),
        cell: (row) =>
          editItem.id === row.scheduleID && editItem.model === model ? (
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
        name: "Service Request",
        selector: (row) => getServiceRequestName(row),
        cell: (row) =>
          editItem.id === row.scheduleID && editItem.model === model ? (
            <select
              value={editItem.serviceRequestID}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  serviceRequestID: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getServiceRequestsOptions()}
            </select>
          ) : (
            getServiceRequestName(row)
          ),
        sortable: true,
      },
      {
        name: "Location",
        selector: (row) => row.location || "",
        cell: (row) =>
          editItem.id === row.scheduleID && editItem.model === model ? (
            <input
              type="text"
              value={editItem.location}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  location: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.location || ""
          ),
        sortable: true,
      },
      {
        name: "Scheduled Date",
        selector: (row) => formatDate(row.scheduledDate) || "",
        cell: (row) =>
          editItem.id === row.scheduleID && editItem.model === model ? (
            <input
              type="date"
              value={formatDate(editItem.scheduledDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  scheduledDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.scheduledDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {editItem.id === row.scheduleID && editItem.model === model ? (
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
                      employeeID: "",
                      serviceRequestID: "",
                      location: "",
                      scheduledDate: "",
                      model: "serviceSchedule",
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
                      row.scheduleID,
                      row.name,
                      row.employeeID,
                      row.serviceRequestID,
                      row.location,
                      row.scheduledDate
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.scheduleID, model)}
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, serviceRequestID, employeeID, scheduledDate, location } =
      values;
    let newErrors = {};

    if (!name) newErrors.name = "Mandatory.";
    if (!serviceRequestID) newErrors.serviceRequestID = "Mandatory.";
    if (!employeeID) newErrors.employeeID = "Mandatory.";
    if (!scheduledDate) newErrors.scheduledDate = "Mandatory.";
    if (!location) newErrors.location = "Mandatory.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await ServicesService.createServiceSchedule(
        name,
        serviceRequestID,
        employeeID,
        scheduledDate,
        location
      );
      handleCloseModal();
      toast.success("Created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error(error.message);
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
            Service Schedule
          </div>
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
                placeholder="Search serviceSchedule"
                value={searchQuery.serviceSchedule}
                onChange={handleSearchChange("serviceSchedule")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("serviceSchedule")}
              data={serviceScheduleSchedules.filter((c) =>
                c.name
                  ?.toLowerCase()
                  .includes(searchQuery.serviceSchedule.toLowerCase())
              )}
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
            <form
              onSubmit={handleSubmit}
              className="grid xl:grid-cols-2 grid-cols-1 gap-2"
            >
              <label className="col-span-2">
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
              <label className="col-span-2 xl:col-span-1">
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
              </label>
              <label className="col-span-2 xl:col-span-1">
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
              <label className="col-span-2">
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
              <div className="flex items-center gap-2 mt-4 col-span-2">
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

export default ListServiceSchedules;
