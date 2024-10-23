import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEmployeesApi,addEmployeeApi } from "../../services/employeeApi";
import {Employee,EmployeeState} from "../../interfaces/types"

const initialState:EmployeeState={
    employees:[],
    loading:false,
    error:null
}


export const fetchEmployees=createAsyncThunk<Employee[],void,{ rejectValue: string }>('fetch/employees',async(_,{rejectWithValue})=>
{
    try{
        return await fetchEmployeesApi()
    }catch(error)
    {      

        return rejectWithValue("Failed to fetch employees");
    }
})

export const addEmployee=createAsyncThunk<Employee,string,{rejectValue: string}>("add/employee",async(name,{rejectWithValue})=>
{
    try{
        return await addEmployeeApi(name)
    }catch(error)
    {
        console.log(error)
        return rejectWithValue("Failed to add  employees");
    }
})


const employeeSlice = createSlice({
    name:'employees',
    initialState,
    reducers:{},
    extraReducers:(builder)=>
    {
        builder.addCase(fetchEmployees.pending,(state)=>
        {
            state.loading=true,
            state.error=null
        })
        .addCase(fetchEmployees.fulfilled,(state,action: PayloadAction<Employee[]>)=>
        {
            state.loading=false;
            state.employees=action.payload
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        })
        .addCase(addEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(addEmployee.fulfilled, (state,action) => {
        state.loading = false;
        state.employees.push(action.payload)
        })
        .addCase(addEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Could not add the employee!";
        })
    }
})

export const selectAllEmployee=(state:{employees:EmployeeState})=>state.employees.employees
export const selectLoading=(state:{employees:EmployeeState})=>state.employees.loading
export const selectError=(state:{employees:EmployeeState})=>state.employees.error

export default employeeSlice.reducer