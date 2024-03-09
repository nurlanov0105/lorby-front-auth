import { authApi } from './api/authApi';

import {
   useRegisterMutation,
   useLoginMutation,
   useRefreshMutation,
   useEmailVerifyMutation,
   useLogoutMutation,
   useResendEmailMutation,
   useEmailSendMutation,
   usePasswordResetMutation,
   useChangePasswordMutation,
   useDeleteMutation,
} from './model/authApiSlice';

import authSlice, {
   addCurrentUser,
   removeUser,
   addEmail,
   removeEmail,
   tokenRefresh,
} from './model/authSlice';

import LoginForm from './ui/LoginForm';
import RegisterForm from './ui/RegisterForm';

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
   useEmailSendMutation,
   usePasswordResetMutation,
   useChangePasswordMutation,
   useDeleteMutation,
   addCurrentUser,
   removeUser,
   addEmail,
   removeEmail,
   tokenRefresh,
   loginValidationSchema,
   NewPswForm,
   ForgetPasswordForm,
};
