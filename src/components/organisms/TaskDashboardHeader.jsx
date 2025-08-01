import React, { useContext } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ViewTabs from "@/components/molecules/ViewTabs";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import { AuthContext } from "../../App";

const TaskDashboardHeader = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM do");
  const { user } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
    }
  };

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Top section with branding, user info and logout */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <ApperIcon name="CheckSquare" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary-900">TaskFlow</h1>
                  <p className="text-sm text-secondary-600">{formattedDate}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-secondary-600">{user.emailAddress}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-secondary-600 hover:text-secondary-900"
              >
                <ApperIcon name="LogOut" size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation tabs */}
          <ViewTabs />

          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search tasks..."
              />
            </div>
          </div>

          {/* Category filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </header>
  );
};

export default TaskDashboardHeader;