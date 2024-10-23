const { Task, getDuration } = require("../models/task.model");
const { calculateTotalHours } = require("../helpers");

const getDailySummary = async (req, res) => {
  try {
      const { employeeId, date } = req.params;

      const startOfDay = new Date(Date.UTC(
        new Date(date).getUTCFullYear(), 
        new Date(date).getUTCMonth(), 
        new Date(date).getUTCDate()
    ));
    const endOfDay = new Date(Date.UTC(
        new Date(date).getUTCFullYear(), 
        new Date(date).getUTCMonth(), 
        new Date(date).getUTCDate(), 
        23, 59, 59, 999
    ));

      const tasks = await Task.find({
          employeeId: employeeId,
          date: { $gte: startOfDay, $lte: endOfDay } 
      });

      const totalHours = calculateTotalHours(tasks); 
      const remainingHours = 8 - totalHours;

      return res.status(200).send({
          date: date,
          totalHours,
          remainingHours,
          tasks,
      });
  } catch (error) {
      return res.status(500).send({ error: error.message });
  }
};

module.exports = {
    getDailySummary
};
