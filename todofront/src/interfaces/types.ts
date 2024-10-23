export interface Employee {
    _id: string;
    name: string;
}
export interface Task {
    _id: string;
    description: string;
    from: string;
    to: string;
    employeeId: string;
}  

export interface DailySummary {
    date:string;
    totalHours: number;
    remainingHours: number;
    taks:Task[]
}
  
export interface TaskListProps {
    employeeId: string;
}

export interface TasksState {
    tasksByEmployee: { [employeeId: string]: Task[] };
    loadingByEmployee: { [employeeId: string]: boolean };
    errorByEmployee: { [employeeId: string]: string | null };
}

export interface EmployeeState{
    employees:Employee[],
    loading:boolean,
    error:string|null
}