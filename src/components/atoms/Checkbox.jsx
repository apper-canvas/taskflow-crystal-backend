import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked,
  onChange,
  disabled,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "checkbox-animate inline-flex items-center justify-center w-5 h-5 border-2 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        checked 
          ? "bg-primary-600 border-primary-600 text-white" 
          : "bg-white border-secondary-300 hover:border-primary-400",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={14} 
          className="animate-scale-in"
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;