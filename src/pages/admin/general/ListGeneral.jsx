import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import GeneralService from "../../../services/GeneralService";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListGeneral = () => {
  const [workTypes, setWorkTypes] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [vacationTypes, setVacationTypes] = useState([]);
  const [sanctionTypes, setSanctionTypes] = useState([]);
  const [overtimeTypes, setOvertimeTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    coefficient: "",
    description: "",
    objectives: "",
    startDate: "",
    endDate: "",
    instructor: "",
    model: "",
  });

  const [searchQuery, setSearchQuery] = useState({
    workType: "",
    trainingProgram: "",
    vacationType: "",
    sanctionType: "",
    overtimeType: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        workTypesData,
        trainingProgramsData,
        vacationTypesData,
        sanctionTypeData,
        overtimeTypeData,
      ] = await Promise.all([
        GeneralService.getAllWorkTypes(),
        GeneralService.getAllTrainingPrograms(),
        GeneralService.getAllVacationTypes(),
        GeneralService.getAllSanctionTypes(),
        GeneralService.getAllOvertimeTypes(),
      ]);

      setWorkTypes(workTypesData.$values || []);
      setTrainingPrograms(trainingProgramsData || []);
      setVacationTypes(vacationTypesData.$values || []);
      setSanctionTypes(sanctionTypeData.$values || []);
      setOvertimeTypes(overtimeTypeData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (
      id,
      name,
      coefficient,
      description,
      objectives,
      startDate,
      endDate,
      instructor,
      model
    ) => {
      setEditItem({
        id,
        name,
        coefficient,
        description,
        objectives,
        startDate,
        endDate,
        instructor,
        model,
      });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const {
        id,
        name,
        coefficient,
        description,
        objectives,
        startDate,
        endDate,
        instructor,
        model,
      } = editItem;

      if (model === "workType") {
        if (!name || !coefficient) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeneralService.updateWorkType(id, name, coefficient);
      } else if (model === "trainingProgram") {
        if (
          !name ||
          !description ||
          !objectives ||
          !startDate ||
          !endDate ||
          !instructor
        ) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeneralService.updateTrainingProgram(
          id,
          name,
          description,
          objectives,
          startDate,
          endDate,
          instructor
        );
      } else if (model === "vacationType") {
        if (!name) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeneralService.updateVacationType(id, name);
      } else if (model === "sanctionType") {
        if (!name) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeneralService.updateSanctionType(id, name);
      } else if (model === "overtimeType") {
        if (!name || !description) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeneralService.updateOvertimeType(id, name, description);
      }

      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        value: "",
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
      const { model } = editItem;

      if (model === "workType") {
        await GeneralService.deleteWorkType(currentId);
        setWorkTypes((prevWorkTypes) =>
          prevWorkTypes.filter((c) => c.Id !== currentId)
        );
      } else if (model === "trainingProgram") {
        await GeneralService.deleteTrainingProgram(currentId);
        setTrainingPrograms((prevTrainingPrograms) =>
          prevTrainingPrograms.filter((c) => c.Id !== currentId)
        );
      } else if (model === "vacationType") {
        await GeneralService.deleteVacationType(currentId);
        setVacationTypes((prevVacationTypes) =>
          prevVacationTypes.filter((d) => d.Id !== currentId)
        );
      } else if (model === "sanctionType") {
        await GeneralService.deleteSanctionType(currentId);
        setSanctionTypes((prevBrachs) =>
          prevBrachs.filter((d) => d.Id !== currentId)
        );
      } else if (model === "overtimeType") {
        await GeneralService.deleteOvertimeType(currentId);
        setSanctionTypes((prevBrachs) =>
          prevBrachs.filter((d) => d.Id !== currentId)
        );
      }
      await fetchAllData();
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({
        values: "",
      });
    }
  }, [editItem, currentId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderColumns = useCallback(
    (model) => {
      const fieldMappings = {
        workType: {
          id: "Id",
          name: "Name",
          coefficient: "Coefficient",
        },
        vacationType: {
          id: "Id",
          name: "Name",
        },
        sanctionType: {
          id: "Id",
          name: "Name",
        },
        overtimeType: {
          id: "Id",
          name: "Description",
        },
        trainingProgram: {
          id: "programID",
          name: "programName",
          description: "description",
          instructor: "instructor",
          objectives: "objectives",
          startDate: "startDate",
          endDate: "endDate",
        },
      };

      const getId = (row) => {
        switch (model) {
          case "workType":
          case "vacationType":
          case "sanctionType":
          case "overtimeType":
            return row.Id;
          case "trainingProgram":
            return row.programID;
          default:
            return null;
        }
      };

      const getName = (row) => {
        switch (model) {
          case "workType":
          case "vacationType":
          case "sanctionType":
          case "overtimeType":
            return row.Name;
          case "trainingProgram":
            return row.programName;
          default:
            return "";
        }
      };

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
            editItem.id === getId(row) && editItem.model === model ? (
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
        ...(model === "workType"
          ? [
              {
                name: "Coefficient",
                selector: (row) => row.Coefficient || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.coefficient}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          coefficient: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    row.Coefficient || ""
                  ),
                sortable: true,
              },
            ]
          : []),
        ...(model === "trainingProgram"
          ? [
              {
                name: "Description",
                selector: (row) => row.description || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
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
                name: "Instructor",
                selector: (row) => row.instructor || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.instructor}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          instructor: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    row.instructor || ""
                  ),
                sortable: true,
              },
              {
                name: "Objectives",
                selector: (row) => row.objectives || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.objectives}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          objectives: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    row.objectives || ""
                  ),
                sortable: true,
              },
              {
                name: "Start Date",
                selector: (row) => formatDate(row.startDate) || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
                    <input
                      type="date"
                      value={formatDate(editItem.startDate)}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          startDate: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    formatDate(row.startDate) || ""
                  ),
                sortable: true,
              },
              {
                name: "End Date",
                selector: (row) => formatDate(row.endDate) || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
                    <input
                      type="date"
                      value={formatDate(editItem.endDate)}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          endDate: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    formatDate(row.endDate) || ""
                  ),
                sortable: true,
              },
            ]
          : []),
        ...(model === "overtimeType"
          ? [
              {
                name: "Description",
                selector: (row) => row.Description || "",
                cell: (row) =>
                  editItem.id === getId(row) && editItem.model === model ? (
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
                    row.Description || ""
                  ),
                sortable: true,
              },
            ]
          : []),
        {
          name: "Actions",
          cell: (row) => (
            <>
              {editItem.id === getId(row) && editItem.model === model ? (
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
                        id: null,
                        name: "",
                        coefficient: "",
                        programName: "",
                        description: "",
                        startDate: "",
                        endDate: "",
                        instructor: "",
                        objectives: "",
                        model: "",
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
                        getId(row),
                        getName(row),
                        row.Coefficient,
                        row.description,
                        row.objectives,
                        row.startDate,
                        row.endDate,
                        row.instructor,
                        model
                      )
                    }
                    className="whitespace-nowrap px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(getId(row), model)}
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
    [
      editItem,
      workTypes,
      trainingPrograms,
      vacationTypes,
      handleEditClick,
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

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">General</div>
          <Link to="/dashboard/general/create">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Create New
            </button>
          </Link>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          <div className="w-full overflow-x-scroll">
            {[
              "workType",
              "trainingProgram",
              "vacationType",
              "sanctionType",
              "overtimeType",
            ].map((model) => (
              <div key={model}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold my-5">
                    {model.charAt(0).toUpperCase() + model.slice(1)}
                  </h3>

                  <input
                    type="text"
                    placeholder={`Search ${
                      model === "workType"
                        ? "workTypes"
                        : model === "trainingProgram"
                        ? "trainingPrograms"
                        : model === "vacationTypes"
                        ? "vacationTypes"
                        : model === "sanctionType"
                        ? "sanctionTypes"
                        : "overtimeTypes"
                    }`}
                    value={searchQuery[model]}
                    onChange={handleSearchChange(model)}
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none"
                  />
                </div>
                <DataTable
                  columns={renderColumns(model)}
                  data={
                    model === "workType"
                      ? workTypes.filter((c) =>
                          c.Name?.toLowerCase().includes(
                            searchQuery.workType.toLowerCase()
                          )
                        )
                      : model === "trainingProgram"
                      ? trainingPrograms.filter((p) =>
                          p.programName
                            ?.toLowerCase()
                            .includes(searchQuery.trainingProgram.toLowerCase())
                        )
                      : model === "vacationType"
                      ? vacationTypes.filter((d) =>
                          d.Name.toLowerCase().includes(
                            searchQuery.vacationType.toLowerCase()
                          )
                        )
                      : model === "sanctionType"
                      ? sanctionTypes.filter((d) =>
                          d.Name.toLowerCase().includes(
                            searchQuery.sanctionType.toLowerCase()
                          )
                        )
                      : overtimeTypes.filter((d) =>
                          d.Name.toLowerCase().includes(
                            searchQuery.overtimeType.toLowerCase()
                          )
                        )
                  }
                  pagination
                  paginationComponentOptions={paginationComponentOptions}
                  fixedHeader
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
            ))}
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
    </>
  );
};

export default ListGeneral;
