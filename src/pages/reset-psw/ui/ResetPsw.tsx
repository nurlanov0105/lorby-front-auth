import { NewPswForm, ProoveForm } from '@/features/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPsw = () => {
   const navigate = useNavigate();

   const [showNewPswForm, setShowNewPswForm] = useState(false);
   const handleOldPsw = (password: string) => {
      console.log('Старый пароль - ', password);
      setShowNewPswForm(!showNewPswForm);
   };
   const handleNewPsw = (newPassword: string) => {
      console.log('Новый пароль - ', newPassword);
      navigate('/login');
   };
   return (
      <>
         {showNewPswForm ? (
            <NewPswForm handleNewPsw={handleNewPsw} />
         ) : (
            <ProoveForm handleOldPsw={handleOldPsw} />
         )}
      </>
   );
};

export default ResetPsw;
