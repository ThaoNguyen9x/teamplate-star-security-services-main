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

const getAllTrainingPrograms = async () => {
  try {
    let response = await axios.get("/trainingprograms");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllVacationTypes = async () => {
  try {
    let response = await axios.get("/vacationtype/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllSanctionTypes = async () => {
  try {
    let response = await axios.get("/sanctiontype/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllOvertimeTypes = async () => {
  try {
    let response = await axios.get("/overtimetype/all");
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

const createTrainingProgram = async (
  name,
  description,
  objectives,
  startDate,
  endDate,
  instructor
) => {
  try {
    const response = await axios.post(
      "/trainingprograms",
      {
        name,
        description,
        objectives,
        startDate,
        endDate,
        instructor,
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

const createVacationType = async (name) => {
  try {
    const response = await axios.post(
      "/vacationtype/add",
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

const createSanctionType = async (name) => {
  try {
    const response = await axios.post(
      "/sanctiontype/add",
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

const createOvertimeType = async (name, description) => {
  try {
    const response = await axios.post(
      "/overtimetype/add",
      { name, description },
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

const getByIdTrainingProgram = async (id) => {
  try {
    const response = await axios.get(`/trainingprograms/${id}`);
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

const getByIdVacationType = async (id) => {
  try {
    const response = await axios.get(`/vacationtype/single/${id}`);
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

const getByIdSanctionType = async (id) => {
  try {
    const response = await axios.get(`/sanctiontype/single/${id}`);
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

const getByIdOvertimeType = async (id) => {
  try {
    const response = await axios.get(`/overtimetype/single/${id}`);
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

const updateTrainingProgram = async (id, name) => {
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

const updateVacationType = async (id, name) => {
  try {
    const response = await axios.post(
      `/vacationType/update`,
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

const updateSanctionType = async (id, name) => {
  try {
    const response = await axios.post(
      `/sanctiontype/update`,
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

const updateOvertimeType = async (id, name, description) => {
  try {
    const response = await axios.post(
      `/overtimetype/update`,
      { id, name, description },
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

const deleteTrainingProgram = async (id) => {
  try {
    const response = await axios.delete(`/TrainingPrograms/${id}`);
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

const deleteVacationType = async (id) => {
  try {
    const response = await axios.delete(`/vacationtype/delete/${id}`);
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

const deleteSanctionType = async (id) => {
  try {
    const response = await axios.delete(`/sanctiontype/delete/${id}`);
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

const deleteOvertimeType = async (id) => {
  try {
    const response = await axios.delete(`/overtimetype/delete/${id}`);
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

const GeneralSanctionType = {
  getAllWorkTypes,
  createWorkType,
  getByIdWorkType,
  updateWorkType,
  deleteWorkType,

  getAllTrainingPrograms,
  createTrainingProgram,
  getByIdTrainingProgram,
  updateTrainingProgram,
  deleteTrainingProgram,

  getAllVacationTypes,
  createVacationType,
  getByIdVacationType,
  updateVacationType,
  deleteVacationType,

  getAllSanctionTypes,
  createSanctionType,
  getByIdSanctionType,
  updateSanctionType,
  deleteSanctionType,

  getAllOvertimeTypes,
  createOvertimeType,
  getByIdOvertimeType,
  updateOvertimeType,
  deleteOvertimeType,
};

export default GeneralSanctionType;
