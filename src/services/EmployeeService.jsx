import axios from "./axios";

const getAllEmployees = async () => {
  try {
    let response = await axios.get("/employee/get-all-employee");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const getAllEmployeesNotStaff = async () => {
  try {
    let response = await axios.get("/employee/get-all-not-staff");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createEmployee = async (
  Name,
  CivilId,
  Gender,
  Birthday,
  FileName,
  JobName,
  Address,
  PhoneNumber,
  Other,
  EducationId,
  PositionId,
  BranchId,
  CountryId,
  ProvinceId,
  DistrictId,
  IsDirector,
  IsHeadOfDepartment,
  ManagerId,
  file
) => {
  try {
    const response = await axios.post(
      `/Employee/api/insert`,
      {
        Name,
        CivilId,
        Gender,
        Birthday,
        FileName,
        JobName,
        Address,
        PhoneNumber,
        Other,
        EducationId,
        PositionId,
        BranchId,
        CountryId,
        ProvinceId,
        DistrictId,
        IsDirector,
        IsHeadOfDepartment,
        ManagerId,
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data.flag) {
      throw new Error(response.data.message || "An unknown error occurred");
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`/employee/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateEmployee = async (
  Id,
  Name,
  CivilId,
  Gender,
  Birthday,
  FileName,
  JobName,
  Address,
  PhoneNumber,
  Other,
  EducationId,
  PositionId,
  BranchId,
  CountryId,
  ProvinceId,
  DistrictId,
  IsDirector,
  IsHeadOfDepartment,
  ManagerId,
  file
) => {
  try {
    const response = await axios.post(
      `/employee/upload`,
      {
        Id,
        Name,
        CivilId,
        Gender,
        Birthday,
        FileName,
        JobName,
        Address,
        PhoneNumber,
        Other,
        EducationId,
        PositionId,
        BranchId,
        CountryId,
        ProvinceId,
        DistrictId,
        IsDirector,
        IsHeadOfDepartment,
        ManagerId,
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data.flag) {
      throw new Error(response.data.message || "An unknown error occurred");
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw {
      flag: false,
      message: errorMessage,
    };
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`/employee/delete/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const EmployeeService = {
  getAllEmployees,
  getAllEmployeesNotStaff,
  createEmployee,
  getById,
  updateEmployee,
  deleteEmployee,
};

export default EmployeeService;
