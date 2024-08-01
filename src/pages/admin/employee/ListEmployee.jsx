import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import EmployeeService from "../../../services/EmployeeService";
import DataTable from "react-data-table-component";
import { no_avatar } from "../../../assets/index";
import DepartmentService from "../../../services/DepartmentService";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [employeesData, positionsData] = await Promise.all([
        EmployeeService.getAllEmployees(),
        DepartmentService.getAllPositions(),
      ]);

      setEmployees(employeesData || []);
      setPositions(positionsData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = useCallback((id) => {
    setRemove(true);
    setCurrentId(id);
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await EmployeeService.deleteEmployee(currentId);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== currentId)
      );
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete data.");
      console.error("Delete error:", error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setCurrentId(null);
    }
  }, [currentId]);

  const renderColumns = useCallback(() => {
    return [
      {
        name: "#",
        selector: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Image",
        cell: (row) => (
          <img
            src={row.photo ? row.photo : no_avatar}
            alt={row.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ),
      },
      {
        name: "Name",
        selector: (row) => row.name || "",
        sortable: true,
      },
      {
        name: "Position",
        selector: (row) => {
          const position = positions.find(
            (c) => c.Id === row.positionId
          );
          return position ? position.Name : "N/A";
        },
        sortable: true,
      },
      {
        name: "Civil Id",
        selector: (row) => row.civilId || "",
        sortable: true,
      },
      {
        name: "Phone",
        selector: (row) => row.phoneNumber || "",
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Link to={`/dashboard/employees/edit/${row.id}`}>
              <button className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md">
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleDeleteClick(row.id)}
              className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
            >
              Delete
            </button>
          </div>
        ),
      },
    ];
  }, [positions]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Employees</div>
          <Link to="/dashboard/employees/create">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Create New
            </button>
          </Link>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          <div key="employee">
            <div className="flex items-center justify-end">
              <input
                type="text"
                placeholder="Search employee"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 px-3 py-2 rounded-md outline-none mb-3"
              />
            </div>
            <DataTable
              columns={renderColumns()}
              data={filteredEmployees}
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
    </>
  );
};

export default ListEmployee;
