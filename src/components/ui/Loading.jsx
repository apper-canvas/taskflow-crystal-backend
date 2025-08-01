import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-soft border border-secondary-200 p-4 animate-pulse"
        >
          <div className="flex items-start space-x-3">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-secondary-200 rounded mt-0.5"></div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 space-y-2">
                  {/* Title skeleton */}
                  <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                  
                  {/* Description skeleton (only for some items) */}
                  {index % 3 === 0 && (
                    <div className="h-3 bg-secondary-100 rounded w-full"></div>
                  )}
                </div>
                
                {/* Delete button skeleton */}
                <div className="w-6 h-6 bg-secondary-100 rounded ml-2"></div>
              </div>
              
              {/* Badge and date skeleton */}
              <div className="flex items-center space-x-3">
                <div className="h-5 bg-primary-100 rounded-full w-16"></div>
                {index % 2 === 0 && (
                  <div className="h-4 bg-secondary-100 rounded w-12"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Loading indicator */}
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-secondary-500">
          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading your tasks...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;