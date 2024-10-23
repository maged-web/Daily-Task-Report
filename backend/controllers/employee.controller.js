const Employee = require('../models/employee.model');
const {Task} = require('../models/task.model'); 

const addEmployee = async (req, res) => {
    try {
        const { name } = req.body; 
        
        const newEmployee = new Employee({ name });

        const savedEmployee = await newEmployee.save();

        return res.status(201).json(savedEmployee); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add employee" });
    }
};


const getAllEmployees = async (req, res) => {
    try{
        const employees = await Employee.find({})
        if (employees.length === 0) {
          return res.status(404).send({ error: 'Employees not found' });
        }
    
            return res.status(200).send(employees);
          } catch (error) {
            return res.status(500).send({ error: error.message });
          }
};
module.exports = {
    addEmployee,
  
    getAllEmployees
};
