import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

// GET
export const getStudents = () => {
  return axios.get(API_URL);
};

// CREATE
export const createStudent = (data) => {
  return axios.post(API_URL, data);
};

// UPDATE
export const updateStudent = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

// DELETE
export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};