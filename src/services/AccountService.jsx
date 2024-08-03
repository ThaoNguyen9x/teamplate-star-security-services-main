import axios from "./axios";

const getAllAccounts = async () => {
  try {
    let response = await axios.get("/account/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createAccount = async (
  email,
  password,
  confirmPassword,
  fullname,
  employeeId
) => {
  try {
    const response = await axios.post(
      "/authencation/register",
      { email, password, confirmPassword, fullname, employeeId },
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

const getByIdAccount = async (id) => {
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

const updateAccount = async (id, name) => {
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

const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`/account/delete/${id}`, {
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

const getNotCreate = async () => {
  try {
    let response = await axios.get("/account/not-create");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const AccountService = {
  getAllAccounts,
  createAccount,
  getByIdAccount,
  updateAccount,
  deleteAccount,
  getNotCreate
};

export default AccountService;
