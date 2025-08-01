import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className 
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <ApperIcon 
            name="AlertCircle" 
            size={32} 
            className="text-red-500"
          />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-secondary-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            <span>Try Again</span>
          </Button>
        )}
        
        <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <ApperIcon 
              name="Info" 
              size={16} 
              className="text-secondary-400 mt-0.5 flex-shrink-0"
            />
            <div className="text-sm text-secondary-600">
              <p className="font-medium mb-1">Troubleshooting tips:</p>
              <ul className="text-left space-y-1">
                <li>• Check your internet connection</li>
                <li>• Refresh the page</li>
                <li>• Try again in a few moments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;