import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; 

export const fetchEmployeesApi = async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
};

export const addEmployeeApi = async (name: string) => {
    const response = await axios.post(`${API_URL}/employees`, {name});
    return response.data;
};