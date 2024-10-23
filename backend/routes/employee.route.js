const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.route('/')
    .post(employeeController.addEmployee)
    .get(employeeController.getAllEmployees)


module.exports = router;
