import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import ServicesService from "../../../services/ServicesService";
import { no_avatar } from "../../../assets";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListService = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    file: null,
    status: "",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    file: "",
    status: "",
    model: "service",
  });
  const [searchQuery, setSearchQuery] = useState({ service: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [servicesData] = await Promise.all([
        ServicesService.getAllServices(),
      ]);

      setServices(servicesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, name, description, price, file, status) => {
      setEditItem({
        id,
        name,
        description,
        price,
        file,
        status,
        model: "service",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.name ||
      !editItem.description ||
      !editItem.price ||
      !editItem.status
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const { id, name, description, price, file, status } = editItem;
      await ServicesService.updateService(
        id,
        name,
        description,
        price,
        file,
        status
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        editItem: null,
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((serviceID, model) => {
    setRemove(true);
    setCurrentId(serviceID);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await ServicesService.deleteService(currentId);
      setServices((prevServices) =>
        prevServices.filter((c) => c.serviceID !== currentId)
      );
      toast.success("Deleted successfully.");
      await fetchAllData();
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setLoading(false);
      setRemove(false);
    }
  }, [currentId]);

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
        name: "Description",
        selector: (row) => row.description || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
            <input
              type="text"
              value={editItem.description}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.description || ""
          ),
        sortable: true,
      },
      {
        name: "Price",
        selector: (row) => row.price || "",
        cell: (row) =>
          editItem.id === row.id && editItem.model === model ? (
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
            row.price || ""
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
          <div className="flex items-center gap-2 whitespace-nowrap">
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
                      description: "",
                      price: "",
                      file: "",
                      status: "",
                      model: "service",
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
                      row.description,
                      row.price,
                      row.file,
                      row.status,
                      model
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(row.id, model)}
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

    const { serviceName, description, price, file, status } = values;
    let newErrors = {};

    if (!serviceName) newErrors.serviceName = "Mandatory.";
    if (!price) newErrors.price = "Mandatory.";
    if (!description) newErrors.description = "Mandatory.";
    if (!file) newErrors.file = "Mandatory.";
    if (!status) newErrors.status = "Mandatory.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await ServicesService.createService(
        serviceName,
        description,
        price,
        file,
        status
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
    const { name, value, files } = e.target;
    if (name === "file") {
      setValues({ ...values, file: files[0] });
      setImagePreview(files[0]);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Service</div>
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
                placeholder="Search service"
                value={searchQuery.service}
                onChange={handleSearchChange("service")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("service")}
              data={services.filter((c) =>
                c.name
                  ?.toLowerCase()
                  .includes(searchQuery.service.toLowerCase())
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
                    padding: "12px 0",
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
            <h2 className="text-xl font-semibold mb-5">Create Service</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Name:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="serviceName"
                  value={values.serviceName}
                  onChange={handleChangeInput}
                />
                {errors.serviceName && (
                  <span className="text-red-700">{errors.serviceName}</span>
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
                  Price:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="price"
                  value={values.price}
                  onChange={handleChangeInput}
                />
                {errors.price && (
                  <span className="text-red-700">{errors.price}</span>
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

export default ListService;
