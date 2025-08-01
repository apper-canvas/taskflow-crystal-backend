import { format, isToday, isTomorrow, isPast, isThisWeek, startOfDay } from "date-fns";

export const formatDueDate = (date) => {
  if (!date) return null;
  
  const taskDate = new Date(date);
  
  if (isToday(taskDate)) {
    return "Today";
  }
  
  if (isTomorrow(taskDate)) {
    return "Tomorrow";
  }
  
  if (isThisWeek(taskDate)) {
    return format(taskDate, "EEEE");
  }
  
  return format(taskDate, "MMM d");
};

export const getDueDateStatus = (date) => {
  if (!date) return "none";
  
  const taskDate = startOfDay(new Date(date));
  const today = startOfDay(new Date());
  
  if (isPast(taskDate) && !isToday(taskDate)) {
    return "overdue";
  }
  
  if (isToday(taskDate)) {
    return "today";
  }
  
  return "future";
};

export const isTaskDueToday = (date) => {
  if (!date) return false;
  return isToday(new Date(date));
};

export const isTaskUpcoming = (date) => {
  if (!date) return false;
  const taskDate = new Date(date);
  const today = new Date();
  return taskDate > today;
};

export const shouldShowInTodayView = (task) => {
  if (task.completed) return false;
  if (!task.dueDate) return true; // Show tasks without due dates in today view
  return isTaskDueToday(task.dueDate) || isPast(new Date(task.dueDate));
};

export const shouldShowInUpcomingView = (task) => {
  if (task.completed) return false;
  if (!task.dueDate) return false;
  return isTaskUpcoming(task.dueDate);
};