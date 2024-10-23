import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import AddNewTask from "./pages/AddNewTask";
import EditTask from "./pages/EditTask";
import AddNewEmployee from "./pages/AddNewEmployee";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<AppLayout/>}> 
      <Route index element={<Navigate replace to='/home'/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/add-new-task" element={<AddNewTask/>}/>
      <Route path="/edit-task/:employeeId/:taskId" element={<EditTask/>}/>
      <Route path="/add-new-employee" element={<AddNewEmployee/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
