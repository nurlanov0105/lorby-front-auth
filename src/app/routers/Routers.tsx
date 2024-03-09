import { Routes, Route } from 'react-router';
import Main from '@/pages/main/ui/Main';
import NotFound from '@/pages/not-found/ui/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { AuthLayout } from '../layouts';
import { Verification } from '@/pages/verification';
import { Modal } from '@/widgets/modal';
import { Confirm } from '@/pages/confirm';
import { ForgetPsw } from '@/pages/forget-psw';
import { ResetPsw } from '@/pages/reset-psw';
import { NewPassword } from '@/pages/new-password';

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
               <Route path='forget-password' element={<ForgetPsw />} />
               <Route path='new-password' element={<NewPassword />} />
               <Route path='reset-password' element={<ResetPsw />} />
               <Route path='confirm' element={<Confirm />} />
            </Route>

            <Route path='*' element={<NotFound />} />
         </Routes>
         <Modal />
      </>
   );
};

export default Routers;
