import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import DataTable from "react-data-table-component";
import JobService from "../../../services/JobService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentpositionID, setCurrentpositionID] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    jobRequirements: "",
    jobDescription: "",
    applicationDeadline: "",
    positionName: "",
    status: "",
    model: "job",
  });
  const [searchQuery, setSearchQuery] = useState({
    job: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    jobRequirements: "",
    jobDescription: "",
    applicationDeadline: "",
    positionName: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const jobsData = await JobService.getAllJobs();
      setJobs(jobsData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      positionID,
      jobRequirements,
      positionName,
      jobDescription,
      applicationDeadline,
      status
    ) => {
      setEditItem({
        id: positionID,
        jobRequirements,
        positionName,
        jobDescription,
        applicationDeadline,
        status,
        model: "job",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.jobRequirements ||
      !editItem.jobDescription ||
      !editItem.applicationDeadline || 
      !editItem.positionName || 
      !editItem.status
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const {
        id,
        jobRequirements,
        jobDescription,
        applicationDeadline,
        positionName,
        status,
      } = editItem;

      await JobService.updateJob(
        id,
        jobRequirements,
        jobDescription,
        applicationDeadline,
        positionName,
        status
      );
      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        id: "",
        jobRequirements: "",
        positionName: "",
        jobDescription: "",
        applicationDeadline: "",
        status: "",
        model: "job",
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((id, model) => {
    setRemove(true);
    setCurrentpositionID(id);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await JobService.deleteJob(currentpositionID);
      setJobs((prevJobs) =>
        prevJobs.filter((c) => c.positionID !== currentpositionID)
      );
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete.");
      console.error("Delete error:", error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({
        id: "",
        jobRequirements: "",
        positionName: "",
        jobDescription: "",
        applicationDeadline: "",
        status: "",
        model: "job",
      });
    }
  }, [currentpositionID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderColumns = useCallback(
    (model) => {
      const getName = (row) => row.positionName || "";

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
            editItem.id === row.positionID && editItem.model === model ? (
              <input
                type="text"
                value={editItem.positionName}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    positionName: e.target.value,
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
          name: "Job Requirements",
          selector: (row) => row.jobRequirements,
          cell: (row) =>
            editItem.id === row.positionID && editItem.model === model ? (
              <input
                type="text"
                value={editItem.jobRequirements}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    jobRequirements: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.jobRequirements
            ),
          sortable: true,
        },
        {
          name: "Job Description",
          selector: (row) => row.jobDescription,
          cell: (row) =>
            editItem.id === row.positionID && editItem.model === model ? (
              <input
                type="text"
                value={editItem.jobDescription}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    jobDescription: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              row.jobDescription
            ),
          sortable: true,
        },
        {
          name: "Application Deadline",
          selector: (row) => formatDate(row.applicationDeadline),
          cell: (row) =>
            editItem.id === row.positionID && editItem.model === model ? (
              <input
                type="date"
                value={formatDate(editItem.applicationDeadline)}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    applicationDeadline: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              formatDate(row.applicationDeadline)
            ),
          sortable: true,
        },
        {
          name: "Status",
          selector: (row) => row.status || "",
          cell: (row) =>
            editItem.id === row.positionID && editItem.model === model ? (
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
              {editItem.id === row.positionID && editItem.model === model ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpdate}
                    className="whitespace-nowrap px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      setEditItem({
                        id: "",
                        positionName: "",
                        jobRequirements: "",
                        jobDescription: "",
                        applicationDeadline: "",
                        status: "",
                        model: "job",
                      })
                    }
                    className="whitespace-nowrap px-3 py-2 border border-red-700 text-red-700 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleEditClick(
                        row.positionID,
                        getName(row),
                        row.jobRequirements,
                        row.jobDescription,
                        row.applicationDeadline,
                        row.status
                      )
                    }
                    className="whitespace-nowrap px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(row.positionID, model)}
                    className="whitespace-nowrap px-3 py-2 border border-red-700 text-red-700 rounded-md"
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
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      jobRequirements,
      jobDescription,
      applicationDeadline,
      positionName,
      status,
    } = values;

    let newErrors = {};

    if (!jobRequirements)
      newErrors.jobRequirements = "Mandatory.";
    if (!jobDescription)
      newErrors.jobDescription = "Mandatory.";
    if (!applicationDeadline)
      newErrors.applicationDeadline = "Mandatory.";
    if (!positionName) newErrors.positionName = "Mandatory.";
    if (!status) newErrors.status = "Mandatory.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await JobService.createJob(
        jobRequirements,
        jobDescription,
        applicationDeadline,
        positionName,
        status
      );
      await fetchAllData();
      toast.success("Created successfully.");
      handleCloseModal();
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
          <div className="font-semibold text-xl capitalize">Job</div>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 bg-blue-950 text-white rounded-md"
          >
            Create New
          </button>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          <div key="job" className="w-full overflow-x-scroll">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search job"
                value={searchQuery.job}
                onChange={handleSearchChange("job")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns("job")}
              data={jobs.filter((c) =>
                c.positionName
                  ?.toLowerCase()
                  .includes(searchQuery.job.toLowerCase())
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
            <h3 className="text-xl font-bold mb-4 text-center">Create Job</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Name:
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="positionName"
                  value={values.positionName}
                  onChange={handleChangeInput}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                />
                {errors.positionName && (
                  <span className="text-red-700">
                    {errors.positionName}
                  </span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Job Requirements:
                </span>
                <textarea
                  name="jobRequirements"
                  value={values.jobRequirements}
                  onChange={handleChangeInput}
                  placeholder="Enter jobRequirements"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.jobRequirements && (
                  <span className="text-red-700">{errors.jobRequirements}</span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Job Description:
                </span>
                <textarea
                  name="jobDescription"
                  value={values.jobDescription}
                  onChange={handleChangeInput}
                  placeholder="Enter jobDescription"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                ></textarea>
                {errors.jobDescription && (
                  <span className="text-red-700">{errors.jobDescription}</span>
                )}
              </label>
              <label className="col-span-2 xl:col-span-1">
                <span className="block font-medium text-primary mb-1">
                  Application Deadline:
                </span>
                <input
                  type="date"
                  placeholder="Enter name"
                  name="applicationDeadline"
                  value={values.applicationDeadline}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                />
                {errors.applicationDeadline && (
                  <span className="text-red-600 text-sm">
                    {errors.applicationDeadline}
                  </span>
                )}
              </label>
              <label className="col-span-2 xl:col-span-1">
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

export default ListJob;
