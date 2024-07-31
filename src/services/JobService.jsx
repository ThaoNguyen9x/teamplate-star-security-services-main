import axios from "./axios";

const getAllJobs = async () => {
  try {
    let response = await axios.get("/jobpositions");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createJob = async (
  jobRequirements,
  jobDescription,
  applicationDeadline,
  positionName,
  status
) => {
  try {
    const response = await axios.post(
      "/jobpositions",
      {
        jobRequirements,
        jobDescription,
        applicationDeadline,
        positionName,
        status,
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

const getByIdJob = async (id) => {
  try {
    const response = await axios.get(`/jobpositions/${id}`);

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

const updateJob = async (
  id,
  jobRequirements,
  jobDescription,
  applicationDeadline,
  positionName,
  status
) => {
  try {
    const response = await axios.put(
      `/jobpositions/${id}`,
      {
        id,
        jobRequirements,
        jobDescription,
        applicationDeadline,
        positionName,
        status,
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

const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`/jobpositions/${id}`, {
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

const JobService = {
  getAllJobs,
  createJob,
  getByIdJob,
  updateJob,
  deleteJob,
};

export default JobService;
