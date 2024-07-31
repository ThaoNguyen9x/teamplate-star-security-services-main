import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import ServicesService from "../../../services/ServicesService";
import DataTable from "react-data-table-component";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListCashService = () => {
  const [servicesServices, setServicesServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    serviceType: "",
    scope: "",
    price: "",
    conditions: "",
    model: "servicesService",
  });
  const [searchQuery, setSearchQuery] = useState({
    servicesService: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: "",
    serviceType: "",
    scope: "",
    price: "",
    conditions: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [servicesServicesData] = await Promise.all([
        ServicesService.getAllCashServicess(),
      ]);

      setServicesServices(servicesServicesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (cashServiceID, name, serviceType, scope, price, conditions) => {
      setEditItem({
        id: cashServiceID,
        name,
        serviceType,
        scope,
        price,
        conditions,
        model: "servicesService",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { id, name, serviceType, scope, price, conditions } = editItem;
      await ServicesService.updateCashServices(
        id,
        name,
        serviceType,
        scope,
        price,
        conditions
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error("Failed to update data.");
      console.error("Update error:", error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        serviceType: "",
        scope: "",
        price: "",
        conditions: "",
        model: "servicesService",
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
      await ServicesService.deleteCashServices(currentId);
      setServicesServices((prev) =>
        prev.filter((c) => c.cashServiceID !== currentId)
      );
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Delete error:", error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({
        id: "",
        serviceType: "",
        scope: "",
        price: "",
        conditions: "",
        model: "servicesService",
      });
    }
  }, [currentId]);

  const renderColumns = useCallback(
    (model) => {
      const getName = (row) => row.name || "";
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
            editItem.id === row.cashServiceID && editItem.model === model ? (
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
        {
          name: "Service Type",
          selector: (row) => row.serviceType,
          cell: (row) =>
            editItem.id === row.cashServiceID && editItem.model === model ? (
              <input
                type="text"
                value={editItem.serviceType}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    serviceType: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.serviceType
            ),
          sortable: true,
        },
        {
          name: "Scope",
          selector: (row) => row.scope,
          cell: (row) =>
            editItem.id === row.cashServiceID && editItem.model === model ? (
              <input
                type="text"
                value={editItem.scope}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    scope: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.scope
            ),
          sortable: true,
        },
        {
          name: "Price",
          selector: (row) => row.price,
          cell: (row) =>
            editItem.id === row.cashServiceID && editItem.model === model ? (
              <input
                type="number"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.price
            ),
          sortable: true,
        },
        {
          name: "Conditions",
          selector: (row) => row.conditions,
          cell: (row) =>
            editItem.id === row.cashServiceID && editItem.model === model ? (
              <input
                type="text"
                value={editItem.conditions}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    conditions: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.conditions
            ),
          sortable: true,
        },
        {
          name: "Actions",
          cell: (row) => (
            <>
              {editItem.id === row.cashServiceID && editItem.model === model ? (
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
                        cashServiceID: "",
                        conditions: "",
                        name: "",
                        price: "",
                        scope: "",
                        serviceType: "",
                        model: "servicesService",
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
                        row.cashServiceID,
                        getName(row),
                        row.serviceType,
                        row.scope,
                        row.price,
                        row.conditions,
                      )
                    }
                    className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(row.cashServiceID, model)}
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, serviceType, scope, price, conditions } = values;
    let newErrors = {};
  
    if (!name) newErrors.name = "Name is required.";
    if (!serviceType) newErrors.serviceType = "Service Type is required.";
    if (!scope) newErrors.scope = "Scope is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!conditions) newErrors.conditions = "Conditions are required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setLoading(true);
    try {
      console.log("Creating Cash Service with data:", {
        name,
        serviceType,
        scope,
        price,
        conditions,
      });
      await ServicesService.createCashServices({
        name,
        serviceType,
        scope,
        price,
        conditions,
      });
      await fetchAllData();
      toast.success("Service created successfully.");
      handleCloseModal();
    } catch (error) {
      toast.error(`Failed to create service: ${error.message}`);
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
            ServicesService
          </div>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 bg-blue-950 text-white rounded-md"
          >
            Create New
          </button>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          <div className="container  mx-auto overflow-y-auto">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search servicesService"
                value={searchQuery.servicesService}
                onChange={handleSearchChange("servicesService")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("servicesService")}
              data={servicesServices.filter((c) =>
                c.name
                  ?.toLowerCase()
                  .includes(searchQuery.servicesService.toLowerCase())
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
              Create CashService
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Name:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.name}
                  name="name"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Service Type:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.serviceType}
                  name="serviceType"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.serviceType && (
                  <span className="text-red-600 text-sm">
                    {errors.serviceType}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Scope:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={values.scope}
                  name="scope"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.scope && (
                  <span className="text-red-600 text-sm">{errors.scope}</span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Price:
                </span>
                <input
                  type="number"
                  placeholder="Enter name"
                  value={values.price}
                  name="price"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.price && (
                  <span className="text-red-600 text-sm">{errors.price}</span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Conditions:
                </span>
                <textarea
                  value={values.conditions}
                  name="conditions"
                  onChange={handleChangeInput}
                  placeholder="Enter conditions"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.conditions && (
                  <span className="text-red-700">{errors.conditions}</span>
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

export default ListCashService;
