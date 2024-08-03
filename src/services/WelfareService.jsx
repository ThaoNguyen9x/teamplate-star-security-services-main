import axios from "./axios";

const getAllInsurances = async () => {
  try {
    let response = await axios.get("/insurance/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createInsurance = async (
  insuranceNumber,
  issueDate,
  issuePlace,
  healthCheckPlace,
  employeeId
) => {
  try {
    const response = await axios.post(
      "/insurance/add",
      {
        insuranceNumber,
        issueDate,
        issuePlace,
        healthCheckPlace,
        employeeId,
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

const getByIdInsurance = async (id) => {
  try {
    const response = await axios.get(`/insurance/single/${id}`);

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

const updateInsurance = async (
  id,
  insuranceNumber,
  issueDate,
  issuePlace,
  healthCheckPlace,
  employeeId
) => {
  try {
    const response = await axios.post(
      `/insurance/update`,
      {
        id,
        insuranceNumber,
        issueDate,
        issuePlace,
        healthCheckPlace,
        employeeId,
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

const deleteInsurance = async (id) => {
  try {
    const response = await axios.delete(`/insurance/delete/${id}`, {
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

const createCandidate = async (name, email, phone, employeeId) => {
  try {
    const response = await axios.post(
      "/candidates",
      {
        name,
        email,
        phone,
        employeeId,
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

const updateCandidate = async (id, name, email, phone, employeeId) => {
  try {
    const response = await axios.put(
      `/candidates/${id}`,
      {
        id,
        name,
        email,
        phone,
        employeeId,
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

const getAllVacations = async () => {
  try {
    let response = await axios.get("/vacation/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createVacation = async (
  employeeId,
  numberOfDays,
  startDtae,
  vacationTypeId
) => {
  try {
    const response = await axios.post(
      "/vacation/add",
      {
        employeeId,
        numberOfDays,
        startDtae,
        vacationTypeId,
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

const getByIdVacation = async (id) => {
  try {
    const response = await axios.get(`/vacation/single/${id}`);

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

const updateVacation = async (
  id,
  startDtae,
  numberOfDays,
  vacationTypeId,
  employeeId
) => {
  try {
    const response = await axios.post(
      `/vacation/update`,
      {
        id,
        startDtae,
        numberOfDays,
        vacationTypeId,
        employeeId,
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

const deleteVacation = async (id) => {
  try {
    const response = await axios.delete(`/vacation/delete/${id}`, {
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

const getAllSanctions = async () => {
  try {
    let response = await axios.get("/sanction/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createSanction = async (
  employeeId,
  sanctionId,
  punishment,
  punishmentDate,
  date
) => {
  try {
    const response = await axios.post(
      "/sanction/add",
      {
        employeeId,
        sanctionId,
        punishment,
        punishmentDate,
        date,
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

const getByIdSanction = async (id) => {
  try {
    const response = await axios.get(`/sanction/single/${id}`);

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

const updateSanction = async (
  id,
  employeeId,
  sanctionId,
  punishment,
  date,
  punishmentDate
) => {
  try {
    const response = await axios.post(
      `/sanction/update`,
      {
        id,
        employeeId,
        sanctionId,
        punishment,
        date,
        punishmentDate,
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

const deleteSanction = async (id) => {
  try {
    const response = await axios.delete(`/sanction/delete/${id}`, {
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

const getAllTrainingHistories = async () => {
  try {
    let response = await axios.get("/traininghistories");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createTrainingHistorie = async (
  name,
  programID,
  employeeID,
  completionStatus,
  completionDate
) => {
  try {
    const response = await axios.post(
      "/traininghistories",
      {
        name,
        programID,
        employeeID,
        completionStatus,
        completionDate,
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

const getByIdTrainingHistorie = async (id) => {
  try {
    const response = await axios.get(`/traininghistories/${id}`);

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

const updateTrainingHistorie = async (
  id,
  name,
  programID,
  employeeID,
  completionStatus,
  completionDate
) => {
  try {
    const response = await axios.put(
      `/traininghistories/${id}`,
      {
        id,
        name,
        programID,
        employeeID,
        completionStatus,
        completionDate,
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

const deleteTrainingHistorie = async (id) => {
  try {
    const response = await axios.delete(`/traininghistories/${id}`, {
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

const getAllOvertimes = async () => {
  try {
    let response = await axios.get("/overtime/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createOvertime = async (
  employeeId,
  approvedById,
  overtimTypeId,
  remarks,
  startDate,
  endDate,
  approvalDate
) => {
  try {
    const response = await axios.post(
      "/overtime/add",
      {
        employeeId,
        approvedById,
        overtimTypeId,
        remarks,
        startDate,
        endDate,
        approvalDate,
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

const getByIdOvertime = async (id) => {
  try {
    const response = await axios.get(`/overtime/single/${id}`);

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

const updateOvertime = async (
  id,
  employeeId,
  approvedById,
  overtimTypeId,
  remarks,
  numberOfDay,
  startDate,
  endDate,
  approvalDate
) => {
  try {
    const response = await axios.post(
      `/overtime/update`,
      {
        id,
        employeeId,
        approvedById,
        overtimTypeId,
        remarks,
        numberOfDay,
        startDate,
        endDate,
        approvalDate,
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

const deleteOvertime = async (id) => {
  try {
    const response = await axios.delete(`/overtime/delete/${id}`, {
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

const WelfareService = {
  getAllInsurances,
  createInsurance,
  getByIdInsurance,
  updateInsurance,
  deleteInsurance,

  getAllCandidates,
  createCandidate,
  getByIdCandidate,
  updateCandidate,
  deleteCandidate,

  getAllVacations,
  createVacation,
  getByIdVacation,
  updateVacation,
  deleteVacation,

  getAllSanctions,
  createSanction,
  getByIdSanction,
  updateSanction,
  deleteSanction,

  getAllTrainingHistories,
  createTrainingHistorie,
  getByIdTrainingHistorie,
  updateTrainingHistorie,
  deleteTrainingHistorie,

  getAllOvertimes,
  createOvertime,
  getByIdOvertime,
  updateOvertime,
  deleteOvertime,
};

export default WelfareService;
