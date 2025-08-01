import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import TaskDashboardHeader from "@/components/organisms/TaskDashboardHeader";
import TaskForm from "@/components/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import { categoryService } from "@/services/api/categoryService";
const TaskDashboard = ({ view: propView }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.user);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Will be handled by App.jsx authentication logic
      return;
    }
  }, [isAuthenticated]);
  // Determine current view from URL or props
  const getCurrentView = () => {
    if (propView) return propView;
    
    const path = location.pathname;
    if (path === "/upcoming") return "upcoming";
    if (path === "/all") return "all";
    return "today";
  };

  const currentView = getCurrentView();

  useEffect(() => {
    loadCategories();
    
    // Listen for clear search event
    const handleClearSearch = () => {
      setSearchQuery("");
      setSelectedCategory(null);
    };
    
    window.addEventListener('clearSearch', handleClearSearch);
    return () => window.removeEventListener('clearSearch', handleClearSearch);
  }, []);

const loadCategories = async () => {
    try {
      const categoryData = await categoryService.getAll();
      setCategories(categoryData);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <TaskDashboardHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <TaskForm
            onTaskCreated={handleTaskCreated}
            className="animate-fade-in"
          />
          
          <TaskList
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            view={currentView}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </main>
      
      {/* Floating action hint for mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <div className="bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-pulse">
          ↑ Quick add above
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;