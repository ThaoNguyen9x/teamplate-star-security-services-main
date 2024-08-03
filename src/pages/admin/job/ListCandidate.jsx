import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import JobService from "../../../services/JobService";
import axios from "axios";

const phone_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const email_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    cvFile: "",
    status: "",
    model: "candidate",
  });
  const [searchQuery, setSearchQuery] = useState({
    candidate: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    cvFile: null,
    status: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const candidatesData = await JobService.getAllCandidates();
      setCandidates(candidatesData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (candidateID, name, email, phone, status) => {
      setEditItem({
        id: candidateID,
        name,
        email,
        phone,
        status,
        model: "candidate",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.name ||
      !editItem.phone ||
      !editItem.status 
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!email_REGEX.test(editItem.email)) {
      toast.error("Email invalid format.");
      return;
    }
    
    if (!phone_REGEX.test(editItem.phone)) {
      toast.error("Phone invalid format.");
      return;
    }

    setLoading(true);

    try {
      const { id, name, email, phone, status } = editItem;

      await JobService.updateCandidate(id, name, email, phone, status);
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        name: "",
        email: "",
        phone: "",
        status: "",
        model: "candidate",
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((id, model) => {
    setRemove(true);
    setCurrentID(id);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await JobService.deleteCandidate(setCurrentID);
      setCandidates((prevCandidates) =>
        prevCandidates.filter((c) => c.candidateID !== setCurrentID)
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
        name: "",
        email: "",
        phone: "",
        status: "",
        model: "candidate",
      });
    }
  }, []);

  const handleSendMailReject = async (candidateID) => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/candidates/send-mail-reject/${candidateID}`
      );
      toast.success("Mail sent successfully.");
    } catch (error) {
      toast.error("Failed to send mail.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMailApprove = async (id) => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/candidates/send-mail-approve/${id}`
      );
      toast.success("Mail sent successfully.");
    } catch (error) {
      console.log(id);
      toast.error("Failed to send mail.");
    } finally {
      setLoading(false);
    }
  };

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
          name: "Phone",
          selector: (row) => row.phone,
          cell: (row) =>
            editItem.id === row.id && editItem.model === model ? (
              <input
                type="text"
                value={editItem.phone}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.phone
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
            <>
              {editItem.id === row.id && editItem.model === model ? (
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
                        name: "",
                        email: "",
                        phone: "",
                        status: "",
                        model: "job",
                      })
                    }
                    className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <button
                    onClick={() => handleSendMailApprove(row.id)}
                    className="px-3 py-2 border border-green-700 text-green-700 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleSendMailReject(row.id)}
                    className="px-3 py-2 border border-white text-white bg-red-700 rounded-md"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleEditClick(
                        row.id,
                        getName(row),
                        row.email,
                        row.phone,
                        row.status
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValues((prevValues) => ({ ...prevValues, cvFile: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, phone, cvFile, status } = values;

    let newErrors = {};

    if (!name) newErrors.name = "Not Empty.";
    if (!email) {
      newErrors.email = "Not Empty.";
    } else if (!email_REGEX.test(email))
    {
      newErrors.email = "Email invalid format.";
    }

    if (!phone) {
      newErrors.phone = "Not Empty.";
    } else if (!phone_REGEX.test(phone))
    {
      newErrors.phone = "Phone invalid format.";
    }
    if (!status) newErrors.status = "Not Empty.";
    if (!cvFile) newErrors.cvFile = "Not Empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await JobService.createCandidate(name, email, phone, cvFile, status);

      handleCloseModal();
      toast.success("Created successfully.");
      await fetchAllData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Candidates</div>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 bg-blue-950 text-white rounded-md"
          >
            Create New
          </button>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          <div key="candidate">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search candidate"
                value={searchQuery.candidate}
                onChange={handleSearchChange("candidate")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("candidate")}
              data={candidates.filter((c) =>
                c.name
                  ?.toLowerCase()
                  .includes(searchQuery.candidate.toLowerCase())
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
          id={currentpositionID}
          handleDelete={handleDelete}
          setRemove={setRemove}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              Create Candidate
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Name:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={values.name}
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.name && (
                  <span className="text-red-700">{errors.name}</span>
                )}
              </label>
              <label className="col-span-2 xl:col-span-1">
                <span className="block font-medium text-primary mb-1">
                  Email:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="email"
                  value={values.email}
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.email && (
                  <span className="text-red-700">{errors.email}</span>
                )}
              </label>
              <label className="col-span-2 xl:col-span-1">
                <span className="block font-medium text-primary mb-1">
                  Phone:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="phone"
                  value={values.phone}
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.phone && (
                  <span className="text-red-700">{errors.phone}</span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">CV:</span>
                <input
                  type="file"
                  name="cvFile"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.cvFile && (
                  <span className="text-red-700">{errors.cvFile}</span>
                )}
              </label>
              <label className="col-span-2">
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

export default ListCandidate;
