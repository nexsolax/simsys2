import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useStore((state) => state.auth.accessToken);
  const location = useLocation();

  if (!accessToken) {
    // Redirect to login page but save the attempted url
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
