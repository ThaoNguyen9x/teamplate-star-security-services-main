import React, { useEffect, useState, useCallback, useMemo } from "react";
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

const ListInterview = () => {
  const [values, setValues] = useState({
    name: "",
    candidateID: "",
    interviewDate: "",
    interviewLocation: "",
    interviewResult: "",
    comments: "",
  });
  const [interviews, setInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    candidateID: "",
    interviewDate: "",
    interviewLocation: "",
    interviewResult: "",
    comments: "",
    model: "interview",
  });
  const [searchQuery, setSearchQuery] = useState({ interview: "" });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      console.log("Fetching data...");
      const [interviewsData, candidatesData] = await Promise.all([
        JobService.getAllInterviews(),
        JobService.getAllCandidates(),
      ]);

      setInterviews(interviewsData || []);
      setCandidates(candidatesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      interviewID,
      name,
      candidateID,
      interviewDate,
      interviewLocation,
      interviewResult,
      comments
    ) => {
      setEditItem({
        id: interviewID,
        name,
        candidateID,
        interviewDate,
        interviewLocation,
        interviewResult,
        comments,
        model: "interview",
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    if (
      !editItem.name ||
      !editItem.candidateID ||
      !editItem.interviewDate ||
      !editItem.interviewLocation ||
      !editItem.interviewResult ||
      !editItem.comments
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const {
        id,
        name,
        candidateID,
        interviewDate,
        interviewLocation,
        interviewResult,
        comments,
      } = editItem;
      await JobService.updateInterview(
        id,
        name,
        candidateID,
        interviewDate,
        interviewLocation,
        interviewResult,
        comments
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
        candidateID: "",
        interviewDate: "",
        interviewLocation: "",
        interviewResult: "",
        comments: "",
        model: "interview",
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
      await JobService.deleteInterview(currentId);
      setInterviews((prev) => prev.filter((c) => c.interviewID !== currentId));
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

  const getCandidatesOptions = useMemo(() => {
    return candidates.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ));
  }, [candidates]);

  const getCandidateName = useCallback(
    (id) => {
      return candidates.find((c) => c.id === id)?.name || "N/A";
    },
    [candidates]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const columns = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name || "",
        cell: (row) =>
          editItem.id === row.interviewID && editItem.model === "interview" ? (
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
        name: "Candidate",
        selector: (row) => getCandidateName(row.candidateID),
        cell: (row) =>
          editItem?.id === row.interviewID ? (
            <select
              value={editItem.candidateID}
              onChange={(e) =>
                setEditItem((prev) => ({
                  ...prev,
                  candidateID: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {getCandidatesOptions}
            </select>
          ) : (
            getCandidateName(row.candidateID)
          ),
        sortable: true,
      },
      {
        name: "Interview Location",
        selector: (row) => row.interviewLocation || "",
        cell: (row) =>
          editItem.id === row.interviewID && editItem.model === "interview" ? (
            <input
              type="text"
              value={editItem.interviewLocation}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  interviewLocation: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.interviewLocation || ""
          ),
        sortable: true,
      },
      {
        name: "Comments",
        selector: (row) => row.comments || "",
        cell: (row) =>
          editItem.id === row.interviewID && editItem.model === "interview" ? (
            <input
              type="text"
              value={editItem.comments}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  comments: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.comments || ""
          ),
        sortable: true,
      },
      {
        name: "Interview Date",
        selector: (row) => formatDate(row.interviewDate) || "",
        cell: (row) =>
          editItem.id === row.interviewID && editItem.model === "interview" ? (
            <input
              type="date"
              value={formatDate(editItem.interviewDate)}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  interviewDate: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            formatDate(row.interviewDate) || ""
          ),
        sortable: true,
      },
      {
        name: "Interview Result",
        selector: (row) => row.interviewResult || "",
        cell: (row) =>
          editItem.id === row.interviewID && editItem.model === "interview" ? (
            <input
              type="text"
              value={editItem.interviewResult}
              onChange={(e) =>
                setEditItem((prevState) => ({
                  ...prevState,
                  interviewResult: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md outline-none"
            />
          ) : (
            row.interviewResult || ""
          ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            {editItem.id === row.interviewID ? (
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
                      ...editItem,
                      id: "",
                      model: "",
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
                      row.interviewID,
                      row.name,
                      row.candidateID,
                      row.interviewDate,
                      row.interviewLocation,
                      row.interviewResult,
                      row.comments
                    )
                  }
                  className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteClick(row.interviewID, "interview")
                  }
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
    [
      candidates,
      editItem,
      getCandidatesOptions,
      getCandidateName,
      handleUpdate,
      handleDeleteClick,
    ]
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

    const {
      name,
      candidateID,
      interviewDate,
      interviewLocation,
      interviewResult,
      comments,
    } = values;

    let newErrors = {};

    if (!name) newErrors.name = "Not Empty.";
    if (!candidateID) newErrors.candidateID = "Not Empty.";
    if (!interviewResult) newErrors.interviewResult = "Not Empty.";
    if (!interviewDate) newErrors.interviewDate = "Not Empty.";
    if (!interviewLocation) newErrors.interviewLocation = "Not Empty.";
    if (!comments) newErrors.comments = "Not Empty.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await JobService.createInterview(
        name,
        candidateID,
        interviewDate,
        interviewLocation,
        interviewResult,
        comments
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
          <div className="font-semibold text-xl capitalize">Interview</div>
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
                placeholder="Search interview"
                value={searchQuery.interview}
                onChange={handleSearchChange("interview")}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={columns}
              data={interviews}
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
            <h2 className="text-xl font-semibold mb-5">Create Interview</h2>
            <form
              onSubmit={handleSubmit}
              className="grid gap-2 xl:grid-cols-2 grid-cols-1"
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
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Interview Result:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="interviewResult"
                  value={values.interviewResult}
                  onChange={handleChangeInput}
                />
                {errors.interviewResult && (
                  <span className="text-red-700">{errors.interviewResult}</span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Comments:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="comments"
                  value={values.comments}
                  onChange={handleChangeInput}
                />
                {errors.comments && (
                  <span className="text-red-700">{errors.comments}</span>
                )}
              </label>
              <label className="col-span-2">
                <span className="block font-medium text-primary mb-1">
                  Interview Location:
                </span>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter name"
                  name="interviewLocation"
                  value={values.interviewLocation}
                  onChange={handleChangeInput}
                />
                {errors.interviewLocation && (
                  <span className="text-red-700">
                    {errors.interviewLocation}
                  </span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Candidate:
                </span>
                <select
                  name="candidateID"
                  value={values.candidateID}
                  onChange={handleChangeInput}
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                >
                  <option value="">Select</option>
                  {candidates.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                      {candidate.name}
                    </option>
                  ))}
                </select>
                {errors.candidateID && (
                  <span className="text-red-700">{errors.candidateID}</span>
                )}
              </label>
              <label className="block mb-1">
                <span className="block font-medium text-primary mb-1">
                  Interview Date:
                </span>
                <input
                  type="date"
                  className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  placeholder="Enter Phone"
                  name="interviewDate"
                  value={values.interviewDate}
                  onChange={handleChangeInput}
                />
                {errors.interviewDate && (
                  <span className="text-red-700">{errors.interviewDate}</span>
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

export default ListInterview;
