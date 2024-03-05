import LoginForm from './ui/LoginForm';
import RegisterForm from './ui/RegisterForm';
import authSlice, { addCurrentUser, removeUser } from './model/authSlice';
import {
   authApi,
   useRegisterMutation,
   useLoginMutation,
   useRefreshMutation,
   useEmailVerifyMutation,
   useLogoutMutation,
   useResendEmailMutation,
} from './api/authApi';
import { loginValidationSchema } from './model/validation';
import ProoveForm from './ui/ProoveForm';
import NewPswForm from './ui/NewPswForm';
import ForgetPasswordForm from './ui/ForgetPasswordForm';

export {
   LoginForm,
   RegisterForm,
   ProoveForm,
   authSlice,
   authApi,
   useRegisterMutation,
   useLoginMutation,
   useRefreshMutation,
   useEmailVerifyMutation,
   useLogoutMutation,
   useResendEmailMutation,
   addCurrentUser,
   removeUser,
   loginValidationSchema,
   NewPswForm,
   ForgetPasswordForm,
};
