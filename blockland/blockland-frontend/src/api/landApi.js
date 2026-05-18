import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const registerLand = (data) => axios.post(`${BASE_URL}/api/land/register`, data);
export const getLand = (id) => axios.get(`${BASE_URL}/api/land/${id}`);
export const setDispute = (data) => axios.post(`${BASE_URL}/api/land/dispute`, data);
export const transferOwnership = (data) => axios.post(`${BASE_URL}/api/land/transfer`, data);
export const getTransferHistory = (id) => axios.get(`${BASE_URL}/api/land/history/${id}`);