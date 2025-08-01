import React, { useEffect, useState } from "react";
import TaskCard from "@/components/molecules/TaskCard";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";
import { shouldShowInTodayView, shouldShowInUpcomingView } from "@/utils/dateUtils";
const TaskList = ({ 
  searchQuery, 
  selectedCategory, 
  view = "today", 
  refreshTrigger 
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.Name === categoryName);
    return category ? category.color_c : "#64748b";
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    // Filter by view
    if (view === "today") {
      filteredTasks = filteredTasks.filter(shouldShowInTodayView);
    } else if (view === "upcoming") {
      filteredTasks = filteredTasks.filter(shouldShowInUpcomingView);
    }
    // "all" view shows all tasks

    // Filter by category
if (selectedCategory) {
      filteredTasks = filteredTasks.filter(task => task.category_c === selectedCategory);
    }

    // Filter by search query
if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        (task.title_c || task.Name || "").toLowerCase().includes(query) ||
        (task.description_c || "").toLowerCase().includes(query) ||
        (task.category_c || "").toLowerCase().includes(query)
      );
    }

    // Sort tasks: incomplete first, then by creation date (newest first)
return filteredTasks.sort((a, b) => {
      if (a.completed_c !== b.completed_c) {
        return a.completed_c ? 1 : -1;
      }
      return new Date(b.createdAt_c || b.CreatedOn) - new Date(a.createdAt_c || a.CreatedOn);
    });
  };

  const getEmptyMessage = () => {
    if (searchQuery.trim()) {
      return {
        title: "No matching tasks",
        description: "Try adjusting your search terms or filters to find what you're looking for.",
        actionText: "Clear Search"
      };
    }

    if (selectedCategory) {
      return {
        title: `No ${selectedCategory.toLowerCase()} tasks`,
        description: `You don't have any tasks in the ${selectedCategory} category yet.`,
        actionText: "View All Tasks"
      };
    }

    switch (view) {
      case "today":
        return {
          title: "Nothing on your plate today",
          description: "Great job staying on top of things! Add new tasks or check your upcoming tasks.",
          actionText: "Add Your First Task"
        };
      case "upcoming":
        return {
          title: "No upcoming tasks",
          description: "You're all caught up! Your future self will thank you for staying organized.",
          actionText: "Plan Ahead"
        };
      default:
        return {
          title: "No tasks yet",
          description: "Start organizing your work by creating your first task. Every great project begins with a single step.",
          actionText: "Create First Task"
        };
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    const emptyMessage = getEmptyMessage();
    return (
      <Empty
        title={emptyMessage.title}
        description={emptyMessage.description}
        actionText={emptyMessage.actionText}
onAction={() => {
          if (searchQuery.trim()) {
            // Clear search handled by parent component
            if (typeof window !== 'undefined' && window.CustomEvent) {
              window.dispatchEvent(new CustomEvent('clearSearch'));
            }
          }
          // Scroll to top to focus on task input
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <div
          key={task.Id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
<TaskCard
            task={task}
            onTaskUpdate={loadData}
            categoryColor={getCategoryColor(task.category_c)}
          />
        </div>
      ))}
      
      {filteredTasks.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-secondary-500">
            {filteredTasks.filter(t => !t.completed).length} active, {filteredTasks.filter(t => t.completed).length} completed
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;