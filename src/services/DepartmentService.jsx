import axios from "./axios";

const getAllGeneralDepartments = async () => {
  try {
    let response = await axios.get("/genaraldepartment/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllManages = async () => {
  try {
    let response = await axios.get("/manage/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllPositions = async () => {
  try {
    let response = await axios.get("/position/all");
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

const createGeneralDepartment = async (name) => {
  try {
    const response = await axios.post(
      "/genaraldepartment/add",
      { name },
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

const createManage = async (name) => {
  try {
    const response = await axios.post(
      "/manage/add",
      { name },
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

const createPosition = async (name) => {
  try {
    const response = await axios.post(
      "/position/add",
      { name },
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

const createDepartment = async (name, generalDepartmentId) => {
  try {
    const response = await axios.post(
      "/department/add",
      { name, generalDepartmentId },
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

const createBranch = async (name, email, address, contactNumber) => {
  try {
    const response = await axios.post(
      "/brach/add",
      { name, email, address, contactNumber },
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

const getByIdGeneralDepartment = async (id) => {
  try {
    const response = await axios.get(`/genaraldepartment/single/${id}`);
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

const getByIdManage = async (id) => {
  try {
    const response = await axios.get(`/manage/single/${id}`);
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

const getByIdPosition = async (id) => {
  try {
    const response = await axios.get(`/position/single/${id}`);
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

const updateGeneralDepartment = async (id, name) => {
  try {
    const response = await axios.post(
      `/genaraldepartment/update`,
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

const updateManage = async (id, name) => {
  try {
    const response = await axios.post(
      `/manage/update`,
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

const updatePosition = async (id, name) => {
  try {
    const response = await axios.post(
      `/position/update`,
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

const updateDepartment = async (id, name, generalDepartmentId) => {
  try {
    const response = await axios.post(
      `/department/update`,
      { id, name, generalDepartmentId },
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

const updateBranch = async (id, name, email, address, contactNumber) => {
  try {
    const response = await axios.post(
      `/brach/update`,
      { id, name, email, address, contactNumber },
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

const deleteGeneralDepartment = async (id) => {
  try {
    const response = await axios.delete(`/genaraldepartment/delete/${id}`);
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

const deleteManage = async (id) => {
  try {
    const response = await axios.delete(`/manage/delete/${id}`);
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

const deletePosition = async (id) => {
  try {
    const response = await axios.delete(`/position/delete/${id}`);
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

const DepartmentService = {
  getAllGeneralDepartments,
  createGeneralDepartment,
  getByIdGeneralDepartment,
  updateGeneralDepartment,
  deleteGeneralDepartment,

  getAllManages,
  createManage,
  getByIdManage,
  updateManage,
  deleteManage,

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

  getAllPositions,
  createPosition,
  getByIdPosition,
  updatePosition,
  deletePosition,
};

export default DepartmentService;
