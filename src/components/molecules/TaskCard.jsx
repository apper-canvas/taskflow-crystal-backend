import React, { useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatDueDate, getDueDateStatus } from "@/utils/dateUtils";
import { taskService } from "@/services/api/taskService";

const TaskCard = ({ task, onTaskUpdate, categoryColor, className }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await taskService.toggleComplete(task.Id);
      onTaskUpdate();
      
      if (!task.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await taskService.delete(task.Id);
      onTaskUpdate();
      toast.success("Task deleted");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const formattedDueDate = formatDueDate(task.dueDate);

  return (
    <div 
      className={cn(
        "task-card bg-white rounded-lg shadow-soft border border-secondary-200 p-4 transition-all duration-150",
        task.completed && "task-completed",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={isUpdating || isDeleting}
          className="mt-0.5"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 
                className={cn(
                  "task-title text-sm font-medium text-secondary-900 mb-1",
                  task.completed && "line-through text-secondary-500"
                )}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-secondary-600 mb-2",
                  task.completed && "text-secondary-400"
                )}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-3">
                {task.category && (
                  <Badge 
                    variant="custom"
                    color={categoryColor}
                  >
                    {task.category}
                  </Badge>
                )}
                
                {formattedDueDate && (
                  <div className="flex items-center space-x-1">
                    <ApperIcon 
                      name="Calendar" 
                      size={12} 
                      className={cn(
                        "flex-shrink-0",
                        dueDateStatus === "overdue" && "text-red-500",
                        dueDateStatus === "today" && "text-orange-500",
                        dueDateStatus === "future" && "text-secondary-400"
                      )}
                    />
                    <span 
                      className={cn(
                        "text-xs font-medium",
                        dueDateStatus === "overdue" && "text-red-600",
                        dueDateStatus === "today" && "text-orange-600",
                        dueDateStatus === "future" && "text-secondary-500"
                      )}
                    >
                      {formattedDueDate}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting || isUpdating}
              className="text-secondary-400 hover:text-red-500 p-1 -mr-1 -mt-1"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-secondary-300 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ApperIcon name="Trash2" size={14} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;