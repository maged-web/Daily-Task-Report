import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees, selectAllEmployee} from "../redux/slices/employeeSlice"
import { createTaskForEmployee, selectErrorByEmployee, selectLoadingByEmployee } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { Employee } from '../interfaces/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Spinner from '@/components/Spinner';

export default function AddNewTask() {
  
  const [employeeId, setEmployeeId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const loading = useSelector((state: RootState) => selectLoadingByEmployee(state,employeeId)); 
  const error = useSelector((state: RootState) => selectErrorByEmployee(state,employeeId));
  const navigate =useNavigate();
  const dispatch=useDispatch<AppDispatch>()
  const employees = useSelector((state: RootState) => selectAllEmployee(state));


  useEffect(()=>
    {
      dispatch(fetchEmployees())
    }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
        await dispatch(createTaskForEmployee({ employeeId, description, from, to })).unwrap();
        navigate('/');
    } catch (error:any) {
      console.log(error)
        
    }
  };
  if (loading) return (<Spinner />)
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Add New Task</h2>

       {error&&<Alert className='mb-4'>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
    
    }
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label  className='block text-lg font-medium mb-1' htmlFor='employeeName'>Enter Employee Name</label>
        <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        required>
          <option value="" disabled>Select Employee</option>
          {
            employees.map((employee:Employee)=>(
              <option key={employee._id} value={employee._id}>
              {employee.name}
          </option>
            ))
          }
        </select>
        </div>
        <div>
        <label  className="block text-lg font-medium mb-1" htmlFor='taskName'>Enter Task Description</label>
        <Input
          type='text'
          id='taskName'
          name='taskName'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        </div>
        <div>
        <label className="block text-lg font-medium mb-1">From:</label>
        <Input
          type='datetime-local'
          id='startDate'
          name='startDate'
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        </div>
        <div>

        <label className="block text-lg font-medium mb-1">To:</label>
        <Input
          type='datetime-local'
          id='endDate'
          name='endDate'
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        </div>

        <Button className='w-full' type='submit'>Add New Task</Button>
      </form>
      </div>  
  );
}
