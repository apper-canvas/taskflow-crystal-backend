import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TaskDashboard from "@/components/pages/TaskDashboard";

function App() {
  return (
    <div className="min-h-screen bg-secondary-50 font-inter">
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
        <Route path="/today" element={<TaskDashboard view="today" />} />
        <Route path="/upcoming" element={<TaskDashboard view="upcoming" />} />
        <Route path="/all" element={<TaskDashboard view="all" />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-50"
      />
    </div>
  );
}

export default App;