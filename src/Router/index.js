import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Patients from "../Pages/Patients";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
