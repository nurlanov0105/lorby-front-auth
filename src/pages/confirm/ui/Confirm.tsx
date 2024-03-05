import { useEmailVerifyMutation } from '@/features/auth';
import { ConfirmBlock } from '@/features/confirmBlock';
import { errorMessages } from '@/shared/api/errorMessages';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import styles from './styles.module.scss';

const Confirm = () => {
   const [searchParams] = useSearchParams();
   const [emailVerify] = useEmailVerifyMutation();

   const handleConfirm = async (token: string) => {
      try {
         const response = await emailVerify({ token });
         console.log(response);
      } catch (error: any) {
         const message = errorMessages[error.status as keyof typeof errorMessages];
         if (message) {
            toast.error(message);
         } else {
            toast.error('Произошла ошибка при логине');
         }
      }
   };

   useEffect(() => {
      const token = searchParams.get('token');
      if (token) {
         console.log(token);
         handleConfirm(token);
      }
   }, []);
   return <ConfirmBlock />;
};

export default Confirm;
