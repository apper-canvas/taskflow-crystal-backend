import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

const ViewTabs = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { id: "today", label: "Today", path: "/" },
    { id: "upcoming", label: "Upcoming", path: "/upcoming" },
    { id: "all", label: "All Tasks", path: "/all" }
  ];
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/upcoming") return "upcoming";
    if (path === "/all") return "all";
    return "today";
  };
  
  const activeTab = getActiveTab();

  return (
    <div className={cn("flex space-x-1 bg-secondary-100 p-1 rounded-lg", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            activeTab === tab.id
              ? "bg-white text-primary-700 shadow-sm"
              : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ViewTabs;