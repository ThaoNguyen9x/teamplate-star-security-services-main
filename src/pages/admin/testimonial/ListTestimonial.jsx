import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import TestimonialService from "../../../services/TestimonialService";
import DataTable from "react-data-table-component";
import CustomerService from "../../../services/CustomerService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    customerId: "",
    star: "",
    desc: "",
    model: "testimonial",
  });
  const [searchQuery, setSearchQuery] = useState({
    testimonial: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    customerId: "",
    star: "",
    desc: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [testimonialsData, customersData] = await Promise.all([
        TestimonialService.getAllTestimonials(),
        CustomerService.getAllCustomers(),
      ]);

      setTestimonials(testimonialsData.$values || []);
      setCustomers(customersData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback((id, customerId, star, desc) => {
    setEditItem({ id, customerId, star, desc, model: "testimonial" });
  }, []);

  const handleUpdate = useCallback(async () => {
    if (!editItem.star || !editItem.desc) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (editItem.star < 1 || editItem.star > 5) {
      toast.error("Only between 1 and 5 is allowed.");
      return;
    }

    setLoading(true);
    try {
      const { id, star, desc } = editItem;
      await TestimonialService.updateTestimonial(id, star, desc);
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        customerId: "",
        star: "",
        desc: "",
        model: "testimonial",
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
      await TestimonialService.deleteTestimonial(currentId);
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((c) => c.Id !== currentId)
      );
      toast.success("Deleted successfully.");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({ id: "", name: "", model: "testimonial" });
    }
  }, [currentId]);

  const getCustomerName = useCallback(
    (id) => {
      return customers.find((c) => c.id === id)?.customerName || "N/A";
    },
    [customers]
  );

  const renderColumns = useCallback(
    (model) => {
      return [
        {
          name: "#",
          selector: (row, index) => index + 1,
          sortable: true,
        },
        {
          name: "Customer",
          selector: (row) => getCustomerName(row.customerId),
          sortable: true,
        },
        {
          name: "Star",
          selector: (row) => row.Star,
          cell: (row) =>
            editItem.id === row.Id && editItem.model === model ? (
              <input
                type="number"
                value={editItem.star}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    star: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.Star
            ),
          sortable: true,
        },
        {
          name: "Description",
          selector: (row) => row.Desc,
          cell: (row) =>
            editItem.id === row.Id && editItem.model === model ? (
              <input
                type="text"
                value={editItem.desc}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    desc: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.Desc
            ),
          sortable: true,
        },
        {
          name: "Actions",
          cell: (row) => (
            <>
              {editItem.id === row.Id && editItem.model === model ? (
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
                        id: "",
                        customerId: "",
                        star: "",
                        desc: "",
                        model: "testimonial",
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
                        row.Id,
                        row.CustomerId,
                        row.Star,
                        row.Desc
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
                </div>
              )}
            </>
          ),
        },
      ];
    },
    [editItem, handleEditClick, handleUpdate, handleDeleteClick, customers]
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

    const { customerId, star, desc } = values;

    let newErrors = {};

    if (!customerId) newErrors.customerId = "Not Empty.";
    if (!star) {
      newErrors.star = "Not Empty.";
    } else if (star < 1 || star > 5) {
      newErrors.star = "Only values between 1 and 5 are allowed.";
    }

    if (!desc) newErrors.desc = "Not Empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await TestimonialService.createTestimonial(customerId, star, desc);

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
          <div className="font-semibold text-xl capitalize">Testimonial</div>
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
                placeholder="Search testimonial"
                value={searchQuery.testimonial}
                onChange={handleSearchChange("testimonial")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("testimonial")}
              data={testimonials}
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
            <h3 className="text-xl font-bold mb-4 text-center">
              Create Testimonial
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Customer:
                </span>
                <select
                  name="customerId"
                  value={values.customerId}
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
                {errors.customerId && (
                  <span className="text-red-700">{errors.customerId}</span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Star:
                </span>
                <input
                  type="number"
                  placeholder="Enter star"
                  value={values.star}
                  name="star"
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.star && (
                  <span className="text-red-600 text-sm">{errors.star}</span>
                )}
              </label>
              <label className="block">
                <span className="block font-medium text-primary mb-1">
                  Description:
                </span>
                <input
                  type="text"
                  name="desc"
                  placeholder="Enter name"
                  value={values.desc}
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.desc && (
                  <span className="text-red-600 text-sm">{errors.desc}</span>
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

export default ListTestimonial;
