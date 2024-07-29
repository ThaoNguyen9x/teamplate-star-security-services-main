import axios from "./axios";

const getAllWorkTypes = async () => {
  try {
    let response = await axios.get("/worktype/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllAttendances = async () => {
  try {
    let response = await axios.get("/attendance/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllDepartments = async () => {
  try {
    let response = await axios.get("/department/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllBranchs = async () => {
  try {
    let response = await axios.get("/brach/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const createWorkType = async (name, coefficient) => {
  try {
    const response = await axios.post(
      "/worktype/add",
      { name, coefficient },
      { headers: { "Content-Type": "application/json" } }
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

const createAttendance = async (
  year,
  month,
  day,
  reportedHours,
  minutesIn,
  minutesOut,
  hoursOut,
  employeeId,
  workTypeId
) => {
  try {
    const response = await axios.post(
      "/attendance/add",
      {
        year,
        month,
        day,
        reportedHours,
        minutesIn,
        minutesOut,
        hoursOut,
        employeeId,
        workTypeId,
      },
      { headers: { "Content-Type": "application/json" } }
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

const createDepartment = async (name, generalDepartmentId, attendancerId) => {
  try {
    const response = await axios.post(
      "/department/add",
      { name, generalDepartmentId, attendancerId },
      { headers: { "Content-Type": "application/json" } }
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

const createBranch = async (name, departnentId) => {
  try {
    const response = await axios.post(
      "/brach/add",
      { name, departnentId },
      { headers: { "Content-Type": "application/json" } }
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

const getByIdWorkType = async (id) => {
  try {
    const response = await axios.get(`/worktype/single/${id}`);
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

const getByIdAttendance = async (id) => {
  try {
    const response = await axios.get(`/attendance/single/${id}`);
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

const getByIdDepartment = async (id) => {
  try {
    const response = await axios.get(`/department/single/${id}`);
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

const getByIdBranch = async (id) => {
  try {
    const response = await axios.get(`/brach/single/${id}`);
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

const updateWorkType = async (id, name, coefficient) => {
  try {
    const response = await axios.post(
      `/worktype/update`,
      { id, name, coefficient },
      { headers: { "Content-Type": "application/json" } }
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

const updateAttendance = async (id, name) => {
  try {
    const response = await axios.post(
      `/attendance/update`,
      { id, name },
      { headers: { "Content-Type": "application/json" } }
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

const updateDepartment = async (
  id,
  name,
  generalDepartmentId,
  attendancerId
) => {
  try {
    const response = await axios.post(
      `/department/update`,
      { id, name, generalDepartmentId, attendancerId },
      { headers: { "Content-Type": "application/json" } }
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

const updateBranch = async (id, name, departnentId) => {
  try {
    const response = await axios.post(
      `/brach/update`,
      { id, name, departnentId },
      { headers: { "Content-Type": "application/json" } }
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

const deleteWorkType = async (id) => {
  try {
    const response = await axios.delete(`/worktype/delete/${id}`);
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

const deleteAttendance = async (id) => {
  try {
    const response = await axios.delete(`/attendance/delete/${id}`);
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

const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`/department/delete/${id}`);
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

const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`/brach/delete/${id}`);
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

const GeneralService = {
  getAllWorkTypes,
  createWorkType,
  getByIdWorkType,
  updateWorkType,
  deleteWorkType,

  getAllAttendances,
  createAttendance,
  getByIdAttendance,
  updateAttendance,
  deleteAttendance,

  getAllDepartments,
  createDepartment,
  getByIdDepartment,
  updateDepartment,
  deleteDepartment,

  getAllBranchs,
  createBranch,
  getByIdBranch,
  updateBranch,
  deleteBranch,
};

export default GeneralService;
