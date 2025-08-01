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
          onClick={() => onCategoryChange(category.Name)}
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500",
            selectedCategory === category.Name
              ? "text-white"
              : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
          )}
          style={selectedCategory === category.Name ? {
            backgroundColor: category.color_c
          } : undefined}
        >
          {category.Name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;