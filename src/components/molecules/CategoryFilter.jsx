import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className 
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "px-3 py-1 text-sm font-medium rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500",
          !selectedCategory
            ? "bg-primary-600 text-white"
            : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.Id}
          onClick={() => onCategoryChange(category.name)}
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500",
            selectedCategory === category.name
              ? "text-white"
              : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
          )}
          style={selectedCategory === category.name ? {
            backgroundColor: category.color
          } : undefined}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;