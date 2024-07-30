import axios from "./axios";

const getAllCustomers = async () => {
  try {
    let response = await axios.get("/customers");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    throw { flag: false, message: errorMessage };
  }
};

const createCustomer = async (CustomerName, Email, Phone, file) => {
  try {
    const response = await axios.post(
      "/customers",
      { CustomerName, Email, Phone, file },
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

const getByIdCustomer = async (id) => {
  try {
    const response = await axios.get(`/authencation/single/${id}`);

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

const updateCustomer = async (id, name) => {
  try {
    const response = await axios.post(
      `/authencation/update`,
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

const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`/customers/${id}`, {
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

const CustomerService = {
  getAllCustomers,
  createCustomer,
  getByIdCustomer,
  updateCustomer,
  deleteCustomer,
};

export default CustomerService;
