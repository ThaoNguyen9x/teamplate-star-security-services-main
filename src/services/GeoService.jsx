import axios from "./axios";

const getAllCountries = async () => {
  try {
    let response = await axios.get("/country/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllProvinces = async () => {
  try {
    let response = await axios.get("/province/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const getAllDistricts = async () => {
  try {
    let response = await axios.get("/district/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const createCountry = async (name) => {
  try {
    const response = await axios.post(
      "/country/add",
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

const createProvince = async (nameCity, type, countryId) => {
  try {
    const response = await axios.post(
      "/province/add",
      { nameCity, type, countryId },
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
    console.error("Error creating province:", errorMessage);
    throw {
      flag: false,
      message: errorMessage,
    };
  }
};

const createDistrict = async (nameDistrict, type, provinceId) => {
  try {
    const response = await axios.post(
      "/district/add",
      { nameDistrict, type, provinceId },
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
    console.error("Error creating province:", errorMessage);
    throw {
      flag: false,
      message: errorMessage,
    };
  }
};

const getByIdCountry = async (id) => {
  try {
    const response = await axios.get(`/country/single/${id}`);

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

const getByIdProvince = async (id) => {
  try {
    const response = await axios.get(`/country/single/${id}`);

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

const getByIdDistrict = async (id) => {
  try {
    const response = await axios.get(`/district/single/${id}`);

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

const updateCountry = async (id, name) => {
  try {
    const response = await axios.post(
      `/country/update`,
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

const updateProvince = async (id, nameCity, type, countryId) => {
  console.log('Payload:', {
    id,
    nameCity,
    type,
    countryId,
  });

  try {
    const response = await axios.post(
      `/province/update`,
      {
        id,
        nameCity,
        type,
        countryId,
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
    console.error('Update error:', errorMessage);
    throw {
      flag: false,
      message: errorMessage,
    };
  }
};

const updateDistrict = async (id, nameDistrict, type, provinceId) => {
  try {
    const response = await axios.post(
      `/district/update`,
      {
        id,
        nameDistrict,
        type,
        provinceId,
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

const deleteCountry = async (id) => {
  try {
    const response = await axios.delete(`/country/delete/${id}`, {
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

const deleteProvince = async (id) => {
  try {
    const response = await axios.delete(`/province/delete/${id}`, {
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

const deleteDistrict = async (id) => {
  try {
    const response = await axios.delete(`/district/delete/${id}`, {
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

const GeoService = {
  getAllCountries,
  createCountry,
  getByIdCountry,
  updateCountry,
  deleteCountry,

  getAllProvinces,
  createProvince,
  getByIdProvince,
  updateProvince,
  deleteProvince,

  getAllDistricts,
  createDistrict,
  getByIdDistrict,
  updateDistrict,
  deleteDistrict,
};

export default GeoService;
