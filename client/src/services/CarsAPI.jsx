import axios from "axios";

const CarsAPI = {
  getAllCars: async () => {
    try {
      const response = await axios.get("http://localhost:3000/cars");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCarById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createCar: async (car) => {
    try {
      const response = await axios.post("http://localhost:3000/cars", car);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editCar: async (id, car) => {
    try {
      const response = await axios.put(`http://localhost:3000/cars/${id}`, car);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteCar: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getWheelTypes: async () => {
    try {
      const response = await axios.get("http://localhost:3000/wheel_types");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getWheelTypeByType: async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/wheel_types/${type}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRoofTypes: async () => {
    try {
      const response = await axios.get("http://localhost:3000/roof_types");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRoofTypeByType: async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/roof_types/${type}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default CarsAPI;
