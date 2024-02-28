import { Routes, Route } from 'react-router';
import Main from '@/pages/main/ui/Main';
import NotFound from '@/pages/not-found/ui/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { AuthLayout } from '../layouts';
import { Verification } from '@/pages/verification';
import { Modal } from '@/widgets/modal';

const Routers = () => {
   return (
      <>
         <Routes>
            <Route path='/' element={<ProtectedRoute />}>
               <Route index element={<Main />} />
            </Route>

            <Route path='/' element={<AuthLayout />}>
               <Route path='login' element={<Login />} />
               <Route path='register' element={<Register />} />
               <Route path='verification' element={<Verification />} />
            </Route>

            <Route path='*' element={<NotFound />} />
         </Routes>
         <Modal />
      </>
   );
};

export default Routers;
