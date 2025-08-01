import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item.",
  actionText = "Get Started",
  onAction,
  icon = "CheckSquare",
  className 
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ApperIcon 
            name={icon}
            size={40} 
            className="text-primary-600"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-secondary-900 mb-3">
          {title}
        </h3>
        
        <p className="text-secondary-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <Button
            onClick={onAction}
            className="inline-flex items-center space-x-2 px-6 py-3"
          >
            <ApperIcon name="Plus" size={16} />
            <span>{actionText}</span>
          </Button>
        )}
        
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-secondary-500">
          <div className="flex items-center justify-center space-x-2 p-3 bg-secondary-50 rounded-lg">
            <ApperIcon name="Zap" size={16} className="text-primary-500" />
            <span>Quick Entry</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3 bg-secondary-50 rounded-lg">
            <ApperIcon name="Calendar" size={16} className="text-primary-500" />
            <span>Due Dates</span>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-secondary-400">
          💡 Pro tip: Press Enter for quick task creation
        </div>
      </div>
    </div>
  );
};

export default Empty;