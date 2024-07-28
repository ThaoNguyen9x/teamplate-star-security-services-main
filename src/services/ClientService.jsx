import axios from "./axios";

const getAll = async () => {
  try {
    let response = await axios.get("/client");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const createClient = async (file, FirstName, LastName, Email, EmployeeIds) => {
  try {
    const response = await axios.post(
      `/client`,
      {
        file,
        FirstName,
        LastName,
        Email,
        EmployeeIds,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`/client/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateClient = async (id, file, FirstName, LastName, Email, EmployeeIds) => {
  try {
    const response = await axios.put(
      `/client/${id}`,
      {
        file,
        FirstName,
        LastName,
        Email,
        EmployeeIds,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`/client/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const sendClient = async (id) => {
  try {
    const response = await axios.post(`/client/send-mail/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const ClientService = {
  getAll,
  createClient,
  getById,
  updateClient,
  deleteClient,
  sendClient
};

export default ClientService;
