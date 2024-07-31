import axios from "./axios";

const getAllContracts = async () => {
  try {
    let response = await axios.get("/contract/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createContract = async (
  contractNumber,
  startDate,
  endDate,
  signDate,
  content,
  employeeId,
  renewalCount,
  duration
) => {
  try {
    const response = await axios.post(
      "/contract/add",
      {
        contractNumber,
        startDate,
        endDate,
        signDate,
        content,
        employeeId,
        renewalCount,
        duration,
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

const getByIdContract = async (id) => {
  try {
    const response = await axios.get(`/contract/single/${id}`);

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

const updateContract = async (
  id,
  contractNumber,
  startDate,
  endDate,
  signDate,
  content,
  employeeId,
  renewalCount,
  duration
) => {
  try {
    const response = await axios.post(
      `/contract/update`,
      {
        id,
        contractNumber,
        startDate,
        endDate,
        signDate,
        content,
        employeeId,
        renewalCount,
        duration,
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

const deleteContract = async (id) => {
  try {
    const response = await axios.delete(`/contract/delete/${id}`, {
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

const ContractService = {
  getAllContracts,
  createContract,
  getByIdContract,
  updateContract,
  deleteContract,
};

export default ContractService;
