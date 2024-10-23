import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees, selectAllEmployee, selectError, selectLoading } from "../redux/slices/employeeSlice"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import TaskList from "../components/TaskList"
import { AppDispatch, RootState } from "../redux/store"
import { Employee } from '../interfaces/types';
import { Button } from "@/components/ui/button"
import Spinner from "@/components/Spinner"
import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function Home() {
  
  const dispatch=useDispatch<AppDispatch>()
  const employees = useSelector((state: RootState) => selectAllEmployee(state)); 
  const loading = useSelector((state: RootState) => selectLoading(state)); 
  const error = useSelector((state: RootState) => selectError(state));
useEffect(()=>
{
  dispatch(fetchEmployees())
}, [dispatch]);
  if(loading) return <Spinner/>



  if(error) return(
     <Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      {error}
    </AlertDescription>
  </Alert>
  )

  return (
    <div>
       <div className="flex justify-center space-x-2 mb-4">
      <Link to={'/add-new-employee'}><Button size={'lg'} className="cursor-pointer bg-teal-900">Add New Employee</Button></Link>
      <Link to={'/add-new-task'}><Button size={'lg'} className="scursor-pointer">Add New Task</Button></Link>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
      <ul className="space-y-4">
        {employees.map((employee: Employee)=>(
          <React.Fragment key={employee._id}>
          <li className="border-b pb-4"> 
             <h2 className="text-xl font-semibold text-gray-700">
                {employee.name}
              </h2>
          </li>
          <TaskList employeeId={employee._id}/>
          </React.Fragment>
        ))}
      </ul>
      </div>
    </div>
  )
}
