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

const createService = async (serviceName, description, price) => {
  try {
    const response = await axios.post(
      "/service",
      { serviceName, description, price },
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

const updateService = async (id, name) => {
  try {
    const response = await axios.post(
      `/service/update`,
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

const createServiceRequest = async (name, customerID, serviceType, requestDetails, status) => {
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

const updateServiceRequest = async (id, name, customerID, serviceType, requestDetails, status) => {
  try {
    const response = await axios.post(
      `/servicerequests/update`,
      {
        id,
        name, customerID, serviceType, requestDetails, status
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

const createServiceSchedule = async (name, serviceRequestID, employeeID, scheduledDate, location) => {
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

const updateServiceSchedule = async (id, name, serviceRequestID, employeeID, scheduledDate, location) => {
  try {
    const response = await axios.put(
      `/serviceschedules/${id}`,
      {
        name, serviceRequestID, employeeID, scheduledDate, location
      },
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
};

export default ServicesService;
