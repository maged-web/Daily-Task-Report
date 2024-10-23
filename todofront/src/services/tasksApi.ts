import axios from "axios";
import { calculateDurationInHours, formatDate } from '../utils/taskUtils';


const API_URL = import.meta.env.VITE_API_BASE_URL; 

export const fetchTasksForEmployeeApi = async (employeeId: string) => {
    const response = await axios.get(`${API_URL}/tasks/employee/${employeeId}`);
    return response.data;
};

export const deleteTaskForEmployeeApi = async (taskId: string) => {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data; 
};

export const fetchRemainingHoursApi = async (employeeId: string, dayTask: string) => {
    const response = await axios.get(`${API_URL}/daily-summary/${employeeId}/${dayTask}`);
    return response.data.remainingHours;
};  

export const fetchDailySummaryApi = async (employeeId: string, dayTask: string)=> {
    const response = await axios.get(`${API_URL}/daily-summary/${employeeId}/${dayTask}`);
    return response.data
};  
export const createTaskForEmployeeApi = async ({ employeeId, description, from, to }: { employeeId: string; description: string; from: string; to: string; }) => {
    const formattedFrom = formatDate(from);
    const formattedTo = formatDate(to);

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const now = new Date();

    if (fromDate < now) {
        throw new Error("Start date cannot be in the past.");
    }
    if (toDate < fromDate) {
        throw new Error("'End date' cannot be before 'Start date'.");
    }

    const dayTask = from.split('T')[0];
    const remainingHours = await fetchRemainingHoursApi(employeeId, dayTask);
    const taskDurationInHours = calculateDurationInHours(from, to);

    if (taskDurationInHours > remainingHours) {
        throw new Error("Not enough remaining hours for this task.");
    }

    const newTask = { employeeId, description, from: formattedFrom, to: formattedTo };
    const createResponse = await axios.post(`${API_URL}/tasks`, newTask);
    return createResponse.data;
};

export const fetchTaskForEmployeeApi = async (taskId: string) => {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`);
    return response.data;
};
export const updateTaskForEmployeeApi = async ({ employeeId, description, from, to,taskId }: { employeeId: string; description: string; from: string; to: string;taskId:string }) => {
    const formattedFrom = formatDate(from);
    const formattedTo = formatDate(to);

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const now = new Date();

    if (fromDate < now) {
        throw new Error("Start date cannot be in the past.");
    }
    if (toDate < fromDate) {
        throw new Error("'End date' cannot be before 'Start date'.");
    }

    const dayTask = from.split('T')[0];
    let remainingHours = await fetchRemainingHoursApi(employeeId, dayTask);
    
    const oldTaskDetails=await fetchTaskForEmployeeApi(taskId);
    
    const taskDurationInHours = calculateDurationInHours(from, to);

    if(new Date(oldTaskDetails.date).toISOString().split('T')[0]==fromDate.toISOString().split('T')[0])
    {
        remainingHours+=calculateDurationInHours(oldTaskDetails.from,oldTaskDetails.to)
    }

    if (taskDurationInHours > remainingHours) {
        throw new Error("Not enough remaining hours for this task.");
    }

    const updatedTask = { employeeId, description, from: formattedFrom, to: formattedTo };
    const updateResponse = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
    return updateResponse.data;
};