import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  const {filter = 'today'} = req.query; 
  const now = new Date();
  let startDate;

  switch (filter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //2023-10-05T00:00:00.000Z
      break;
    }
    case 'week': {
      const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDate() === 0 ? 7 : 0); // Adjust for Sunday
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate); //2023-10-02T00:00:00.000Z
      break;
    }
      case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'all':
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};
  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [{ $match: { status: "completed" } }, { $count: "count" }]
        }
      }
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count|| 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, {
        title,
        status,
        completedAt
      },
      { new: true }
    );
    res.status(201).json(updatedTask);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (deleteTask) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
