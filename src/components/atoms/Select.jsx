import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 pr-10 border rounded-lg text-sm bg-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none";
  
  const errorStyles = error 
    ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
    : "border-secondary-300 text-secondary-900 focus:border-primary-500";

  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          baseStyles,
          errorStyles,
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon 
          name="ChevronDown" 
          size={16} 
          className="text-secondary-400"
        />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;