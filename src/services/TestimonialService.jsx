import axios from "./axios";

const getAllTestimonials = async () => {
  try {
    let response = await axios.get("/testimonial/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createTestimonial = async (customerId, star, desc) => {
  try {
    const response = await axios.post(
      "/testimonial/add",
      { customerId, star, desc },
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

const getByIdTestimonial = async (id) => {
  try {
    const response = await axios.get(`/testimonial/single/${id}`);

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

const updateTestimonial = async (id, star, desc) => {
  try {
    const response = await axios.post(
      `/testimonial/update`,
      {
        id,
        star,
        desc,
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

const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`/testimonial/delete/${id}`, {
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

const TestimonialService = {
  getAllTestimonials,
  createTestimonial,
  getByIdTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

export default TestimonialService;
