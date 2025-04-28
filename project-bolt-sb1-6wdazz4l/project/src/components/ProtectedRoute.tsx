import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authService';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
