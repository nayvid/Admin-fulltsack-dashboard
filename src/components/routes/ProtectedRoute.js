import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.cart?.auth ?? {
    isAuthenticated: false
  });
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;