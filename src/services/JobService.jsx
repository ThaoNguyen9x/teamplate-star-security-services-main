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

const getAllCandidates = async () => {
  try {
    let response = await axios.get("/candidates");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createCandidate = async (name, email, phone, cvFile, status) => {
  try {
    const response = await axios.post(
      "/candidates",
      {
        name, email, phone, cvFile, status
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

const getByIdCandidate = async (id) => {
  try {
    const response = await axios.get(`/candidates/${id}`);

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

const updateCandidate = async (id, name, email, phone, status) => {
  try {
    const response = await axios.put(
      `/candidates/${id}`,
      {
        id,
        name,
        email,
        phone,
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

const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`/candidates/${id}`, {
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

const getAllInterviews = async () => {
  try {
    let response = await axios.get("/interviews");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createInterview = async (
  name,
  candidateID,
  interviewDate,
  interviewLocation,
  interviewResult,
  comments
) => {
  try {
    const response = await axios.post(
      "/interviews",
      {
        name,
        candidateID,
        interviewDate,
        interviewLocation,
        interviewResult,
        comments,
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

const getByIdInterview = async (id) => {
  try {
    const response = await axios.get(`/interviews/${id}`);

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

const GetInterviewByCandidateId = async (candidateId) => {
  try {
    const response = await axios.get(
      `/interviews/get-interview-by-candidate/${candidateId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching interview data:", error);
    throw new Error("Failed to fetch interview data.");
  }
};

const updateInterview = async (
  id,
  name,
  candidateID,
  interviewDate,
  interviewLocation,
  interviewResult,
  comments
) => {
  try {
    const response = await axios.put(
      `/interviews/${id}`,
      {
        id,
        name,
        candidateID,
        interviewDate,
        interviewLocation,
        interviewResult,
        comments,
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

const deleteInterview = async (id) => {
  try {
    const response = await axios.delete(`/interviews/${id}`, {
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

  getAllCandidates,
  createCandidate,
  getByIdCandidate,
  updateCandidate,
  deleteCandidate,

  getAllInterviews,
  createInterview,
  getByIdInterview,
  updateInterview,
  deleteInterview,
  GetInterviewByCandidateId,
};

export default JobService;
