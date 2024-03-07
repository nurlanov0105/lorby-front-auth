import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

const ProtectedRoute = () => {
   const { isAuth } = useAuth();

   return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
