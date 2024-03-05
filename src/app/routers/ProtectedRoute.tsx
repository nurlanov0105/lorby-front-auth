import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import useAuthTokens from '@/shared/hooks/useAuthTokens';

const ProtectedRoute = () => {
   const { isRefreshTokenExpired } = useAuthTokens();

   return isRefreshTokenExpired ? <Navigate to='/login' /> : <Outlet />;
};

export default ProtectedRoute;
