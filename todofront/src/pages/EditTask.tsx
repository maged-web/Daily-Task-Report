import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, selectAllEmployee } from '../redux/slices/employeeSlice';
import { fetchTasksForEmployee, selectErrorByEmployee, selectLoadingByEmployee, selectTasksByEmployee, updateTaskForEmployee } from '../redux/slices/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { Task } from '../interfaces/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Spinner from '@/components/Spinner';

export default function EditTask() {
  const { taskId, employeeId } = useParams<{ taskId: string; employeeId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [description, setDescription] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employeeId || '');

  const employees = useSelector((state: RootState) => selectAllEmployee(state));
  const tasks = useSelector((state:RootState) => selectTasksByEmployee(state, employeeId!));
  const loading = useSelector((state: RootState) => selectLoadingByEmployee(state,selectedEmployeeId)); 
  const error = useSelector((state: RootState) => selectErrorByEmployee(state,selectedEmployeeId));
  const currentTask = tasks.find((task: Task) => task._id === taskId);

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchTasksForEmployee(employeeId));
      dispatch(fetchEmployees());
    }
  }, [dispatch, employeeId]);

  useEffect(() => {
    if (currentTask) {
      setDescription(currentTask.description);
      setFrom(new Date(currentTask.from).toISOString().slice(0, 16));
      setTo(new Date(currentTask.to).toISOString().slice(0, 16));
      setSelectedEmployeeId(currentTask.employeeId); 
    }
  }, [currentTask]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (selectedEmployeeId && taskId) {
        await dispatch(updateTaskForEmployee({
          employeeId: selectedEmployeeId, 
          taskId,
           description, from, to ,
        })).unwrap();
        navigate('/');
      }
    } catch (error: any) {
      console.log(error)
    }
  };
  if (loading) return (<Spinner />)

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-semibold text-center mb-6">Edit Task</h1>

            {error&&<Alert className='mb-4'>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
}
      <form onSubmit={handleSubmit} className="space-y-4">
      <label  className='block text-lg font-medium mb-1' htmlFor='employeeName'> Employee Name</label>
      <select
          value={selectedEmployeeId} 
          onChange={(e) => setSelectedEmployeeId(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        >
          <option value="" disabled>Select Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

<div>
        <label  className="block text-lg font-medium mb-1" htmlFor='taskName'>Task Description</label>
        <Input
          type='text'
          id='taskDescription'
          name='taskDescription'
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
        <Button className="w-full" type='submit'>Update Task</Button>
      </form>
    </div>
  );
}
