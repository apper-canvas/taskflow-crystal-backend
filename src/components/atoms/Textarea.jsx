import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  error,
  rows = 3,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 border rounded-lg text-sm placeholder-secondary-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none";
  
  const errorStyles = error 
    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
    : "border-secondary-300 text-secondary-900 focus:border-primary-500";

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;