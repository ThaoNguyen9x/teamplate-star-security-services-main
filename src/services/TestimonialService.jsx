import axios from "./axios";

const getAll = async () => {
  try {
    let response = await axios.get("/testimonial");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

const createTestimonial = async (clientId, star, desc) => {
  try {
    const response = await axios.post(
      'http://localhost:5216/api/Testimonial',
      {
        clientId,
        star,
        desc
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


const getById = async (id) => {
  try {
    const response = await axios.get(`/testimonial/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateTestimonial = async (id, star, desc) => {
  try {
    const response = await axios.put(
      `/testimonial/${id}`,
      {
        star,
        desc,
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

const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`/testimonial/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const TestimonialService = {
  getAll,
  createTestimonial,
  getById,
  updateTestimonial,
  deleteTestimonial,
};

export default TestimonialService;
