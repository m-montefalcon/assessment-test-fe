// src/hooks/AuthWrapper.tsx
import { useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // If the user is logged in, redirect to the home page only if they are not already on the home page
      if (location.pathname !== "/home") {
        navigate("/home");
      }
    } else {
      // If the user is not logged in, allow access to login and register pages
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [navigate, location]);

  return <>{children}</>;
};

export default AuthWrapper;
