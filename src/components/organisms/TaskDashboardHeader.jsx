import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import ViewTabs from "@/components/molecules/ViewTabs";
import CategoryFilter from "@/components/molecules/CategoryFilter";

const TaskDashboardHeader = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  return (
    <div className="bg-white shadow-soft border-b border-secondary-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with greeting and date */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <ApperIcon 
                name="CheckSquare" 
                size={24} 
                className="text-primary-600"
              />
              <h1 className="text-2xl font-bold text-secondary-900">
                TaskFlow
              </h1>
            </div>
            <p className="text-secondary-600">
              {formattedDate}
            </p>
          </div>
          
          <div className="hidden sm:flex items-center space-x-4 text-sm text-secondary-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" size={16} />
              <span>Stay focused</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Target" size={16} />
              <span>Get things done</span>
            </div>
          </div>
        </div>

        {/* Navigation and filters */}
        <div className="space-y-4">
          <ViewTabs />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search tasks..."
              className="flex-1 sm:max-w-md"
            />
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboardHeader;