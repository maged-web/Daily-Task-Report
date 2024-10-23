import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksForEmployee, selectTasksByEmployee, selectErrorByEmployee, deleteTaskForEmployee } from '../redux/slices/taskSlice';
import { Link } from 'react-router-dom';
import {  AppDispatch, RootState } from '../redux/store';
import { fetchDailySummaryApi } from '../services/tasksApi';
import { Task ,DailySummary,TaskListProps} from '../interfaces/types';
import { Button } from "@/components/ui/button"
import { formatDateTimeUTC } from '@/utils/taskUtils';

export default function TaskList({ employeeId }:TaskListProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const tasks = useSelector((state:RootState) => selectTasksByEmployee(state, employeeId));
  const error = useSelector((state:RootState) => selectErrorByEmployee(state, employeeId));

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);


  useEffect(() => {
      dispatch(fetchTasksForEmployee(employeeId));
  }, [dispatch, employeeId]);

 async function handleDelete(taskId:string)
  {
   await dispatch(deleteTaskForEmployee({employeeId,taskId}))

  }

  useEffect(() => {
    if (selectedDate) {
      async function fetchDailySummary() {
        const response =await fetchDailySummaryApi(employeeId,selectedDate);
        setDailySummary(response)
      }
      fetchDailySummary();
    }
  }, [selectedDate, employeeId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='p-6 bg-white shadow-md rounded-lg'>
      <div className='mb-6'>
      <label htmlFor="date" className="block font-semibold text-gray-700 mb-2">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} 
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      </div >
        <div className="mb-4 bg-gray-50 rounded-lg shadow-sm font-semibold text-gray-700 w-fit p-4">
          <p>Total Hours: {(dailySummary?.totalHours || 0).toFixed(1)}</p>
          <p>Remaining Hours: {(dailySummary?.remainingHours || 0).toFixed(1)}</p>
        </div>
    <ul className='space-y-4'>
      {tasks.length === 0 ? (
        <p className='text-center font-bold'>No tasks available for this employee.</p>
      ) : (
        tasks.map((task:Task) => (
          <React.Fragment key={task._id}>
          <li className='border border-gray-200 p-4 rounded-lg shadow-md bg-white' >
          <div className="mb-2">
              <strong className="block text-gray-700">Description:</strong> {task.description}
            </div>
            <div className="mb-2">
              <strong className="block text-gray-700">From:</strong>{formatDateTimeUTC(task.from)} 
            </div>
                <div className="mb-4">
                  <strong className="block text-gray-700">To:</strong> {formatDateTimeUTC(task.to)}
                </div>
          </li>
          <div className='flex justify-center space-x-3'>
        <Link to={`/edit-task/${employeeId}/${task._id}`}> <Button size={'lg'} className='bg-sky-800'>Edit</Button></Link> 
          <Button size={'lg'} className='bg-red-700' onClick={()=>handleDelete(task._id)}>Delete</Button>
          </div>
          </React.Fragment>
          
        ))
      )}
    </ul>
    </div>
  );
}
