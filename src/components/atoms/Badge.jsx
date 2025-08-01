import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  color,
  children,
  ...props 
}, ref) => {
  const baseStyles = "category-badge inline-flex items-center text-xs font-medium";
  
  const variants = {
    default: "bg-secondary-100 text-secondary-800",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    custom: ""
  };

  const customStyle = color ? {
    backgroundColor: `${color}15`,
    color: color
  } : {};

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variant === "custom" ? variants.custom : variants[variant],
        className
      )}
      style={variant === "custom" ? customStyle : undefined}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;