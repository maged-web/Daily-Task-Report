import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTaskForEmployeeApi, deleteTaskForEmployeeApi, fetchTasksForEmployeeApi, updateTaskForEmployeeApi } from "../../services/tasksApi";
import {Task,TasksState} from "../../interfaces/types"


const initialState: TasksState = {
    tasksByEmployee: {},
    loadingByEmployee: {},
    errorByEmployee: {},
};


export const fetchTasksForEmployee = createAsyncThunk<Task[], string, { rejectValue: string }>(
    'tasks/fetchTasksForEmployee',
    async (employeeId, { rejectWithValue }) => {
        try {
            return await fetchTasksForEmployeeApi(employeeId); 
        } catch (error:any) {
            return rejectWithValue(error.message|| "Failed to fetch tasks for employee");
        }
    }
);

export const deleteTaskForEmployee = createAsyncThunk<{ _id: string; employeeId: string }, { taskId: string; employeeId: string }, { rejectValue: string }>(
    'tasks/deleteTasksForEmployee',
    async ({ taskId, employeeId }, { rejectWithValue }) => {
        try {
            const deletedTask = await deleteTaskForEmployeeApi(taskId); 
            return { ...deletedTask, employeeId };
        } catch (error:any) {
            return rejectWithValue(error.message|| "Failed to delete task");
        }
    }
);
export const createTaskForEmployee = createAsyncThunk<Task, { employeeId: string;description: string;from: string;to: string;}, { rejectValue: string }>
(
    "tasks/createTask",
    async ({ employeeId, description, from, to }, { rejectWithValue }) => {
        try {
            return await createTaskForEmployeeApi({ employeeId, description, from, to });
        } catch (error:any) {
            console.log(error)
            return rejectWithValue(error.message|| "Failed to create task");
        }
    }
);
export const updateTaskForEmployee = createAsyncThunk<Task, { taskId: string; employeeId: string; description: string; from: string; to: string }, { rejectValue: string }>(
    "tasks/updateTaskForEmployee",
    async ({ taskId, employeeId, description, from, to }, { rejectWithValue }) => {
        try {
            const updatedTask = await updateTaskForEmployeeApi({ employeeId, description, from, to, taskId });
            return updatedTask;
        } catch (error: any) {
            return rejectWithValue(error.message|| "Failed to update task");
        }
    }
);


const taskSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{},
    extraReducers:(builder)=>
    {
        builder
        .addCase(fetchTasksForEmployee.pending, (state, action) => {
          const employeeId = action.meta.arg; 
          state.loadingByEmployee[employeeId] = true;
          state.errorByEmployee[employeeId] = null;
        })
        .addCase(fetchTasksForEmployee.fulfilled, (state, action) => {
          const employeeId = action.meta.arg; 
          state.loadingByEmployee[employeeId] = false;
          state.tasksByEmployee[employeeId] = action.payload;
        })
        .addCase(fetchTasksForEmployee.rejected, (state, action) => {
          const employeeId = action.meta.arg;
          state.loadingByEmployee[employeeId] = false;
          state.errorByEmployee[employeeId] = action.payload || "Something went wrong";
        })
        .addCase(deleteTaskForEmployee.pending,(state,action)=>
        {
            const { employeeId } = action.meta.arg; 
            state.loadingByEmployee[employeeId] = true;
            state.errorByEmployee[employeeId] = null;
        })
        .addCase(deleteTaskForEmployee.fulfilled,(state,action)=>
        {
            const { employeeId,taskId} = action.meta.arg; 
            state.tasksByEmployee[employeeId]=state.tasksByEmployee[employeeId].filter(task=>task._id!==taskId)||[]
            state.loadingByEmployee[employeeId] = false;
        })
        .addCase(deleteTaskForEmployee.rejected, (state, action) => {
            const { employeeId } = action.meta.arg;
            state.loadingByEmployee[employeeId] = false;
            state.errorByEmployee[employeeId] = action.payload || "Failed to delete task";
        })
        .addCase(createTaskForEmployee.pending, (state, action) => {
            const { employeeId } = action.meta.arg;
            state.loadingByEmployee[employeeId] = true;
            state.errorByEmployee[employeeId] = null;
          })
          .addCase(createTaskForEmployee.fulfilled, (state, action) => {
            const newTask = action.payload;
            if (!state.tasksByEmployee[newTask.employeeId]) {
              state.tasksByEmployee[newTask.employeeId] = [];
            }
            state.tasksByEmployee[newTask.employeeId].push(newTask);
          })
          .addCase(createTaskForEmployee.rejected, (state, action) => {
            const employeeId = action.meta.arg.employeeId;
            state.errorByEmployee[employeeId] = action.payload || "Failed to create task";
            state.loadingByEmployee[employeeId] = false;

          })
          .addCase(updateTaskForEmployee.pending, (state, action) => {
            const { employeeId } = action.meta.arg;
            state.loadingByEmployee[employeeId] = true;
            state.errorByEmployee[employeeId] = null;
        })
        .addCase(updateTaskForEmployee.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            const { employeeId } = updatedTask;
            state.tasksByEmployee[employeeId] = state.tasksByEmployee[employeeId].map(task =>
                task._id === updatedTask._id ? updatedTask : task
            );
            state.loadingByEmployee[employeeId] = false;
        })
        .addCase(updateTaskForEmployee.rejected, (state, action) => {
            const { employeeId } = action.meta.arg;
            state.errorByEmployee[employeeId] = action.payload || "Failed to update task";
            state.loadingByEmployee[employeeId] = false;
        });
    
    }
})



export const selectTasksByEmployee = (state: { tasks: TasksState }, employeeId: string) =>
    state.tasks.tasksByEmployee[employeeId] || [];

export const selectLoadingByEmployee = (state: { tasks: TasksState }, employeeId: string) =>
    state.tasks.loadingByEmployee[employeeId] || false;
  
export const selectErrorByEmployee = (state: { tasks: TasksState }, employeeId: string) =>
    state.tasks.errorByEmployee[employeeId] || null;

export default taskSlice.reducer