import { ProoveForm, useChangePasswordMutation } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPsw = () => {
   const [changePassword, { isLoading }] = useChangePasswordMutation();
   const navigate = useNavigate();

   const handlePassword = async (oldPassword: string, password: string) => {
      console.log(oldPassword, password);

      try {
         const res: any = await changePassword({
            old_password: oldPassword,
            new_password: password,
         });

         if (res.error && res.error.status === 400) {
            console.log(res.error);
            toast.error(res.error.data.Error);
         } else {
            console.log('psew changed - ', res);
            navigate('/');
            toast.success('Пароль успешно изменен!');
         }
      } catch (error) {
         console.log(error);
         toast.error('Произошла ошибка');
      }
   };

   return <ProoveForm handleData={handlePassword} isLoading={isLoading} />;
};

export default ResetPsw;
