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

const createEmployee = async (
  Name,
  CivilId,
  Gender,
  Birthday,
  FileName,
  JobName,
  Address,
  PhoneNumber,
  BranchId,
  Other,
  EducationId,
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
      `/employee/api/insert`,
      {
        Name,
        CivilId,
        Gender,
        Birthday,
        FileName,
        JobName,
        Address,
        PhoneNumber,
        BranchId,
        Other,
        EducationId,
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
    const response = await axios.get(`/employee/single/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateEmployee = async (
  id,
  Name,
  CivilId,
  Gender,
  Birthday,
  FileName,
  JobName,
  Address,
  PhoneNumber,
  BranchId,
  Other,
  EducationId,
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
      `/employee/update/${id}`,
      {
        Name,
        CivilId,
        Gender,
        Birthday,
        FileName,
        JobName,
        Address,
        PhoneNumber,
        BranchId,
        Other,
        EducationId,
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
    const response = await axios.delete(`/employee/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const EmployeeService = {
  getAllEmployees,
  createEmployee,
  getById,
  updateEmployee,
  deleteEmployee,
};

export default EmployeeService;
