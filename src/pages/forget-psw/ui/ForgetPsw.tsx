import { NewPswForm } from '@/features/auth';
import CheckSendedForm from '@/features/auth/ui/CheckSendedForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPsw = () => {
   const navigate = useNavigate();
   const [showNewPswForm, setShowNewPswForm] = useState(false);

   const handleSendedPsw = (password: string) => {
      console.log('Отправленный пароль - ', password);
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
            <CheckSendedForm handleSendedPsw={handleSendedPsw} />
         )}
      </>
   );
};

export default ForgetPsw;
