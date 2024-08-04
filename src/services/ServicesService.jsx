import axio from "axios";
import axios from "./axios";

const getAllServices = async () => {
  try {
    let response = await axios.get("/service");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createService = async (serviceName, description, price, file, status) => {
  try {
    const response = await axios.post(
      "/service",
      { serviceName, description, price, file, status },
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

const getByIdService = async (id) => {
  try {
    const response = await axios.get(`/service/single/${id}`);

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

const updateService = async (
  id,
  serviceName,
  description,
  price,
  file,
  status
) => {
  try {
    const response = await axios.put(`/service/${id}`, {
      id,
      serviceName,
      description,
      price,
      file,
      status
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

const deleteService = async (id) => {
  try {
    const response = await axios.delete(`/service/${id}`, {
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

const getAllServiceRequests = async () => {
  try {
    let response = await axios.get("/servicerequests");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createServiceRequest = async (
  name,
  customerID,
  serviceType,
  requestDetails,
  status
) => {
  try {
    const response = await axios.post(
      "/servicerequests",
      { name, customerID, serviceType, requestDetails, status },
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

const getByIdServiceRequest = async (id) => {
  try {
    const response = await axios.get(`/servicerequests/single/${id}`);

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

const updateServiceRequest = async (
  id,
  name,
  serviceType,
  requestDetails,
  customerID,
  status
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/ServiceRequests/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          serviceType,
          requestDetails,
          customerID,
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update service request:", error);
    throw error;
  }
};

const deleteServiceRequest = async (id) => {
  try {
    const response = await axios.delete(`/servicerequests/${id}`, {
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

const getAllServiceSchedules = async () => {
  try {
    let response = await axios.get("/serviceschedules");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createServiceSchedule = async (
  name,
  serviceRequestID,
  employeeID,
  scheduledDate,
  location
) => {
  try {
    const response = await axios.post(
      "/serviceschedules",
      { name, serviceRequestID, employeeID, scheduledDate, location },
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

const getByIdServiceSchedule = async (id) => {
  try {
    const response = await axios.get(`/serviceschedules/single/${id}`);

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

const updateServiceSchedule = async (
  id,
  name,
  employeeID,
  serviceRequestID,
  location,
  scheduledDate
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/serviceschedules/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          employeeID,
          serviceRequestID,
          location,
          scheduledDate,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update service request:", error);
    throw error;
  }
};

const deleteServiceSchedule = async (id) => {
  try {
    const response = await axios.delete(`/serviceschedules/${id}`, {
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

const getAllCashServicess = async () => {
  try {
    let response = await axios.get("/cashservices");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createCashServices = async ({
  name,
  serviceType,
  scope,
  price,
  conditions,
}) => {
  try {
    const response = await axios.post(
      "/cashservices",
      { name, serviceType, scope, price, conditions },
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

const getByIdCashServices = async (id) => {
  try {
    const response = await axios.get(`/cashservices/${id}`);

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

const updateCashServices = async (
  id,
  name,
  serviceType,
  scope,
  price,
  conditions
) => {
  try {
    const response = await axios.put(`/cashservices/${id}`, {
      id,
      name,
      serviceType,
      scope,
      price,
      conditions,
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

const deleteCashServices = async (id) => {
  try {
    const response = await axios.delete(`/cashservices/${id}`, {
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

const getAllCashTransactions = async () => {
  try {
    let response = await axios.get("/cashtransactions");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createCashTransaction = async ({
  amount,
  cashServiceID,
  employeeID,
  status,
  transactionDate,
}) => {
  const payload = {
    amount,
    cashServiceID,
    employeeID,
    status,
    transactionDate,
  };

  try {
    const response = await axio.post(
      "http://localhost:5000/api/CashTransactions",
      payload,
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

const getByIdCashTransaction = async (id) => {
  try {
    const response = await axios.get(`/cashtransactions/${id}`);

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

const updateCashTransaction = async (
  id,
  amount,
  transactionDate,
  status,
  employeeID,
  cashServiceID
) => {
  try {
    const response = await axios.put(`/cashtransactions/${id}`, {
      id,
      amount,
      transactionDate,
      status,
      employeeID,
      cashServiceID,
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

const deleteCashTransaction = async (id) => {
  try {
    const response = await axios.delete(`/cashtransactions/${id}`, {
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

const ServicesService = {
  getAllServices,
  createService,
  getByIdService,
  updateService,
  deleteService,

  getAllServiceRequests,
  createServiceRequest,
  getByIdServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,

  getAllServiceSchedules,
  createServiceSchedule,
  getByIdServiceSchedule,
  updateServiceSchedule,
  deleteServiceSchedule,

  getAllCashServicess,
  createCashServices,
  getByIdCashServices,
  updateCashServices,
  deleteCashServices,

  getAllCashTransactions,
  createCashTransaction,
  getByIdCashTransaction,
  updateCashTransaction,
  deleteCashTransaction,
};

export default ServicesService;
