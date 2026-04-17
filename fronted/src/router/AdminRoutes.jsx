import { Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export const AdminRoutes = [
  {
    path: "/admin/login",
    lazy: async () => {
      const { default: Login } = await import("../pages/admin/Login");
      return { Component: Login };
    },
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
