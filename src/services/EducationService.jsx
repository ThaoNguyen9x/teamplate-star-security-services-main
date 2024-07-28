import axios from "./axios";

const getAllEducations = async () => {
  try {
    let response = await axios.get("/education/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createEducation = async (name) => {
  try {
    const response = await axios.post(
      "/education/add",
      { name },
      {
        headers: {
          "Content-Type": "application/json",
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

const getByIdEducation = async (id) => {
  try {
    const response = await axios.get(`/education/single/${id}`);

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

const updateEducation = async (id, name) => {
  try {
    const response = await axios.post(
      `/education/update`,
      {
        id,
        name,
      },
      {
        headers: {
          "Content-Type": "application/json",
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

const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(`/education/delete/${id}`, {
      id,
    });

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

const EducationService = {
  getAllEducations,
  createEducation,
  getByIdEducation,
  updateEducation,
  deleteEducation,
};

export default EducationService;
