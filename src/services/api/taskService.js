import tasksData from "@/services/mockData/tasks.json";

// Simulate local storage key
const STORAGE_KEY = "taskflow_tasks";

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
  }
};

// Get tasks from local storage
const getStoredTasks = () => {
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(stored);
};

// Save tasks to local storage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(200);
    return [...getStoredTasks()];
  },

  async getById(id) {
    await delay(150);
    const tasks = getStoredTasks();
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(300);
    const tasks = getStoredTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    
    const newTask = {
      Id: maxId + 1,
      title: taskData.title,
      description: taskData.description || "",
      category: taskData.category || "Development",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    const updatedTasks = [...tasks, newTask];
    saveTasksToStorage(updatedTasks);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(250);
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updateData,
      ...(updateData.completed && !tasks[taskIndex].completed && {
        completedAt: new Date().toISOString()
      }),
      ...(updateData.completed === false && {
        completedAt: null
      })
    };
    
    tasks[taskIndex] = updatedTask;
    saveTasksToStorage(tasks);
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
    
    if (filteredTasks.length === tasks.length) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    saveTasksToStorage(filteredTasks);
    return true;
  },

  async toggleComplete(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const task = tasks.find(t => t.Id === parseInt(id));
    
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    return this.update(id, { completed: !task.completed });
  }
};