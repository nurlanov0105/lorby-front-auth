import { ForgetPasswordForm, usePasswordResetMutation } from '@/features/auth';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NewPassword = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const [passwordReset, { isLoading }] = usePasswordResetMutation();
   const [token, setToken] = useState('');

   useEffect(() => {
      const token = searchParams.get('token');
      if (token) {
         setToken(token);
         toast.success('Теперь ты можешь поменять пароль');
      }
   }, []);

   const handlePassword = async (password: string) => {
      console.log(password);

      try {
         const res: any = await passwordReset({ password, token });

         console.log(res);
         if (res.error) {
            console.log('Произошла ошибка');
         } else {
            toast.success('Ты успешно обновил пароль!');
            navigate('/login');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return <ForgetPasswordForm handleData={handlePassword} type='password' isLoading={isLoading} />;
};

export default NewPassword;
