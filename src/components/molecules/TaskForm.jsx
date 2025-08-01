import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskForm = ({ onTaskCreated, className }) => {
const [formData, setFormData] = useState({
    Name: "",
    title_c: "",
    description_c: "",
    category_c: "Development",
    dueDate_c: ""
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoryData = await categoryService.getAll();
      setCategories(categoryData);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title_c.trim() && !formData.Name.trim()) {
      toast.error("Task title is required");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const taskData = {
        Name: formData.title_c || formData.Name,
        title_c: formData.title_c || formData.Name,
        description_c: formData.description_c,
        category_c: formData.category_c,
        dueDate_c: formData.dueDate_c ? new Date(formData.dueDate_c).toISOString() : null,
        completed_c: false,
        createdAt_c: new Date().toISOString()
      };
      
      await taskService.create(taskData);
      
      setFormData({
        Name: "",
        title_c: "",
        description_c: "",
        category_c: "Development",
        dueDate_c: ""
      });
      
      setShowForm(false);
      onTaskCreated();
      toast.success("Task created successfully!");
      
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setShowForm(false);
      setFormData({
        Name: "",
        title_c: "",
        description_c: "",
        category_c: "Development",
        dueDate_c: ""
      });
    }
  };

const quickAddTask = async (e) => {
    if (e.key === "Enter" && formData.title_c.trim() && !showForm) {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        await taskService.create({
          Name: formData.title_c,
          title_c: formData.title_c,
          description_c: "",
          category_c: "Development",
          dueDate_c: null,
          completed_c: false,
          createdAt_c: new Date().toISOString()
        });
        
        setFormData({
          Name: "",
          title_c: "",
          description_c: "",
          category_c: "Development",
          dueDate_c: ""
        });
        
        onTaskCreated();
        toast.success("Task created successfully!");
        
      } catch (error) {
        console.error("Failed to create task:", error);
        toast.error("Failed to create task");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-lg shadow-soft border border-secondary-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <ApperIcon 
            name="Plus" 
            size={20} 
            className="text-primary-600"
          />
<Input
            type="text"
            placeholder="Add a new task... (Press Enter to save quickly)"
            value={formData.title_c}
            onChange={(e) => setFormData({ ...formData, title_c: e.target.value, Name: e.target.value })}
            onKeyDown={quickAddTask}
            className="flex-1"
            disabled={isSubmitting}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="flex-shrink-0"
          >
            <ApperIcon 
              name={showForm ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-4 animate-slide-up">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Description
              </label>
<Textarea
                value={formData.description_c}
                onChange={(e) => setFormData({ ...formData, description_c: e.target.value })}
                placeholder="Add more details about this task..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Category
                </label>
<Select
                  value={formData.category_c}
                  onChange={(e) => setFormData({ ...formData, category_c: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Name}>
                      {category.Name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Due Date
                </label>
<Input
                  type="date"
                  value={formData.dueDate_c}
                  onChange={(e) => setFormData({ ...formData, dueDate_c: e.target.value })}
                  min={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="secondary"
onClick={() => {
                  setShowForm(false);
                  setFormData({
                    Name: "",
                    title_c: "",
                    description_c: "",
                    category_c: "Development",
                    dueDate_c: ""
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.title_c.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Plus" size={16} />
                    <span>Create Task</span>
                  </div>
                )}
              </Button>
            </div>

            <div className="text-xs text-secondary-500 pt-2 border-t border-secondary-100">
              <div className="flex items-center justify-between">
                <span>💡 Quick tip: Press Cmd+Enter to save</span>
                <span>Press Escape to cancel</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskForm;