import { useState } from 'react';
import { ProoveForm } from '@/features/auth';

const ResetPsw = () => {
   const [showNewPassword, setShowNewPassword] = useState(false);

   const handlePassword = (password: string) => {
      console.log(password);
      setShowNewPassword(true);
   };

   const handleNewPassword = (newPassword: string) => {
      console.log(newPassword);
   };

   return showNewPassword ? (
      <ProoveForm handleData={handleNewPassword} type='newPassword' />
   ) : (
      <ProoveForm handleData={handlePassword} type='password' />
   );
};

export default ResetPsw;
