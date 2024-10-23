import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { addEmployee, selectError, selectLoading } from '../redux/slices/employeeSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Spinner from '@/components/Spinner'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'


export default function AddNewEmployee() {
  const dispatch=useDispatch<AppDispatch>()
  const navigate =useNavigate()


  const [name,setName]=useState<string>('')
  const loading = useSelector((state: RootState) => selectLoading(state)); 
  const error = useSelector((state: RootState) => selectError(state));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await dispatch(addEmployee(name)).unwrap(); 
      navigate('/');
    } catch (err) {
      console.error("Failed to add employee:", err);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Employee</h2>
        {loading && <Spinner />}
      {error&&
        <Alert className='mb-4'>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
    }
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input className=''   placeholder="Enter employee name"
       type='text' id='name' name='name' required value={name} onChange={(e)=>setName(e.target.value)}/>
       <Button disabled={loading} className='w-full'>Add New Employee</Button>
    </form>
    </div>

  )
}
