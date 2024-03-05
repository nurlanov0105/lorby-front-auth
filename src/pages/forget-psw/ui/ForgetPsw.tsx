import { useState } from 'react';
import { ForgetPasswordForm } from '@/features/auth';

const ForgetPsw = () => {
   const [isShowPasswordForm, setIsShowPasswordForm] = useState(false);

   const handleEmail = (email: string) => {
      console.log(email);
      setIsShowPasswordForm(true);
   };
   const handlePassword = (password: string) => {
      console.log(password);
      setIsShowPasswordForm(true);
   };

   return isShowPasswordForm ? (
      <ForgetPasswordForm handleData={handleEmail} type='password' />
   ) : (
      <ForgetPasswordForm handleData={handlePassword} type='email' />
   );
};

export default ForgetPsw;
